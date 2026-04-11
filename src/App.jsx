import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  return (
    <div className="container">
      <h1>Hello World! 🚀</h1>
      <p className="subtitle">Licznik kliknięć</p>
      <p className="info">✨ Zmiany synchronizują się z GitHub! ✨</p>

      <div className="counter">
        <button
          onClick={() => {
            setCount(count - 1);
            setClicks(clicks + 1);
          }}
          className="button"
        >
          ➖
        </button>

        <span className="count">{count}</span>

        <button
          onClick={() => {
            setCount(count + 1);
            setClicks(clicks + 1);
          }}
          className="button"
        >
          ➕
        </button>
      </div>

      <p className="clicks">Łącznie kliknięć: {clicks}</p>

      <button
        onClick={() => setCount(0)}
        className="resetButton"
      >
        Zeruj
      </button>
    </div>
  );
}

export default App;
