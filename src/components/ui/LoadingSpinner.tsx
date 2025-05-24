import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = theme.colors.primary[500] 
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
      <LoadingText>Processing your query...</LoadingText>
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
`;

const Spinner = styled.div<{ size: string; color: string }>`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'width: 20px; height: 20px;';
      case 'lg':
        return 'width: 60px; height: 60px;';
      default:
        return 'width: 40px; height: 40px;';
    }
  }}
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.fontSizes.sm};
  text-align: center;
`;

export default LoadingSpinner;
