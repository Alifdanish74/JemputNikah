import { Routes, Route } from 'react-router';
import './App.css'
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BaseWeddingCard from './weddingcard/BaseWeddingCard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage/>}/>
        <Route path="/preview-card" element={<BaseWeddingCard />} /> 
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
