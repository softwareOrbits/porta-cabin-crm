import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalesOrdersList from './SalesOrdersList';
import SalesOrderForm from './SalesOrderForm';
import SalesOrderDetails from './SalesOrderDetails';

const SalesOrdersModule: React.FC = () => {
  return (
    <Routes>
      <Route index element={<SalesOrdersList />} />
      <Route path="new" element={<SalesOrderForm />} />
      <Route path=":id" element={<SalesOrderDetails />} />
      <Route path=":id/edit" element={<SalesOrderForm />} />
    </Routes>
  );
};

export default SalesOrdersModule;