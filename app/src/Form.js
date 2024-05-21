import { useState } from "react";

export default function FormSignup({ elaborationdata, setElaborationdata, token, setToken, getUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function Signup() {
    const response = await fetch(`http://localhost:8080/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    const r = await response.json();
    setToken(r.token)
  }

  async function Login() {
    const response = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });

    const r = await response.json();
    setToken(r.token);

    if(token != "") {
      getUser(token);
      setElaborationdata("");
    }
  }

  return (
    <>
      {elaborationdata == "Signup" ? (
        <>
          <h2>Signup</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={Signup}>Signup</button>
          </div>
          {token == "" && 
            <p><b><i>Email o Username già presenti</i></b></p>
          }
        </>
      ) : (
        <>
          <h2>Login</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={Login}>Login</button>
          </div>
          {token == "" &&
            <p><b><i>Username o Password errati</i></b></p>
          }
        </>
      )}
    </>
  );
}