import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
