import { DatePicker, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../Component/Header';
import NavBar from '../Component/NavBar';

function Trangchu() {
    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout
                    className="layout-content"
                    style={{
                        backgroundColor: '#FFFFFF',
                        marginRight: '50px',
                    }}
                >
                    <Content
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="content">Thống kê</div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span
                                className="chart-text"
                                style={{
                                    font: 'Montserrat',
                                    alignSelf: 'flex-start',
                                }}
                            >
                                Doanh thu
                            </span>

                            <DatePicker
                                className="custom-datepicker"
                                style={{
                                    width: '155px',
                                    height: '40px',
                                    alignSelf: 'flex-end',
                                    borderColor: '#A5A8B1',
                                }}
                            />
                        </div>
                        <div
                            style={{
                                padding: '90px',
                            }}
                        >
                            {/* Chart line */}
                        </div>
                        <div className="total-div">
                            <span className="total-text">Tổng danh thu theo tuần</span>
                            <div>
                                <span className="text-price">525.145.000</span>{' '}
                                <span className="text-dong"> đồng</span>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: '30px',
                            }}
                            className="total-div"
                        >
                            <DatePicker
                                className="custom-datepicker"
                                style={{
                                    width: '155px',
                                    height: '40px',
                                    alignSelf: 'flex-end',
                                    borderColor: '#A5A8B1',
                                }}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Trangchu;
