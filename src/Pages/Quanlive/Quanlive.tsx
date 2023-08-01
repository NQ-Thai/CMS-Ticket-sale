import { Button, Layout } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Content } from 'antd/es/layout/layout';
import { useRef, useState } from 'react';
import { BsFunnel } from 'react-icons/bs';
import ModalFilter from './ModalFilter';
import SearchQuanlive from './Search';
import TableGoidichvu from './TableGoidichvu';
import TableGoigiadinh from './TableGoigiadinh';

function Quanlive() {
    const [selectedOption, setSelectedOption] = useState<'goi-gia-dinh' | 'goi-dich-vu'>(
        'goi-gia-dinh',
    );

    const [selectedTable, setSelectedTable] = useState<'goi-gia-dinh' | 'goi-dich-vu'>(
        'goi-gia-dinh',
    );

    const handleGoiGiaDinhClick = () => {
        setSelectedOption('goi-gia-dinh');
        setSelectedTable('goi-gia-dinh'); // Chọn bảng TableGoigiadinh khi chọn "Gói gia đình"
    };

    const handleGoiDichVuClick = () => {
        setSelectedOption('goi-dich-vu');
        setSelectedTable('goi-dich-vu'); // Chọn bảng TableGoidichvu khi chọn "Gói dịch vụ"
    };

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

                    <div style={{ margin: '0 0 0 0' }}>
                        {/* Use conditional styling for the "Gói gia đình" span */}
                        <span
                            className={`chart-text ${
                                selectedOption === 'goi-gia-dinh' ? 'selected' : ''
                            }`}
                            style={{ font: 'Montserrat' }}
                            onClick={handleGoiGiaDinhClick}
                        >
                            Gói gia đình
                        </span>

                        {/* Use conditional styling for the "Gói dịch vụ" span */}
                        <span
                            className={`chart-text ${
                                selectedOption === 'goi-dich-vu' ? 'selected' : ''
                            }`}
                            style={{ font: 'Montserrat' }}
                            onClick={handleGoiDichVuClick}
                        >
                            Gói dịch vụ
                        </span>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <SearchQuanlive searchValue={searchValue} onChange={handleSearchChange} />

                        <Button
                            onClick={openModalFilter}
                            className="button"
                            type="primary"
                            style={{
                                color: '#FF993C',
                                borderColor: '#FF993C',
                                height: '36px',
                                width: '120px',
                                marginLeft: '370px',
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
                                height: '36px',
                                width: '150px',
                                marginLeft: '10px',
                            }}
                            ghost
                        >
                            <span className="text-button">Xuất file (.csv)</span>
                        </Button>
                    </div>
                    <div style={{ marginTop: '5px' }}>
                        {/* Dựa vào giá trị của selectedTable để hiển thị bảng tương ứng */}
                        {selectedTable === 'goi-gia-dinh' ? (
                            <TableGoigiadinh
                                selectedTinhTrangProp={selectedTinhTrangModal}
                                handleRadioChangeProp={setSelectedTinhTrangModal}
                                searchValue={searchValue}
                                selectedCheckboxes={filteredCheckboxes}
                            />
                        ) : (
                            <TableGoidichvu
                                selectedTinhTrangProp={selectedTinhTrangModal}
                                handleRadioChangeProp={setSelectedTinhTrangModal}
                                searchValue={searchValue}
                                selectedCheckboxes={filteredCheckboxes}
                            />
                        )}
                    </div>
                </Content>
            </Layout>
            <ModalFilter
                visible={modalVisibleFilter}
                onCancel={closeModalFilter}
                selectedTinhTrangProp={selectedTinhTrangModal}
                handleRadioChangeProp={handleRadioChange}
                selectedCheckboxesProp={selectedCheckboxesQuanlive}
                handleCheckboxChangeProp={handleCheckboxChange}
            />
        </div>
    );
}

export default Quanlive;
