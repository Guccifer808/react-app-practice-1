import Button from "components/UI/button/Button";
import MyInput from "components/UI/input/MyInput";
import React, { useContext } from "react";
import { AuthContext } from '../context';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Login" />
        <MyInput type="password" placeholder="Password" />
        <Button>Log In</Button>
      </form>
    </div>
  );
};

export default Login;
