import { Box, List, ListItem, ListItemText } from '@mui/material';

const LeftMenu = () => {
  return (
    <Box
      sx={{
        width: 150,
        padding: 2,
        borderRight: '1px solid grey',
        height: '100vh',backgroundColor: '#0B1A38' ,
        color:'#A8A8A8',
        border:'1px solid #A8A8A8',
        borderLeft:'none',
        borderTop:'none'
      }}

    >
      <List sx={{display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column',textAlign:'center'}}>
        <ListItem >
          <ListItemText primary="МОЕ ПОРТФОЛИО" sx={{textAlign:'center'}}/>
        </ListItem>
        <ListItem >
          <ListItemText primary="ИСТОРИЯ ТОРГОВЛИ" />
        </ListItem>
        <ListItem >
          <ListItemText primary="ТАБЛИЦА ЛИДЕРОВ" />
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftMenu;
