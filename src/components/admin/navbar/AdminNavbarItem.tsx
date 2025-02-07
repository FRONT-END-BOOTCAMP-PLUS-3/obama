import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminNavbarItem } from "@/types/adminNavBar";

interface AdminNavbarItemProps {
  item: AdminNavbarItem;
}

const AdminNavbarItem: React.FC<AdminNavbarItemProps> = ({ item }) => {
  const pathname = usePathname();

  if (item.children) {
    return (
      <div key={item.label}>
        <span>{item.label}</span>
        <div className="submenu">
          {item.children.map((child) => (
            <AdminNavbarItem key={child.label} item={child} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {item.path ? (
        <Link href={item.path} className={pathname === item.path ? 'active' : ''}>
          {item.label}
        </Link>
      ) : (
        <span>{item.label}</span> 
      )}
    </>
  );
};

export default AdminNavbarItem;
