import {User} from "../model/User";

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
                    {user === undefined ? <div className={"user-icon-container"}>
                            <a href={"/login"}>
                            <div className="fa-regular fa-user "></div>
                            <p>Einlogin</p>
                            </a>

                        </div>

                        :

                        <div className={"user-icon-container"}>
                            <div className="fa-solid fa-user-check "></div>
                            <p>{user?.username}</p>
                        </div>
                    }

                    <div className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon"></div>
                </div>
            </div>

        </nav>

    )
}

