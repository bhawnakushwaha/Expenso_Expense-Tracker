import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/layouts/Inputs/Input';
import { validateEmail } from "../../utills/helper";
import axiosInstance from '../../utills/axiosInstance';
import { API_PATHS } from '../../utills/apiPaths';
import { UserContext } from '../../context/UserContext';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();
   
  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, 
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  }


  return (
    <AuthLayout>
      <div className=' flex flex-col justify-center lg:w-[70%] h-3/4 md:h-full ' >
        <h3 className='text-xl font-semibold text-black' >Welcome Back!</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6' >
          Please, log in to continue... 
        </p>
        
        <form onSubmit={handleLogin} >
          <Input 
          value={email}
          onChange={({ target })=> setEmail(target.value)}
          label="Email Address"
          placeholder="Enter Your email"
          type="text"
          />

          <Input 
          value={password}
          onChange={({ target })=> setPassword(target.value)}
          label="Password "
          placeholder="Min 8 characters"
          type="password"
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='btn-green'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3' >
            Don't have an account? {" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
          </p>

        </form>
      </div>
      
    </AuthLayout>
  );
};

export default Login
