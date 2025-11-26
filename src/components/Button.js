import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
  background: ${props => props.variant === 'outline' ? 'transparent' : 'var(--accent-primary)'};
  color: ${props => props.variant === 'outline' ? 'var(--accent-primary)' : '#fff'};
  border: ${props => props.variant === 'outline' ? '1px solid var(--accent-primary)' : 'none'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: ${props => props.variant === 'outline' ? 'none' : '0 2px 4px rgba(14, 165, 233, 0.3)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'outline' ? 'none' : '0 4px 6px rgba(14, 165, 233, 0.4)'};
    background: ${props => props.variant === 'outline' ? 'rgba(14, 165, 233, 0.1)' : 'var(--accent-primary)'};
  }
`;

export const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05); /* Light hover effect */
    color: var(--text-primary);
  }
`;
