import React from 'react'
import { Container, NavLink } from 'react-bootstrap'
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
import SidebarLayout from './Sidebar/SidebarLayout';


export const DashboardLayout = () => {
    return (
        <>
            <NavBarLayout />
            <main className="d-flex flex-nowrap">
                <SidebarLayout mesa={`Mesa 2`}></SidebarLayout>
            </main>
        </>
    )
}

export default DashboardLayout;