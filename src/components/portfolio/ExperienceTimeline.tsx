import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import { experiences } from '../../data/experience';
import { theme } from '../../styles/theme';

const ExperienceTimeline: React.FC = () => {
  return (
    <TimelineContainer>
      <SectionTitle>Professional Experience</SectionTitle>
      <Timeline>
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            as={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <TimelineMarker>
              <MarkerDot />
              <MarkerLine />
            </TimelineMarker>
            
            <ExperienceCard>
              <CardHeader>
                <CompanyInfo>
                  <CompanyName>{experience.company}</CompanyName>
                  <RoleTitle>{experience.role}</RoleTitle>
                </CompanyInfo>
                <ExperienceType type={experience.type}>
                  {experience.type}
                </ExperienceType>
              </CardHeader>
              
              <ExperienceDetails>
                <DetailItem>
                  <Calendar size={16} />
                  {experience.duration}
                </DetailItem>
                <DetailItem>
                  <MapPin size={16} />
                  {experience.location}
                </DetailItem>
              </ExperienceDetails>
              
              <Description>{experience.description}</Description>
              
              {experience.technologies.length > 0 && (
                <TechnologiesSection>
                  <TechLabel>Technologies:</TechLabel>
                  <TechStack>
                    {experience.technologies.map((tech, techIndex) => (
                      <TechBadge key={techIndex}>{tech}</TechBadge>
                    ))}
                  </TechStack>
                </TechnologiesSection>
              )}
              
              {experience.achievements.length > 0 && (
                <AchievementsSection>
                  <AchievementsLabel>
                    <Award size={16} />
                    Key Achievements:
                  </AchievementsLabel>
                  <AchievementsList>
                    {experience.achievements.map((achievement, achIndex) => (
                      <AchievementItem key={achIndex}>
                        • {achievement}
                      </AchievementItem>
                    ))}
                  </AchievementsList>
                </AchievementsSection>
              )}
            </ExperienceCard>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: ${theme.spacing.xl};
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing['2xl']};
  
  &:last-child {
    margin-bottom: 0;
    
    .timeline-line {
      display: none;
    }
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: -${theme.spacing.xl};
  top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarkerDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
  border: 3px solid white;
  box-shadow: ${theme.shadows.md};
  z-index: 2;
`;

const MarkerLine = styled.div`
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, ${theme.colors.primary[300]}, ${theme.colors.secondary[300]});
  margin-top: ${theme.spacing.sm};
  opacity: 0.6;
`;

const ExperienceCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xs};
`;

const RoleTitle = styled.h4`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.primary[600]};
`;

const ExperienceType = styled.span<{ type: string }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ type }) => {
    switch (type) {
      case 'Internship':
        return `
          background: ${theme.colors.primary[100]};
          color: ${theme.colors.primary[700]};
        `;
      case 'Full-time':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'Contract':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[600]};
        `;
    }
  }}
`;

const ExperienceDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
`;

const Description = styled.p`
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const TechnologiesSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const TechLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.sm};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const TechBadge = styled.span`
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: 500;
`;

const AchievementsSection = styled.div``;

const AchievementsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.sm};
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AchievementItem = styled.li`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
  line-height: 1.5;
`;

export default ExperienceTimeline;
