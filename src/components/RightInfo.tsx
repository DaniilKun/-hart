import { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RightInfo = ({ onBet, betStatus }:{onBet:any, betStatus: any}) => {
  const balance = useSelector((state: RootState) => state.currentBalance.balance);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  const [amount, setAmount] = useState('50');
  const [betInProgress, setBetInProgress] = useState(false);
  const [previousBalance, setPreviousBalance] = useState(balance);
  const [profit, setProfit] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: { target: { value: any; }; }) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setAmount(newValue);
    }
  };

  const handleBet = (direction: string) => {
    if (!betInProgress) {
      setBetInProgress(true);
      const betAmount = parseInt(amount, 10);
      onBet(betAmount, direction);
    }
  };

  useEffect(() => {
    if (betStatus === 'completed') {
      setBetInProgress(false);
    }
  }, [betStatus]);

  useEffect(() => {
    if (balance !== previousBalance) {
      const balanceDifference = balance - previousBalance;
      setProfit(balanceDifference);
      setPreviousBalance(balance);
    }
  }, [balance, previousBalance]);

  return (
    <Box
      sx={{
        maxWidth: isSmallScreen ? 100 : 220,
        padding: 1,
        backgroundColor: '#1C2B4B',
        color: 'white'
      }}
    >
      <Typography variant="h6" sx={{ color: '#AAA', fontSize: '0.9rem' }}>Экспирация:</Typography>
      <Typography variant="body1">3 сек.</Typography>

      <Typography variant="h6" sx={{ color: '#AAA', marginTop: 2, fontSize: '0.9rem' }}>Сумма:</Typography>
      <TextField
        variant="outlined"
        size="small"
        value={amount}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        disabled={betInProgress}
      />

      <Typography variant="h6" sx={{ color: '#AAA', fontSize: '0.9rem' }}>Доход:</Typography>
      {profit !== null && (
        <Typography variant="body1" color={profit >= 0 ? 'green' : 'red'}>
          {profit > 0 ? `+${profit}` : profit}
        </Typography>
      )}

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2, backgroundColor: '#00C853' }}
        startIcon={<ArrowUpwardIcon />}
        onClick={() => handleBet('up')}
        disabled={betInProgress}
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
        disabled={betInProgress}
      >
        НИЖЕ
      </Button>
    </Box>
  );
};

export default RightInfo;