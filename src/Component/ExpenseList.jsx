import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import ExpenseBarChart from "./ExpenseBarChart";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setEditedExpense({ ...expenseToEdit });
  };

  const handleInputChange = (val, field) => {
    const { value } = val.target;
    setEditedExpense((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = (val) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === val ? { ...editedExpense, amount: parseFloat(editedExpense.amount) } : expense
      )
    );
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    const updatedExpense = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpense);
    localStorage.setItem("expenses", JSON.stringify(updatedExpense));
  };

  const styleWallet = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#2c2c2c",
    color: "white",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const tableStyle = {
    width: "60%",
    borderCollapse: "collapse",
    marginRight: "20px",
  };

  return (
    <div style={styleWallet}>
      {/* Expense Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === expense.id ? (
                  <input
                    type="text"
                    value={editedExpense.expense}
                    onChange={(e) => handleInputChange(e, 'expense')}
                  />
                ) : (
                  expense.expense
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === expense.id ? (
                  <input
                    type="number"
                    value={editedExpense.amount}
                    onChange={(e) => handleInputChange(e, 'amount')}
                  />
                ) : (
                  "₹" + expense.amount
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === expense.id ? (
                  <select
                    name="category"
                    value={editedExpense.category}
                    onChange={(e) => handleInputChange(e, 'category')}
                  >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                  </select>
                ) : (
                  expense.category
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === expense.id ? (
                  <input
                    type="date"
                    value={editedExpense.date}
                    onChange={(e) => handleInputChange(e, 'date')}
                  />
                ) : (
                  expense.date
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === expense.id ? (
                  <button onClick={() => handleSaveClick(expense.id)}>Save</button>
                ) : (
                  <CiEdit onClick={() => handleEditClick(expense.id)} />
                )}
                {editingId === expense.id ? (
                  <button onClick={() => handleCancelClick()}>Cancel</button>
                ) : (
                  <MdDeleteForever onClick={() => handleDeleteClick(expense.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expense Bar Chart */}
      <div style={{ width: "40%" }}>
        <ExpenseBarChart expenses={expenses} />
      </div>
    </div>
  );
};

export default ExpenseList;
