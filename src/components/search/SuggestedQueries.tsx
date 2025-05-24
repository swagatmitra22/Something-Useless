import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const suggestedQueries = [
  "What are Swagat's main programming languages and expertise?",
  "Tell me about the easyEdits AI video editing project",
  "What experience does Swagat have with AI and machine learning?",
  "Show me Swagat's achievements in competitive programming",
  "What internships has Swagat completed?",
  "Describe the VCHECK ID recognition system project",
  "What technologies does Swagat use for full-stack development?",
  "Tell me about Swagat's education at VIT Chennai",
  "What makes Swagat's SONORIQ music platform unique?",
  "How did Swagat perform in the Amazon ML Challenge?"
];

interface SuggestedQueriesProps {
  onQuerySelect: (query: string) => void;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onQuerySelect }) => {
  return (
    <Container>
      <Title>Try asking about:</Title>
      <QueriesGrid>
        {suggestedQueries.map((query, index) => (
          <QueryButton
            key={index}
            as={motion.button}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onQuerySelect(query)}
          >
            {query}
          </QueryButton>
        ))}
      </QueriesGrid>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const QueriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.8rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const QueryButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    background: white;
    border-color: #667eea;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
  }
`;

export default SuggestedQueries;
