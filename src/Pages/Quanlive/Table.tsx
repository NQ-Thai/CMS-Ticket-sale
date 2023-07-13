import { Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BsFillCircleFill } from 'react-icons/bs';
import { SlOptionsVertical } from 'react-icons/sl';

interface DataType {
    key: string;
    stt: string;
    bookingCode: string;
    soVe: string;
    tinhTrang: string[];
    ngaySuDung: string;
    ngayXuatVe: string;
    congCheckIn: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Booking Code',
        dataIndex: 'bookingCode',
        key: 'bookingCode',
    },
    {
        title: 'Số vé',
        dataIndex: 'soVe',
        key: 'soVe',
    },
    {
        title: 'Tình trạng sử dụng',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tinhTrang }) => (
            <>
                {tinhTrang.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Hết hạn') {
                        color = 'red';
                    } else if (tag === 'Chưa sử dụng') color = 'green';
                    return (
                        <Tag color={color} key={tag}>
                            <BsFillCircleFill /> {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Ngày sử dụng',
        key: 'ngaySuDung',
        dataIndex: 'ngaySuDung',
    },
    {
        title: 'Ngày xuất vé',
        key: 'ngayXuatVe',
        dataIndex: 'ngayXuatVe',
    },
    {
        title: 'Cổng check-in',
        key: 'congCheckIn',
        dataIndex: 'congCheckIn',
    },
    {
        title: ' ',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <SlOptionsVertical onClick={() => {}} />
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        stt: '1',
        bookingCode: 'ALTFGHJU',
        soVe: '123456789034',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '2',
        stt: '2',
        bookingCode: 'ALFDSGTR',
        soVe: '123456789054',
        tinhTrang: ['Chưa sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '3',
        stt: '3',
        bookingCode: 'ALFDSGGF',
        soVe: '123456789087',
        tinhTrang: ['Hết hạn'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '4',
        stt: '4',
        bookingCode: 'ALFDSGJK',
        soVe: '123456789099',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '5',
        stt: '5',
        bookingCode: 'ALFDSGVC',
        soVe: '123456789023',
        tinhTrang: ['Đã sử dụngn'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '6',
        stt: '6',
        bookingCode: 'ALFDSGMN',
        soVe: '123456789012',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '7',
        stt: '7',
        bookingCode: 'ALFDSGBV',
        soVe: '123456789009',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '8',
        stt: '8',
        bookingCode: 'ALFDSGTR',
        soVe: '123456789076',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '9',
        stt: '9',
        bookingCode: 'ALFDSGLK',
        soVe: '123456789012',
        tinhTrang: ['Đã sử dụng'],
        ngaySuDung: '14/04/2023',
        ngayXuatVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
];

const paginationConfig: TablePaginationConfig = {
    position: ['bottomCenter'],
    size: 'small',
    pageSize: 6,
    pageSizeOptions: ['6', '12', '18, 26'],
};

function TableQuanLiVe() {
    return (
        <div>
            <Table
                className="custom-table"
                style={{
                    margin: '5px 20px 0 20px',
                }}
                columns={columns}
                dataSource={data}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
}

export default TableQuanLiVe;
