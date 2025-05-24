import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Search, Star } from 'lucide-react';
import { theme } from '../../styles/theme';

interface SearchHistoryItem {
  id: number;
  query: string;
  response: string;
  timestamp: string;
  bookmarked?: boolean;
}

interface SearchHistoryProps {
  onQuerySelect: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onQuerySelect }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<SearchHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks'>('history');

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    const savedBookmarks = localStorage.getItem('searchBookmarks');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('searchBookmarks');
  };

  const removeHistoryItem = (id: number) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const removeBookmark = (id: number) => {
    const newBookmarks = bookmarks.filter(item => item.id !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem('searchBookmarks', JSON.stringify(newBookmarks));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const currentItems = activeTab === 'history' ? history : bookmarks;

  if (currentItems.length === 0) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <TabButtons>
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
            >
              <Clock size={16} />
              Recent Searches
            </TabButton>
            <TabButton 
              active={activeTab === 'bookmarks'} 
              onClick={() => setActiveTab('bookmarks')}
            >
              <Star size={16} />
              Bookmarks
            </TabButton>
          </TabButtons>
        </HistoryHeader>
        
        <EmptyState>
          <EmptyIcon>
            {activeTab === 'history' ? <Clock size={48} /> : <Star size={48} />}
          </EmptyIcon>
          <EmptyTitle>
            {activeTab === 'history' ? 'No search history yet' : 'No bookmarks saved'}
          </EmptyTitle>
          <EmptyDescription>
            {activeTab === 'history' 
              ? 'Start asking questions about Swagat to see your search history here.'
              : 'Bookmark interesting responses to save them for later.'
            }
          </EmptyDescription>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <TabButtons>
          <TabButton 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            <Clock size={16} />
            Recent Searches ({history.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'bookmarks'} 
            onClick={() => setActiveTab('bookmarks')}
          >
            <Star size={16} />
            Bookmarks ({bookmarks.length})
          </TabButton>
        </TabButtons>
        
        <ClearButton 
          onClick={activeTab === 'history' ? clearHistory : clearBookmarks}
        >
          <Trash2 size={16} />
          Clear All
        </ClearButton>
      </HistoryHeader>

      <HistoryList>
        <AnimatePresence>
          {currentItems.map((item, index) => (
            <HistoryItem
              key={item.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onQuerySelect(item.query)}
            >
              <ItemHeader>
                <QueryText>{item.query}</QueryText>
                <ItemActions>
                  <Timestamp>{formatTimestamp(item.timestamp)}</Timestamp>
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      activeTab === 'history' 
                        ? removeHistoryItem(item.id)
                        : removeBookmark(item.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </DeleteButton>
                </ItemActions>
              </ItemHeader>
              
              <ResponsePreview>
                {item.response.substring(0, 150)}
                {item.response.length > 150 && '...'}
              </ResponsePreview>
              
              <SearchAgainButton>
                <Search size={14} />
                Search again
              </SearchAgainButton>
            </HistoryItem>
          ))}
        </AnimatePresence>
      </HistoryList>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${theme.spacing.xl};
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const TabButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ active }) => active
    ? `
      background: ${theme.colors.primary[500]};
      color: white;
    `
    : `
      background: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[600]};
      
      &:hover {
        background: ${theme.colors.gray[200]};
      }
    `
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  color: ${theme.colors.error};
  border: 1px solid ${theme.colors.error};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.error};
    color: white;
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const HistoryItem = styled.div`
  background: white;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary[300]};
    box-shadow: ${theme.shadows.md};
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm};
`;

const QueryText = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  flex: 1;
  margin-right: ${theme.spacing.md};
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Timestamp = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.gray[500]};
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.gray[400]};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.error};
    background: ${theme.colors.gray[100]};
  }
`;

const ResponsePreview = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.sm};
`;

const SearchAgainButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.primary[600]};
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
`;

const EmptyIcon = styled.div`
  color: ${theme.colors.gray[400]};
  margin-bottom: ${theme.spacing.md};
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
`;

const EmptyDescription = styled.p`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;

export default SearchHistory;
