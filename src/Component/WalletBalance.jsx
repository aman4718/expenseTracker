import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

const WalletBalance = () => {
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
            width: "100%",
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
    const [WalletBalance , setWalletBalance] = useState(5000);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [income, setIncome] = useState("");
   
  useEffect(() => {
    const savedBalance = localStorage.getItem("WalletBalance");
    if (savedBalance) {
      setWalletBalance(parseFloat(savedBalance));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("WalletBalance", WalletBalance);
  }, [WalletBalance]);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setIncome(""); 
    }
    const handleAddIncome = () => {
        const incomeAmount = parseFloat(income);
        if (incomeAmount > 0) {
          setWalletBalance((prevBalance) => prevBalance + incomeAmount);
          closeModal();
        } else {
          alert("Please enter a valid income amount.");
        }
      };
    return(
        <div>
            <div  style={styleWallet}>
                <p>Wallet Balance : ₹{WalletBalance}</p>
                <button onClick={openModal} style={AddIncomeStyle} >+ Add Income</button>
                <Modal
                    isOpen={isModalOpen}
                    contentLabel="Add Income"
                    onRequestClose={closeModal}
                     style={modalStyles}
                >
                    <h2>Add Income</h2>
                    <input
                    type="number"
                    value={income}
                     onChange={(e) => setIncome(e.target.value)}
                     placeholder="Enter amount"
                     style={styles.input}
                    />
                     <div style={styles.modalActions}>
                    <button onClick={handleAddIncome} style={styles.modalButton}>
                        Add
                    </button>
                    <button onClick={closeModal} style={styles.modalButton}>
                        Close
                    </button>
                    </div>
                </Modal>
            </div>
        </div>
    )

}
export default WalletBalance;