import { useEffect, useState } from "react"
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}; 
const Expense = () => {
    const modalStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        },
      };
      const styles = {
        input: {
            width: "90%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        modalActions: {
            display: "flex",
            justifyContent: "space-between",
          },
          modalButton: {
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          },
    }
    const styleWallet = {
        display:'flex',
        border:'solid 1px',
        borderRadius:'8px',
        flexDirection:'column',
        alignItems:'center',
        padding:'20px',
        backgroundColor: "#2c2c2c",
        color:'white' 
    }
    const AddIncomeStyle =  {
        border:'solid 1px',
        borderRadius:'10px',
        backgroundColor:'green',
        color:'white'
    }
    const [expense, setExpense] = useState(0);
    const [expenses, setExpenses] = useState(() => {
         const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        expense: "",
        amount: "",
        category: "",
        date: getTodayDate(),
      });
      useEffect(() => {
        const savedExpenses = localStorage.getItem("expenses");
        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }
      }, []);
      useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }, [expenses]);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
      //  setIncome(""); 
    }
        
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event
        setFormData({
            ...formData, // Keep previous values
            [name]: value, // Update the specific field
        });
    };
    const handleAddExpense = () => {
        if (!formData.expense || !formData.amount || !formData.category) {
            alert("Please fill in all the fields.");
            return;
        }
        const newExpense = {
            ...formData,
            id: Date.now(), // Unique ID for each expense
            amount: parseFloat(formData.amount),
        };
        setExpenses([...expenses, newExpense]);
        setExpense((prev) => prev + parseFloat(formData.amount)); // Update expense total
        setFormData({ name: "", amount: "", category: "", date: getTodayDate() }); // Reset form
        closeModal();
    }
    
    return(
        <div style={styleWallet}>
            <p>Expense : ₹{expense}</p>
            <button onClick={openModal} style={AddIncomeStyle} >+ Add Expense</button>
             <Modal
                    isOpen={isModalOpen}
                    contentLabel="Add Income"
                    onRequestClose={closeModal}
                        style={modalStyles}
                >
                    <h2>Add Expense</h2>
                    <select  
                        style={styles.input}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                    </select>
                    <input
                        type="text"
                        name='expense'
                        value={formData.expense}
                        placeholder="Enter Expense Name"
                        style={styles.input}
                        onChange={handleInputChange}
                    />
                    <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    style={styles.input}
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        style={styles.input}
                        onChange={handleInputChange}
                    />
                    <div style={styles.modalActions}>
                        <button onClick={handleAddExpense} style={styles.modalButton}>
                            Add
                        </button>
                        <button onClick={closeModal} style={styles.modalButton}>
                            Close
                        </button>
                    </div>
                </Modal>
        </div>
    )
}
export default Expense;