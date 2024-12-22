import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const ExpensePieChart = ({ walletBalance }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  // Static values for initial testing
  //const initialWalletBalance = totalBalance; // Static wallet balance value
  //const initialTotalExpenses = 2000; // Static total expenses value

  // Simulating the logic for testing (initial render with static values)
  useEffect(() => {
    //debugger;
    const storedExpenseData = JSON.parse(localStorage.getItem("expenses")) || [];
    
    // Calculate total expenses
    const calculatedTotalExpenses = storedExpenseData.reduce((total, expense) => total + expense.amount, 0);
    
    // Set the total expenses
    setTotalExpenses(calculatedTotalExpenses);
    setTotalBalance(parseFloat(localStorage.getItem("WalletBalance")))
  }, []); // Run once on component mount

  // Data for the pie chart
  const data = [
    { name: "Wallet Balance", value: totalBalance },
    { name: "Total Expenses", value: totalExpenses },
  ];

  // Colors for each slice
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div style={{ width: "60%", height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
