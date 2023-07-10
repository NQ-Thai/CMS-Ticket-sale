import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/images/insight logo.png';
function Header() {
    return (
        <div>
            <header className="header">
                <img className="image-logo" src={logo} alt="" />
                <div className="search-bar">
                    {/* <form className="search-form d-flex align-items-center" action="#">
                        <input type="text" placeholder="Search" />
                        <button type="submit" title="Search">
                            <i className="bi bi-search" />
                        </button>
                    </form> */}
                </div>
            </header>
        </div>
    );
}

export default Header;
