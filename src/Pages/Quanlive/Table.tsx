import { RadioChangeEvent, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
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
    NgaySuDung?: string;
    NgayXuatVe?: string;
    TinhTrangSuDung: string[];
}

interface TableQuanLiVeProps {
    // Thêm các props cần thiết tại đây
    selectedTinhTrangProp: string | null;
    handleRadioChangeProp: (value: string) => void;
}

const renderStatus = (TinhTrangSuDung: string) => (
    <span
        style={{
            display: 'inline-block',
            padding: '5px 10px',
            borderRadius: '5px',
            color:
                TinhTrangSuDung === 'Hết hạn'
                    ? '#FD5959'
                    : TinhTrangSuDung === 'Chưa sử dụng'
                    ? '#03AC00'
                    : '#919DBA',
            border: `1px solid ${
                TinhTrangSuDung === 'Hết hạn'
                    ? '#FD5959'
                    : TinhTrangSuDung === 'Chưa sử dụng'
                    ? '#03AC00'
                    : '#919DBA'
            }`,
            background:
                TinhTrangSuDung === 'Hết hạn'
                    ? '#FFEDED'
                    : TinhTrangSuDung === 'Chưa sử dụng'
                    ? '#E6FFE6'
                    : '#F5F5F5',
        }}
    >
        <BsFillCircleFill
            style={{
                marginRight: '5px',
                color:
                    TinhTrangSuDung === 'Hết hạn'
                        ? '#FD5959'
                        : TinhTrangSuDung === 'Chưa sử dụng'
                        ? '#03AC00'
                        : '#919DBA',
            }}
        />
        {TinhTrangSuDung}
    </span>
);

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
    },
    {
        title: 'Ngày xuất vé',
        key: 'NgayXuatVe',
        dataIndex: 'NgayXuatVe',
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

function TableQuanLiVe({ selectedTinhTrangProp, handleRadioChangeProp }: TableQuanLiVeProps) {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    const [selectedTinhTrang, setSelectedTinhTrang] = useState<string>('all'); // State để lưu giá trị radio được chọn

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
            setTickets(
                snapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    const newData: NewTicketType = {
                        STT: `${index + 1}`,
                        SoVe: data.SoVe || '', // Giá trị mặc định nếu SoVe không tồn tại trong dữ liệu
                        BookingCode: data.BookingCode || '', // Giá trị mặc định nếu BookingCode không tồn tại trong dữ liệu
                        Checkin: data.Checkin || '', // Giá trị mặc định nếu Checkin không tồn tại trong dữ liệu
                        NgaySuDung: data.NgaySuDung || '', // Giá trị mặc định nếu NgaySuDung không tồn tại trong dữ liệu
                        NgayXuatVe: data.NgayXuatVe || '', // Giá trị mặc định nếu NgayXuatVe không tồn tại trong dữ liệu
                        TinhTrangSuDung: data.TinhTrangSuDung || [], // Giá trị mặc định nếu TinhTrangSuDung không tồn tại trong dữ liệu
                    };
                    return newData;
                }),
            );
        });
    }, []);

    console.log(tickets, 'ticket');

    // Hàm lọc dữ liệu khi radio thay đổi
    const handleRadioChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setSelectedTinhTrang(value);
        handleRadioChangeProp(value);
    };

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
