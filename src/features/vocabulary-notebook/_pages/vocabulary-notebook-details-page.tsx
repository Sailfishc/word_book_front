import React from 'react';
import { VocabularyNotebookDetails } from '../_components/vocabulary-notebook-details';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const VocabularyNotebookDetailsPage: React.FC = () => {
  const { notebookId } = useParams<{ notebookId: string }>();
  
  return (
    <>
      <Helmet>
        <title>Vocabulary Notebook Details</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <VocabularyNotebookDetails />
      </div>
    </>
  );
};

export default VocabularyNotebookDetailsPage;
