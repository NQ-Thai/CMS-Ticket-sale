import { Button, Space, Table } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { SlOptionsVertical } from 'react-icons/sl';
import { ticketCollection } from '../../lib/controller';
import ModalEditQuanlive from './ModalEdit';

//Firebase
export interface NewTicketType {
    id?: string;
    STT?: string;
    SoVe?: string;
    BookingCode?: string;
    Checkin?: string;
    NgaySuDung?: Date;
    HanSuDung?: Date;
    TinhTrangSuDung: string;
    TenSuKien: string;
}

interface TableQuanLiVeProps {
    selectedTinhTrangProp: string | null;
    handleRadioChangeProp: (value: string) => void;
    searchValue: string;
    selectedCheckboxes: CheckboxValueType[];
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
function TableGoidichvu({
    selectedTinhTrangProp,
    handleRadioChangeProp,
    searchValue,
    selectedCheckboxes,
}: TableQuanLiVeProps) {
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
            width: '40px',
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
            title: 'Tình trạng sử dụng',
            key: 'TinhTrangSuDung',
            dataIndex: 'TinhTrangSuDung',
            render: renderStatus,
        },

        {
            title: 'Ngày sử dụng',
            key: 'NgaySuDung',
            width: '136px',
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
            title: 'Hạn sử dụng',
            key: 'HanSuDung',
            dataIndex: 'HanSuDung',
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
                    <Button
                        onClick={() => openModalEdit(record, record.id ? record.id : '')}
                        className="modalEdit"
                        type="primary"
                        style={{
                            color: 'black',
                            borderColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        ghost
                    >
                        <SlOptionsVertical onClick={() => {}} />
                    </Button>
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
        pageSize: 4,
        pageSizeOptions: ['4', '8', '12', '16'],
    };

    const [newHanSuDung, setNewHanSuDung] = useState<Date | null>(null);

    //New Modal
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<NewTicketType | null>(null);

    const openModalEdit = (rowData: NewTicketType, id: string) => {
        setSelectedRowData({ ...rowData, id });
        setModalVisibleEdit(true);
    };

    const closeModalEdit = () => {
        setSelectedRowData(null);
        setModalVisibleEdit(false);
    };

    const [tickets, setTickets] = useState<NewTicketType[]>([]);

    const [sttCounter, setSttCounter] = useState<number>(1);

    useEffect(() => {
        onSnapshot(ticketCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            setTickets(
                snapshot.docs.map((doc, index) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        STT: `${index + 1}`,
                        ...data,
                        NgaySuDung: data.NgaySuDung ? data.NgaySuDung.toDate() : null,
                        HanSuDung: data.HanSuDung ? data.HanSuDung.toDate() : null,
                        TinhTrangSuDung: data.TinhTrangSuDung || '',
                    };
                }) as NewTicketType[],
            );
        });
    }, []);

    console.log(tickets, 'ticket');

    const filteredTickets = tickets.filter((ticket) => {
        const isMatchedSearch = searchValue === '' || ticket.SoVe?.startsWith(searchValue);
        const isMatchedTinhTrang =
            selectedTinhTrangProp === 'all' || ticket.TinhTrangSuDung === selectedTinhTrangProp;
        const isMatchedCheckbox =
            selectedCheckboxes.length === 0 || selectedCheckboxes.includes(ticket.Checkin || '');

        if (selectedCheckboxes.includes('all')) {
            return isMatchedSearch && isMatchedTinhTrang;
        } else {
            return isMatchedSearch && isMatchedTinhTrang && isMatchedCheckbox;
        }
    });

    const newDataWithSTT = filteredTickets.map((ticket, index) => ({
        ...ticket,
        STT: `${index + 1}`,
    }));

    return (
        <div>
            <Table
                className="custom-table-quanlive"
                style={{
                    margin: '5px 20px 0 20px',
                    height: '437px',
                }}
                columns={columns}
                dataSource={newDataWithSTT}
                pagination={paginationConfig}
                bordered
            />
            <ModalEditQuanlive
                visible={modalVisibleEdit}
                onCancel={closeModalEdit}
                selectedRowData={selectedRowData}
            />
        </div>
    );
}

export default TableGoidichvu;
