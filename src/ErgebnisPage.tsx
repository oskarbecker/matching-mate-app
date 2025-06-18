import { useNavigate } from 'react-router-dom';

type Question = {
  id: string;
  text: string;
  points: number;
};

type Props = {
  mannAnswers: Record<string, boolean>;
  frauAnswers: Record<string, boolean>;
  reset: () => void;
  questionsMann: Question[];
  questionsFrau: Question[];
};

export default function ErgebnisPage({
  mannAnswers,
  frauAnswers,
  reset,
  questionsMann,
  questionsFrau,
}: Props) {
  const navigate = useNavigate();

  const calcScore = (
    answers: Record<string, boolean>,
    questions: Question[]
  ) => {
    const hotnessCore = questions.slice(0, 7);
    const hotnessRest = questions.slice(7, 12);
    const others = questions.slice(12);

    const coreComplete = hotnessCore.every((q) => answers[q.id]);

    const hotness = coreComplete
      ? [...hotnessCore, ...hotnessRest].reduce(
          (sum, q) => sum + (answers[q.id] ? q.points : 0),
          0
        )
      : 0;

    const values = others.reduce(
      (sum, q) => sum + (answers[q.id] ? q.points : 0),
      0
    );

    const total = hotness + values;
    return { total, hotness, values };
  };

  const mann = calcScore(mannAnswers, questionsMann);
  const frau = calcScore(frauAnswers, questionsFrau);

  const diff = Math.abs(mann.total - frau.total);
  const max = Math.max(
    questionsMann.reduce((s, q) => s + q.points, 0),
    questionsFrau.reduce((s, q) => s + q.points, 0)
  );

  const matchPercent =
    mann.total === 0 || frau.total === 0
      ? 0
      : Math.round(100 - (diff / max) * 100);

  const matchColor = matchPercent >= 80 ? 'green' : matchPercent >= 50 ? 'orange' : 'red';
  const heart = matchPercent >= 80 ? '❤️' : matchPercent >= 50 ? '💛' : '💔';

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Matching-Übereinstimmung</h1>
      <div style={{ fontSize: '3rem', margin: '1rem' }}>{heart}</div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{matchPercent}%</h2>

      <div style={{
        width: '100%',
        height: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <div
          style={{
            width: `${matchPercent}%`,
            backgroundColor: matchColor,
            height: '100%',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
        <p><strong>Punkte Mann:</strong> {mann.total} (Hotness: {mann.hotness} | Werte: {mann.values})</p>
        <p><strong>Punkte Frau:</strong> {frau.total} (Hotness: {frau.hotness} | Werte: {frau.values})</p>
      </div>

      <button
        onClick={() => {
          reset();
          navigate('/');
        }}
        style={{
          marginTop: '2rem',
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Zurück zur Startseite
      </button>
    </div>
  );
}