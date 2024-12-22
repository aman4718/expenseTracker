import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExpenseBarChart = ({ walletBalance }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const storedExpenseData = JSON.parse(localStorage.getItem("expenses")) || [];
    
    // Calculate total expenses
    const calculatedTotalExpenses = storedExpenseData.reduce((total, expense) => total + expense.amount, 0);
    
    // Set the total expenses
    setTotalExpenses(calculatedTotalExpenses);
    
    // Fetch wallet balance from localStorage and parse it as a number
    const walletBalanceFromStorage = parseFloat(localStorage.getItem("WalletBalance")) || 0;
    setTotalBalance(walletBalanceFromStorage); // Set the parsed value
  }, []); // Run once on component mount

  // Data for the bar chart
  const data = [
    { name: "Wallet Balance", value: totalBalance },
    { name: "Total Expenses", value: totalExpenses },
  ];

  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
