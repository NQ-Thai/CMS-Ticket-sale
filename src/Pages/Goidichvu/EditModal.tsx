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
import { FC } from 'react';

interface EditModalProps {
    visible: boolean;
    onCancel: () => void;
}

const EditModal: FC<EditModalProps> = ({ visible, onCancel }) => {
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
        // {
        //     label: '2nd menu item',
        //     key: '2',
        //     icon: <UserOutlined />,
        // },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    //Time Picker
    // const { Option } = Select;

    // type PickerType = 'time' | 'date';

    // const PickerWithType = ({
    //     type,
    //     onChange,
    // }: {
    //     type: PickerType;
    //     onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
    // }) => {
    //     if (type === 'time') return <TimePicker onChange={onChange} />;
    //     if (type === 'date') return <DatePicker onChange={onChange} />;
    //     return <DatePicker picker={type} onChange={onChange} />;
    // };

    // const [type, setType] = useState<PickerType>('time');

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
                            style={{
                                width: '245px',
                                height: '40px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'inline' }}>
                        <Input
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
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
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
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
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
                                        <span className="dropdown-text">Đang áp dụng</span>
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
                    >
                        <span className="text-button">Lưu</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default EditModal;
