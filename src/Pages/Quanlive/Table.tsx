import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { SlOptionsVertical } from 'react-icons/sl';
import { ticketCollection } from '../../lib/controller';

//Firebase
interface NewTicketType {
    STT?: string;
    SoVe?: string;
    BookingCode?: string;
    Checkin?: string;
    NgaySuDung?: Date;
    NgayXuatVe?: Date;
    TinhTrangSuDung: string;
}

interface TableQuanLiVeProps {
    selectedTinhTrangProp: string | null;
    handleRadioChangeProp: (value: string) => void;
}

const renderStatus = (TinhTrangSuDung: string | undefined) => {
    const status = TinhTrangSuDung ?? 'Unknown';
    return (
        <span
            style={{
                display: 'inline-block',
                padding: '5px 10px',
                borderRadius: '5px',
                color:
                    status === 'Hết hạn'
                        ? '#FD5959'
                        : status === 'Chưa sử dụng'
                        ? '#03AC00'
                        : '#919DBA',
                border: `1px solid ${
                    status === 'Hết hạn'
                        ? '#FD5959'
                        : status === 'Chưa sử dụng'
                        ? '#03AC00'
                        : '#919DBA'
                }`,
                background:
                    status === 'Hết hạn'
                        ? '#FFEDED'
                        : status === 'Chưa sử dụng'
                        ? '#E6FFE6'
                        : '#F5F5F5',
            }}
        >
            <BsFillCircleFill
                style={{
                    marginRight: '5px',
                    color:
                        status === 'Hết hạn'
                            ? '#FD5959'
                            : status === 'Chưa sử dụng'
                            ? '#03AC00'
                            : '#919DBA',
                }}
            />
            {status}
        </span>
    );
};

const columns: ColumnsType<NewTicketType> = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
    },
    {
        title: 'Booking Code',
        dataIndex: 'BookingCode',
        key: 'BookingCode',
    },
    {
        title: 'Số vé',
        dataIndex: 'SoVe',
        key: 'SoVe',
    },
    {
        title: 'Tình trạng sử dụng',
        key: 'TinhTrangSuDung',
        dataIndex: 'TinhTrangSuDung',
        render: renderStatus,
    },

    {
        title: 'Ngày sử dụng',
        key: 'NgaySuDung',
        dataIndex: 'NgaySuDung',
        render: (date: Date | string) => {
            if (date instanceof Date) {
                return format(date, 'dd/MM/yyyy');
            } else {
                return date;
            }
        },
    },
    {
        title: 'Ngày xuất vé',
        key: 'NgayXuatVe',
        dataIndex: 'NgayXuatVe',
        render: (date: Date | string) => {
            if (date instanceof Date) {
                return format(date, 'dd/MM/yyyy');
            } else {
                return date;
            }
        },
    },
    {
        title: 'Cổng check-in',
        key: 'Checkin',
        dataIndex: 'Checkin',
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

const getTagColor = (tag: string) => {
    if (tag === 'Hết hạn') {
        return 'red';
    } else if (tag === 'Chưa sử dụng') {
        return 'green';
    } else if (tag.length > 5) {
        return 'geekblue';
    }
    return 'green';
};

const paginationConfig: TablePaginationConfig = {
    position: ['bottomCenter'],
    size: 'small',
    pageSize: 5,
    pageSizeOptions: ['5', '15', '20, 25'],
};

function TableQuanLiVe({ selectedTinhTrangProp }: TableQuanLiVeProps) {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
            setTickets(
                snapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    return {
                        STT: `${index + 1}`,
                        ...data,
                        NgaySuDung: data.NgaySuDung ? data.NgaySuDung.toDate() : null,
                        NgayXuatVe: data.NgayXuatVe ? data.NgayXuatVe.toDate() : null,
                        TinhTrangSuDung: data.TinhTrangSuDung || '',
                    };
                }) as NewTicketType[],
            );
        });
    }, []);

    console.log(tickets, 'ticket');

    // Lọc dữ liệu dựa trên giá trị selectedTinhTrangProp và kiểm tra selectedTinhTrangProp khác null
    const filteredTickets =
        selectedTinhTrangProp !== null && selectedTinhTrangProp !== 'all'
            ? tickets.filter((ticket) => ticket.TinhTrangSuDung.includes(selectedTinhTrangProp))
            : tickets;

    return (
        <div>
            <Table
                className="custom-table"
                style={{
                    margin: '5px 20px 0 20px',
                    height: '437px',
                }}
                columns={columns}
                dataSource={filteredTickets}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
}

export default TableQuanLiVe;
