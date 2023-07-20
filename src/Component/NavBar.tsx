import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FC } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiFileList3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NavBar: FC = () => {
    return (
        <Sider
            width={265}
            className="sider"
            style={{
                backgroundColor: 'rgb(249, 247, 247)',
                paddingTop: '40px',
                paddingLeft: '25px',
            }}
        >
            <Menu
                style={{
                    backgroundColor: 'rgb(249, 247, 247)',
                }}
                mode="inline"
                theme="light"
            >
                <Menu.Item
                    key="/trangchu"
                    icon={
                        <FiHome
                            className="nav-icon"
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    }
                >
                    <Link to="/trangchu">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item
                    key="/quanlive"
                    icon={
                        <BsTicketPerforated
                            className="nav-icon"
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    }
                >
                    <Link to="/quanlive">Quản lý vé</Link>
                </Menu.Item>
                <Menu.Item
                    key="/doisoatve"
                    icon={
                        <RiFileList3Line
                            className="nav-icon"
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    }
                >
                    <Link to="/doisoatve">Đối soát vé</Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="/goidichvu"
                    title="Cài đặt"
                    icon={
                        <IoSettingsOutline
                            className="nav-icon"
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    }
                >
                    <Menu.Item>
                        <Link to="/goidichvu">Gói sự kiện</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    );
};

export default NavBar;
