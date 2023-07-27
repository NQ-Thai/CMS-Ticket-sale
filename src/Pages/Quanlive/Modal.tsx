import { Button, Checkbox, Col, DatePicker, Modal, Radio, RadioChangeEvent, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FC, useState } from 'react';

interface FilterModalProps {
    visible: boolean;
    onCancel: () => void;
    selectedTinhTrangProp: string | null;
    handleRadioChangeProp: (value: string) => void;
}

const ModalFilter: FC<FilterModalProps> = ({
    visible,
    onCancel,
    selectedTinhTrangProp,
    handleRadioChangeProp,
}) => {
    const [selectedTinhTrangModal, setSelectedTinhTrangModal] = useState<string>('all');

    // Hàm xử lý sự kiện khi nhấn nút "Lọc"
    const handleFilterClick = () => {
        // Gọi hàm handleRadioChangeProp để cập nhật giá trị selectedTinhTrangProp trên component cha
        handleRadioChangeProp(selectedTinhTrangModal);

        // Đóng modal sau khi nhấn nút "Lọc"
        onCancel();
    };

    const onChangeRadio = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setSelectedTinhTrangModal(value);
    };

    //Check Box
    const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <div>
            <Modal
                open={visible}
                onCancel={onCancel}
                title={
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '26px',
                        }}
                    >
                        <span className="modal-title" style={{ font: 'Montserrat' }}>
                            Lọc vé
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
                            paddingRight: '170px',
                        }}
                        className="modal-text"
                    >
                        Từ ngày
                    </span>
                    <span style={{ font: 'Montserrat' }} className="modal-text">
                        Đến ngày
                    </span>
                </div>
                {/* Lịch */}
                <div>
                    <div
                        style={{
                            paddingRight: '85px',
                            display: 'inline',
                        }}
                    >
                        <DatePicker
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'inline',
                        }}
                    >
                        <DatePicker
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                            }}
                        />
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <div>
                        <span className="modal-text">Tình trạng sử dụng</span>
                    </div>
                    <div>
                        <Radio.Group
                            style={{ marginTop: '5px' }}
                            onChange={onChangeRadio}
                            value={selectedTinhTrangModal}
                        >
                            <Radio className="custom-radio" value="all">
                                Tất cả
                            </Radio>
                            <Radio className="custom-radio" value="Đã sử dụng">
                                Đã sử dụng
                            </Radio>
                            <Radio className="custom-radio" value="Chưa sử dụng">
                                Chưa sử dụng
                            </Radio>
                            <Radio className="custom-radio" value="Hết hạn">
                                Hết hạn
                            </Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{ margin: '20px 0 40px 0' }}>
                    <div>
                        <span className="modal-text">Cổng Check-in</span>
                    </div>
                    <div>
                        <Checkbox.Group
                            style={{ width: '100%', marginTop: '8px' }}
                            onChange={onChangeCheckBox}
                        >
                            <Row>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="A">
                                        Tất cả
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="B">
                                        Cổng 1
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="C">
                                        Cổng 2
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="D">
                                        Cổng 3
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="E">
                                        Cổng 4
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox className="custom-checkbox" value="F">
                                        Cổng 5
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={handleFilterClick}
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
                        <span className="text-button">Lọc</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalFilter;
