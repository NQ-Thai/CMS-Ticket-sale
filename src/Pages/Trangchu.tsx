import { DatePicker, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { DoughnutChart } from '../Component/DonutChart';
import { DoughnutChart2 } from '../Component/DonutChart2';
import LineChart from '../Component/LineChart';

const Trangchu: React.FC = () => {
    return (
        <div>
            <Layout>
                <Content
                    className="layout-content"
                    style={{
                        // width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFF',
                        margin: '0 20px 0 0',
                        borderRadius: '15px',
                    }}
                >
                    <div className="content">Thống kê</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span
                            className="chart-text"
                            style={{ font: 'Montserrat', alignSelf: 'flex-start' }}
                        >
                            Doanh thu
                        </span>
                        <DatePicker style={{ marginRight: '35px' }} className="custom-datepicker" />
                    </div>
                    <div style={{ margin: '0 0 5px 24px' }}>
                        {/* <LineChartComponent /> */}
                        <LineChart />
                    </div>
                    <div className="total-div">
                        <span className="total-text">Tổng danh thu theo tuần</span>
                        <div>
                            <span className="text-price">525.145.000</span>{' '}
                            <span className="text-dong">đồng</span>
                        </div>
                    </div>
                    <div
                        style={{
                            margin: '20px 0 0 24px',
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <div style={{ flexBasis: '25%' }}>
                            <DatePicker className="custom-datepicker" />
                        </div>
                        <div className="chart-column">
                            <span className="chart-title">Gói gia đình</span>
                            <div className="chart-div">
                                <DoughnutChart />
                            </div>
                        </div>
                        <div className="chart-column">
                            <span className="chart-title">Gói sự kiện</span>
                            <div className="chart-div">
                                <DoughnutChart2 />
                            </div>
                        </div>
                        <div className="chart-column"></div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default Trangchu;
