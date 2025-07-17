import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import WhatsAppHomePage from './pages/WhatsAppHomePage';
import ChatgPage from './pages/ChatgPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whats-app" element={<WhatsAppHomePage />} />
        <Route path="/whats-app/chat/${chat.id}" element={<ChatgPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
