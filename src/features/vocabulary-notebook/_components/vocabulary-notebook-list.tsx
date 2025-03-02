import { useQuery } from '@tanstack/react-query';
import { VocabularyNotebook, VocabularyService } from '../api/vocabulary-service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function VocabularyNotebookList() {
  const navigate = useNavigate();
  
  // Fetch vocabulary notebooks using React Query
  const { data: notebooks, isLoading, error } = useQuery({
    queryKey: ['vocabularyNotebooks'],
    queryFn: VocabularyService.getVocabularyNotebooks,
  });

  // Handle click on a vocabulary notebook item
  const handleNotebookClick = (notebookId: string) => {
    navigate(`/vocabulary-notebooks/${notebookId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Failed to load vocabulary notebooks.</span>
      </div>
    );
  }

  if (!notebooks || notebooks.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-700">No vocabulary notebooks found</h3>
        <p className="text-gray-500 mt-2">Create your first vocabulary notebook to get started</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Vocabulary Notebooks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notebooks.map((notebook: VocabularyNotebook) => (
          <div 
            key={notebook.id}
            onClick={() => handleNotebookClick(notebook.id)}
            className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-5 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800">{notebook.name}</h3>
            <p className="text-sm text-gray-500 mt-2">Click to view details</p>
          </div>
        ))}
      </div>
    </div>
  );
}
