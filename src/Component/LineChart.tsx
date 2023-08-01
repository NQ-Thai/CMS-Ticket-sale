import { Chart, LinearScale } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(LinearScale);

interface MonthLabel {
    day: string;
    amount: string;
}

interface Data {
    data: string[];
    tension: number;
    borderColor: string;
    pointBorderColor: string;
    backgroundColor: CanvasGradient;
    fill: boolean;
    spanGaps: boolean;
}

interface ChartLine {
    labels: string[];
    datasets: Data[];
}

const dataList: MonthLabel[] = [
    { day: 'Thứ 2', amount: '100.0' },
    { day: 'Thứ 3', amount: '125.0' },
    { day: 'Thứ 4', amount: '130.0' },
    { day: 'Thứ 5', amount: '180.0' },
    { day: 'Thứ 6', amount: '160.0' },
    { day: 'Thứ 7', amount: '170.0' },
    { day: 'CN', amount: '150.0' },
];

function LineChart() {
    const [chartData, setChartData] = useState<ChartLine>({
        labels: [],
        datasets: [
            {
                data: [],
                tension: 0.5,
                borderColor: '#FF993C',
                pointBorderColor: 'transparent',
                backgroundColor: {} as CanvasGradient,
                fill: true,
                spanGaps: true,
            },
        ],
    });

    const LinearGradientBackground = () => {
        const color = document.createElement('canvas').getContext('2d');
        if (color) {
            const gradient = color.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, '#FAA05F');
            gradient.addColorStop(0.9, '#FFFFFF');
            return gradient;
        }
        return {} as CanvasGradient;
    };

    useEffect(() => {
        setChartData({
            labels: dataList.map((month) => month.day),
            datasets: [
                {
                    data: dataList.map((month) => month.amount),
                    tension: 0.5,
                    fill: true,
                    spanGaps: true,
                    borderColor: '#FF993C',
                    pointBorderColor: 'transparent',
                    backgroundColor: LinearGradientBackground(),
                },
            ],
        });
    }, []);

    const options = {
        responsive: false,
        scales: {
            y: {
                ticks: {
                    stepSize: 40,
                },
            },
            x: {
                grid: {
                    display: false,
                    drawTicks: false,
                    drawBorder: false,
                    drawOnChartArea: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 0,
            },
        },
    };

    return <Line width={976} data={chartData} height={180} options={options} />;
}

export default LineChart;
