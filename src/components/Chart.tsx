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

const BlinkingCircle = ({ x, y }) => {
    return (
        <circle cx={x} cy={y} r={8} fill="red" stroke="white" strokeWidth={2} className="blinking" />
    );
};

const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
};

export default function Chart() {
    const uData = useRef([4000, ]);
    const xLabels = useRef(Array(1).fill(getCurrentTime()));
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
            tempAxis.push(getCurrentTime());
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
                    backgroundColor: 'transparent', // Добавлено для прозрачного фона
                    '& .MuiLineChart-root .MuiAxis-root text': {
                        fill: 'white',
                    },
                    '& .MuiLineChart-root .MuiAxis-root .MuiAxis-tick': {
                        stroke: 'white',
                    },
                    '& .MuiLineChart-root .MuiAxis-root .MuiAxis-line': {
                        stroke: 'white',
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
                        opacity: '0.2',
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
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                    <BlinkingCircle x="95%" y={yPosition} />
                </svg>
            </LineChart>
            <RightInfo onBet={handleBet} betStatus={betStatus} />
        </Box>
    );
}