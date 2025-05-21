import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import NotFound from './pages/NotFound'
import './styles/global.css'

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <header>
        <h1 className="logo">WhatsUP</h1>
        <nav>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : 'inactive'}`}>home</Link>
          <span className="nav-divider">—</span>
          <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'active' : 'inactive'}`}>create</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;