import React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Импортируйте RootState из вашего store
import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalForLeftMenuProps {
  open: boolean;
  handleClose: () => void;
}

const ModalForLeftMenu: React.FC<ModalForLeftMenuProps> = ({ open, handleClose }) => {
  const betHistory = useSelector((state: RootState) => state.betHistory.bets);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', background:"#0C1A38" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            История Торговли
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {betHistory.map((bet, index) => (
          <React.Fragment key={index}>
            <ListItemButton>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    Сумма: {bet.amount}, Направление: {bet.direction === 'up' ? <ArrowUpwardIcon color="success" /> : <ArrowDownwardIcon color="error" />}
                  </Box>
                }
                secondary={
                  <Box component="span" sx={{ color: bet.result ? 'green' : 'red' }}>
                    {bet.result ? `+${bet.amount}` : `-${bet.amount}`}
                  </Box>
                }
              />
              <ListItemText
                secondary={`Время: ${bet.timestamp}`}
              />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Dialog>
  );
};

export default ModalForLeftMenu;