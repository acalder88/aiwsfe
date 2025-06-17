import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://chat-be-aiws-crh5c5chdxewhtg6.canadacentral-01.azurewebsites.net/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      onLogin(data.token);
    } else {
      setError('Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#667eea' }}>Alejo Chatbot Login</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: error ? '0.5rem' : 0
          }}
        >
          Login
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
}
