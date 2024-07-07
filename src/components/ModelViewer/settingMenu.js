import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import { Settings } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

export default function AccountMenu({setBgOnModel, set3dBgOptions, handleReset}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [backgroundMenuAnchorEl, setBackgroundMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setBackgroundMenuAnchorEl(null);
  };

  const handleBackgroundMenuOpen = (event) => {
    setBackgroundMenuAnchorEl(event.currentTarget);
  };

  // const handleBackgroundMenuClose = () => {
  //   setBackgroundMenuAnchorEl(null);
  // };

  return (
    <div>
      <Settings fontSize="large" onClick={handleMenuOpen} sx={{transform: "translateY(10%) rotate(45deg)"}}/>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleBackgroundMenuOpen}>
          <ListItemIcon>
            <WallpaperIcon fontSize="small" />
          </ListItemIcon>
          3D Background
        </MenuItem>
        <Menu
          anchorEl={backgroundMenuAnchorEl}
          open={Boolean(backgroundMenuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem onClick={()=> setBgOnModel(false)}>
            <ListItemIcon>
              <WallpaperIcon fontSize="small" />
            </ListItemIcon>
             None
          </MenuItem>
          <MenuItem onClick={()=> {set3dBgOptions('night'); setBgOnModel(true);}}>
            <ListItemIcon>
              <WallpaperIcon fontSize="small" />
            </ListItemIcon>
            Night
          </MenuItem>
          <MenuItem onClick={()=> {set3dBgOptions('dawn'); setBgOnModel(true);}}>
            <ListItemIcon>
              <WallpaperIcon fontSize="small" />
            </ListItemIcon>
            Dawn
          </MenuItem>
          <MenuItem onClick={()=> {set3dBgOptions('city'); setBgOnModel(true);}}>
            <ListItemIcon>
              <WallpaperIcon fontSize="small" />
            </ListItemIcon>
            City
          </MenuItem>
          <MenuItem onClick={()=> {set3dBgOptions('forest'); setBgOnModel(true);}}>
            <ListItemIcon>
              <WallpaperIcon fontSize="small" />
            </ListItemIcon>
            Forest
          </MenuItem>
        </Menu>
        <MenuItem onClick={()=> {handleReset()}}>
          <ListItemIcon>
            <ResetTvIcon fontSize="small" />
          </ListItemIcon>
          Reset
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CloseIcon fontSize="small" />
          </ListItemIcon>
         Close
        </MenuItem>
      </Menu>
    </div>
  );
}
