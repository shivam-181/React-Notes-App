import { renderHook, act } from '@testing-library/react';
import { useNotes } from './useNotes';

// Mock Firebase hook since we want to test the logic, not the backend connection
jest.mock('./useFirestore', () => ({
  useFirestore: () => ({
    data: [],
    loading: false,
    error: new Error("Firebase disabled for testing"), // Force fallback to local storage
    addItem: jest.fn(),
    deleteItem: jest.fn(),
    updateItem: jest.fn(),
  }),
}));

describe('useNotes Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty notes', () => {
    const { result } = renderHook(() => useNotes());
    expect(result.current.notes).toEqual([]);
  });

  it('should add a note to local storage', async () => {
    const { result } = renderHook(() => useNotes());
    
    const newNote = { title: 'Test', content: 'Content', priority: 'normal' };
    
    await act(async () => {
      await result.current.addNote(newNote);
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].title).toBe('Test');
    expect(JSON.parse(localStorage.getItem('myNotes'))).toHaveLength(1);
  });

  it('should delete a note', async () => {
    const { result } = renderHook(() => useNotes());
    
    await act(async () => {
      await result.current.addNote({ title: 'To Delete', content: '...', priority: 'normal' });
    });

    const idToDelete = result.current.notes[0].id;

    await act(async () => {
      await result.current.deleteNote(idToDelete);
    });

    expect(result.current.notes).toHaveLength(0);
  });
});
