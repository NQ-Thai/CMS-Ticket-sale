import { Header } from 'antd/es/layout/layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import avata from '../assets/images/avt.png';
import logo from '../assets/images/insight logo.png';
import SearchBar from './SearchBar';

function Top() {
    return (
        <>
            {/* <Layout> */}
            <Header
                className="top"
                style={{
                    backgroundColor: 'rgb(249, 247, 247)',
                }}
            >
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
                    <svg
                        className="mail-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g opacity="0.8">
                            <path
                                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                stroke="#1E0D03"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M22 6L12 13L2 6"
                                stroke="#1E0D03"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                    </svg>

                    {/* bell icon */}
                    <svg
                        className="bell-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                    >
                        <path
                            d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                            stroke="#1E0D03"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <img className="img-avata" src={avata} alt="" />
                </div>
            </Header>
            {/* </Layout> */}
        </>
    );
}

export default Top;
