import { useQuery } from '@tanstack/react-query';
import { VocabularyNotebook, VocabularyEntry, VocabularyService } from '../api/vocabulary-service';
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

  // Fetch vocabulary entries for the notebook
  const { 
    data: entries, 
    isLoading: entriesLoading, 
    error: entriesError 
  } = useQuery({
    queryKey: ['vocabularyEntries', notebookId],
    queryFn: () => VocabularyService.getVocabularyEntries(notebookId || ''),
    enabled: !!notebookId,
  });

  const isLoading = notebookLoading || entriesLoading;
  const error = notebookError || entriesError;

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
        <h3 className="text-xl font-semibold mb-4">Words in this notebook</h3>
        
        {!entries || entries.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">No words in this vocabulary notebook yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Definition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry: VocabularyEntry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entry.word}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{entry.definition}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{entry.example}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
