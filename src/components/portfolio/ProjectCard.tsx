import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { theme } from '../../styles/theme';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <Card
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(project.id)}
    >
      <CardHeader>
        <ProjectName>{project.name}</ProjectName>
        <CategoryBadge>{project.category}</CategoryBadge>
      </CardHeader>
      
      <ProjectDescription>{project.description}</ProjectDescription>
      
      <TechStack>
        {project.technologies.slice(0, 4).map((tech, index) => (
          <TechBadge key={index}>{tech}</TechBadge>
        ))}
        {project.technologies.length > 4 && (
          <TechBadge>+{project.technologies.length - 4} more</TechBadge>
        )}
      </TechStack>
      
      <Features>
        {project.features.slice(0, 3).map((feature, index) => (
          <FeatureItem key={index}>• {feature}</FeatureItem>
        ))}
      </Features>
      
      <CardFooter>
        <ActionButtons>
          {project.github && (
            <ActionButton 
              href={project.github} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
              Code
            </ActionButton>
          )}
          {project.demo && (
            <ActionButton 
              href={project.demo} 
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              Demo
            </ActionButton>
          )}
        </ActionButtons>
        <LearnMore>
          <Code size={14} />
          Click for details
        </LearnMore>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${theme.shadows.xl};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const ProjectName = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const TechBadge = styled.span`
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: 500;
`;

const Features = styled.ul`
  list-style: none;
  margin-bottom: ${theme.spacing.lg};
`;

const FeatureItem = styled.li`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
  line-height: 1.4;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.primary[500]};
    color: white;
  }
`;

const LearnMore = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.xs};
`;

export default ProjectCard;
