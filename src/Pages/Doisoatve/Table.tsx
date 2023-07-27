import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ticketCollection } from '../../lib/controller';

//Firebase
interface NewTicketType {
    STT?: string;
    SoVe?: string;
    TenSuKien?: string;
    Checkin?: string;
    NgaySuDung?: Date;
    LoaiVe?: string;
    TrangThai?: string;
}

interface TableDoiSoatVeProps {
    selectedRadioValue: number;
    fromDate: any;
    toDate: any;
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

function TableDoiSoatVe({ selectedRadioValue, fromDate, toDate }: TableDoiSoatVeProps) {
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
                    };
                }),
            );
        });
    }, []);

    // Filter the data based on the selected radio value and date range
    const filteredDateTickets =
        selectedRadioValue === 1
            ? tickets // Show all tickets
            : tickets
                  .filter(
                      (ticket) =>
                          selectedRadioValue === 2
                              ? ticket.TrangThai === 'Đã đối soát' // Show tickets with TrangThai === 'Đã đối soát'
                              : ticket.TrangThai === 'Chưa đối soát', // Show tickets with TrangThai === 'Chưa đối soát'
                  )
                  .filter((ticket) => {
                      if (fromDate && toDate && ticket.NgaySuDung) {
                          // Kiểm tra ticket.NgaySuDung có giá trị không
                          const ticketDate = new Date(ticket.NgaySuDung);
                          return ticketDate >= fromDate && ticketDate <= toDate;
                      }
                      return true;
                  });

    // Filter the data based on the selected radio value
    const filteredTickets =
        selectedRadioValue === 1
            ? tickets // Show all tickets
            : tickets.filter(
                  (ticket) =>
                      selectedRadioValue === 2
                          ? ticket.TrangThai === 'Đã đối soát' // Show tickets with TrangThai === 'Đã đối soát'
                          : ticket.TrangThai === 'Chưa đối soát', // Show tickets with TrangThai === 'Chưa đối soát'
              );

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
                dataSource={filteredTickets}
                pagination={paginationConfig}
                bordered
            />
        </div>
    );
}

export default TableDoiSoatVe;
