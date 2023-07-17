import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Layout,
    Modal,
    Radio,
    RadioChangeEvent,
    Row,
} from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';
import Search from './Search';
import TableQuanLiVe from './Table';

function Quanlive() {
    // Modal
    const [modalOpen, setModalOpen] = useState(false);

    // Radio
    const [value, setValue] = useState(1);

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    //Check Box
    const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content
                        className="layout-content"
                        style={{
                            backgroundColor: '#FFFFFF',
                            margin: '0 20px 1px 0',
                        }}
                    >
                        <div style={{ font: 'Montserrat' }} className="content">
                            Danh sách vé
                        </div>
                        <div>
                            <Search />
                            <Button
                                onClick={() => setModalOpen(true)}
                                className="button"
                                type="primary"
                                style={{
                                    color: '#FF993C',
                                    borderColor: '#FF993C',
                                    height: '35px',
                                    width: '120px',
                                    marginLeft: '360px',
                                }}
                                ghost
                            >
                                <BsFunnel
                                    style={{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '10px',
                                        verticalAlign: 'middle',
                                    }}
                                />
                                <span style={{}} className="text-button">
                                    Lọc vé
                                </span>
                            </Button>
                            <Button
                                className="button"
                                type="primary"
                                style={{
                                    color: '#FF993C',
                                    borderColor: '#FF993C',
                                    height: '34px',
                                    width: '140px',
                                    marginLeft: '10px',
                                }}
                                ghost
                            >
                                <span className="text-button">Xuất file (.csv)</span>
                            </Button>
                        </div>
                        <div>
                            <TableQuanLiVe />
                        </div>
                    </Content>
                </Layout>
                <Modal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    title={
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '26px',
                            }}
                        >
                            <span className="modal-title" style={{ font: 'Montserrat' }}>
                                Lọc vé
                            </span>
                        </div>
                    }
                    footer={null}
                    centered
                >
                    <div style={{ marginBottom: '5px' }}>
                        <span
                            style={{
                                font: 'Montserrat',
                                paddingRight: '170px',
                            }}
                            className="modal-text"
                        >
                            Từ ngày
                        </span>
                        <span style={{ font: 'Montserrat' }} className="modal-text">
                            Đến ngày
                        </span>
                    </div>
                    {/* Lịch */}
                    <div>
                        <div
                            style={{
                                paddingRight: '85px',
                                display: 'inline',
                            }}
                        >
                            <DatePicker
                                className="custom-datepicker"
                                style={{
                                    width: '143px',
                                    height: '40px',
                                    borderColor: '#A5A8B1',
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: 'inline',
                            }}
                        >
                            <DatePicker
                                className="custom-datepicker"
                                style={{
                                    width: '143px',
                                    height: '40px',
                                    borderColor: '#A5A8B1',
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div>
                            <span className="modal-text">Tình trạng sử dụng</span>
                        </div>
                        <div>
                            <Radio.Group style={{ marginTop: '5px' }}>
                                <Radio className="custom-radio" value={1}>
                                    Tất cả
                                </Radio>
                                <Radio className="custom-radio" value={2}>
                                    Đã sử dụng
                                </Radio>
                                <Radio className="custom-radio" value={3}>
                                    Chưa sử dụng
                                </Radio>
                                <Radio className="custom-radio" value={4}>
                                    Hết hạn
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div style={{ margin: '20px 0 40px 0' }}>
                        <div>
                            <span className="modal-text">Cổng Check-in</span>
                        </div>
                        <div>
                            <Checkbox.Group
                                style={{ width: '100%', marginTop: '8px' }}
                                onChange={onChangeCheckBox}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="A">
                                            Tất cả
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="B">
                                            Cổng 1
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="C">
                                            Cổng 2
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="D">
                                            Cổng 3
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="E">
                                            Cổng 4
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox className="custom-checkbox" value="F">
                                            Cổng 5
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={() => setModalOpen(false)}
                            className="button"
                            type="primary"
                            style={{
                                font: 'Montserrat',
                                color: '#FF993C',
                                borderColor: '#FF993C',
                                height: '40px',
                                width: '140px',
                            }}
                            ghost
                        >
                            <span className="text-button">Lọc</span>
                        </Button>
                    </div>
                </Modal>
            </Layout>
        </div>
    );
}

export default Quanlive;
