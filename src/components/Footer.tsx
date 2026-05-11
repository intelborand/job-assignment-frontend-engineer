import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="container footer">
                <a href="/" className="logo-font">
                    conduit
                </a>
                <span className="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
                    licensed under MIT.
                </span>
            </div>
        </footer>
    )
}