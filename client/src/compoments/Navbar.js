//imports
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <>
        <div>
            <Link to="/">EMPTY YOUR FRIDGE</Link>
        </div>

        <div>
            <Link to="/recipes">Recpies</Link>
            <Link to="/favorites">Fav</Link>
        </div>
        </>
    )
};

export default Navbar;