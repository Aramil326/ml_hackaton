import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <img src={logo} alt="Логотип" height="50" />
            </Toolbar>
        </AppBar>
    );
};

export default Header;