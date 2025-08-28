import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './pages/UserForm';
import UserList from './pages/UserList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;