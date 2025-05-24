import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { GlobalStyle } from '../../styles/GlobalStyles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <LayoutContainer>
        <Header />
        <MainContent>
          {children}
        </MainContent>
        <Footer />
      </LayoutContainer>
    </>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

export default Layout;
