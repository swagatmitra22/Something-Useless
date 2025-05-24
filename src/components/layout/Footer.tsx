import React from 'react';
import styled from 'styled-components';
import { Heart, Code, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { theme } from '../../styles/theme';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <BuiltWith>
          <TechStack>
            <TechItem>
              <Code size={16} />
              React + TypeScript
            </TechItem>
            <TechItem>
              <Zap size={16} />
              Vite
            </TechItem>
            <TechItem>
              <Heart size={16} />
              Gemini AI
            </TechItem>
          </TechStack>
          <Copyright>
            © 2025 {personalInfo.name}. Built with passion and cutting-edge tech.
          </Copyright>
        </BuiltWith>
        
        <QuickLinks>
          <LinkSection>
            <LinkTitle>Connect</LinkTitle>
            <FooterLink href={`mailto:${personalInfo.email}`}>Email</FooterLink>
            <FooterLink href={personalInfo.social.linkedin} target="_blank">LinkedIn</FooterLink>
            <FooterLink href={personalInfo.social.github} target="_blank">GitHub</FooterLink>
          </LinkSection>
          
          <LinkSection>
            <LinkTitle>Quick Search</LinkTitle>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); /* Add search functionality */ }}>
              My Projects
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); /* Add search functionality */ }}>
              Technical Skills
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); /* Add search functionality */ }}>
              Experience
            </FooterLink>
          </LinkSection>
        </QuickLinks>
      </FooterContent>
      
      <FooterBottom>
        <StatusIndicator>
          <StatusDot />
          Available for opportunities
        </StatusIndicator>
        <LastUpdated>
          Last updated: {new Date().toLocaleDateString()}
        </LastUpdated>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${theme.spacing['3xl']};
  padding: ${theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.xl};
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const BuiltWith = styled.div`
  color: rgba(255, 255, 255, 0.8);
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
`;

const Copyright = styled.p`
  font-size: ${theme.fontSizes.sm};
  opacity: 0.7;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const LinkTitle = styled.h4`
  color: white;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${theme.fontSizes.sm};
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.fontSizes.sm};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.success};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const LastUpdated = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${theme.fontSizes.xs};
`;

export default Footer;
