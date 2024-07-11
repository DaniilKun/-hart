import { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RightInfo = ({ onBet, betStatus }:{onBet:any, betStatus: any}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  const [amount, setAmount] = useState('50'); // Убираем символ рубля для удобства
  const [betInProgress, setBetInProgress] = useState(false); // Добавляем состояние для отслеживания состояния ставки

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: { target: { value: any; }; }) => {
    const newValue = event.target.value;
    // Проверяем, что введено только число
    if (/^\d*$/.test(newValue)) {
      setAmount(newValue);
      console.log(newValue);
    }
  };

  const handleBet = (direction: string) => {
    if (!betInProgress) { // Проверяем, был ли уже клик
      setBetInProgress(true); // Устанавливаем состояние, что ставка в процессе
      const betAmount = parseInt(amount, 10);
      onBet(betAmount, direction);
    }
  };

  useEffect(() => {
    if (betStatus === 'completed') { // Проверяем статус ставки
      setBetInProgress(false); // Сбрасываем состояние после выполнения ставки
    }
  }, [betStatus]);

  return (
    <Box
      sx={{
        maxWidth: isSmallScreen ? 100 : 220,
        padding: 1,
        backgroundColor: '#1C2B4B',
        color: 'white'
      }}
    >
      <Typography variant="h6" sx={{ color: '#AAA',fontSize: '0.9rem' }}>Экспирация</Typography>
      <Typography variant="body1">3 сек.</Typography>

      <Typography variant="h6" sx={{ color: '#AAA', marginTop: 2, fontSize: '0.9rem' }}>Сумма</Typography>
      <TextField
        variant="outlined"
        size="small"
        value={amount}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        disabled={betInProgress} // Деактивируем поле ввода, если ставка в процессе
      />

      <Typography variant="h6" sx={{ color: '#AAA',fontSize: '0.9rem' }}>Доход</Typography>
      <Typography variant="body1" color="green">+90%</Typography>
      <Typography variant="body1" color="green">+₽720</Typography>

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2, backgroundColor: '#00C853' }}
        startIcon={<ArrowUpwardIcon />}
        onClick={() => handleBet('up')}
        disabled={betInProgress} // Деактивируем кнопку, если ставка в процессе
      >
        ВЫШЕ
      </Button>
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 1, backgroundColor: '#D32F2F' }}
        startIcon={<ArrowDownwardIcon />}
        onClick={() => handleBet('down')}
        disabled={betInProgress} // Деактивируем кнопку, если ставка в процессе
      >
        НИЖЕ
      </Button>
    </Box>
  );
};

export default RightInfo;