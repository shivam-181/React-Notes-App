import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '../components/NoteCard';

describe('NoteCard Component', () => {
  const mockNote = {
    id: '123',
    title: 'Test Note',
    content: 'This is a test content',
    priority: 'high',
    date: '11/26/2025'
  };

  const mockDelete = jest.fn();
  const mockEdit = jest.fn();

  it('renders note content correctly', () => {
    render(<NoteCard item={mockNote} onDelete={mockDelete} onEdit={mockEdit} />);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test content')).toBeInTheDocument();
    expect(screen.getByText('11/26/2025')).toBeInTheDocument();
  });

  it('calls delete handler when trash icon is clicked', () => {
    render(<NoteCard item={mockNote} onDelete={mockDelete} onEdit={mockEdit} />);
    
    // Find the delete button (trash icon)
    // Since we used react-feather, we might need to look for the button wrapping it
    // In our implementation, it's the second button in the footer
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(mockDelete).toHaveBeenCalledWith('123');
  });
});
