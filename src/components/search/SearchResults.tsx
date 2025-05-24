import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import CodeBlock from '../ui/CodeBlock';
import { theme } from '../../styles/theme';

interface SearchResultsProps {
  query: string;
  response: string;
  loading: boolean;
  onNewSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  query, 
  response, 
  loading, 
  onNewSearch 
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Question about Swagat Mitra: ${query}`,
          text: response.substring(0, 100) + '...',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`Q: ${query}\nA: ${response}`);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('searchBookmarks') || '[]');
    const newBookmark = {
      id: Date.now(),
      query,
      response,
      timestamp: new Date().toISOString()
    };
    bookmarks.unshift(newBookmark);
    localStorage.setItem('searchBookmarks', JSON.stringify(bookmarks.slice(0, 10)));
  };

  if (loading) {
    return (
      <ResultsContainer>
        <LoadingSpinner size="lg" />
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResultsHeader>
        <BackButton onClick={onNewSearch}>
          <ArrowLeft size={20} />
          New Search
        </BackButton>
        <ActionButtons>
          <ActionButton onClick={handleShare}>
            <Share2 size={16} />
            Share
          </ActionButton>
          <ActionButton onClick={handleBookmark}>
            <Bookmark size={16} />
            Save
          </ActionButton>
        </ActionButtons>
      </ResultsHeader>

      <QueryDisplay>
        <QueryLabel>Your Question:</QueryLabel>
        <QueryText>"{query}"</QueryText>
      </QueryDisplay>

      <ResponseContainer>
        <ResponseLabel>AI Response:</ResponseLabel>
        <ResponseContent>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                  />
                ) : (
                  <InlineCode {...props}>{children}</InlineCode>
                );
              },
              h1: ({ children }) => <ResponseH1>{children}</ResponseH1>,
              h2: ({ children }) => <ResponseH2>{children}</ResponseH2>,
              h3: ({ children }) => <ResponseH3>{children}</ResponseH3>,
              p: ({ children }) => <ResponseParagraph>{children}</ResponseParagraph>,
              ul: ({ children }) => <ResponseList>{children}</ResponseList>,
              li: ({ children }) => <ResponseListItem>{children}</ResponseListItem>,
              strong: ({ children }) => <ResponseStrong>{children}</ResponseStrong>,
              em: ({ children }) => <ResponseEmphasis>{children}</ResponseEmphasis>,
            }}
          >
            {response}
          </ReactMarkdown>
        </ResponseContent>
      </ResponseContainer>

      <FeedbackSection>
        <FeedbackLabel>Was this helpful?</FeedbackLabel>
        <FeedbackButtons>
          <FeedbackButton>
            <ThumbsUp size={16} />
            Yes
          </FeedbackButton>
          <FeedbackButton>
            <ThumbsUp size={16} style={{ transform: 'rotate(180deg)' }} />
            No
          </FeedbackButton>
        </FeedbackButtons>
      </FeedbackSection>

      <SuggestedFollowUps>
        <FollowUpLabel>Ask follow-up questions:</FollowUpLabel>
        <FollowUpButtons>
          <FollowUpButton onClick={() => onNewSearch()}>
            Tell me more about this project
          </FollowUpButton>
          <FollowUpButton onClick={() => onNewSearch()}>
            What technologies were used?
          </FollowUpButton>
          <FollowUpButton onClick={() => onNewSearch()}>
            Show me similar projects
          </FollowUpButton>
        </FollowUpButtons>
      </SuggestedFollowUps>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.gray[200]};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  color: ${theme.colors.gray[600]};
  border: 1px solid ${theme.colors.gray[300]};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.gray[50]};
    border-color: ${theme.colors.gray[400]};
  }
`;

const QueryDisplay = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const QueryLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QueryText = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[900]};
  font-style: italic;
  background: ${theme.colors.gray[50]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary[500]};
`;

const ResponseContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ResponseLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ResponseContent = styled.div`
  line-height: 1.7;
  color: ${theme.colors.gray[800]};
`;

const ResponseH1 = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
`;

const ResponseH2 = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
`;

const ResponseH3 = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin: ${theme.spacing.md} 0 ${theme.spacing.sm} 0;
`;

const ResponseParagraph = styled.p`
  margin-bottom: ${theme.spacing.md};
  line-height: 1.7;
`;

const ResponseList = styled.ul`
  margin: ${theme.spacing.md} 0;
  padding-left: ${theme.spacing.lg};
`;

const ResponseListItem = styled.li`
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.6;
`;

const ResponseStrong = styled.strong`
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const ResponseEmphasis = styled.em`
  font-style: italic;
  color: ${theme.colors.gray[700]};
`;

const InlineCode = styled.code`
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[800]};
  padding: 2px 4px;
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fonts.mono};
  font-size: 0.9em;
`;

const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const FeedbackLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  font-weight: 500;
`;

const FeedbackButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const FeedbackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: white;
  border: 1px solid ${theme.colors.gray[300]};
  color: ${theme.colors.gray[600]};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.success};
    color: white;
    border-color: ${theme.colors.success};
  }
`;

const SuggestedFollowUps = styled.div``;

const FollowUpLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.md};
`;

const FollowUpButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const FollowUpButton = styled.button`
  background: rgba(102, 126, 234, 0.1);
  color: ${theme.colors.primary[600]};
  border: 1px solid rgba(102, 126, 234, 0.2);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.primary[500]};
    color: white;
    border-color: ${theme.colors.primary[500]};
  }
`;

export default SearchResults;
