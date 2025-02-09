import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button, Input, Spacer } from "@geist-ui/core";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="grid place-content-center text-center h-svh">
      <h2>Admin Login</h2>
      <form className="flex flex-col">
        <Input label="username" placeholder="John doe" onChange={(e) => setUsername(e.target.value)} width="100%" />
        <Spacer h={.5} />
        <Input.Password   label="password" onChange={(e) => setPassword(e.target.value)} />
        <Spacer />
        <Button type="submit" onClick={handleLogin}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
