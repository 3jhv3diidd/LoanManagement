import React, { useState } from "react";

const loanOptions = [
  { label: "Home Loan", value: "home", defaultRate: 8.5, defaultTerm: 20 },
  { label: "Vehicle Loan", value: "vehicle", defaultRate: 9.5, defaultTerm: 5 },
  { label: "Personal Loan", value: "personal", defaultRate: 12.5, defaultTerm: 3 },
  { label: "Business Loan", value: "business", defaultRate: 11.0, defaultTerm: 7 },
];

function calculateEMI(P, r, n) {
  r = r / 12 / 100;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const LoanCalculator = ({ loanType }) => {
  const selected = loanOptions.find(opt => opt.label === loanType) || loanOptions[0];
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(selected.defaultRate);
  const [term, setTerm] = useState(selected.defaultTerm);
  const [result, setResult] = useState(null);

  const handleClear = () => {
    setAmount("");
    setRate(selected.defaultRate);
    setTerm(selected.defaultTerm);
    setResult(null);
  };

  const handleCalculate = () => {
    const P = parseFloat(amount);
    const r = parseFloat(rate);
    const n = parseInt(term) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setResult({ error: "Please enter valid values." });
      return;
    }
    const monthlyPayment = calculateEMI(P, r, n);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  return (
    <div className="loan-calculator p-4 rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{selected.label} Calculator</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Loan Amount</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Interest Rate (%)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={rate}
          onChange={e => setRate(e.target.value)}
          placeholder="Interest rate"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Loan Term (years)</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Loan term in years"
        />
      </div>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          {result.error ? (
            <span className="text-red-500">{result.error}</span>
          ) : (
            <>
              <div className="mb-2">
                <span className="font-semibold">Monthly Payment:</span> ₹{result.monthlyPayment}
              </div>
              <div>
                <span className="font-semibold">Total Interest Paid:</span> ₹{result.totalInterest}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;