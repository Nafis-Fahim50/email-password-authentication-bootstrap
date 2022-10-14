import { getAuth } from "firebase/auth";
import './App.css';
import app from "./Firebase/firebase.init";

const auth = getAuth(app);

function App() {
  const handleToGetValue = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  }
  const handleOnChange = (e) =>{
    console.log(e.target.value);
  }

  const handlePassChange = e =>{
    console.log(e.target.value);
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
