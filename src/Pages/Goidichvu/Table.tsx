import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FC, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { LiaEditSolid } from 'react-icons/lia';
import EditModal from './EditModal';

interface DataType {
    key: string;
    stt: string;
    maGoi: string;
    tenGoiVe: string;
    ngayApDung: string;
    ngayHetHan: string;
    giaVe: string;
    giaCombo: string;
    tinhTrang: string[];
}

const TableGoiDichVu: FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã gói',
            dataIndex: 'maGoi',
            key: 'maGoi',
        },
        {
            title: 'Tên gói vé',
            dataIndex: 'tenGoiVe',
            key: 'tenGoiVe',
        },
        {
            title: 'Ngày áp dụng',
            key: 'ngayApDung',
            dataIndex: 'ngayApDung',
        },
        {
            title: 'Ngày hết hạn',
            key: 'ngayHetHan',
            dataIndex: 'ngayHetHan',
        },
        {
            title: 'Giá vé (VNĐ/Vé)',
            key: 'giaVe',
            dataIndex: 'giaVe',
        },
        {
            title: 'Giá Combo (VNĐ/Combo)',
            key: 'giaCombo',
            dataIndex: 'giaCombo',
        },
        {
            title: 'Tình trạng sử dụng',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tinhTrang }) => (
                <>
                    {tinhTrang.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'Tắt') {
                            color = 'red';
                        } else if (tag === 'Đang áp dụng') color = 'green';
                        return (
                            <Tag color={color} key={tag}>
                                <BsFillCircleFill /> {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={openModalEdit}
                        className="button"
                        type="primary"
                        style={{
                            color: '#FF993C',
                            borderColor: 'white',
                            height: '35px',
                            width: '120px',
                            display: 'flex', // Sử dụng flexbox
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

    const data: DataType[] = [
        {
            key: '1',
            stt: '1',
            maGoi: 'ALT20230501',
            tenGoiVe: 'Gói gia đinh',
            ngayApDung: '14/04/2023\n08:00:00',
            ngayHetHan: '14/04/2023\n23:00:00',
            giaVe: '90.000 VNĐ',
            giaCombo: '360.000 VNĐ/4 Vé',
            tinhTrang: ['Đang áp dụng'],
        },
        {
            key: '2',
            stt: '2',
            maGoi: 'ALT20230501',
            tenGoiVe: 'Gói sự kiện',
            ngayApDung: '14/04/2023\n08:00:00',
            ngayHetHan: '14/04/2023\n23:00:00',
            giaVe: '20.000 VNĐ',
            giaCombo: ' ',
            tinhTrang: ['Tắt'],
        },
    ];

    //Chuyển trang
    const paginationConfig: TablePaginationConfig = {
        position: ['bottomCenter'],
        size: 'small',
        pageSize: 6,
        pageSizeOptions: ['6', '12', '18, 26'],
    };

    //New Modal
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

    const openModalEdit = () => {
        setModalVisibleEdit(true);
    };

    const closeModalEdit = () => {
        setModalVisibleEdit(false);
    };

    return (
        <div>
            <Table
                size="small"
                className="custom-table"
                style={{
                    margin: '5px 20px 0 20px',
                }}
                columns={columns}
                dataSource={data}
                pagination={paginationConfig}
                bordered
            />
            <EditModal visible={modalVisibleEdit} onCancel={closeModalEdit} />
        </div>
    );
};

export default TableGoiDichVu;
