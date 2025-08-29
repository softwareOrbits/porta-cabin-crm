import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference and apply to document
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 grid grid-cols-[auto_1fr]">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
      />
      
      <div className="flex flex-col min-w-0 overflow-hidden">
        <Header title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}