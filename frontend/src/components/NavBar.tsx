import {User} from "../model/User";
import {Link} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import LogoutButton from "./LogoutButton";
import useProducts from "../hooks/useProducts";

export default function NavBar({user, onSearch,shoppingCartNum}: {
    shoppingCartNum?: number
    onSearch?: (search: string) => void
    user: User
}) {

    const [categoryName, setCateGoryName] = useState("ALL")
    const [products] = useProducts("")

    const uniqueCategory = [...new Set(products.map(m => m.category))]

    return (

        <nav className="navbar">
            <div className="d-flex justify-content-around navbar-icons-container">
                <Link to={"/"}>
                    <div className="fa-solid fs-1 fa-shop shop-icon"></div>
                    MyShop</Link>

                    {/*SEARCH INPUT*/}
                <form  className={"inline"}>
                    {user && <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        return onSearch !== undefined ? onSearch(e.target.value) : null
                    }} className="form-control ms-3 mt-2 search-input" placeholder="Search" aria-label="Search"/>}
                </form>

                {/* users icon containers */}
                <div className={"d-flex "}>

                    {user === null ? <div className={" user-icon-container"}>
                            <a href={"/login"}>
                                <div className="fa-regular fa-user  fs-2"></div>
                                <p>Login</p>
                            </a>

                        </div>
                        :
                        <div className={"user-icon-container"}>
                            <div className="fa-solid fa-user-check fs-2"></div>
                            <p className={"text-under-icon"}>{user?.username}</p>
                        </div>}
                    {/*SHOPPING CART ICON*/}

                    <Link to={"/home-shopping-cart"}>

                        <div className={"sopping-cart-num"}>{shoppingCartNum}</div>
                        <div className="fa-sharp fa-solid fa-cart-shopping shopping-cart-icon fs-2">

                        </div>
                    </Link>
                    {/*DROPDOWN*/}
                    <div className="dropdown">

                        <button className="btn ms-2 mt-2"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="true">
                            <div className="fa-solid fa-circle-chevron-down"></div>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <div className="dropdown-item"><Link to={"/ordered"}>myOrder</Link>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown-item" ><Link to={"/login"}>Login</Link>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown-item" ><LogoutButton/></div>
                            </li>
                        </ul>
                    </div>

                    {/*DROPDOWN CATEGORY*/}
                    <div className="dropdown">
                        <button className="btn ms-0 mt-2"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="true">
                            <h6 >{categoryName}</h6>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <div className="dropdown-item"  onClick={() => setCateGoryName("ALL")}>
                                    <Link to={"/"}>ALL</Link></div>
                            </li>

                            {uniqueCategory.map(category =>
                                <li key={category}>
                                    <div className="dropdown-item"
                                            onClick={() => setCateGoryName(category)}>
                                        <Link

                                            to={"/" + category}>{category}</Link>
                                    </div>
                                </li>)}
                          </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}

