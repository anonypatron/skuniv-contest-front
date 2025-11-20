import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateTimeTable from './pages/CreateTimeTable';
import PrivateRoute from './components/auth/PrivateRoute';
import NotificationProvider from './components/notifications/NotificationProvider';

function App() {
  return (
    <div className="min-h-screen w-full bg-green-50">
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute/>}> {/* jwt를 가지고 있어야 접근 가능!! */}
            <Route path="/home" element={<Home />} />
            <Route path="/create-timetable" element={<CreateTimeTable/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </NotificationProvider>
    </div>
  );
}

export default App
