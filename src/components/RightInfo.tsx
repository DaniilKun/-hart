import { Box, Button, Typography, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const RightInfo = () => {
  return (
    <Box 
      sx={{
        width: 250,
        padding: 2,
        // border: '1px solid #0B1A38',
        // borderRadius: 2,
        backgroundColor: '#1C2B4B',
        color: 'white'
      }}
    >
      <Typography variant="h6" sx={{ color: '#AAA' }}>Экспирация</Typography>
      <Typography variant="body1">3 сек.</Typography>
      
      <Typography variant="h6" sx={{ color: '#AAA', marginTop: 2 }}>Сумма</Typography>
      <TextField 
        variant="outlined" 
        size="small" 
        defaultValue="₽800" 
        fullWidth 
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
      />
      
      <Typography variant="h6" sx={{ color: '#AAA' }}>Доход</Typography>
      <Typography variant="body1" color="green">+90%</Typography>
      <Typography variant="body1" color="green">+₽720</Typography>
      
      <Button 
        variant="contained" 
        color="success" 
        fullWidth 
        sx={{ mt: 2, backgroundColor: '#00C853' }}
        startIcon={<ArrowUpwardIcon />}
      >
        ВЫШЕ
      </Button>
      <Button 
        variant="contained" 
        color="error" 
        fullWidth 
        sx={{ mt: 1, backgroundColor: '#D32F2F' }}
        startIcon={<ArrowDownwardIcon />}
      >
        НИЖЕ
      </Button>
    </Box>
  );
};

export default RightInfo;
