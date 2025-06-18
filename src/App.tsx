import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import BewertungPage from './BewertungPage';
import ErgebnisPage from './ErgebnisPage';
import { questionsMann, questionsFrau } from './data/questions';

export default function App() {
  const [mannAnswers, setMannAnswers] = useState<Record<string, boolean>>({});
  const [frauAnswers, setFrauAnswers] = useState<Record<string, boolean>>({});

  const reset = () => {
    setMannAnswers({});
    setFrauAnswers({});
  };

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route
        path="/bewertung-mann"
        element={
          <BewertungPage
            role="Mann"
            questions={questionsMann}
            answers={mannAnswers}
            setAnswers={setMannAnswers}
            nextRoute="/bewertung-frau"
          />
        }
      />
      <Route
        path="/bewertung-frau"
        element={
          <BewertungPage
            role="Frau"
            questions={questionsFrau}
            answers={frauAnswers}
            setAnswers={setFrauAnswers}
            nextRoute="/ergebnis"
          />
        }
      />
      <Route
        path="/ergebnis"
        element={
          <ErgebnisPage
            mannAnswers={mannAnswers}
            frauAnswers={frauAnswers}
            reset={reset}
          />
        }
      />
    </Routes>
  );
}