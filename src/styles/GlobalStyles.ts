import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
    color: ${theme.colors.gray[900]};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }

  code {
    font-family: ${theme.fonts.mono};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.xl};
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.gray[200]};
          color: ${theme.colors.gray[900]};
          &:hover {
            background: ${theme.colors.gray[300]};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.white};
          border: 2px solid ${theme.colors.white};
          &:hover {
            background: ${theme.colors.white};
            color: ${theme.colors.primary[600]};
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.secondary[500]} 100%);
          color: ${theme.colors.white};
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;
