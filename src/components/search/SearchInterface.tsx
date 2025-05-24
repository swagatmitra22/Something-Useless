import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
      };

      recognition.start();
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInputWrapper>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Ask me about my projects, skills, experience, or anything professional..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <VoiceButton
            type="button"
            onClick={startVoiceSearch}
            $isListening={isListening}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </VoiceButton>
        </SearchInputWrapper>
        <SearchButton type="submit" disabled={loading || !query.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SearchIcon = styled.div`
  padding: 0 1rem;
  color: #666;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem 0;
  font-size: 1rem;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
`;

const VoiceButton = styled.button<{ $isListening: boolean }>`
  border: none;
  background: ${props => props.$isListening ? '#ff4444' : 'transparent'};
  color: ${props => props.$isListening ? 'white' : '#666'};
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$isListening ? '#ff6666' : '#f0f0f0'};
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default SearchInterface;
