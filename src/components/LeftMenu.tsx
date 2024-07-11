import { useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ModalForLeftMenu from './ModalForLeftMenu'; // Импортируем модалку

const LeftMenu = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  const [open, setOpen] = useState(false);

  const listItemTextStyle = {
    textAlign: 'center',
    '& .MuiTypography-root': {
      fontSize: isSmallScreen ? '0.8rem' : '1rem',
    },
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: isSmallScreen ? 'none' : 130,
          borderRight: '1px solid grey',
          backgroundColor: '#0B1A38',
          color: '#A8A8A8',
          textAlign: 'center',
        }}>
        <List
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: isSmallScreen ? 'row' : 'column',
            textAlign: 'center',
          }}>
          {/* <ListItem>
            <ListItemText primary="МОЕ ПОРТФОЛИО" sx={listItemTextStyle} />
          </ListItem> */}
          <ListItem  onClick={handleOpen}>
            <ListItemText primary="ИСТОРИЯ ТОРГОВЛИ" sx={listItemTextStyle} />
          </ListItem>
          {/* <ListItem>
            <ListItemText primary="ТАБЛИЦА ЛИДЕРОВ" sx={listItemTextStyle} />
          </ListItem> */}
        </List>
      </Box>
      <ModalForLeftMenu open={open} handleClose={handleClose} />
    </>
  );
};

export default LeftMenu;