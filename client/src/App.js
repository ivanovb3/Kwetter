import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Home from './components/Home';
import Profile from './components/profile/Profile';
import Moderate from './components/moderate/ModeratePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/moderate' element={<Moderate />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
