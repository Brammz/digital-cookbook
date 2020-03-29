import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const Navbar: React.FC = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Digital Cookbook
          </Typography>
          <Link to="/recipes" style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
            <Button color="inherit">Recepten</Button>
          </Link>
          <Link to="/ingredients" style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
            <Button color="inherit">Ingredienten</Button>
          </Link>
          <Link to="/tags" style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
            <Button color="inherit">Tags</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;
