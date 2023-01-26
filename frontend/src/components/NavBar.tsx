import {User} from "../model/User";
import {NavLink} from "react-router-dom";

export default function NavBar({user}:{
    user: User
}) {





    return (

        <nav className="navbar">

            <div className="d-flex justify-content-around navbar-icons-container">
                <h2 className="fa-solid fa-shop shop-icon"> </h2>
                <form>
                    <input className="form-control me-3 search-input" placeholder="Search" aria-label="Search"/>
                </form>
                {/* users icon containers */}
                <div className={"d-flex"}>
                    {/* eslint-disable-next-line eqeqeq */}
                    {user == undefined ? <div className={"user-icon-container"}>
                            <a href={"/login"}>
                            <div className="fa-regular fa-user  fs-2"></div>
                            <p >Einlogin</p>
                            </a>

                        </div>

                        :

                        <div className={"user-icon-container"}>
                            <div className="fa-solid fa-user-check fs-2"></div>
                            <p className={"text-under-icon"}>{user?.username}</p>
                        </div>
                    }

                    <NavLink to={"/home-shopping-cart"} className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon fs-2"></NavLink>
                </div>
            </div>

        </nav>

    )
}

