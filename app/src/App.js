import "./App.css";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [elaborationdata, setElaborationdata] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  function Signup() {
    setElaborationdata("Signup");
  }

  function Login() {
    setElaborationdata("Login");
  }

  async function getUser(token) {
    const response = await fetch(`http://localhost:8080/user/${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const r = await response.json();
    setData(r);
  }

  return (
    <div className="App">
      <button onClick={Signup}>Signup</button> 
      <button onClick={Login}>Login</button>

      {elaborationdata != "" && (
        <>
          <Form
            elaborationdata={elaborationdata}
            setElaborationdata={setElaborationdata}
            token={token}
            setToken={setToken}
            getUser={getUser}
          />
          <br />
          <button onClick={() => setElaborationdata("")}>Annulla</button>
        </>
      )}

      {token != "" && <span>{data}</span>}
    </div>
  );
}

export default App;
