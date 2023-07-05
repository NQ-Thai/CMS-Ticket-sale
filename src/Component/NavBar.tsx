function NavBar() {
    return (
        <aside className="sidebar">
            <ul className="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="bi bi-grid" />
                        <span>Trang chủ</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#">
                        <i className="">
                            <span>Quản lí vé</span>
                        </i>
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default NavBar;
