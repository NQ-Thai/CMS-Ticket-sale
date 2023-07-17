import { Button, Col, DatePicker, Layout, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';
import Search from '../Quanlive/Search';
import TableDoiSoatVe from './Table';

const Doisoatve: React.FC = () => {
    //Radio
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="layout-content">
                        <Row>
                            <Col flex="2">
                                {/* Nội dung cột 1 */}
                                <div
                                    style={{
                                        width: '680px',
                                        background: 'white',
                                        height: '87vh',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <div className="content">Đối soát vé</div>
                                    <div>
                                        <Search />
                                        <Button
                                            className="button-col1"
                                            type="primary"
                                            style={{
                                                backgroundColor: '#FF993C',
                                                width: '130px',
                                                height: '40px',
                                                marginLeft: '200px',
                                            }}
                                        >
                                            <span
                                                className="text-button"
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                    font: 'Montserrat',
                                                    lineHeight: '26px',
                                                }}
                                            >
                                                Chốt đối soát
                                            </span>
                                        </Button>
                                    </div>
                                    <div
                                        style={
                                            {
                                                // padding: '50px',
                                            }
                                        }
                                    >
                                        <TableDoiSoatVe />
                                    </div>
                                </div>
                            </Col>
                            <Col
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                flex="1"
                            >
                                {/* Nội dung cột 2 */}
                                <div
                                    style={{
                                        background: 'white',
                                        width: '330px',
                                        height: '87vh',

                                        margin: '0 5px 0 0',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <div
                                        style={{
                                            font: 'Montserrat',
                                        }}
                                        className="side-title"
                                    >
                                        Lọc vé
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                font: 'Montserrat',
                                            }}
                                            className="side-text"
                                        >
                                            Tình trạng đối soát
                                        </span>
                                        <div
                                            style={{
                                                display: 'inline',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            <Radio.Group onChange={onChange} value={value}>
                                                <Space direction="vertical">
                                                    <Radio
                                                        className="custom-radio"
                                                        // style={{
                                                        //     font: 'Montserrat',
                                                        // }}
                                                        value={1}
                                                    >
                                                        Tất cả
                                                    </Radio>
                                                    <Radio className="custom-radio" value={2}>
                                                        Đã đối soát
                                                    </Radio>
                                                    <Radio className="custom-radio" value={3}>
                                                        Chưa đối soát
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: '10px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                font: 'Montserrat',
                                            }}
                                            className="side-text"
                                        >
                                            Loại vé
                                        </span>
                                        <div
                                            style={{
                                                display: 'inline',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginLeft: '102px',
                                                }}
                                                className="custom-radio"
                                            >
                                                Vé cổng
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: '10px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                font: 'Montserrat',
                                                marginRight: '95px',
                                            }}
                                            className="side-text"
                                        >
                                            Từ ngày
                                        </span>
                                        <div
                                            style={{
                                                display: 'inline',
                                            }}
                                        >
                                            <DatePicker
                                                placement={'topLeft'}
                                                style={{ width: '150px', height: '40px' }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: '20px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                font: 'Montserrat',
                                                marginRight: '85px',
                                            }}
                                            className="side-text"
                                        >
                                            Đến ngày
                                        </span>
                                        <div
                                            style={{
                                                display: 'inline',
                                            }}
                                        >
                                            <DatePicker
                                                style={{ width: '150px', height: '40px' }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Button
                                            className="button"
                                            type="primary"
                                            style={{
                                                color: '#FF993C',
                                                borderColor: '#FF993C',
                                                height: '35px',
                                                width: '120px',
                                                marginTop: '20px',
                                            }}
                                            ghost
                                        >
                                            <span
                                                style={{
                                                    font: 'Montserrat',
                                                    fontWeight: '700',
                                                    lineHeight: '26px',
                                                    fontSize: '18px',
                                                }}
                                                className="text-button"
                                            >
                                                Lọc
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Doisoatve;
