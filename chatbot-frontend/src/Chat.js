import React, { useState, useRef, useEffect } from 'react';

export default function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');

    const res = await fetch('https://chat-be-aiws-crh5c5chdxewhtg6.canadacentral-01.azurewebsites.net/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages(msgs => [...msgs, { sender: 'bot', text: data.reply }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1048px',
        height: '80vh',
        maxHeight: '700px',
        minHeight: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#667eea' }}>Alejo Chatbot</h2>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          background: '#f7f8fa'
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '0.5rem'
              }}
            >
              <div style={{
                background: msg.sender === 'user'
                  ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                  : '#e2e8f0',
                color: msg.sender === 'user' ? '#fff' : '#333',
                padding: '0.75rem 1rem',
                borderRadius: msg.sender === 'user'
                  ? '16px 16px 4px 16px'
                  : '16px 16px 16px 4px',
                maxWidth: '70%',
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(102,126,234,0.08)'
              }}>
                <b style={{ fontWeight: 500, fontSize: '0.95em' }}>
                  {msg.sender === 'user' ? 'You' : 'AlejoBot'}
                </b>
                <div style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}