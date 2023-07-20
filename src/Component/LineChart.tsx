import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart: React.FC = () => {
    // Dữ liệu cho biểu đồ
    const data = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'], // Các nhãn trục x
        datasets: [
            {
                data: [160, 200, 180, 280, 220, 300, 180], // Dữ liệu y tương ứng với từng nhãn x
                fill: true, // Đổ màu dưới đường cong
                backgroundColor: (context: { chart: any }) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // Chưa có dữ liệu hoặc vùng biểu đồ chưa được tính toán
                        return null;
                    }

                    // Lấy y tương ứng với label đầu tiên và cuối cùng
                    const firstPoint = chart.getDatasetMeta(0)?.data?.[0];
                    const lastPoint = chart.getDatasetMeta(0)?.data?.slice(-1)?.[0];
                    if (!firstPoint || !lastPoint) {
                        return null;
                    }

                    // Tạo gradient màu từ trên xuống dưới
                    const gradient = ctx.createLinearGradient(
                        chartArea.left,
                        0,
                        chartArea.right,
                        0,
                    );
                    gradient.addColorStop(0, '#FF993C'); // Màu xuất phát (màu đường)
                    gradient.addColorStop(1, '#FFFFFF'); // Màu đổ xuống (màu nền)

                    return gradient;
                },
                borderColor: '#FF993C', // Màu đường (line)
                tension: 0.5, // Điều chỉnh độ cong của đường (0 là thẳng, 1 là cong nhất)
                pointRadius: 0,
            },
        ],
    };

    // Các tùy chọn cấu hình cho biểu đồ
    const options = {
        responsive: false, // Biểu đồ tự thích nghi với kích thước container
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                },
                grid: {
                    display: false, // Bỏ gạch dọc trên trục x
                },
            },
            y: {
                display: true,
                title: {
                    display: false,
                },
                ticks: {
                    stepSize: 5, // Khoảng cách giữa các mốc trên trục y
                    maxTicksLimit: 4, // Số lượng mốc tối đa hiển thị trên trục y
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Line width={976} height={180} data={data} options={options} />
        </div>
    );
};

export default LineChart;
