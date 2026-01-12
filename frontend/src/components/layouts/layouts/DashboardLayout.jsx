import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';


const DashboardLayout = ({children, activeMenu}) => {

    const {user} = useContext(UserContext);

  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>  
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className='flex'>
                <div className='hidden lg:block'>             
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='flex-1 mx-5 mt-5'>{children}</div>  
            </div>
        )}
      
    </div>
  )
}

export default DashboardLayout;
