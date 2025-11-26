import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { Plus, Search, Frown } from 'react-feather';
import Layout from '../components/Layout';
import NoteCard from '../components/NoteCard';
import Modal from '../components/Modal';
import { Button } from '../components/Button';
import { useNotes } from '../hooks/useNotes';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding-top: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
  
  input {
    width: 100%;
    background: #fff; /* White background */
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: 20px;
    color: var(--text-primary);
    transition: all 0.2s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }
  }

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    width: 16px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--text-secondary);
  margin-top: 5rem;
  
  svg {
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

function Home() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async (noteData) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
    } else {
      await addNote(noteData);
    }
    setEditingNote(null);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  return (
    <Layout
      navActions={
        <>
          <SearchContainer>
            <Search />
            <input 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <Button onClick={openCreate}>
            <Plus size={18} /> New Note
          </Button>
        </>
      }
    >
      {filteredNotes.length === 0 ? (
        <EmptyState>
          <Frown size={64} />
          <h2>No notes found</h2>
          <p>Create a new note to get started!</p>
        </EmptyState>
      ) : (
        <Grid>
          <AnimatePresence>
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                item={note} 
                onDelete={deleteNote}
                onEdit={openEdit}
              />
            ))}
          </AnimatePresence>
        </Grid>
      )}

      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={editingNote}
      />
    </Layout>
  );
}

export default Home;
