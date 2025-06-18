import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Matching-App</h1>
      <button onClick={() => navigate('/bewertung')}>Jetzt starten</button>

      <Routes>
        <Route path="/bewertung" element={<p>Hier kommt die Bewertung</p>} />
      </Routes>
    </div>
  );
}
