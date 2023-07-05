import logo from '../assets/images/insight logo.png';

function Header() {
    return (
        <div>
            <header className="header">
                <div className="">
                    <img className="image-logo" src={logo} alt="" />
                </div>
            </header>
        </div>
    );
}

export default Header;
