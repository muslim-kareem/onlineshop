import {User} from "../model/User";
import {useEffect, useState} from "react";
import axios from "axios";


export default function NavBar() {

    const [user, setUser] = useState<User>();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                try {
                    const user = await axios.get("/api/app-users/me");
                    setUser(user.data);

                } catch (e) {
                    console.error("You are not logged in!", e);
                } finally {
                    setIsReady(true);
                }
            })();
        }, 300)

    }, [user]);


    console.log("user login page" + user)

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
                            <a id={"example"} href={"/login"}>
                            <h3 className="fa-regular fa-user user-icon-container"></h3>
                            <p>Einlogin</p>
                            </a>

                        </div>


                        :

                        <div className={"user-icon-container"}>
                            <h3 className="fa-solid fa-user-check user-icon-container"></h3>
                            <p>{user?.username}</p>
                        </div>
                    }

                    <h2 className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon"></h2>
                </div>
            </div>

        </nav>

    )
}

