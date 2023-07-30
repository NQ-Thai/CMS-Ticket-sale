import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ticketCollection } from '../../lib/controller';

//Firebase
export interface NewTicketType {
    STT?: string;
    SoVe?: string;
    TenSuKien?: string;
    Checkin?: string;
    NgaySuDung?: Date;
    LoaiVe?: string;
    TrangThai?: string;
}

export const tickets: NewTicketType[] = [];

interface TableDoiSoatVeProps {
    selectedRadioValue: number;
    fromDate: any;
    toDate: any;
    searchValue: string;
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
    // {
    //     title: 'Tên sự kiện',
    //     dataIndex: 'TenSuKien',
    //     key: 'TenSuKien',
    // },
    {
        title: 'Ngày sử dụng',
        key: 'NgaySuDung',
        dataIndex: 'NgaySuDung',
        render: (date: Date) => format(date, 'dd/MM/yyyy'),
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
                        color: TrangThai === 'Chưa đối soát' ? '#A5A8B1' : '#FD5959',
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
    pageSize: 7,
    pageSizeOptions: ['7', '14', '21', '28'],
};

const TableDoiSoatVe: React.FC<TableDoiSoatVeProps> = ({
    selectedRadioValue,
    fromDate,
    toDate,
    searchValue,
}) => {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);
    const [filteredData, setFilteredData] = useState<NewTicketType[]>([]);

    const [sttCounter, setSttCounter] = useState<number>(1);

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
            const ticketsData = snapshot.docs.map((doc, index) => {
                const data = doc.data();
                return {
                    STT: `${index + 1}`,
                    ...data,
                    NgaySuDung: data.NgaySuDung ? data.NgaySuDung.toDate() : null,
                };
            });
            setTickets(ticketsData);
        });
    }, []);

    useEffect(() => {
        // Thêm một useEffect mới để lọc dữ liệu khi radio thay đổi hoặc ngày thay đổi
        const filteredByRadio =
            selectedRadioValue === 1
                ? tickets // Sử dụng prop 'tickets' để lọc dữ liệu
                : tickets.filter((ticket) =>
                      selectedRadioValue === 2
                          ? ticket.TrangThai === 'Đã đối soát'
                          : ticket.TrangThai === 'Chưa đối soát',
                  );

        const filteredByDate = filteredByRadio.filter((ticket) => {
            if (fromDate && toDate && ticket.NgaySuDung) {
                const ticketDate = new Date(ticket.NgaySuDung);
                // Để bao gồm cả ngày fromDate và toDate, ta sẽ so sánh từ 00:00:00 đến 23:59:59 của các ngày
                const fromDateStart = new Date(fromDate);
                const toDateEnd = new Date(toDate);
                toDateEnd.setHours(23, 59, 59);

                return ticketDate >= fromDateStart && ticketDate <= toDateEnd;
            }
            // If fromDate or toDate is not selected, include all tickets
            return true;
        });

        // Lọc theo số vé nếu có searchValue
        const filteredBySearchValue = searchValue
            ? filteredByDate.filter((ticket) => ticket.SoVe?.startsWith(searchValue))
            : filteredByDate;

        // Cập nhật lại giá trị của biến đếm dựa trên số lượng kết quả sau khi lọc
        setSttCounter(filteredBySearchValue.length > 0 ? 1 : 0);

        // Tính lại giá trị STT từ 1 đến số dòng sau khi lọc
        const newDataWithSTT = filteredBySearchValue.map((ticket, index) => ({
            ...ticket,
            STT: `${sttCounter + index}`, // Gán giá trị STT bằng sttCounter + index
        }));

        setFilteredData(newDataWithSTT); // Cập nhật filteredData với dữ liệu sau khi lọc
    }, [selectedRadioValue, fromDate, toDate, tickets, searchValue, sttCounter]);

    return (
        <div>
            <Table
                className="custom-table"
                size="small"
                style={{
                    font: 'Montserrat',
                    margin: '10px 20px 0 20px',
                }}
                columns={columns}
                dataSource={filteredData}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
};

export default TableDoiSoatVe;
