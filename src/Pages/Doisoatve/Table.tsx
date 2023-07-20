import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ticketCollection } from '../../lib/controller';

//Firebase
interface NewTicketType {
    STT?: string;
    SoVe?: string;
    TenSuKien?: string;
    Checkin?: string;
    NgaySuDung?: string;
    LoaiVe?: string;
    TrangThai?: string;
}

const columns: ColumnsType<NewTicketType> = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
    },

    {
        title: 'Số vé',
        dataIndex: 'SoVe',
        key: 'SoVe',
    },
    {
        title: 'Tên sự kiện',
        dataIndex: 'TenSuKien',
        key: 'TenSuKien',
    },
    {
        title: 'Ngày sử dụng',
        key: 'NgaySuDung',
        dataIndex: 'NgaySuDung',
    },
    {
        title: 'Loại vé',
        key: 'LoaiVe',
        dataIndex: 'LoaiVe',
    },
    {
        title: 'Cổng check-in',
        key: 'Checkin',
        dataIndex: 'Checkin',
    },
    {
        title: ' ',
        key: 'TrangThai',
        dataIndex: 'TrangThai',
        render: (TrangThai) => (
            <Space size="middle">
                <span
                    className="text-table"
                    style={{
                        fontStyle: 'italic',
                        color: TrangThai === 'Chưa đối soát' ? '#A5A8B1' : 'green',
                        // Thêm các CSS tùy chỉnh khác tại đây dựa vào giá trị của trạng thái
                    }}
                >
                    {TrangThai}
                </span>
            </Space>
        ),
    },
];

const paginationConfig: TablePaginationConfig = {
    position: ['bottomCenter'],
    size: 'small',
    pageSize: 5,
    pageSizeOptions: ['5', '10', '15', '20'],
};

function TableDoiSoatVe() {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    useEffect(
        () =>
            onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
                setTickets(
                    snapshot.docs.map((doc, index) => {
                        return {
                            STT: `${index + 1}`,
                            ...doc.data(),
                        };
                    }),
                );
            }),
        [],
    );

    // console.log(tickets, 'ticket');
    return (
        <div>
            <Table
                className="custom-table"
                size="small"
                style={{
                    font: 'Montserrat',
                    margin: '5px 20px 0 20px',
                }}
                columns={columns}
                dataSource={tickets}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
}

export default TableDoiSoatVe;
