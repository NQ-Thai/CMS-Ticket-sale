import { ArcElement, Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);
// ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue'],
    datasets: [
        {
            label: 'data 1',
            data: [35, 65],
            backgroundColor: ['#FF8A48', '#4F75FF'],
            borderColor: ['#FF8A48', '#4F75FF'],
            borderWidth: 2,
        },
    ],
};

export function DoughnutChart() {
    return <Doughnut data={data} />;
}
