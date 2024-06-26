import { LineChart } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 1543,8000];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
  'Page G1',
  'Page G2',
];

const Colorswitch = () => {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  return (
      <>
          <defs>
              <linearGradient id="paint0_linear_45_2" x1="300.25" y1="46.9999" x2="300.25" y2={`${svgHeight}px`} gradientUnits="userSpaceOnUse">
                  <stop stop-color="#BCBCBC" stop-opacity="0.4" />
                  <stop offset="1" stop-color="#BCBCBC" stop-opacity="0" />
              </linearGradient>
          </defs>
      </>
  )
}

export default function SimpleAreaChart() {
  return (
    <LineChart
      width={600}
      height={500}
      colors={['#2F4CDD']}
      series={[{ data: uData, area: true }]}
      grid={{ horizontal: true, vertical: true }}
      xAxis={[
        {
          scaleType: 'point',
          data: xLabels,
          stroke: 'white', // Изменение цвета оси
          labelStyle: { fill: 'white' }, // Изменение цвета меток оси
          tickLabelStyle: { fill: 'white' }, // Изменение цвета меток
        },
      ]}
      yAxis={[
        {
          scaleType: 'linear',
          stroke: 'white', // Изменение цвета оси
          labelStyle: { fill: 'white' }, // Изменение цвета меток оси
          tickLabelStyle: { fill: 'white' }, // Изменение цвета меток
        },
      ]}
      sx={{
        '& .MuiLineChart-root .MuiAxis-root text': {
          fill: 'white', // Принудительно меняем цвет текста меток осей на белый
        },
        '& .MuiLineChart-root .MuiAxis-root .MuiAxis-tick': {
          stroke: 'white', // Принудительно меняем цвет штриховок осей на белый
        },
        '& .MuiLineChart-root .MuiAxis-root .MuiAxis-line': {
          stroke: 'white', // Принудительно меняем цвет линий осей на белый
        },
        '& .css-j6h5qe-MuiAreaElement-root': {
          fill: 'url(#paint0_linear_45_2)',
        },
        '& .css-tvglr0-MuiAreaElement-root': {
          fill: 'url(#paint0_linear_45_3)',
        },
      }}
    ><Colorswitch /></LineChart>
  );
}
