import { useState, useEffect } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/api/expenses')
    .then((res) => res.json())
    .then(setExpenses);
  }, []);

  const addExpense = async () => {
    const res = await fetch('http://localhost:3000/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        amount: Number(amount)
      }),
    });

    const expense = await res.json();
    setExpenses([...expenses, expense]);
    setTitle('');
    setAmount('');
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <input 
        placeholder="Title"
        value={title}
        onChange={(e) => 
          setTitle(e.target.value)
        }
      />
      <input 
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value) 
        }
      />
      <button onClick={addExpense}>Add</button>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>{e.title}: ${e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;