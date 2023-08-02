import {
    Button,
    Col,
    DatePicker,
    Layout,
    Radio,
    RadioChangeEvent,
    Row,
    Space,
    message,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { doc, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { firestore, ticketCollection } from '../../lib/controller';
import SearchDoisoatve from './Search';
import TableDoiSoatVe, { NewTicketType } from './Table';

const Doisoatve: React.FC = () => {
    //Radio
    const [value, setValue] = useState(1);
    const [filterValue, setFilterValue] = useState(1);

    // State for storing the filtered data
    const [filteredData, setFilteredData] = useState<NewTicketType[]>([]);

    const [fromDate, setFromDate] = useState<any>(null);
    const [toDate, setToDate] = useState<any>(null);

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleFilterClick = () => {
        setFilterValue(value);
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleFromDateChange = (date: any) => {
        setFromDate(date);
    };

    const handleToDateChange = (date: any) => {
        setToDate(date);
    };

    const handleChotDoiSoatClick = async () => {
        try {
            console.log('Chốt đối soát button clicked.');
            const batch = writeBatch(firestore);

            for (const ticket of filteredData) {
                const ticketRef = doc(ticketCollection, ticket.id);
                batch.update(ticketRef, { TrangThai: 'Đã đối soát' });
            }

            await batch.commit();

            message.success('Chốt đối soát thành công');
        } catch (error: any) {
            message.error('Lỗi khi chốt đối soát: ' + error.message);
        }
    };

    return (
        <div>
            <Layout>
                <Content>
                    <Row>
                        <Col flex="2">
                            {/* Nội dung cột 1 */}
                            <div
                                style={{
                                    width: '670px',
                                    background: '#FFFFFF',
                                    height: '88vh',
                                    borderRadius: '15px',
                                }}
                            >
                                <div className="content">Đối soát vé</div>
                                <div>
                                    <SearchDoisoatve
                                        searchValue={searchValue}
                                        onChange={handleSearchChange}
                                    />
                                    <Button
                                        className="button-col1"
                                        type="primary"
                                        style={{
                                            backgroundColor: '#FF993C',
                                            width: '130px',
                                            height: '40px',
                                            marginLeft: '175px',
                                        }}
                                        onClick={handleChotDoiSoatClick}
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
                                <div style={{ marginTop: '5px' }}>
                                    <TableDoiSoatVe
                                        selectedRadioValue={filterValue}
                                        fromDate={fromDate}
                                        toDate={toDate}
                                        searchValue={searchValue}
                                        filteredData={filteredData}
                                        setFilteredData={setFilteredData}
                                    />
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
                                    background: '#FFFFFF',
                                    width: '330px',
                                    height: '88vh',

                                    margin: '0 20px 0 0',
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
                                                    style={{
                                                        font: 'Montserrat',
                                                    }}
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
                                <div style={{ marginTop: '30px' }}>
                                    <span style={{ font: 'Montserrat' }} className="side-text">
                                        Loại vé
                                    </span>
                                    <div style={{ display: 'inline' }}>
                                        <span
                                            style={{ marginLeft: '102px' }}
                                            className="custom-radio"
                                        >
                                            Vé cổng
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <span
                                        style={{
                                            font: 'Montserrat',
                                            marginRight: '95px',
                                        }}
                                        className="side-text"
                                    >
                                        Từ ngày
                                    </span>
                                    <div style={{ display: 'inline' }}>
                                        <DatePicker
                                            className="custom-datepicker"
                                            value={fromDate}
                                            onChange={handleFromDateChange}
                                            placement="topLeft"
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '30px' }}>
                                    <span
                                        style={{
                                            font: 'Montserrat',
                                            marginRight: '85px',
                                        }}
                                        className="side-text"
                                    >
                                        Đến ngày
                                    </span>
                                    <div style={{ display: 'inline' }}>
                                        <DatePicker
                                            className="custom-datepicker"
                                            value={toDate}
                                            onChange={handleToDateChange}
                                            placement="topLeft"
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
                                        onClick={handleFilterClick}
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
        </div>
    );
};

export default Doisoatve;
