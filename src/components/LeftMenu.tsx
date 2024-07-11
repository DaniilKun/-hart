import { Box, List, ListItem, ListItemText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const LeftMenu = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  return (
    <Box
      sx={{
        // width: '100%',
        maxWidth: isSmallScreen ? 'none' : 130,
        // padding: 1,
        borderRight: '1px solid grey',
        backgroundColor: '#0B1A38',
        color: '#A8A8A8',
        // border: '1px solid #A8A8A8',
        textAlign: 'center',
        borderLeft: 'none',
        borderTop: 'none',
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
          <ListItemText primary="МОЕ ПОРТФОЛИО" sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="ИСТОРИЯ ТОРГОВЛИ" sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="ТАБЛИЦА ЛИДЕРОВ" sx={{ textAlign: 'center' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftMenu;
