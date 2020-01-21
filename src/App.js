import React from 'react';
import logo from './logo.svg';
import './App.css';

import CustomTags from './CustomTags';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Tags Demo</h3>
      </header>
      <main className="App-container">
        <CustomTags />
      </main>
    </div>
  );
}

export default App;
