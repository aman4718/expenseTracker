import Expense from "./Component/Expense";
import ExpenseList from "./Component/ExpenseList";
import ExpensePieChart from "./Component/ExpensePieChart";
import WalletBalance from "./Component/WalletBalance";

function App() {
  const styleWallet = {
    display:'flex',
    border:'solid 1px',
    borderRadius:'8px',
    alignItems:'center',
    padding:'20px',
    backgroundColor: "#2c2c2c",
    color:'white',
    gap:'90px',
}
  return (
    <div className="App" >
       <h2 style={{'textAlign':'center'}}>
        Expense Tracker
      </h2>
      <div style={styleWallet}>
        <WalletBalance/>
        <Expense/>
        <ExpensePieChart/>
      </div>
        <ExpenseList/>
    </div>
  );
}

export default App;
