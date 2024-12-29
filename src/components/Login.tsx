import { useState } from 'react';
import { auth } from '../../firebase.config'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';
import { setPersistence } from 'firebase/auth'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      await setPersistence(auth, 'session'); 
      const { user } = await signInWithEmailAndPassword(auth, email, password); 
      navigate('/'); 
    } catch (error) {
      console.error('Login Error:', error);
      alert("Invalid Email or Password"); 
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <div className="flex justify-center">
            <div className="bg-black p-2 shadow-lg rounded-md">
            <img src="Logo.png" alt="PrimeTube Logo" className="h-7 w-11" />
            </div>
          </div>
          <h1 className="mt-6 text-center text-3xl font-bold text-black font-orbitron">PrimeTube</h1>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-black font-orbitron">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-black font-orbitron">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <button 
          onClick={handleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black font-orbitron"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

