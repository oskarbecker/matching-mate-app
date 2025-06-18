import { useNavigate } from 'react-router-dom';

type Question = {
  id: string;
  text: string;
  points: number;
};

type Props = {
  role: string;
  questions: Question[];
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  nextRoute: string;
};

export default function BewertungPage({ role, questions, answers, setAnswers, nextRoute }: Props) {
  const navigate = useNavigate();

  const hotnessCore = questions.slice(0, 7);
  const hotnessRest = questions.slice(7, 12);
  const others = questions.slice(12);

  const toggle = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const roleColor = role === 'Mann' ? '#87ceeb' : '#ffb6c1';
  const roleEmoji = role === 'Mann' ? '👨' : '👩';

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          background: roleColor,
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{roleEmoji}</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>
          Bewertung: {role}
        </h1>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          Wähle die zutreffenden Eigenschaften aus
        </p>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1rem', 
          color: '#ff69b4',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🔥 Hotness-Faktor (Kern)
        </h3>
        {hotnessCore.map((q) => (
          <label
            key={q.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.8rem',
              margin: '0.5rem 0',
              background: answers[q.id] ? '#ffe6f2' : '#f9f9f9',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: answers[q.id] ? '2px solid #ff69b4' : '2px solid transparent',
            }}
          >
            <input
              type="checkbox"
              checked={!!answers[q.id]}
              onChange={() => toggle(q.id)}
              style={{
                marginRight: '0.8rem',
                transform: 'scale(1.2)',
                accentColor: '#ff69b4',
              }}
            />
            <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
            <span
              style={{
                background: '#ff69b4',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}
            >
              {q.points}P
            </span>
          </label>
        ))}
      </div>

      {hotnessRest.length > 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ 
            fontSize: '1.3rem', 
            marginBottom: '1rem', 
            color: '#ff8c00',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✨ Hotness-Faktor (Zusatz)
          </h3>
          {hotnessRest.map((q) => (
            <label
              key={q.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem',
                margin: '0.5rem 0',
                background: answers[q.id] ? '#fff4e6' : '#f9f9f9',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: answers[q.id] ? '2px solid #ff8c00' : '2px solid transparent',
              }}
            >
              <input
                type="checkbox"
                checked={!!answers[q.id]}
                onChange={() => toggle(q.id)}
                style={{
                  marginRight: '0.8rem',
                  transform: 'scale(1.2)',
                  accentColor: '#ff8c00',
                }}
              />
              <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
              <span
                style={{
                  background: '#ff8c00',
                  color: 'white',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                {q.points}P
              </span>
            </label>
          ))}
        </div>
      )}

      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1rem', 
          color: '#4169e1',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💎 Sonstige Werte
        </h3>
        {others.map((q) => (
          <label
            key={q.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.8rem',
              margin: '0.5rem 0',
              background: answers[q.id] ? '#e6f0ff' : '#f9f9f9',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: answers[q.id] ? '2px solid #4169e1' : '2px solid transparent',
            }}
          >
            <input
              type="checkbox"
              checked={!!answers[q.id]}
              onChange={() => toggle(q.id)}
              style={{
                marginRight: '0.8rem',
                transform: 'scale(1.2)',
                accentColor: '#4169e1',
              }}
            />
            <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
            <span
              style={{
                background: '#4169e1',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}
            >
              {q.points}P
            </span>
          </label>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigate(nextRoute)}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            background: '#ff69b4',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ff1493';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff69b4';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {nextRoute === '/ergebnis' ? '🎯 Ergebnis anzeigen' : '➡️ Weiter'}
        </button>
      </div>
    </div>
  );
}