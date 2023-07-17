import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface DataType {
    key: string;
    stt: string;
    soVe: string;
    ngaySuDung: string;
    tenLoaiVe: string;
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
        title: 'Số vé',
        dataIndex: 'soVe',
        key: 'soVe',
    },
    {
        title: 'Ngày sử dụng',
        key: 'ngaySuDung',
        dataIndex: 'ngaySuDung',
    },
    {
        title: 'Tên loại vé',
        key: 'tenLoaiVe',
        dataIndex: 'tenLoaiVe',
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
                <span
                    className="text-table"
                    style={{
                        fontStyle: 'italic',
                        color: '#A5A8B1',
                    }}
                >
                    Chưa đối soát
                </span>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        stt: '1',
        soVe: '123456789034',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '2',
        stt: '2',
        soVe: '123456789054',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '3',
        stt: '3',
        soVe: '123456789087',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '4',
        stt: '4',
        soVe: '123456789099',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '5',
        stt: '5',
        soVe: '123456789023',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '6',
        stt: '6',
        soVe: '123456789012',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '7',
        stt: '7',
        soVe: '123456789009',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '8',
        stt: '8',
        soVe: '123456789076',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '9',
        stt: '9',
        soVe: '123456789012',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
    {
        key: '10',
        stt: '10',
        soVe: '123456789032',
        ngaySuDung: '14/04/2023',
        tenLoaiVe: '14/04/2023',
        congCheckIn: 'Cổng 1',
    },
];

const paginationConfig: TablePaginationConfig = {
    position: ['bottomCenter'],
    size: 'small',
    pageSize: 8,
    pageSizeOptions: ['8', '16', '24', '32'],
};

function TableDoiSoatVe() {
    return (
        <div>
            <Table
                className="custom-table"
                size="small"
                style={{
                    font: 'Montserrat',
                    margin: '20px 20px 0 20px',
                }}
                columns={columns}
                dataSource={data}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
}

export default TableDoiSoatVe;
