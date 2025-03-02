import { z } from 'zod';

// Define API response schemas based on actual API

// Books list response
export const BooksListResponseSchema = z.object({
  books: z.array(z.string()),
  status: z.string()
});

// Book details response
export const BookDetailsResponseSchema = z.object({
  book_name: z.string(),
  status: z.string(),
  word_count: z.number(),
  words: z.array(z.string())
});

// Define the schema for vocabulary notebook data
export const VocabularyNotebookSchema = z.object({
  id: z.string(),
  name: z.string()
});

export type VocabularyNotebook = z.infer<typeof VocabularyNotebookSchema>;

// Define the schema for vocabulary word
export const VocabularyWordSchema = z.string();

export type VocabularyWord = z.infer<typeof VocabularyWordSchema>;

// Base API URL - using Vite proxy to avoid CORS issues
const API_BASE_URL = '/api';

// Simulate API calls with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility function to handle API errors
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  throw new Error(error instanceof Error ? error.message : 'Unknown API error');
};

// API service for vocabulary notebooks
export const VocabularyService = {
  // Get all vocabulary notebooks
  getVocabularyNotebooks: async (): Promise<VocabularyNotebook[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const parsedData = BooksListResponseSchema.parse(data);
      
      // Transform the API response to match our VocabularyNotebook type
      return parsedData.books.map(bookName => ({
        id: bookName, // Use the book name as ID
        name: bookName
      }));
    } catch (error) {
      handleApiError(error);
      return [];
    }
  },

  // Get a specific vocabulary notebook by ID
  getVocabularyNotebook: async (id: string): Promise<VocabularyNotebook | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const parsedData = BookDetailsResponseSchema.parse(data);
      
      // Return notebook details
      return {
        id: parsedData.book_name,
        name: parsedData.book_name
      };
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  // Get vocabulary words for a specific notebook
  getVocabularyWords: async (notebookId: string): Promise<VocabularyWord[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${notebookId}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const parsedData = BookDetailsResponseSchema.parse(data);
      
      // Return the words array
      return parsedData.words;
    } catch (error) {
      handleApiError(error);
      return [];
    }
  },
  
  // Get book details including word count
  getBookDetails: async (notebookId: string): Promise<BookDetailsResponseSchema | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${notebookId}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return BookDetailsResponseSchema.parse(data);
    } catch (error) {
      handleApiError(error);
      return null;
    }
  }
};
