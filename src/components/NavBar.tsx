import "../styles/NavBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="container">
                <a className="navbar-brand" href="/#">
                    conduit
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="/#">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/editor">
                            <i className="ti ti-edit" aria-hidden="true" />
                            New Article
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/settings">
                            <i className="ti ti-settings" aria-hidden="true" />
                            Settings
                        </a>
                    </li>
                    <li className="nav-item nav-item--signin">
                        <a className="nav-link" href="/#/login">
                            Sign in
                        </a>
                    </li>
                    <li className="nav-item nav-item--signup">
                        <a className="nav-link" href="/#/register">
                            Sign up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
