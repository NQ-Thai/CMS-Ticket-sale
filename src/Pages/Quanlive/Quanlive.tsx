import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';
import ModalFilter from './Modal';
import Search from './Search';
import TableQuanLiVe from './Table';

function Quanlive() {
    // Filter Modal
    const [modalVisibleFilter, setModalVisibleFilter] = useState(false);
    const [selectedTinhTrang, setSelectedTinhTrang] = useState<string | null>('all');

    const openModalFilter = () => {
        setModalVisibleFilter(true);
    };

    const closeModalFilter = () => {
        setModalVisibleFilter(false);
    };

    const handleRadioChange = (value: string) => {
        setSelectedTinhTrang(value);
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
                            borderRadius: '15px',
                        }}
                    >
                        <div style={{ font: 'Montserrat' }} className="content">
                            Danh sách vé
                        </div>
                        <div>
                            <Search />
                            <Button
                                onClick={openModalFilter}
                                className="button"
                                type="primary"
                                style={{
                                    color: '#FF993C',
                                    borderColor: '#FF993C',
                                    height: '35px',
                                    width: '120px',
                                    marginLeft: '380px',
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
                                <span className="text-button">Lọc vé</span>
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
                        <div style={{ marginTop: '5px' }}>
                            <TableQuanLiVe
                                selectedTinhTrangProp={selectedTinhTrang} // Truyền state selectedTinhTrang vào TableQuanLiVe
                                handleRadioChangeProp={handleRadioChange} // Truyền hàm handleRadioChange vào TableQuanLiVe
                            />
                        </div>
                    </Content>
                </Layout>
                <ModalFilter
                    visible={modalVisibleFilter}
                    onCancel={closeModalFilter}
                    selectedTinhTrangProp={selectedTinhTrang}
                    handleRadioChangeProp={handleRadioChange}
                />
            </Layout>
        </div>
    );
}

export default Quanlive;
