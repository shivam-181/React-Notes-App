import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  background-image: url(${process.env.PUBLIC_URL + '/bgpattern.jpg'});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
`;

const Navbar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8); /* White glassmorphism */
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Subtle shadow */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--accent-primary), #8b5cf6); /* Blue to Purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  cursor: pointer;
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Layout = ({ children, navActions }) => {
  return (
    <LayoutContainer>
      <Navbar
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>SyncNotes</Logo>
        <NavActions>{navActions}</NavActions>
      </Navbar>
      <main style={{ padding: '2rem', flex: 1 }}>
        {children}
      </main>
      <Footer>
        Developed by <a href="https://github.com/shivam-181" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textDecoration: 'none' }}>Shivam Kumar</a>
      </Footer>
    </LayoutContainer>
  );
};

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  border-top: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
`;

export default Layout;
