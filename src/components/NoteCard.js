import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Trash2, Edit2 } from 'react-feather';
import { IconButton } from './Button';

const Card = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: var(--accent-primary);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.priority === 'high' ? 'var(--danger)' : 'var(--success)'};
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const Content = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
  white-space: pre-wrap;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const DateText = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const NoteCard = ({ item, onDelete, onEdit }) => {
  return (
    <Card
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      priority={item.priority}
    >
      <Title>{item.title}</Title>
      <Content>{item.content}</Content>
      <Footer>
        <DateText>{item.date}</DateText>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton onClick={() => onEdit(item)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Edit2 size={16} />
          </IconButton>
          <IconButton onClick={() => onDelete(item.id)} whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      </Footer>
    </Card>
  );
};

export default NoteCard;
