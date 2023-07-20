import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { FC, useState } from 'react';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';
import Search from '../Quanlive/Search';
import NewModal from './NewModal';
import TableGoiDichVu from './Table';

const Goidichvu: FC = () => {
    // Add Modal
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    <Content>
                        <div className="content">Danh sách gói vé</div>
                        <div>
                            <Search />
                            <Button
                                className="button"
                                type="primary"
                                style={{
                                    color: '#FF993C',
                                    borderColor: '#FF993C',
                                    height: '34px',
                                    width: '140px',
                                    marginLeft: '380px',
                                }}
                                ghost
                            >
                                <span className="text-button">Xuất file (.csv)</span>
                            </Button>
                            <Button
                                onClick={openModal}
                                className="button-col1"
                                type="primary"
                                style={{
                                    backgroundColor: '#FF993C',
                                    width: '120px',
                                    height: '34px',
                                    margin: '0 0 3px 24px',
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
                                    Thêm gói vé
                                </span>
                            </Button>
                        </div>
                        <div>
                            <TableGoiDichVu />
                        </div>
                    </Content>
                </Layout>
                <NewModal visible={modalVisible} onCancel={closeModal} />
            </Layout>
        </div>
    );
};

export default Goidichvu;
