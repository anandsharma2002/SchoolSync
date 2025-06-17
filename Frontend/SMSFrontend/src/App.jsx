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
import Navbar from './Components/Navbar';

// Dashboard Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import Students from './Pages/Dashboard/Students';
import Teachers from './Pages/Dashboard/Teachers';
import Courses from './Pages/Dashboard/Courses';
import Schedule from './Pages/Dashboard/Schedule';
import Reports from './Pages/Dashboard/Reports';
import Settings from './Pages/Dashboard/Settings';
import AddStudent from './Pages/Dashboard/AddStudent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/login" element={<Login />} />
        <Route path="/read" element={<Read />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
