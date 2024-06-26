import { AppBar, Toolbar, Typography, Box, Tabs, Tab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import logo from '../assets/1win.png'

const Header = () => {
  return (
        <AppBar position="static" style={{ backgroundColor: '#0B1A38',borderBottom:'1px solid #A8A8A8', }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <img src={logo} alt="logo" style={{ width: '95px', marginRight: '16px' }} />
          <Tabs value={0} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: 'white' } }}>
            <Tab label="USD/BRL" />
            <Tab label="EUR/USD" />
            <Tab label="EUR/JPY" />
          </Tabs>
          <IconButton edge="end" color="inherit" aria-label="add" style={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: '16px', color: 'green' }}>
            ₽115.22
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
