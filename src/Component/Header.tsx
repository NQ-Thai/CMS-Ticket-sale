import { Header } from 'antd/es/layout/layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FiMail } from 'react-icons/fi';
import { LuBell } from 'react-icons/lu';
import avata from '../assets/images/avt.png';
import logo from '../assets/images/insight logo.png';
import SearchBar from './SearchBar';

function Top() {
    return (
        <>
            <Header className="top" style={{ backgroundColor: 'rgb(249, 247, 247)' }}>
                <img
                    className="image-logo"
                    style={{
                        marginRight: '115px',
                        marginBottom: '10px',
                    }}
                    src={logo}
                    alt=""
                />
                <SearchBar />

                <div className="icon">
                    {/* mail icon */}
                    <FiMail className="mail-icon" />

                    {/* bell icon */}
                    <LuBell className="bell-icon" />

                    <img className="img-avata" src={avata} alt="" />
                </div>
            </Header>
        </>
    );
}

export default Top;
