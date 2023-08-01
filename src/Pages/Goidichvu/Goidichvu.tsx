import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { FC, useState } from 'react';
import NewModal from './NewModal';
import SearchGoidichvu from './Search';
import TableGoiDichVu from './Table';

const Goidichvu: FC = () => {
    // Add Modal
    const [modalVisible, setModalVisible] = useState(false);

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Layout
                style={{
                    backgroundColor: '#FFFFFF',
                    margin: '0 20px 1px 0',
                    borderRadius: '15px',
                }}
            >
                <Content>
                    <div className="content">Danh sách gói vé</div>
                    <div>
                        <SearchGoidichvu searchValue={searchValue} onChange={handleSearchChange} />
                        <Button
                            className="button"
                            type="primary"
                            style={{
                                color: '#FF993C',
                                borderColor: '#FF993C',
                                height: '36px',
                                width: '150px',
                                marginLeft: '355px',
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
                                height: '36px',
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
                    <div style={{ marginTop: '10px' }}>
                        <TableGoiDichVu searchValue={searchValue} />
                    </div>
                </Content>
            </Layout>
            <NewModal visible={modalVisible} onCancel={closeModal} />
        </div>
    );
};

export default Goidichvu;
