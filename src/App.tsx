import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/create">Create</Link>
      </nav>
            <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;