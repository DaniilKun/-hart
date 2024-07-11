import { Box, List, ListItem, ListItemText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const LeftMenu = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  
  const listItemTextStyle = {
    textAlign: 'center',
    '& .MuiTypography-root': {
      fontSize: isSmallScreen ? '0.8rem' : '1rem',
    },
  };

  return (
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
        <ListItem>
          <ListItemText primary="МОЕ ПОРТФОЛИО" sx={listItemTextStyle} />
        </ListItem>
        <ListItem>
          <ListItemText primary="ИСТОРИЯ ТОРГОВЛИ" sx={listItemTextStyle} />
        </ListItem>
        <ListItem>
          <ListItemText primary="ТАБЛИЦА ЛИДЕРОВ" sx={listItemTextStyle} />
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftMenu;