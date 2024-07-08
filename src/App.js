import Dashboard from './pages/Dashboard/DashBoard';
import Generate3D from './pages/Generate3D/Generate3D';
import ModelView from './pages/ModelView/ModelView';
import PageNotFound from './components/PageNotFound/PageNotFound'
import { Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/generate3D"  element={<Generate3D/>} />
          <Route path="/modelviewer/:data/:id" element={<ModelView/>} />
          <Route path="*" element={<PageNotFound/>} />
       </Routes>
    </div>
  );
}

export default App;
