import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    stt: string;
    bookingCode: string;
    soVe: string;
    tinhTrang: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text) => <a>{text}</a>,
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
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Delete</a>
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
    },
    {
        key: '2',
        stt: '2',
        bookingCode: 'ALFDSGTR',
        soVe: '123456789054',
        tinhTrang: ['Chưa sử dụng'],
    },
    {
        key: '3',
        stt: '3',
        bookingCode: 'ALFDSGGF',
        soVe: '123456789087',
        tinhTrang: ['Hết hạn'],
    },
];

function Tableve() {
    return (
        <div>
            <Table
                style={{
                    margin: '20px 20px 0 20px',
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}

export default Tableve;
