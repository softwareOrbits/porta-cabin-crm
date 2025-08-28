import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuotationsList from './QuotationsList';
import QuotationForm from './QuotationForm';
import QuotationDetails from './QuotationDetails';

const QuotationsModule: React.FC = () => {
  return (
    <Routes>
      <Route index element={<QuotationsList />} />
      <Route path="new" element={<QuotationForm />} />
      <Route path=":id" element={<QuotationDetails />} />
      <Route path=":id/edit" element={<QuotationForm />} />
    </Routes>
  );
};

export default QuotationsModule;