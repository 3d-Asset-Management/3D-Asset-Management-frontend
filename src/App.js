import Dashboard from './pages/Dashboard/DashBoard';
import Generate3D from './pages/Generate3D/Generate3D';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/generate3D" element={<Generate3D/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
       </Routes>
    </div>
  );
}

export default App;
