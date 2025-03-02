import React from 'react';
import { VocabularyNotebookList } from '../_components/vocabulary-notebook-list';
import { Helmet } from 'react-helmet';

const VocabularyNotebookListPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Vocabulary Notebooks</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <VocabularyNotebookList />
      </div>
    </>
  );
};

export default VocabularyNotebookListPage;
