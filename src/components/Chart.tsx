import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const BlinkingCircle = ({ x, y }:{x:string,y:number}) => {
    return (
        <circle cx={x} cy={y} r={8} fill="red" stroke="white" strokeWidth={2} className="blinking" />
    );
};

const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
};

export default function Chart() {
    const chartRef = useRef(null);
    const uData = useRef([4000]);
    const xLabels = useRef(Array(1).fill(getCurrentTime()));
    const [renderCounter, setRenderCounter] = useState(0);
    const [updates, setUpdates] = useState(0); // Состояние для отслеживания количества обновлений
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [previousValue, setPreviousValue] = useState(uData.current[uData.current.length - 1]);
    const [bets, setBets] = useState([]);
    const [betStatus, setBetStatus] = useState('idle'); // Добавляем состояние для отслеживания статуса ставки
    const dispatch = useDispatch();

    const { top, height } = useDrawingArea();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBet = (betAmount: any, direction: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment
        //@ts-ignore
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if ((bet.direction === 'up' && currentValue > bet.previousValue) || (bet.direction === 'down' && currentValue < bet.previousValue)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    dispatch(increaseBalance(bet.amount)); // выигрыш
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    dispatch(decreaseBalance(bet.amount)); // проигрыш
                }
            });

            // Очистка обработанных ставок и установка статуса завершения
            setBets([]);
            setBetStatus('completed'); // Устанавливаем статус завершения ставки
            setRenderCounter(renderCounter + 1);
            setUpdates(updates + 1); // Увеличиваем счетчик обновлений
        }, 3000);
        return () => clearInterval(intervalId);
    }, [renderCounter, bets, dispatch]);

    const lastDataIndex = useMemo(() => {
        return uData.current.length - 1;
    }, [uData.current.length]);

    const lastDataValue = useMemo(() => {
        return uData.current[lastDataIndex];
    }, [uData.current, lastDataIndex]);

    const yPosition = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valuesChart = (chartRef.current as any)?.getElementsByTagName('g')[0];
        if (valuesChart) {
            const valuesRects = valuesChart.getBoundingClientRect();
            const percent = 1 - (lastDataValue / (8000 - 1000));
            return 135 + (valuesRects.height * percent);
        }
        return 0;
    }, [height, lastDataValue, top]);

    const xPosition = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valuesChart = (chartRef.current as any)?.getElementsByTagName('g')[1];
        console.log(valuesChart);

        if (valuesChart) {
            const valuesRects = valuesChart.getBoundingClientRect();
            console.log('valuesRects', valuesRects.width);

            return valuesRects.width + 50;
        }
        return 0;
    }, [height, lastDataValue, top]);

    return (
        <Box display="flex">
            <LineChart
                ref={chartRef}
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
                        min: 1000,
                        max: 8000,
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
                {updates >= 2 && ( // Отображаем индикатор только после второго обновления
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                        <BlinkingCircle x={xPosition} y={yPosition} />
                    </svg>
                )}
            </LineChart>
            <RightInfo onBet={handleBet} betStatus={betStatus} />
        </Box>
    );
}