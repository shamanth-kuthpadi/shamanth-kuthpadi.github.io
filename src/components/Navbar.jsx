import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="navbar-elem" to="/">
          shamanth kuthpadi
        </Link>
      </div>
      <div className="navbar-right">
        <Link className="navbar-elem" to="/">
          about
        </Link>
        <Link className="navbar-elem" to="/projects">
          projects
        </Link>
        <a
          className="navbar-elem"
          href="https://drive.google.com/file/d/1xLb4kvgFkh25lIZgvurpjbBDnMKbsQoJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          cv
        </a>
        <Link className="navbar-elem" to="/blog">
          blog
        </Link>
        <Link className="navbar-elem" to="/contact">
          contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
