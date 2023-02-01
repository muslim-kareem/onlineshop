import {User} from "../model/User";
import {Link} from "react-router-dom";
import {ChangeEvent} from "react";

export default function NavBar({user,onSearch}:{
    onSearch?: (search: string) => void
    user: User
}) {



    return (

        <nav className="navbar">

            <div className="d-flex justify-content-around navbar-icons-container">
                <Link to={"/"}><h2 className="fa-solid fa-shop shop-icon"> </h2></Link>
                <form>
                     {/*todo*/}
                    { user && <input  onChange={(e:ChangeEvent <HTMLInputElement>) => {return onSearch !== undefined ? onSearch(e.target.value): null}} className="form-control me-3 search-input" placeholder="Search" aria-label="Search"/>}
                </form>
                {/* users icon containers */}
                <div className={"d-flex"}>
                    {user === null ? <div className={"user-icon-container"}>
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

                    <Link to={"/home-shopping-cart"} className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon fs-2"></Link>
                </div>
            </div>

        </nav>

    )
}

