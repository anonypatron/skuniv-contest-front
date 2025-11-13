import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="min-h-screen w-full bg-green-50"> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App
