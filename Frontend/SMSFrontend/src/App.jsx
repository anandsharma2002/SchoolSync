import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Pricing from './Pages/Pricing';
import Schools from './Pages/Schools';
import Login from './Pages/Login';
import Read from './Pages/Read';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/login" element={<Login />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
