import { useState } from "react";
import "./App.css";

export default function App() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tipp = (bill * (percentage1 + percentage2)) / 2 / 100;

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="App">
      <Bill bill={bill} setBill={setBill} />
      <CustomerRating percentage={percentage1} onSelect={setPercentage1}>
        How much did you like our service{" "}
      </CustomerRating>
      <CustomerRating percentage={percentage2} onSelect={setPercentage2}>
        How much did your friend like our service
      </CustomerRating>
      {bill > 0 && (
        <>
          <Output bill={bill} setBill={setBill} tipp={tipp} />
          <Reset bill={bill} setBill={setBill} onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          setBill(Number(e.target.value));
        }}
      />
    </div>
  );
}

function CustomerRating({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">Select a rating</option>
        <option value="5">was good (5%)</option>
        <option value="10">was very good (10%)</option>
        <option value="15">was excellent (15%)</option>
      </select>
    </div>
  );
}
function Output({ bill, setBill, tipp }) {
  if (isNaN(bill) || isNaN(tipp)) {
    return <h2>Error: Invalid input values</h2>;
  }

  const total = bill + tipp;
  return (
    <h2>
      You pay ${total} (${bill} + ${tipp} tip)
    </h2>
  );
}

function Reset({ bill, tipp, onReset }) {
  return (
    <button type="reset" onClick={onReset}>
      Reset
    </button>
  );
}
