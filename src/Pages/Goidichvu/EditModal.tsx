import { ClockCircleOutlined, DownOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Dropdown,
    Input,
    MenuProps,
    Modal,
    Row,
    Space,
    TimePicker,
    message,
} from 'antd';
import dayjs from 'dayjs';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { ticketPackageCollection } from '../../lib/controller';
import { NewTicketPackageType } from './Table';

interface EditModalProps {
    visible: boolean;
    onCancel: () => void;
    selectedRowData: NewTicketPackageType | null;
}

const convertToDayjs = (date: Date | undefined): dayjs.Dayjs | null => {
    return date ? dayjs(date) : null;
};

const EditModal: FC<EditModalProps> = ({ visible, onCancel, selectedRowData }) => {
    const [formData, setFormData] = useState<NewTicketPackageType | null>(null);

    useEffect(() => {
        <a href=""></a>;
        setFormData(selectedRowData);
    }, [selectedRowData]);

    const handleSave = async () => {
        if (formData) {
            try {
                let docRef;
                let dataToUpdate;
                if (formData.id) {
                    docRef = doc(ticketPackageCollection, formData.id);
                    dataToUpdate = {
                        MaGoi: formData.MaGoi,
                        TenGoiVe: formData.TenGoiVe,
                        NgayApDung: formData.NgayApDung,
                        NgayHetHan: formData.NgayHetHan
                            ? Timestamp.fromDate(formData.NgayHetHan)
                            : null,
                        GiaDon: formData.GiaDon,
                        GiaCombo: formData.GiaCombo,
                        SoVeCombo: formData.SoVeCombo,
                        TinhTrangSuDung: formData.TinhTrangSuDung,
                    };
                } else {
                    docRef = doc(ticketPackageCollection);
                    dataToUpdate = {
                        MaGoi: formData.MaGoi,
                        TenGoiVe: formData.TenGoiVe,
                        NgayApDung: formData.NgayApDung,
                        NgayHetHan: formData.NgayHetHan
                            ? Timestamp.fromDate(formData.NgayHetHan)
                            : null,
                        GiaDon: formData.GiaDon,
                        GiaCombo: formData.GiaCombo,
                        SoVeCombo: formData.SoVeCombo,
                        TinhTrangSuDung: formData.TinhTrangSuDung,
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

    const handleDateChange = (date: dayjs.Dayjs | null, dateString: string, field: string) => {
        if (formData) {
            const dayjsDate = date ? date.toDate() : null;
            const updatedFormData = { ...formData, [field]: dayjsDate };
            setFormData(updatedFormData);
        }
    };

    const handleTimeChange = (time: dayjs.Dayjs | null, timeString: string, field: string) => {
        if (formData) {
            const timeDate = time ? time.toDate() : null;
            const updatedFormData = { ...formData, [field]: timeDate };
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
                width={740}
                title={
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '26px',
                        }}
                    >
                        <span className="modal-title" style={{ font: 'Montserrat' }}>
                            Cập nhật thông tin gói vé
                        </span>
                    </div>
                }
                footer={null}
                centered
            >
                <div style={{ marginBottom: '5px' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            paddingRight: '262px',
                        }}
                        className="modal-text"
                    >
                        Mã sự kiện <span className="required"> *</span>
                    </span>
                    <span style={{ font: 'Montserrat' }} className="modal-text">
                        Tên sự kiện
                    </span>
                </div>

                <div>
                    <div
                        style={{
                            marginRight: '110px',
                            display: 'inline',
                        }}
                    >
                        <Input
                            id="MaGoi"
                            value={formData?.MaGoi}
                            onChange={(e) => handleChange(e.target.value, 'MaGoi')}
                            style={{
                                width: '245px',
                                height: '40px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'inline' }}>
                        <Input
                            id="TenGoiVe"
                            value={formData?.TenGoiVe}
                            onChange={(e) => handleChange(e.target.value, 'TenGoiVe')}
                            style={{
                                width: '330px',
                                height: '40px',
                            }}
                        />
                    </div>
                </div>
                <div style={{ margin: '15px 0 5px 0' }}>
                    <span
                        style={{
                            font: 'Montserrat',
                            marginRight: '250px',
                        }}
                        className="modal-text"
                    >
                        Ngày áp dụng
                    </span>
                    <span style={{ font: 'Montserrat' }} className="modal-text">
                        Ngày hết hạn
                    </span>
                </div>
                {/* Lịch */}
                <div>
                    <div
                        style={{
                            marginRight: '75px',
                            display: 'inline',
                        }}
                    >
                        <DatePicker
                            id="NgayApDung"
                            value={formData?.NgayApDung ? dayjs(formData.NgayApDung) : null}
                            onChange={(date, dateString) =>
                                handleDateChange(date, dateString, 'NgayApDung')
                            }
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
                            id="NgayApDung"
                            value={formData?.NgayApDung ? dayjs(formData.NgayApDung) : null}
                            onChange={(time, timeString) =>
                                handleTimeChange(time, timeString, 'NgayApDung')
                            }
                            suffixIcon={<ClockCircleOutlined style={suffixIconStyle} />}
                            className="custom-timepicker"
                            style={{
                                width: '129px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                            }}
                        />
                    </div>
                    <div style={{ display: 'inline' }}>
                        <DatePicker
                            id="NgayHetHan"
                            value={formData?.NgayHetHan ? dayjs(formData.NgayHetHan) : null}
                            onChange={(date, dateString) =>
                                handleDateChange(date, dateString, 'NgayHetHan')
                            }
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
                            id="NgayHetHan"
                            value={formData?.NgayHetHan ? dayjs(formData.NgayHetHan) : null}
                            onChange={(time, timeString) =>
                                handleTimeChange(time, timeString, 'NgayHetHan')
                            }
                            suffixIcon={<ClockCircleOutlined style={suffixIconStyle} />}
                            className="custom-timepicker"
                            style={{
                                width: '129px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                            }}
                        />
                    </div>
                </div>
                <div style={{ margin: '15px 0 20px 0' }}>
                    <div>
                        <span className="modal-text">Giá vé áp dụng</span>
                    </div>
                    <div>
                        <Checkbox.Group style={{ width: '100%', marginTop: '8px' }}>
                            <Row>
                                <Col style={{ marginBottom: '12px' }} span={24}>
                                    <Checkbox className="custom-checkbox" value="A">
                                        <span style={{ opacity: '70%', marginRight: '8px' }}>
                                            Vé lẻ (vnđ/vé) với giá
                                        </span>
                                        <Input
                                            id="GiaDon"
                                            value={formData?.GiaDon}
                                            onChange={(e) => handleChange(e.target.value, 'GiaDon')}
                                            style={{
                                                width: '148px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            placeholder="Giá vé"
                                        />
                                        <span style={{ opacity: '70%', marginLeft: '8px' }}>
                                            / vé
                                        </span>
                                    </Checkbox>
                                </Col>

                                <Col span={24}>
                                    <Checkbox className="custom-checkbox" value="B">
                                        <span style={{ opacity: '70%', marginRight: '8px' }}>
                                            Combo vé với giá
                                        </span>
                                        <Input
                                            id="GiaCombo"
                                            value={formData?.GiaCombo}
                                            onChange={(e) =>
                                                handleChange(e.target.value, 'GiaCombo')
                                            }
                                            style={{
                                                width: '148px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            placeholder="Giá vé"
                                        />
                                        <span style={{ opacity: '70%', margin: ' 0 8px 0 8px' }}>
                                            /
                                        </span>
                                        <Input
                                            id="SoVeCombo"
                                            value={formData?.SoVeCombo}
                                            onChange={(e) =>
                                                handleChange(e.target.value, 'SoVeCombo')
                                            }
                                            style={{
                                                width: '72px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            placeholder="Giá vé"
                                        />
                                        <span style={{ opacity: '70%', margin: ' 0 8px 0 8px' }}>
                                            vé
                                        </span>
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                <div style={{ margin: '10px 0 40px 0' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <span className="modal-text">Tình trạng</span>
                    </div>
                    <div>
                        <Space wrap>
                            <Dropdown menu={menuProps}>
                                <Button style={{ borderColor: '#A5A8B1' }}>
                                    <Space>
                                        <span className="dropdown-text">
                                            {formData?.TinhTrangSuDung}
                                        </span>
                                        <DownOutlined
                                            style={{
                                                width: '10.54px',
                                                height: '6.25px',
                                                color: '#FF993C',
                                            }}
                                        />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Space>
                    </div>
                    <div style={{ marginTop: '11px' }}>
                        <span className="required">* </span>
                        <span style={{ font: 'Montserrat' }} className="required-text">
                            là thông tin bắt buộc
                        </span>
                    </div>
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

export default EditModal;
