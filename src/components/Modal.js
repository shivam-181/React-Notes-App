import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather';
import { Button } from './Button';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Lighter overlay */
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Stronger shadow for depth */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  background: #f1f5f9; /* Slate 100 */
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: 10px;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: #fff;
    box-shadow: 0 0 0 2px var(--accent-glow);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: #f1f5f9; /* Slate 100 */
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: 10px;
  color: var(--text-primary);
  margin-bottom: 1rem;
  min-height: 150px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: #fff;
    box-shadow: 0 0 0 2px var(--accent-glow);
  }
`;

const Select = styled.select`
  width: 100%;
  background: #f1f5f9; /* Slate 100 */
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: 10px;
  color: var(--text-primary);
  margin-bottom: 2rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: #fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Modal = ({ show, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setPriority(initialData.priority);
    } else {
      setTitle('');
      setContent('');
      setPriority('normal');
    }
  }, [initialData, show]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    
    onSave({
      title,
      content,
      priority,
      date: new Date().toLocaleDateString(),
      background: '#fff', 
      forground: '#000'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <Header>
              <Title>{initialData ? 'Edit Note' : 'New Note'}</Title>
              <Button variant="outline" onClick={onClose} style={{ padding: '0.5rem' }}>
                <X size={20} />
              </Button>
            </Header>
            
            <Input 
              placeholder="Note Title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
            
            <TextArea 
              placeholder="Write your thoughts..." 
              value={content} 
              onChange={e => setContent(e.target.value)} 
            />
            
            <Select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
            </Select>

            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {initialData ? 'Update Note' : 'Create Note'}
              </Button>
            </ButtonGroup>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
