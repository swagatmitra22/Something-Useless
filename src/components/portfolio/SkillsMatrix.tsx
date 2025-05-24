import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Cpu, Wrench, BookOpen } from 'lucide-react';
import { technicalSkills } from '../../data/achievements';
import { theme } from '../../styles/theme';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 'Advanced', color: '#3776ab' },
      { name: 'C/C++', level: 'Advanced', color: '#00599c' },
      { name: 'SQL', level: 'Advanced', color: '#336791' },
      { name: 'Java', level: 'Intermediate', color: '#ed8b00' },
      { name: 'Kotlin', level: 'Basic', color: '#7f52ff' },
    ]
  },
  {
    title: 'Web Technologies',
    icon: Globe,
    skills: [
      { name: 'React.js', level: 'Advanced', color: '#61dafb' },
      { name: 'Node.js', level: 'Advanced', color: '#339933' },
      { name: 'JavaScript', level: 'Advanced', color: '#f7df1e' },
      { name: 'Express.js', level: 'Intermediate', color: '#000000' },
      { name: 'Firebase', level: 'Intermediate', color: '#ffca28' },
    ]
  },
  {
    title: 'AI/ML & Data Science',
    icon: Cpu,
    skills: [
      { name: 'TensorFlow', level: 'Advanced', color: '#ff6f00' },
      { name: 'Scikit-Learn', level: 'Advanced', color: '#f7931e' },
      { name: 'Pandas', level: 'Advanced', color: '#150458' },
      { name: 'NumPy', level: 'Advanced', color: '#013243' },
      { name: 'OpenAI APIs', level: 'Intermediate', color: '#412991' },
    ]
  },
  {
    title: 'Developer Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 'Advanced', color: '#f05032' },
      { name: 'VS Code', level: 'Advanced', color: '#007acc' },
      { name: 'PyCharm', level: 'Intermediate', color: '#000000' },
      { name: 'IntelliJ', level: 'Intermediate', color: '#000000' },
      { name: 'Docker', level: 'Basic', color: '#2496ed' },
    ]
  }
];

const SkillsMatrix: React.FC = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return theme.colors.success;
      case 'Intermediate': return theme.colors.warning;
      case 'Basic': return theme.colors.gray[400];
      default: return theme.colors.gray[300];
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'Advanced': return '90%';
      case 'Intermediate': return '70%';
      case 'Basic': return '40%';
      default: return '20%';
    }
  };

  return (
    <SkillsContainer>
      <SectionTitle>Technical Skills Matrix</SectionTitle>
      <SkillsGrid>
        {skillCategories.map((category, categoryIndex) => (
          <SkillCategory
            key={category.title}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <CategoryHeader>
              <CategoryIcon>
                <category.icon size={20} />
              </CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryHeader>
            
            <SkillsList>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem
                  key={skill.name}
                  as={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                >
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel level={skill.level}>{skill.level}</SkillLevel>
                  </SkillHeader>
                  <SkillBar>
                    <SkillProgress
                      level={skill.level}
                      width={getLevelWidth(skill.level)}
                      color={getLevelColor(skill.level)}
                      as={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: getLevelWidth(skill.level) }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3, duration: 0.8 }}
                    />
                  </SkillBar>
                </SkillItem>
              ))}
            </SkillsList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

const SkillsContainer = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const SkillCategory = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const CategoryIcon = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
  color: white;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SkillItem = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const SkillName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const SkillLevel = styled.span<{ level: string }>`
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ level }) => {
    switch (level) {
      case 'Advanced':
        return `background: ${theme.colors.success}; color: white;`;
      case 'Intermediate':
        return `background: ${theme.colors.warning}; color: white;`;
      case 'Basic':
        return `background: ${theme.colors.gray[400]}; color: white;`;
      default:
        return `background: ${theme.colors.gray[200]}; color: ${theme.colors.gray[700]};`;
    }
  }}
`;

const SkillBar = styled.div`
  background: ${theme.colors.gray[200]};
  height: 6px;
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const SkillProgress = styled.div<{ level: string; width: string; color: string }>`
  height: 100%;
  background: ${({ color }) => color};
  border-radius: ${theme.borderRadius.full};
  transition: width 0.8s ease;
`;

export default SkillsMatrix;
