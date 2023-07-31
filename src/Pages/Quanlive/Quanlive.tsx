import { Button, Layout } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Content } from 'antd/es/layout/layout';
import { useRef, useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import ModalFilter from './Modal';
import SearchQuanlive from './Search';
import TableQuanLiVe from './Table';

function Quanlive() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [filteredCheckboxes, setFilteredCheckboxes] = useState<CheckboxValueType[]>([]);

    // Filter Modal
    const [modalVisibleFilter, setModalVisibleFilter] = useState(false);

    // State mới để lưu trạng thái của radio được chọn trong Modal
    const [selectedTinhTrangModal, setSelectedTinhTrangModal] = useState<string>('all');
    const [selectedCheckboxesQuanlive, setSelectedCheckboxesQuanlive] = useState<
        CheckboxValueType[]
    >([]);

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const openModalFilter = () => {
        setModalVisibleFilter(true);
    };

    const closeModalFilter = () => {
        setModalVisibleFilter(false);
    };

    const handleRadioChange = (value: string) => {
        setSelectedTinhTrangModal(value);
    };

    const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
        setFilteredCheckboxes(checkedValues); // Cập nhật trạng thái filteredCheckboxes
    };

    const handleFilterClick = () => {
        closeModalFilter();
        setFilteredCheckboxes(selectedCheckboxesQuanlive);
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
                        <SearchQuanlive searchValue={searchValue} onChange={handleSearchChange} />

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
                            handleRadioChangeProp={setSelectedTinhTrangModal}
                            searchValue={searchValue}
                            selectedCheckboxes={filteredCheckboxes} // Truyền giá trị của filteredCheckboxes vào TableQuanLiVe
                        />
                    </div>
                </Content>
            </Layout>
            <ModalFilter
                visible={modalVisibleFilter}
                onCancel={closeModalFilter}
                selectedTinhTrangProp={selectedTinhTrangModal}
                handleRadioChangeProp={handleRadioChange}
                selectedCheckboxesProp={selectedCheckboxesQuanlive} // Truyền giá trị của filteredCheckboxes vào ModalFilter
                handleCheckboxChangeProp={handleCheckboxChange} // Truyền callback để cập nhật trạng thái filteredCheckboxes
            />
        </div>
    );
}

export default Quanlive;
