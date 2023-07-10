import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/images/insight logo.png';
function Header() {
    return (
        <div>
            <header className="header">
                <img className="image-logo" src={logo} alt="" />

                <input className="search" type="text" placeholder="Search" />
                <button type="submit" title="Search">
                    <i className="bi bi-search" />
                </button>
            </header>
        </div>
    );
}

export default Header;
