import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return <Chat token={token} />;
}

export default App;
