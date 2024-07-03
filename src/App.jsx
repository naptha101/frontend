import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    hello
      <Router>
        <Routes>
          <Route path='/deal' element={<Home />} />
         
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
