import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import RightInfo from './RightInfo';
import { Box } from '@mui/material';
import { decreaseBalance, increaseBalance } from '../redux/currentWallet/currentBalanceSlice';

function getRandomNumber(min = 1000, max = 8000) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Colorswitch = () => {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;
    return (
        <>
            <defs>
                <linearGradient id="paint0_linear_45_2" x1="300.25" y1="46.9999" x2="300.25" y2={`${svgHeight}px`}
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BCBCBC" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#BCBCBC" stopOpacity="0" />
                </linearGradient>
            </defs>
        </>
    );
}

const BlinkingCircle = ({ x, y }) => {
    return (
        <circle cx={x} cy={y} r={8} fill="red" stroke="white" strokeWidth={2} className="blinking" />
    );
};

export default function Chart() {
    const uData = useRef([4000, 3000, 2000, 2780, 1890, 2390, 3490]);
    const xLabels = useRef([
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ]);
    const [renderCounter, setRenderCounter] = useState(0);
    const [previousValue, setPreviousValue] = useState(uData.current[uData.current.length - 1]);
    const [bets, setBets] = useState([]);
    const [betStatus, setBetStatus] = useState('idle'); // Добавляем состояние для отслеживания статуса ставки
    const dispatch = useDispatch();

    const { top, height } = useDrawingArea();

    const handleBet = (betAmount, direction) => {
        setBets([...bets, { amount: betAmount, direction, previousValue: uData.current[uData.current.length - 1] }]);
        setBetStatus('inProgress'); // Устанавливаем статус ставки в процессе
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tempData = [...uData.current];
            const tempAxis = [...xLabels.current];
            tempAxis.push(`Page G${renderCounter}`);
            tempData.push(getRandomNumber());
            uData.current = tempData;
            xLabels.current = tempAxis;

            // Проверка результатов ставок
            bets.forEach((bet) => {
                const currentValue = uData.current[uData.current.length - 1];
                if ((bet.direction === 'up' && currentValue > bet.previousValue) || (bet.direction === 'down' && currentValue < bet.previousValue)) {
                    dispatch(increaseBalance(bet.amount)); // выигрыш
                } else {
                    dispatch(decreaseBalance(bet.amount)); // проигрыш
                }
            });

            // Очистка обработанных ставок и установка статуса завершения
            setBets([]);
            setBetStatus('completed'); // Устанавливаем статус завершения ставки
            setRenderCounter(renderCounter + 1);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [renderCounter, bets, dispatch]);

    const lastDataIndex = uData.current.length - 1;
    const lastDataValue = uData.current[lastDataIndex];

    const yPosition = height - ((lastDataValue - 0) / (8000 - 0)) * height + top;

    return (
        <Box display="flex">
            <LineChart
                height={700}
                colors={['#2F4CDD']}
                series={[
                    {
                        data: uData.current,
                        area: true,
                    }
                ]}
                grid={{ horizontal: true, vertical: true }}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: xLabels.current,
                        labelStyle: { fill: 'white' },
                        tickLabelStyle: { fill: 'white' },
                    },
                ]}
                yAxis={[
                    {
                        scaleType: 'linear',
                        labelStyle: { fill: 'white' },
                        tickLabelStyle: { fill: 'white' },
                    },
                ]}
                sx={{
                    '& .MuiLineChart-root .MuiAxis-root text': {
                        fill: 'white',
                    },
                    '& .MuiLineChart-root .MuiAxis-root .MuiAxis-tick': {
                        stroke: 'white',
                    },
                    '& .MuiLineChart-root .MuiAxis-root .MuiAxis-line': {
                        stroke: 'white',
                    },
                    '& .css-j6h5qe-MuiAreaElement-root': {
                        fill: 'url(#paint0_linear_45_2)',
                    },
                    '& .css-tvglr0-MuiAreaElement-root': {
                        fill: 'url(#paint0_linear_45_3)',
                    },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                        fill: '#fff',
                    },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                        stroke: '#fff',
                    },
                    '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                        stroke: '#fff',
                    },
                    '& .MuiChartsAxis-tick': {
                        stroke: '#fff',
                    },
                    '& .MuiChartsGrid-line': {
                        stroke: '#fff',
                        opacity: '0.4',
                    },
                    '@keyframes blink-animation': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                    '.blinking': {
                        animation: 'blink-animation 1s infinite',
                    },
                }}
            >
                <Colorswitch />
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                    <BlinkingCircle x="95%" y={yPosition} />
                </svg>
            </LineChart>
            <RightInfo onBet={handleBet} betStatus={betStatus} />
        </Box>
    );
}