import { ClockCircleOutlined, DownOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Dropdown,
    Input,
    Menu,
    MenuProps,
    Modal,
    Row,
    Space,
    TimePicker,
    message,
} from 'antd';
import dayjs from 'dayjs';
import { addDoc } from 'firebase/firestore';
import { FC, useState } from 'react';
import { ticketPackageCollection } from '../../lib/controller';

interface NewModalProps {
    visible: boolean;
    onCancel: () => void;
}

const NewModal: FC<NewModalProps> = ({ visible, onCancel }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null); // Define selectedStartDate state
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null); // Define selectedEndDate state

    const [TinhTrangSuDung, setTinhTrangSuDung] = useState<string>('ĐangApDung'); // Giá trị mặc định khi khởi tạo là "Đang áp dụng"

    const [veLeChecked, setVeLeChecked] = useState<boolean>(false); // State để theo dõi trạng thái checkbox "Vé lẻ (vnđ/vé) với giá"
    const [comboVeChecked, setComboVeChecked] = useState<boolean>(false); // State để theo dõi trạng thái checkbox "Combo vé với giá"

    // Rest of the code remains unchanged.

    // Các hàm xử lý khi checkbox thay đổi trạng thái
    const handleVeLeCheckboxChange = (checked: boolean) => {
        setVeLeChecked(checked);
    };

    const handleComboVeCheckboxChange = (checked: boolean) => {
        setComboVeChecked(checked);
    };

    const handleDropdownChange = (value: any) => {
        // Make sure value.key is a valid string or set a default value if it's undefined
        const tinhTrangSuDungValue = value?.key || 'Đang áp dụng';
        setTinhTrangSuDung(tinhTrangSuDungValue);
    };

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

    const menu = <Menu onClick={handleMenuClick} items={items} />;

    const suffixIconStyle = { fontSize: '24px', width: '24px', height: '24px', color: '#ff993c' };

    const [giaDonInput, setGiaDonInput] = useState<string>('');
    const [giaComboInput, setGiaComboInput] = useState<string>('');
    const [soVeComboInput, setSoVeComboInput] = useState<string>('');

    // Convert selectedStartDate to Dayjs object
    const selectedStartDayjs = selectedStartDate ? dayjs(selectedStartDate) : null;

    // Convert selectedEndDate to Dayjs object
    const selectedEndDayjs = selectedEndDate ? dayjs(selectedEndDate) : null;

    // Function to reset the state values for input fields
    const resetInputFields = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setVeLeChecked(false);
        setComboVeChecked(false);
        setGiaDonInput('');
        setGiaComboInput('');
        setSoVeComboInput('');
    };

    const handleSave = async () => {
        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100000000);

        // Generate the MaGoi using the ALT prefix and the random number
        const MaGoi = `ALT${randomNumber}`;

        const tenGoiVe = (document.getElementById('tenGoiVe') as HTMLInputElement)?.value;
        console.log('Ten goi ve:', tenGoiVe);
        const ngayApDung = selectedStartDate;
        console.log('ngayApDung:', ngayApDung);
        const ngayHetHan = selectedEndDate;
        console.log('ngayHetHan:', ngayHetHan);
        const giaDonInput = (document.getElementById('giaDonInput') as HTMLInputElement)?.value;
        console.log('giaDonInput:', giaDonInput);
        const giaComboInput = (document.getElementById('giaComboInput') as HTMLInputElement)?.value;
        console.log('giaComboInput:', giaComboInput);

        if (!tenGoiVe || !ngayApDung || !ngayHetHan) {
            message.error('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const giaDon: number | '' = giaDonInput !== '' ? parseFloat(giaDonInput) : '';
        const giaCombo: number | '' = giaComboInput !== '' ? parseFloat(giaComboInput) : '';
        const soVeCombo: number | '' = soVeComboInput !== '' ? parseFloat(soVeComboInput) : '';

        // Kiểm tra giá trị hợp lệ của giaDon và giaCombo
        if (
            (typeof giaDon === 'number' && isNaN(giaDon)) ||
            (typeof giaCombo === 'number' && isNaN(giaCombo))
        ) {
            message.error('Vui lòng nhập giá vé hợp lệ.');
            return;
        }

        const newData = {
            MaGoi: MaGoi, // Include the generated MaGoi in the data to be added to Firestore
            TenGoiVe: tenGoiVe,
            NgayApDung: ngayApDung,
            NgayHetHan: ngayHetHan,
            GiaDon: typeof giaDon === 'number' ? giaDon.toString() : '', // Thay đổi này
            GiaCombo: typeof giaCombo === 'number' ? giaCombo.toString() : '',
            SoVeCombo: typeof soVeCombo === 'number' ? soVeCombo.toString() : '', // Thay đổi này
            TinhTrangSuDung: TinhTrangSuDung,
        };

        if (veLeChecked) {
            const giaDon = parseFloat(giaDonInput);
            if (isNaN(giaDon)) {
                message.error('Vui lòng nhập giá vé hợp lệ.');
                return;
            }
            newData.GiaDon = giaDon.toString();
        } else {
            // If the checkbox is not checked, set GiaDon to an empty string
            newData.GiaDon = '';
        }

        if (comboVeChecked) {
            const giaCombo = parseFloat(giaComboInput);
            const soVeCombo = parseFloat(soVeComboInput); // Add this line to get the value of SoVeCombo
            if (isNaN(giaCombo) || isNaN(soVeCombo)) {
                message.error('Vui lòng nhập giá vé và số vé hợp lệ.');
                return;
            }
            newData.GiaCombo = giaCombo.toString(); // Update GiaCombo with the value from the input
            newData.SoVeCombo = soVeCombo.toString(); // Set SoVeCombo with the value from the input
        } else {
            newData.GiaCombo = ''; // If the checkbox is not checked, set GiaCombo to an empty string
            newData.SoVeCombo = ''; // Set SoVeCombo to an empty string as well
        }

        try {
            // Thêm dữ liệu mới vào Firestore và lấy reference của document đã thêm
            const docRef = await addDoc(ticketPackageCollection, newData);
            message.success('Thêm gói vé thành công');
            // Successfully saved data to Firestore, now reset the input fields
            resetInputFields();

            // Close the modal after saving the data
            onCancel();
            console.log('Document added with ID:', docRef.id);
        } catch (error: any) {
            message.error('Lỗi khi thêm gói vé: ' + error.message);
        }
    };

    return (
        <div>
            <Modal
                open={visible}
                onCancel={onCancel}
                width={690}
                title={
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '26px',
                        }}
                    >
                        <span className="modal-title" style={{ font: 'Montserrat' }}>
                            Thêm gói vé
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
                        }}
                        className="modal-text"
                    >
                        Tên gói vé <span className="required"> *</span>
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
                            id="tenGoiVe" // Add an ID to the input field
                            placeholder="Nhập tên gói vé"
                            style={{
                                width: '367px',
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
                            value={selectedStartDayjs || null}
                            onChange={(date) => setSelectedStartDate(date ? date.toDate() : null)} // Kiểm tra date có tồn tại hay không trước khi cập nhật state
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
                            value={selectedStartDayjs || null}
                            onChange={(time) => setSelectedStartDate(time ? time.toDate() : null)} // Kiểm tra time có tồn tại hay không trước khi cập nhật state
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
                            value={selectedEndDayjs || null}
                            onChange={(date) => setSelectedEndDate(date ? date.toDate() : null)} // Kiểm tra date có tồn tại hay không trước khi cập nhật state
                            className="custom-datepicker"
                            style={{
                                width: '143px',
                                height: '40px',
                                borderColor: '#A5A8B1',
                                marginRight: '8px',
                            }}
                        />

                        <TimePicker
                            value={selectedEndDayjs || null}
                            onChange={(time) => setSelectedEndDate(time ? time.toDate() : null)} // Kiểm tra time có tồn tại hay không trước khi cập nhật state
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
                                    <Checkbox
                                        className="custom-checkbox"
                                        value="A"
                                        onChange={(e) => handleVeLeCheckboxChange(e.target.checked)}
                                    >
                                        <span style={{ opacity: '70%', marginRight: '8px' }}>
                                            Vé lẻ (vnđ/vé) với giá
                                        </span>
                                        <Input
                                            id="giaDonInput" // Thêm ID cho ô Input này
                                            value={giaDonInput} // Đọc giá trị đã nhập vào ô Input
                                            onChange={(e) => setGiaDonInput(e.target.value)} // Cập nhật state khi giá trị thay đổi
                                            style={{
                                                width: '148px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            disabled={!veLeChecked} // Vô hiệu hóa nếu checkbox không được chọn
                                        />
                                        <span style={{ opacity: '70%', marginLeft: '8px' }}>
                                            {' '}
                                            / vé
                                        </span>
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        className="custom-checkbox"
                                        value="B"
                                        onChange={(e) =>
                                            handleComboVeCheckboxChange(e.target.checked)
                                        }
                                    >
                                        <span style={{ opacity: '70%', marginRight: '8px' }}>
                                            Combo vé với giá
                                        </span>
                                        <Input
                                            id="giaComboInput" // Thêm ID cho ô Input này
                                            value={giaComboInput} // Đọc giá trị đã nhập vào ô Input
                                            onChange={(e) => setGiaComboInput(e.target.value)} // Cập nhật state khi giá trị thay đổi
                                            style={{
                                                width: '148px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            disabled={!comboVeChecked} // Vô hiệu hóa nếu checkbox không được chọn
                                        />
                                        <span style={{ opacity: '70%', margin: ' 0 8px 0 8px' }}>
                                            {' '}
                                            /
                                        </span>
                                        <Input
                                            id="soVeComboInput" // Thêm ID cho ô Input này
                                            value={soVeComboInput} // Đọc giá trị đã nhập vào ô Input
                                            onChange={(e) => setSoVeComboInput(e.target.value)} // Cập nhật state khi giá trị thay đổi
                                            style={{
                                                width: '72px',
                                                height: '40px',
                                                backgroundColor: '#F1F4F8',
                                            }}
                                            disabled={!comboVeChecked} // Vô hiệu hóa nếu checkbox không được chọn
                                        />
                                        <span style={{ opacity: '70%', margin: ' 0 8px 0 8px' }}>
                                            {' '}
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
                            <Dropdown
                                // Sử dụng Dropdown của Ant Design
                                overlay={
                                    <Menu onClick={(e) => handleDropdownChange(e.key)}>
                                        <Menu.Item key="Đang áp dụng">Đang áp dụng</Menu.Item>
                                        <Menu.Item key="Tắt">Tắt</Menu.Item>
                                    </Menu>
                                }
                                trigger={['click']}
                            >
                                <Button style={{ borderColor: '#A5A8B1' }}>
                                    <Space>
                                        <span className="dropdown-text">
                                            {TinhTrangSuDung === 'DangApDung'
                                                ? 'Đang áp dụng'
                                                : 'Tắt'}
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
                        // onClick={() => setModalOpen(false)}
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
                        onClick={handleSave} // Gọi hàm xử lý thêm dữ liệu vào Firestore khi người dùng nhấn nút "Lưu"
                    >
                        <span className="text-button">Lưu</span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default NewModal;
