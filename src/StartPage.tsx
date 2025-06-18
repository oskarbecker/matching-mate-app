import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        💕 Matching-App
      </h1>

      <div
        style={{
          background: '#ffb6c1',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
          Willkommen zur Matching-Bewertung!
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
          Finde heraus, wie gut ihr zusammenpasst! Bewertet euch gegenseitig und erhaltet euer persönliches Matching-Ergebnis.
        </p>
      </div>

      <button
        onClick={() => navigate('/bewertung-mann')}
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
        🚀 Jetzt starten
      </button>
    </div>
  );
}