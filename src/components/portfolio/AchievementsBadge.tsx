import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Trophy, Target, Code, Star, Award, Medal } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { theme } from '../../styles/theme';

const iconMap = {
  Competition: Trophy,
  Skills: Code,
  Achievement: Award,
  Recognition: Medal,
  Project: Target,
  default: Star
};

const AchievementsBadge: React.FC = () => {
  const getIcon = (category: string) => {
    return iconMap[category as keyof typeof iconMap] || iconMap.default;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Competition': return theme.colors.warning;
      case 'Skills': return theme.colors.primary[500];
      case 'Achievement': return theme.colors.success;
      case 'Recognition': return theme.colors.secondary[500];
      case 'Project': return theme.colors.primary[600];
      default: return theme.colors.gray[500];
    }
  };

  return (
    <AchievementsContainer>
      <SectionTitle>Achievements & Recognition</SectionTitle>
      <AchievementsGrid>
        {achievements.map((achievement, index) => {
          const IconComponent = getIcon(achievement.category);
          const categoryColor = getCategoryColor(achievement.category);
          
          return (
            <AchievementCard
              key={achievement.id}
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <AchievementIcon color={categoryColor}>
                <IconComponent size={24} />
              </AchievementIcon>
              
              <AchievementContent>
                <AchievementTitle>{achievement.title}</AchievementTitle>
                <AchievementDescription>
                  {achievement.description}
                </AchievementDescription>
                
                {achievement.details && (
                  <AchievementDetails>
                    {Object.entries(achievement.details).map(([key, value]) => (
                      <DetailItem key={key}>
                        <DetailLabel>{key}:</DetailLabel>
                        <DetailValue>
                          {Array.isArray(value) ? value.join(', ') : value}
                        </DetailValue>
                      </DetailItem>
                    ))}
                  </AchievementDetails>
                )}
                
                <AchievementFooter>
                  <CategoryBadge color={categoryColor}>
                    {achievement.category}
                  </CategoryBadge>
                  <AchievementDate>{achievement.date}</AchievementDate>
                </AchievementFooter>
              </AchievementContent>
            </AchievementCard>
          );
        })}
      </AchievementsGrid>
      
      <CompetitiveProgramming>
        <CPTitle>Competitive Programming Profile</CPTitle>
        <CPStats>
          <StatCard>
            <StatIcon>
              <Code size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>200+</StatValue>
              <StatLabel>Problems Solved</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <Target size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>1070</StatValue>
              <StatLabel>Codeforces Rating</StatLabel>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <Trophy size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>100+</StatValue>
              <StatLabel>LeetCode Problems</StatLabel>
            </StatContent>
          </StatCard>
        </CPStats>
        
        <PlatformLinks>
          <PlatformLink href="#" target="_blank">
            <strong>Codeforces:</strong> Newbie (Rating: 1070)
          </PlatformLink>
          <PlatformLink href="#" target="_blank">
            <strong>LeetCode:</strong> 100+ problems solved
          </PlatformLink>
          <PlatformLink href="#" target="_blank">
            <strong>Other Platforms:</strong> CodeChef, HackerRank
          </PlatformLink>
        </PlatformLinks>
      </CompetitiveProgramming>
    </AchievementsContainer>
  );
};

const AchievementsContainer = styled.div`
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

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const AchievementCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
  gap: ${theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const AchievementIcon = styled.div<{ color: string }>`
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
`;

const AchievementContent = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
`;

const AchievementDescription = styled.p`
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const AchievementDetails = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  font-size: ${theme.fontSizes.sm};
`;

const DetailValue = styled.span`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
`;

const AchievementFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryBadge = styled.span<{ color: string }>`
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AchievementDate = styled.span`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.sm};
`;

const CompetitiveProgramming = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.secondary[50]} 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.primary[200]};
`;

const CPTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const CPStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.sm};
`;

const StatIcon = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
  color: white;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: ${theme.colors.gray[900]};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PlatformLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const PlatformLink = styled.a`
  color: ${theme.colors.gray[700]};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.sm};
  background: white;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[700]};
  }

  strong {
    color: ${theme.colors.gray[900]};
  }
`;

export default AchievementsBadge;
