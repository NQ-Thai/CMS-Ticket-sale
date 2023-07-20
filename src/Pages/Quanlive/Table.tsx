import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { ticketCollection } from '../../lib/controller';

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
        // render: (TinhTrangSuDung: string[] | undefined) => {
        //     if (!TinhTrangSuDung || TinhTrangSuDung.length === 0) {
        //         return null; // Hoặc trả về thông báo khi không có dữ liệu
        //     }

        //     const getColorByTag = (tag: string) => {
        //         if (tag === 'Hết hạn') {
        //             return 'red';
        //         } else if (tag === 'Chưa sử dụng') {
        //             return 'green';
        //         } else if (tag === 'Đã sử dụng') {
        //             return 'gray'; // Hoặc xám
        //         }
        //         return 'blue'; // Hoặc màu mặc định nếu không phù hợp với trường hợp nào trên
        //     };

        //     return (
        //         <>
        //             {TinhTrangSuDung.map((tag) => (
        //                 <Tag color={getColorByTag(tag)} key={tag}>
        //                     <BsFillCircleFill /> {tag.toUpperCase()}
        //                 </Tag>
        //             ))}
        //         </>
        //     );
        // },
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
    pageSize: 6,
    pageSizeOptions: ['6', '12', '18, 26'],
};

//Firebase

interface NewTicketType {
    STT?: string;
    SoVe?: string;
    BookingCode?: string;
    Checkin?: string;
    NgaySuDung?: string;
    NgayXuatVe?: string;
    TinhTrangSuDung?: string[];
}

function TableQuanLiVe() {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
            setTickets(
                snapshot.docs.map((doc, index) => {
                    const data = doc.data() as NewTicketType; // Cast data to NewTicketType
                    return {
                        STT: `${index + 1}`,
                        ...data,
                    };
                }),
            );
        });
    }, []);

    console.log(tickets, 'ticket');

    return (
        <div>
            <Table
                className="custom-table"
                style={{
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

export default TableQuanLiVe;
