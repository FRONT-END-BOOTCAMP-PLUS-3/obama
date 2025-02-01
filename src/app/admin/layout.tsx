"use client";

import AdminLayoutContainer from "./components/AdminLayoutContainer";
import AdminNavbar from "./components/Navbar/AdminNavbar";

const AdminLayout = ({children}:{children:React.ReactNode})=>{
  return(
   <AdminLayoutContainer>
    <AdminNavbar/>
    {children}
   </AdminLayoutContainer>
  );
};

export default AdminLayout;