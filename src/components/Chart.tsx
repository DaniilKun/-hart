import {LineChart} from '@mui/x-charts/LineChart';
import {useDrawingArea} from '@mui/x-charts/hooks';
import {useEffect, useRef, useState} from 'react';

function getRandomNumber(min = 1000, max = 8000) {
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Colorswitch = () => {
    const {top, height, bottom} = useDrawingArea();
    const svgHeight = top + bottom + height;

    return (
        <>
            <defs>
                <linearGradient id="paint0_linear_45_2" x1="300.25" y1="46.9999" x2="300.25" y2={`${svgHeight}px`}
                                gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BCBCBC" stop-opacity="0.4"/>
                    <stop offset="1" stop-color="#BCBCBC" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </>
    )
}

export default function SimpleAreaChart() {
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

    useEffect(() => {
        setTimeout(() => {
            const tempData = [...uData.current];
            const tempAxis = [...xLabels.current];
            tempAxis.push(`Page G${renderCounter}`)
            tempData.push(getRandomNumber());
            uData.current = tempData;
            xLabels.current = tempAxis;
            setRenderCounter(renderCounter + 1);
        }, 3000);
    }, [renderCounter]);

    return (
        <LineChart
        height={700}
            colors={['#2F4CDD']}
            series={[{data: uData.current, area: true}]}
            grid={{horizontal: true, vertical: true}}
            xAxis={[
                {
                    scaleType: 'point',
                    data: xLabels.current,
                    labelStyle: {fill: 'white'}, // Изменение цвета меток оси
                    tickLabelStyle: {fill: 'white'}, // Изменение цвета меток
                },
            ]}
            yAxis={[
                {
                    scaleType: 'linear',
                    labelStyle: {fill: 'white'}, // Изменение цвета меток оси
                    tickLabelStyle: {fill: 'white'}, // Изменение цвета меток
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
                '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel':{
                    fill: '#fff'
                },
                '& .MuiChartsAxis-bottom .MuiChartsAxis-line':{
                    stroke: '#fff'
                },
                '& .MuiChartsAxis-left .MuiChartsAxis-line':{
                    stroke: '#fff'
                },
                '& .MuiChartsAxis-tick': {
                    stroke: '#fff'
                },
                '& .MuiChartsGrid-line': {
                    stroke: '#fff',
                    opacity: '0.4'
                }

            }}
        >
            <Colorswitch/>
        </LineChart>
    );
}
