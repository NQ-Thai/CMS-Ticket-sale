import { Button, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { format } from 'date-fns';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { LiaEditSolid } from 'react-icons/lia';
import { ticketPackageCollection } from '../../lib/controller';
import EditModal from './EditModal';

//Firebase
export interface NewTicketPackageType {
    id?: string;
    STT?: string;
    MaGoi?: string;
    TenGoiVe?: string;
    NgayApDung?: Date;
    NgayHetHan?: Date;
    GiaDon?: string;
    GiaCombo?: string;
    SoVeCombo?: string;
    TinhTrangSuDung?: string;
}

interface TableGoidichvuProps {
    searchValue: string;
}

const renderStatus = (TinhTrangSuDung: string) => (
    <span
        style={{
            display: 'inline-block',
            padding: '5px 10px',
            borderRadius: '5px',
            color:
                TinhTrangSuDung === 'Đang áp dụng'
                    ? '#03AC00'
                    : TinhTrangSuDung === 'Tắt'
                    ? '#FD5959'
                    : '#919DBA',
            border: `1px solid ${
                TinhTrangSuDung === 'Đang áp dụng'
                    ? '#03AC00'
                    : TinhTrangSuDung === 'Tắt'
                    ? '#FD5959'
                    : '#919DBA'
            }`,
            background:
                TinhTrangSuDung === 'Đang áp dụng'
                    ? '#E6FFE6'
                    : TinhTrangSuDung === 'Tắt'
                    ? '#FFEDED'
                    : '#F5F5F5',
        }}
    >
        <BsFillCircleFill
            style={{
                marginRight: '5px',
                color:
                    TinhTrangSuDung === 'Đang áp dụng'
                        ? '#03AC00'
                        : TinhTrangSuDung === 'Tắt'
                        ? '#FD5959'
                        : '#919DBA',
            }}
        />
        {TinhTrangSuDung}
    </span>
);

function TableGoiDichVu({ searchValue }: TableGoidichvuProps) {
    const columns: ColumnsType<NewTicketPackageType> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
        },
        {
            title: 'Mã gói',
            dataIndex: 'MaGoi',
            key: 'MaGoi',
        },
        {
            title: 'Tên gói vé',
            dataIndex: 'TenGoiVe',
            key: 'TenGoiVe',
            width: 95,
        },
        {
            title: 'Ngày áp dụng',
            key: 'NgayApDung',
            dataIndex: 'NgayApDung',
            render: (date: Date) => format(date, 'dd/MM/yyyy HH:mm:ss'),
        },
        {
            title: 'Ngày hết hạn',
            key: 'NgayHetHan',
            dataIndex: 'NgayHetHan',
            render: (date: Date) => format(date, 'dd/MM/yyyy HH:mm:ss'),
        },
        {
            title: 'Giá vé (VNĐ/Vé)',
            key: 'GiaDon',
            dataIndex: 'GiaDon',
            render: (giaDon: string) => (giaDon ? `${giaDon} VNĐ` : ''),
        },
        {
            title: 'Giá Combo (VNĐ/Combo)',
            key: 'GiaCombo',
            dataIndex: 'GiaCombo',
            render: (giaDon: string, record: NewTicketPackageType) => {
                const giaCombo = record.GiaCombo;
                const soVeCombo = record.SoVeCombo;
                return giaDon && giaCombo && soVeCombo ? `${giaCombo} VNĐ/${soVeCombo} vé` : '';
            },
        },

        {
            title: 'Tình trạng sử dụng',
            key: 'TinhTrangSuDung',
            dataIndex: 'TinhTrangSuDung',
            width: 160,
            render: renderStatus,
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => openModalEdit(record, record.id ? record.id : '')}
                        className="button"
                        type="primary"
                        style={{
                            color: '#FF993C',
                            borderColor: 'white',
                            height: '35px',
                            width: '120px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        ghost
                    >
                        <LiaEditSolid
                            style={{
                                height: '24px',
                                width: '24px',
                                marginRight: '4px',
                                verticalAlign: 'middle',
                                alignItems: '',
                            }}
                        />

                        <span className="text-table-button">Cập nhật</span>
                    </Button>
                </Space>
            ),
        },
    ];

    //Chuyển trang
    const paginationConfig: TablePaginationConfig = {
        position: ['bottomCenter'],
        size: 'small',
        pageSize: 5,
        pageSizeOptions: ['5', '10', '15', '20'],
    };

    //New Modal
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<NewTicketPackageType | null>(null);

    const openModalEdit = (rowData: NewTicketPackageType, id: string) => {
        setSelectedRowData({ ...rowData, id });
        setModalVisibleEdit(true);
    };

    const closeModalEdit = () => {
        setSelectedRowData(null);
        setModalVisibleEdit(false);
    };

    const [ticketPackage, setticketPackage] = useState<NewTicketPackageType[]>([]);

    useEffect(
        () =>
            onSnapshot(ticketPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setticketPackage(
                    snapshot.docs.map((doc, index) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            STT: `${index + 1}`,
                            ...data,
                            NgayApDung: data.NgayApDung ? data.NgayApDung.toDate() : null,
                            NgayHetHan: data.NgayHetHan ? data.NgayHetHan.toDate() : null,
                        };
                    }),
                );
            }),
        [],
    );

    const filteredTickets =
        searchValue !== ''
            ? ticketPackage.filter(
                  (ticketPackage) =>
                      ticketPackage.MaGoi?.toLowerCase().startsWith(searchValue.toLowerCase()) ||
                      ticketPackage.TenGoiVe?.toLowerCase().includes(searchValue.toLowerCase()),
              )
            : ticketPackage;

    const newDataWithSTT = filteredTickets.map((ticketPackage, index) => ({
        ...ticketPackage,
        STT: `${index + 1}`,
    }));

    return (
        <div>
            <Table
                size="small"
                className="custom-table"
                style={{
                    margin: '5px 20px 0 20px',
                    height: '437px',
                }}
                columns={columns}
                dataSource={newDataWithSTT}
                pagination={paginationConfig}
                bordered
            />
            <EditModal
                visible={modalVisibleEdit}
                onCancel={closeModalEdit}
                selectedRowData={selectedRowData}
            />
        </div>
    );
}

export default TableGoiDichVu;
