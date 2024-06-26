import Chart from './components/Chart';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import RightInfo from './components/RightInfo';
import LeftMenu from './components/LeftMenu';


function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header />

      <Box sx={{ display: 'flex', flex: 1 }}>
<LeftMenu/>

        <Box display="flex" alignItems="center" sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1C2B4B',
        color: 'white' }}>
          <Chart />
        </Box>
        <RightInfo/>
      </Box>
    </Box>
  );
}

export default App;
