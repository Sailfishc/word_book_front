import { z } from 'zod';

// Define the schema for vocabulary notebook data
export const VocabularyNotebookSchema = z.object({
  id: z.string(),
  name: z.string()
});

export type VocabularyNotebook = z.infer<typeof VocabularyNotebookSchema>;

// Define the schema for vocabulary entry data
export const VocabularyEntrySchema = z.object({
  id: z.string(),
  word: z.string(),
  definition: z.string(),
  example: z.string().optional(),
  notebookId: z.string()
});

export type VocabularyEntry = z.infer<typeof VocabularyEntrySchema>;

// Mock vocabulary notebooks data for development
const mockVocabularyNotebooks: VocabularyNotebook[] = [
  { id: '1', name: 'English Vocabulary' },
  { id: '2', name: 'Technical Terms' },
  { id: '3', name: 'Business Vocabulary' },
  { id: '4', name: 'Academic Words' },
  { id: '5', name: 'Travel Phrases' }
];

// Mock vocabulary entries for development
const mockVocabularyEntries: Record<string, VocabularyEntry[]> = {
  '1': [
    { id: '101', word: 'Ephemeral', definition: 'Lasting for a very short time', example: 'The ephemeral beauty of cherry blossoms', notebookId: '1' },
    { id: '102', word: 'Ubiquitous', definition: 'Present everywhere', example: 'Smartphones have become ubiquitous in modern society', notebookId: '1' },
    { id: '103', word: 'Serendipity', definition: 'Finding something good without looking for it', example: 'Our meeting was pure serendipity', notebookId: '1' }
  ],
  '2': [
    { id: '201', word: 'API', definition: 'Application Programming Interface', example: 'The API allows different software to communicate', notebookId: '2' },
    { id: '202', word: 'Middleware', definition: 'Software that acts as a bridge between systems', example: 'The middleware processes requests between the frontend and database', notebookId: '2' }
  ],
  '3': [
    { id: '301', word: 'Acquisition', definition: 'The purchase of one company by another', example: 'The acquisition was completed last quarter', notebookId: '3' },
    { id: '302', word: 'Diversification', definition: 'The practice of varying products or investments to spread risk', example: 'Portfolio diversification is important for minimizing risk', notebookId: '3' }
  ],
  '4': [
    { id: '401', word: 'Hypothesis', definition: 'A proposed explanation for a phenomenon', example: 'The scientist developed a hypothesis to explain the unexpected results', notebookId: '4' },
    { id: '402', word: 'Methodology', definition: 'A system of methods used in a field', example: 'The research paper outlined the methodology used in the study', notebookId: '4' }
  ],
  '5': [
    { id: '501', word: 'Itinerary', definition: 'A planned route or journey', example: 'Our travel itinerary includes three cities in seven days', notebookId: '5' },
    { id: '502', word: 'Excursion', definition: 'A short journey or trip', example: 'We took a day excursion to the nearby island', notebookId: '5' }
  ]
};

// Simulate API calls with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service for vocabulary notebooks
export const VocabularyService = {
  // Get all vocabulary notebooks
  getVocabularyNotebooks: async (): Promise<VocabularyNotebook[]> => {
    // Simulate API call delay
    await delay(500);
    
    // Return mock data
    return mockVocabularyNotebooks;
  },

  // Get a specific vocabulary notebook by ID
  getVocabularyNotebook: async (id: string): Promise<VocabularyNotebook | null> => {
    await delay(300);
    
    const notebook = mockVocabularyNotebooks.find(notebook => notebook.id === id);
    return notebook || null;
  },

  // Get vocabulary entries for a specific notebook
  getVocabularyEntries: async (notebookId: string): Promise<VocabularyEntry[]> => {
    await delay(500);
    
    return mockVocabularyEntries[notebookId] || [];
  }
};
