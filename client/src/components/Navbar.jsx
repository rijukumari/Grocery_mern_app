import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo_1 from "../assets/logo_1.png";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
  } = useContext(AppContext);

  useEffect(()=>{

    if(searchQuery.length>0){
      navigate('/products')
    }
  },[searchQuery])


  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-1 border-b border-gray-300 bg-white transition-all">
      <Link to={"/"} className="flex gap-1 ">
        <img src={logo_1} className="size-20" />
        <h1 className="text-3xl font-bold text-orange-600 my-5">Fresh<span className="text-black">Cart</span></h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-9 ">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
          onChange={(e)=>setSearchQuery(e.target.value)}
            className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <FiSearch />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FiShoppingCart className="size-8 text-blue-600" />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {user ? (
          <>
            <div className="relative group">
              {/* <RxAvatar className="size-7"/> */}
              <img src={assets.profile_icon} className="size-12" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-40 text-sm">
                <li
                  className="p-1.5 cursor-pointer"
                  onClick={() => {
                    navigate("my-orders");
                  }}
                >
                  My Orders
                </li>
                <li
                  className="p-1.5 cursor-pointer"
                  onClick={() => setUser(null)}
                >
                  Logout
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to="/" className="block">
          Home
        </Link>
        <Link to="/products" className="block">
          All Products
        </Link>
        {user ? (
          <>
            <div className="relative group ">
              {/* <RxAvatar className="size-7"/> */}
              <img src={assets.profile_icon} className="size-12" />
              <ul className="hidden group-hover:block absolute top-10  bg-white shadow-md rounded-md border  border-gray-200 py-2 w-32 z-40 text-sm">
                <li
                  className="p-1.5 cursor-pointer"
                  onClick={() => {
                    navigate("my-orders");
                  }}
                >
                  My Orders
                </li>
                <li
                  className="p-1.5 cursor-pointer"
                  onClick={() => setUser(null)}
                >
                  Logout
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
