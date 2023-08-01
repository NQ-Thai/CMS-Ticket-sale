import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FC, useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiFileList3Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const NavBar: FC = () => {
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const handleMenuClick = (e: any) => {
        setSelectedMenu(e.key);
    };

    return (
        <Sider width={265} className="sider" style={{ backgroundColor: 'rgb(249, 247, 247)' }}>
            <Menu
                style={{ backgroundColor: 'rgb(249, 247, 247)', paddingRight: '20px' }}
                mode="inline"
                theme="light"
                selectedKeys={[location.pathname]}
                onSelect={handleMenuClick}
            >
                <Menu.Item
                    style={{ height: '50px' }}
                    key="/trangchu"
                    icon={<FiHome className="nav-icon" />}
                    className={selectedMenu === '/trangchu' ? 'selected-menu-item' : ''}
                >
                    <Link to="/trangchu">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item
                    style={{ height: '50px' }}
                    key="/quanlive"
                    icon={<BsTicketPerforated className="nav-icon" />}
                    className={selectedMenu === '/quanlive' ? 'selected-menu-item' : ''}
                >
                    <Link to="/quanlive">Quản lý vé</Link>
                </Menu.Item>
                <Menu.Item
                    style={{ height: '50px' }}
                    key="/doisoatve"
                    icon={<RiFileList3Line className="nav-icon" />}
                    className={selectedMenu === '/doisoatve' ? 'selected-menu-item' : ''}
                >
                    <Link to="/doisoatve">Đối soát vé</Link>
                </Menu.Item>
                <Menu.SubMenu
                    style={{
                        height: '50px',
                    }}
                    key="/goidichvu"
                    title="Cài đặt"
                    icon={<IoSettingsOutline className="nav-icon" />}
                    className={selectedMenu === '/goidichvu' ? 'selected-menu-item' : ''}
                >
                    <Menu.Item style={{ height: '40px' }} key="/goidichvusubmenu">
                        <Link to="/goidichvu">Gói dịch vụ</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    );
};

export default NavBar;
