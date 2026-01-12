import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
 
const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className='flex items-center gap-5 bg-white border-b border-gray-200/50 
     py-4 px-7 sticky top-0 z-40 shadow-sm '>
      <button
       className="text-black lg:hidden block"
       onClick={()=>{
        setOpenSideMenu(!openSideMenu);
       }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className='text-2xl' />
        )}
      </button>

      <h2 className='text-lg font-medium text-black'>Expenso</h2>

      {/* {openSideMenu && (
        <div className='fixed left-0 top-[61px] w-64 h-[calc(100vh-61px)] bg-white shadow-lg z-50'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )} */}
      
        {/* Overlay (dark background) */}
          <div
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 
      ${openSideMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Sidebar itself */}
          <div
            className={`fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-xl z-50
      transform transition-transform duration-300
      ${openSideMenu ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>


    </div>
  )
}

export default Navbar;
