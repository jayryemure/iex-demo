import React from 'react';
import './App.css';
import StockDetails from './StockDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        IEX Demo       
      </header>
      <div className="App-body">
        <StockDetails />
      </div>
    </div>
  );
}

export default App;
