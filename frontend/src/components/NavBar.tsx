import {User} from "../model/User";

export default function NavBar({user}:{
    user: User
}) {




    console.log("NavBar  ==> " + user?.username)

    return (

        <nav className="navbar">

            <div className="d-flex justify-content-around navbar-icons-container">
                <h2 className="fa-solid fa-shop shop-icon"> </h2>
                <form>
                    <input className="form-control me-3 search-input" placeholder="Search" aria-label="Search"/>
                </form>
                {/* users icon containers */}
                <div className={"d-flex"}>
                    {user == undefined ? <div className={"user-icon-container"}>
                            <a id={"example"} href={"/login"}>
                            <h3 className="fa-regular fa-user "></h3>
                            <p>Einlogin</p>
                            </a>

                        </div>

                        :

                        <div className={"user-icon-container"}>
                            <h3 className="fa-solid fa-user-check "></h3>
                            <p>{user?.username}</p>
                        </div>
                    }

                    <h2 className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon"></h2>
                </div>
            </div>

        </nav>

    )
}

