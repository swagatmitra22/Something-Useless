import React, { useState } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { theme } from '../../styles/theme';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <CodeContainer>
      <CodeHeader>
        {filename && <Filename>{filename}</Filename>}
        <Language>{language}</Language>
        <CopyButton onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </CopyButton>
      </CodeHeader>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </CodeContainer>
  );
};

const CodeContainer = styled.div`
  background: #1e1e1e;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  margin: ${theme.spacing.md} 0;
  box-shadow: ${theme.shadows.lg};
`;

const CodeHeader = styled.div`
  background: #2d2d2d;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
`;

const Filename = styled.span`
  color: #ffffff;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
`;

const Language = styled.span`
  color: #888;
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: 1px solid #555;
  color: #ccc;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.xs};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #404040;
    border-color: #777;
  }
`;

export default CodeBlock;
