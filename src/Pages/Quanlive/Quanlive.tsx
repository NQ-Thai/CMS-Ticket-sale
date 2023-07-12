import { Button, Layout, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';
import Search from './Search';
import Tableve from './Table';

function Quanlive() {
    const [modalOpen, setModalOpen] = useState(false);
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
                            margin: '0 20px 20px 0',
                        }}
                    >
                        <div className="content">Danh sách vé</div>
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
                            <Tableve />
                        </div>
                    </Content>
                </Layout>
                <Modal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    title={'Lọc vé'}
                    centered
                >
                    <Button>Lọc</Button>
                </Modal>
            </Layout>
        </div>
    );
}

export default Quanlive;