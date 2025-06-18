import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionsMann, questionsFrau, type Question } from './data/questions';

type Props = {
  mannAnswers: Record<string, boolean>;
  frauAnswers: Record<string, boolean>;
  reset: () => void;
};

const ErgebnisPage: React.FC<Props> = ({
  mannAnswers,
  frauAnswers,
  reset,
}) => {
  const navigate = useNavigate();
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const getScore = (answers: Record<string, boolean>, questions: Question[]) => {
    const core = questions.slice(0, 7);
    const rest = questions.slice(7, 12);
    const others = questions.slice(12);

    const hasAllCore = core.every((q) => answers[q.id]);

    const hotness = hasAllCore
      ? [...core, ...rest].reduce((sum, q) => sum + (answers[q.id] ? q.points : 0), 0)
      : 0;

    const values = others.reduce((sum, q) => sum + (answers[q.id] ? q.points : 0), 0);

    const total = hotness + values;
    return { hotness, values, total };
  };

  const resultM = getScore(mannAnswers, questionsMann);
  const resultF = getScore(frauAnswers, questionsFrau);

  const maxTotal = Math.max(
    questionsMann.reduce((s, q) => s + q.points, 0),
    questionsFrau.reduce((s, q) => s + q.points, 0)
  );

  const difference = Math.abs(resultM.total - resultF.total);
  const matchPercent =
    resultM.total === 0 || resultF.total === 0 ? 0 : Math.round(100 - (difference / maxTotal) * 100);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= matchPercent) {
        clearInterval(interval);
        setAnimatedPercent(matchPercent);
      } else {
        setAnimatedPercent(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [matchPercent]);

  const getEmotion = () => {
    if (matchPercent >= 80) return { emoji: '💕', message: 'Ihr passt perfekt zusammen!', color: '#ffb6c1' };
    if (matchPercent >= 50) return { emoji: '😐', message: 'Es gibt Potenzial mit etwas Feinschliff.', color: '#ffe680' };
    return { emoji: '💔', message: 'Leider keine gute Übereinstimmung.', color: '#ffd6d6' };
  };

  const { emoji, message, color } = getEmotion();

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯 Matching-Übereinstimmung</h1>

      <div
        style={{
          background: color,
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontSize: '4rem' }}>{emoji}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
          {animatedPercent}%
        </div>
        <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{message}</div>

        {/* Balken */}
        <div
          style={{
            height: '20px',
            width: '100%',
            background: '#eee',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${animatedPercent}%`,
              background: '#ff69b4',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          reset();
          navigate('/');
        }}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          background: '#ff69b4',
          color: '#fff',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'background 0.3s',
        }}
      >
        🔄 Zurück zur Startseite
      </button>
    </div>
  );
};

export default ErgebnisPage;