import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WaitlistPage from './components/WaitlistPage';
import SharePage from './components/SharePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
        <Routes>
          <Route path="/" element={<WaitlistPage />} />
          <Route path="/share/:code" element={<SharePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;