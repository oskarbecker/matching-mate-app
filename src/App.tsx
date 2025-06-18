import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ErgebnisPage from './ErgebnisPage';

type Question = {
  id: string;
  text: string;
  points: number;
};

const questionsMann: Question[] = [
  { id: 'a', text: 'Volle Haare', points: 2.5 },
  { id: 'b', text: 'Athletischer Körperbau (inkl. Knackarsch)', points: 2.5 },
  { id: 'c', text: 'Größer als begehrte Frau(en)', points: 2.5 },
  { id: 'd', text: 'Markanter Unterkiefer', points: 2.5 },
  { id: 'e', text: 'Markantes Kinn', points: 2.5 },
  { id: 'f', text: 'Gepflegtes Äußeres (keine Kosmetik, keine starke Körperbehaarung)', points: 2.5 },
  { id: 'g', text: 'Styling (schick, z. B. gutsitzender Anzug)', points: 2.5 },
  { id: 'h', text: 'Volle, sinnliche Lippen', points: 2.5 },
  { id: 'i', text: 'Nicht zu kurze Beine', points: 2.5 },
  { id: 'j', text: 'Kräftige Hände', points: 2.5 },
  { id: 'k', text: 'V-Form des Oberkörpers', points: 2.5 },
  { id: 'l', text: 'Eher kleine Augen (bestenfalls blau)', points: 2.5 },
  { id: 'm', text: 'Finanzielle Unabhängigkeit – reich oder vermögend', points: 10 },
  { id: 'n', text: 'Sozialer Status – beliebt bei Frau und Mann', points: 6 },
  { id: 'o', text: 'Selbstbewusstsein – besonders im Auftreten & Bett', points: 5 },
  { id: 'p', text: 'Intelligenz – Witz & Bildung', points: 4 },
  { id: 'q', text: 'Konversationsfähigkeit – Small Talk (aber keine Geschwätzigkeit)', points: 2 },
  { id: 'r', text: 'Aufmerksamkeit – interessiert & präsent', points: 2 },
  { id: 's', text: 'Alter – älter als die begehrte Frau', points: 1 },
];

const questionsFrau: Question[] = [
  { id: 'a', text: 'Natürlichkeit (Kosmetik, jedoch nicht zu viel)', points: 2.5 },
  { id: 'b', text: 'Volle Haare', points: 2.5 },
  { id: 'c', text: 'Große Augen', points: 2.5 },
  { id: 'd', text: 'Volle, sinnliche Lippen', points: 2.5 },
  { id: 'e', text: 'Schmaleres Kinn', points: 2.5 },
  { id: 'f', text: 'Feste, wohlgeformte Brüste und Knackarsch', points: 2.5 },
  { id: 'g', text: 'Schlanke Taille', points: 2.5 },
  { id: 'h', text: 'Lange Beine', points: 2.5 },
  { id: 'i', text: 'Keine Falten', points: 2.5 },
  { id: 'j', text: 'Wenig Fett (aber nicht magersüchtig)', points: 2.5 },
  { id: 'k', text: 'Kleiner als der begehrte Mann', points: 2.5 },
  { id: 'l', text: 'Styling (attraktiver Look, jedoch nicht ordinär, billig)', points: 2.5 },
  { id: 'm', text: 'Eigenständigkeit – eigene Ziele, gebildet, selbstständig', points: 2 },
  { id: 'n', text: 'Nicht anecken – lässt dem Mann seine Ruhe', points: 5 },
  { id: 'o', text: 'Lust auf Sex – insbesondere zu Beginn der Beziehung', points: 7 },
  { id: 'p', text: 'Konversationsfähigkeit – Small Talk führen', points: 3 },
  { id: 'r', text: 'Keine Geschwätzigkeit – kann auch zuhören', points: 4 },
  { id: 's', text: 'Gleichgerichtete Interessen – gemeinsame Hobbys etc.', points: 1 },
  { id: 't', text: 'Jüngeres Alter – jünger als der begehrte Mann', points: 8 },
];

function StartPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Matching-App</h1>
      <button onClick={() => navigate('/bewertung-mann')}>Jetzt starten</button>
    </div>
  );
}

function BewertungPage({
  role,
  questions,
  answers,
  setAnswers,
  nextRoute,
}: {
  role: string;
  questions: Question[];
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  nextRoute: string;
}) {
  const navigate = useNavigate();
  const hotnessCore = questions.slice(0, 7);
  const hotnessRest = questions.slice(7, 12);
  const others = questions.slice(12);

  const toggle = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bewertung: {role}</h2>

      <h3>Hotness-Faktor</h3>
      {[...hotnessCore, ...hotnessRest].map((q) => (
        <div key={q.id}>
          <label>
            <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} /> {q.text} ({q.points} P)
          </label>
        </div>
      ))}

      <h3>Sonstige Werte</h3>
      {others.map((q) => (
        <div key={q.id}>
          <label>
            <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} /> {q.text} ({q.points} P)
          </label>
        </div>
      ))}

      <button style={{ marginTop: '1rem' }} onClick={() => navigate(nextRoute)}>
        Weiter
      </button>
    </div>
  );
}

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
            questionsMann={questionsMann}
            questionsFrau={questionsFrau}
          />
        }
      />
    </Routes>
  );
}