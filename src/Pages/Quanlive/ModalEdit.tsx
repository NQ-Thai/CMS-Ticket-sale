import { Button, DatePicker, MenuProps, Modal, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { ticketCollection } from '../../lib/controller';
import { NewTicketType } from './TableGoidichvu';

interface EditModalProps {
    visible: boolean;
    onCancel: () => void;
    selectedRowData: NewTicketType | null;
}

const convertToDayjs = (date: Date | undefined): Dayjs | null => {
    return date ? dayjs(date) : null;
};

const ModalEditQuanlive: FC<EditModalProps> = ({ visible, onCancel, selectedRowData }) => {
    const [formData, setFormData] = useState<NewTicketType | null>(null);

    useEffect(() => {
        setFormData(selectedRowData);
    }, [selectedRowData]);

    const handleSave = async () => {
        if (formData) {
            try {
                let docRef;
                let dataToUpdate;
                if (formData.id) {
                    docRef = doc(ticketCollection, formData.id);
                    dataToUpdate = {
                        SoVe: formData.SoVe,
                        TenSuKien: formData.TenSuKien,
                        HanSuDung: formData.HanSuDung ? dayjs(formData.HanSuDung).toDate() : null,
                    };
                } else {
                    docRef = doc(ticketCollection);
                    dataToUpdate = {
                        SoVe: formData.SoVe,
                        TenSuKien: formData.TenSuKien,
                        HanSuDung: formData.HanSuDung ? dayjs(formData.HanSuDung).toDate() : null,
                    };
                }

                await updateDoc(docRef, dataToUpdate);
                message.success('Lưu thành công!');
                onCancel();
            } catch (error) {
                console.error('Lỗi khi lưu dữ liệu: ', error);
                message.error('Đã xảy ra lỗi khi lưu dữ liệu.');
            }
        }
    };

    const handleDateChange = (date: Dayjs | null, dateString: string, field: string) => {
        if (formData && date) {
            const updatedFormData = { ...formData, [field]: date };
            setFormData(updatedFormData);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | Date | string,
        field: string,
    ) => {
        if (formData) {
            const updatedFormData = { ...formData, [field]: e };
            setFormData(updatedFormData);
        }
    };

    //Dropdown
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Tắt',
            key: '1',
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const suffixIconStyle = { fontSize: '24px', width: '24px', height: '24px', color: '#ff993c' };
    return (
        <div>
            <Modal
                open={visible}
                onCancel={onCancel}
                width={600}
                title={
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '26px',
                        }}
                    >
                        <span className="modal-title" style={{ font: 'Montserrat' }}>
                            Đổi ngày sử dụng vé
                        </span>
                    </div>
                }
                footer={null}
                centered
            >
                <div style={{ marginBottom: '17px' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            paddingRight: '140px',
                        }}
                        className="modal-text"
                    >
                        Số vé
                    </span>
                    <span
                        id="SoVe"
                        style={{ font: 'Montserrat', opacity: '70%' }}
                        className="modal-text"
                    >
                        {formData?.SoVe}
                    </span>
                </div>

                <div style={{ marginBottom: '17px' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            paddingRight: '140px',
                        }}
                        className="modal-text"
                    >
                        Số vé
                    </span>
                    <span style={{ font: 'Montserrat', opacity: '70%' }} className="modal-text">
                        Vé cổng - Gói sự kiện
                    </span>
                </div>

                <div style={{ marginBottom: '17px' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            paddingRight: '97px',
                        }}
                        className="modal-text"
                    >
                        Tên sự kiện
                    </span>
                    <span
                        id="TenSuKien"
                        style={{ font: 'Montserrat', opacity: '70%' }}
                        className="modal-text"
                    >
                        {formData?.TenSuKien}
                    </span>
                </div>

                <div style={{ margin: '15px 0 37px 0' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            marginRight: '85px',
                        }}
                        className="modal-text"
                    >
                        Hạn sử dụng
                    </span>
                    <DatePicker
                        id="HanSuDung"
                        value={formData?.HanSuDung ? dayjs(formData.HanSuDung) : null}
                        onChange={(date, dateString) =>
                            handleDateChange(date, dateString, 'HanSuDung')
                        }
                        className="custom-datepicker"
                        style={{
                            width: '143px',
                            height: '40px',
                            borderColor: '#A5A8B1',
                            marginRight: '8px',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        key="cancel"
                        onClick={onCancel}
                        className="button"
                        type="primary"
                        style={{
                            font: 'Montserrat',
                            color: '#FF993C',
                            borderColor: '#FF993C',
                            height: '40px',
                            width: '140px',
                        }}
                        ghost
                    >
                        <span className="text-button">Hủy</span>
                    </Button>

                    <Button
                        key="save"
                        type="primary"
                        className="button"
                        style={{
                            font: 'Montserrat',
                            background: '#FF993C',
                            borderColor: '#FF993C',
                            height: '40px',
                            width: '140px',
                            marginLeft: '24px',
                        }}
                        onClick={handleSave}
                    >
                        <span className="text-button">Lưu</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalEditQuanlive;
