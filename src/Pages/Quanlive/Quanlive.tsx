import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useRef, useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import ModalFilter from './Modal';
import Search from './Search';
import TableQuanLiVe from './Table';

function Quanlive() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    // Filter Modal
    const [modalVisibleFilter, setModalVisibleFilter] = useState(false);

    // State mới để lưu trạng thái của radio được chọn trong Modal
    const [selectedTinhTrangModal, setSelectedTinhTrangModal] = useState<string>('all');

    const openModalFilter = () => {
        setModalVisibleFilter(true);
    };

    const closeModalFilter = () => {
        setModalVisibleFilter(false);
    };

    const handleRadioChange = (value: string) => {
        setSelectedTinhTrangModal(value);
    };

    return (
        <div>
            <Layout>
                <Content
                    className="layout-content"
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '0 20px 0 0',
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
                            selectedTinhTrangProp={selectedTinhTrangModal}
                            handleRadioChangeProp={handleRadioChange}
                        />
                    </div>
                </Content>
            </Layout>
            <ModalFilter
                visible={modalVisibleFilter}
                onCancel={closeModalFilter}
                selectedTinhTrangProp={selectedTinhTrangModal}
                handleRadioChangeProp={handleRadioChange}
            />
        </div>
    );
}

export default Quanlive;
