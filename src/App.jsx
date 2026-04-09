import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h1>Hello World! 🚀</h1>
      <p style={styles.subtitle}>Licznik kliknięć</p>

      <div style={styles.counter}>
        <button
          onClick={() => setCount(count - 1)}
          style={styles.button}
        >
          ➖
        </button>

        <span style={styles.count}>{count}</span>

        <button
          onClick={() => setCount(count + 1)}
          style={styles.button}
        >
          ➕
        </button>
      </div>

      <button
        onClick={() => setCount(0)}
        style={styles.resetButton}
      >
        Resetuj
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "20px",
    opacity: 0.9,
  },
  counter: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  button: {
    fontSize: "24px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  count: {
    fontSize: "48px",
    fontWeight: "bold",
    minWidth: "80px",
  },
  resetButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "2px solid white",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default App;
