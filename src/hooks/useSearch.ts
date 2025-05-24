import { useState, useCallback } from 'react';
import { geminiService } from '../services/geminiService';

interface SearchState {
  query: string;
  response: string;
  loading: boolean;
  error: string | null;
  history: SearchHistoryItem[];
}

interface SearchHistoryItem {
  id: number;
  query: string;
  response: string;
  timestamp: Date;
}

export const useSearch = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    response: '',
    loading: false,
    error: null,
    history: []
  });

  const performSearch = useCallback(async (query: string) => {
    setState(prev => ({
      ...prev,
      query,
      loading: true,
      error: null,
      response: ''
    }));

    try {
      const response = await geminiService.searchPortfolio(query);
      
      const historyItem: SearchHistoryItem = {
        id: Date.now(),
        query,
        response,
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        response,
        loading: false,
        history: [historyItem, ...prev.history.slice(0, 9)] // Keep last 10 searches
      }));

      // Save to localStorage
      const existingHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newHistory = [historyItem, ...existingHistory.slice(0, 9)];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to process your query. Please try again.',
        response: ''
      }));
    }
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
    localStorage.removeItem('searchHistory');
  }, []);

  const resetSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      query: '',
      response: '',
      error: null
    }));
  }, []);

  return {
    ...state,
    performSearch,
    clearHistory,
    resetSearch
  };
};
