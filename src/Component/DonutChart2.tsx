import { ArcElement, Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

export const data = {
    labels: [],
    datasets: [
        {
            label: 'data 1',
            data: [60, 40],
            backgroundColor: ['#FF8A48', '#4F75FF'],
            borderColor: ['#FF8A48', '#4F75FF'],
            borderWidth: 2,
        },
    ],
};

export function DoughnutChart2() {
    return <Doughnut data={data} />;
}
