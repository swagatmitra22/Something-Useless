import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { theme } from '../../styles/theme';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <ProfileSection>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProfileImage>
            <InitialsCircle>SM</InitialsCircle>
          </ProfileImage>
          <Name>{personalInfo.name}</Name>
          <Title>{personalInfo.title}</Title>
          <Bio>{personalInfo.bio}</Bio>
          
          <ContactInfo>
            <ContactItem href={`mailto:${personalInfo.email}`}>
              <Mail size={16} />
              {personalInfo.email}
            </ContactItem>
            <ContactItem href={`tel:${personalInfo.phone}`}>
              <Phone size={16} />
              {personalInfo.phone}
            </ContactItem>
            <ContactItem href={personalInfo.social.linkedin} target="_blank">
              <Linkedin size={16} />
              LinkedIn
            </ContactItem>
            <ContactItem href={personalInfo.social.github} target="_blank">
              <Github size={16} />
              GitHub
            </ContactItem>
          </ContactInfo>

          <EducationBadge>
            <strong>{personalInfo.education.institution}</strong>
            <span>{personalInfo.education.degree}</span>
            <span>CGPA: {personalInfo.education.cgpa}</span>
          </EducationBadge>
        </motion.div>
      </ProfileSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing['2xl']} 0;
`;

const ProfileSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const ProfileImage = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const InitialsCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 700;
  color: white;
  margin: 0 auto;
  box-shadow: ${theme.shadows.xl};
`;

const Name = styled.h1`
  font-size: ${theme.fontSizes['5xl']};
  font-weight: 700;
  color: white;
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${theme.spacing.lg};
  font-weight: 400;
`;

const Bio = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  color: white;
  text-decoration: none;
  transition: all 0.2s;
  font-size: ${theme.fontSizes.sm};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const EducationBadge = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.md};
  display: inline-block;
  color: white;
  
  strong {
    display: block;
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.xs};
  }
  
  span {
    display: block;
    font-size: ${theme.fontSizes.sm};
    opacity: 0.9;
  }
`;

export default Header;
