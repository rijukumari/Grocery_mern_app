import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo_1 from "../assets/logo_1.png";

function SellerLayout() {
  const {  setIsSeller, navigate } = useContext(AppContext);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];
  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
       <Link to="/" className="flex ">
        <img src={logo_1} className="size-20" />
       <h1 className=" mt-5 text-3xl text-orange-600 font-bold">Fresh<span className="text-black">Cart</span></h1> 
       </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={() => {
              setIsSeller(false);
              navigate("/seller");
            }}
            className="border rounded-full text-sm px-4 py-1 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">

      <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
        {sidebarLinks.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/seller"}
            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                       ${
                         isActive
                           ? "border-r-4 md:border-r-[6px] bg-gray-100 "
                           : "hover:bg-gray-100/90  border-white"
                       }`}
          >
            <img src={item.icon} alt="" className="w-7 h-7"/>
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
      <Outlet/>
      </div>
    </>
  );
}

export default SellerLayout;
