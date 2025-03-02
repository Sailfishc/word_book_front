import { useQuery } from '@tanstack/react-query';
import { VocabularyNotebook, VocabularyWord, VocabularyService, BookDetailsResponseSchema } from '../api/vocabulary-service';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function VocabularyNotebookDetails() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const navigate = useNavigate();
  
  // Handle back button click
  const handleBackClick = () => {
    navigate('/vocabulary-notebooks');
  };
  
  // Fetch vocabulary notebook details
  const { 
    data: notebook, 
    isLoading: notebookLoading, 
    error: notebookError 
  } = useQuery({
    queryKey: ['vocabularyNotebook', notebookId],
    queryFn: () => VocabularyService.getVocabularyNotebook(notebookId || ''),
    enabled: !!notebookId,
  });

  // Fetch book details including words
  const { 
    data: bookDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useQuery({
    queryKey: ['bookDetails', notebookId],
    queryFn: () => VocabularyService.getBookDetails(notebookId || ''),
    enabled: !!notebookId,
  });

  const isLoading = notebookLoading || detailsLoading;
  const error = notebookError || detailsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !notebook) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Failed to load vocabulary notebook details.</span>
        <div className="mt-4">
          <button
            onClick={handleBackClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Back to Notebooks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackClick}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">{notebook.name}</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Words in this notebook</h3>
          {bookDetails && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {bookDetails.word_count} words
            </div>
          )}
        </div>
        
        {!bookDetails || !bookDetails.words || bookDetails.words.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">No words in this vocabulary notebook yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookDetails.words.map((word: string, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors">
                <p className="font-medium text-gray-800">{word}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
