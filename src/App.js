import Dashboard from './pages/Dashboard/DashBoard';
import Generate3D from './pages/Generate3D/Generate3D';
import ModelView from './pages/ModelView/ModelView';
import PageNotFound from './components/PageNotFound/PageNotFound';
import BackendURLInput from './components/BackendURLInput/BackendURLInput';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function App() {
  console.log("REACT_APP_API_URL_PLACEHOLDER")
  const [backendUrl, setBackendUrl] = useState("");
  const [isUrlConfirmed, setIsUrlConfirmed] = useState(false);
  const location = useLocation();

  return (
    <div className="App">
      {!isUrlConfirmed && location.pathname === '/' && (
        <BackendURLInput 
          setBackendUrl={setBackendUrl}
          setIsUrlConfirmed={setIsUrlConfirmed}
        />
      )}
  
      <Routes>
        {isUrlConfirmed && (
          <>
            <Route path="/" element={<Dashboard backendUrl={backendUrl}/>} />
            <Route path="/generate3D" element={<Generate3D backendUrl={backendUrl}/>} />
            <Route path="*" element={<PageNotFound />} />
          </>
        )}
        <Route path="/modelviewer/:data/:id" element={<ModelView />} />
      </Routes>
    </div>
  );
}

export default App;
