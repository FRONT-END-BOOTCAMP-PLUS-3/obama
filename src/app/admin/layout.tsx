"use client";

import AdminLayoutContainer from "../../components/admin/AdminLayoutContainer";
import AdminNavbar from "../../components/admin/navbar/AdminNavbar";

const AdminLayout = ({children}:{children:React.ReactNode})=>{
  return(
   <AdminLayoutContainer>
    <AdminNavbar/>
    {children}
   </AdminLayoutContainer>
  );
};

export default AdminLayout;