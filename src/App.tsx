import Chart from './components/Chart';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import mmFon from './assets/mmFon.png';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(426));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(376));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          flex: 1,
        }}>
        <LeftMenu />

        <Box
          display="flex"
          alignItems="center"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1C2B4B',
            backgroundImage: isVerySmallScreen ? 'none' :`url(${mmFon})`,
            backgroundSize: 'components',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
          }}>
          <div
            style={{
              // height: '80vh',
              width: '93vw',
            }}>
            <Chart />
          </div>
        </Box>
        {/* <RightInfo /> */}
      </Box>
    </Box>
  );
}

export default App;
