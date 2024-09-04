import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PannelRight from './ModelViewerPannel/PannelRight';
import './ModelViewer.css';
import CanvasView from './CanvasView/CanvasView';
import { MdZoomOutMap, MdZoomInMap } from 'react-icons/md';
import AccountMenu from './settingMenu';
import { AiFillHome } from "react-icons/ai";
import Loader from '../Loader/Loader';

export default function ModelViewer({ PannelRightDisplay = true, s3FilePath ,loader}) {
  const [zoom, setZoom] = useState(false);
  const [autoRotate, setAutoRotate] = useState(PannelRightDisplay);
  const [wireframe, setWireframe] = useState(false);
  const [axes, setAxes] = useState(false);
  const [grid, setGrid] = useState(PannelRightDisplay);
  const [bgOptions, setBgOptions] = useState('sunset');
  const [BgOnModel, setBgOnModel] = useState(false);
  const [bgColorClass, setBgColorClass] = useState('bgColorClass-black');
  
  const handleColorChange = (colorClass) => {
    setBgColorClass(colorClass);
  };

  const navigate = useNavigate();
  const modelRef = useRef();

  const handleZoomClick = () => {
    setZoom(prevZoom => !prevZoom);
  };

  const handleDownloadClick = () => {
    if (modelRef.current) {
      modelRef.current.handleDownload();
    }
  };

  const handleBackClick = () => {
    if (loader) {
      const confirmNavigation = window.confirm("You have unsaved changes. Are you sure you want to leave this page?");
      if (confirmNavigation) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const handleReset = () => {
    setZoom(false);
    setAutoRotate(true);
    setWireframe(false);
    setAxes(false);
    setGrid(true);
    setBgOptions('sunset');
    setBgOnModel(false);

  };

  return (
    <div className={`Model-container ${bgColorClass}`}>
      <div className="viewer">
        {PannelRightDisplay && (
          <div className="top-left" onClick={handleZoomClick}>
            {zoom ? <MdZoomInMap /> : <MdZoomOutMap />}
          </div>
        )}

        {!PannelRightDisplay && (
          <div className="top-left" onClick={handleBackClick}>
            {<AiFillHome />}
          </div>
        )}
        <div className="top-right">
          <AccountMenu 
            setBgOnModel={setBgOnModel} 
            set3dBgOptions={setBgOptions} 
            handleReset={handleReset} 
          />
        </div>
        <div className="bottom-right">
          <button type='button' className={`colorPicker colorPicker--1 ${bgColorClass === 'bgColorClass-black'?'active-btn':''}`} onClick={() => handleColorChange('bgColorClass-black')} />
          <button type='button' className={`colorPicker colorPicker--2 ${bgColorClass === 'bgColorClass-white'?'active-btn':''}`} onClick={() => handleColorChange('bgColorClass-white')}/>
          <button type='button' className={`colorPicker colorPicker--3 ${bgColorClass === 'bgColorClass-blue'?'active-btn':''}`} onClick={() => handleColorChange('bgColorClass-blue')} />
        </div>
        {loader && <Loader />}
        <CanvasView
          modelRef={modelRef}
          wireframe={wireframe}
          axes={axes}
          grid={grid}
          autoRotate={autoRotate}
          bgOptions={bgOptions}
          BgOnModel={BgOnModel}
          s3FilePath={s3FilePath}
          PannelRightDisplay={PannelRightDisplay}
          bgColorClass={bgColorClass}
        />
      </div>
      {PannelRightDisplay && !zoom && (
        <div className="right__modal">
          <PannelRight
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            wireframe={wireframe}
            setWireframe={setWireframe}
            axes={axes}
            setAxes={setAxes}
            grid={grid}
            setGrid={setGrid}
            handleDownloadClick={handleDownloadClick}
          />
        </div>
      )}
    </div>
  );
}
