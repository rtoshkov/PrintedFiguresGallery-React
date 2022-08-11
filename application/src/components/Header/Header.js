import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {


    return (
        <header>

            <img src="/logo.png" alt="Logo Image"/>
            <h1>Printed Figures Gallery</h1>

            <nav>
                <ul>
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="/all-figures">All figures
                        </NavLink>
                    </li>
                    {/*Login User*/}
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="/create">Create
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="Logout">Logout</NavLink></li>
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="MyFigures">My Figures
                        </NavLink>
                    </li>
                    {/*Logout User*/}
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="/login">Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.bold : 'undefined')}
                            to="/register">Register
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;