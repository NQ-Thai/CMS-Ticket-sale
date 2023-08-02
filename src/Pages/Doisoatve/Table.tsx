import { Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ticketCollection } from '../../lib/controller';

//Firebase
export interface NewTicketType {
    id: string;
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
    filteredData: NewTicketType[];
    setFilteredData: React.Dispatch<React.SetStateAction<NewTicketType[]>>;
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

    filteredData,
    setFilteredData,
}) => {
    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    const [sttCounter, setSttCounter] = useState<number>(1);

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            const ticketsData = snapshot.docs.map((doc, index) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    STT: `${index + 1}`,
                    ...data,
                    NgaySuDung: data.NgaySuDung ? data.NgaySuDung.toDate() : null,
                };
            });
            setTickets(ticketsData);
        });
    }, []);

    useEffect(() => {
        const filteredByRadio =
            selectedRadioValue === 1
                ? tickets
                : tickets.filter((ticket) =>
                      selectedRadioValue === 2
                          ? ticket.TrangThai === 'Đã đối soát'
                          : ticket.TrangThai === 'Chưa đối soát',
                  );

        const filteredByDate = filteredByRadio.filter((ticket) => {
            if (fromDate && toDate && ticket.NgaySuDung) {
                const ticketDate = new Date(ticket.NgaySuDung);

                const fromDateStart = new Date(fromDate);
                const toDateEnd = new Date(toDate);
                toDateEnd.setHours(23, 59, 59);

                return ticketDate >= fromDateStart && ticketDate <= toDateEnd;
            }

            return true;
        });

        const filteredBySearchValue = searchValue
            ? filteredByDate.filter((ticket) => ticket.SoVe?.startsWith(searchValue))
            : filteredByDate;

        setSttCounter(filteredBySearchValue.length > 0 ? 1 : 0);

        const newDataWithSTT = filteredBySearchValue.map((ticket, index) => ({
            ...ticket,
            STT: `${sttCounter + index}`,
        }));

        setFilteredData(newDataWithSTT);
    }, [selectedRadioValue, fromDate, toDate, tickets, searchValue, sttCounter, setFilteredData]);

    return (
        <div>
            <Table
                className="custom-table-doisoatve"
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
