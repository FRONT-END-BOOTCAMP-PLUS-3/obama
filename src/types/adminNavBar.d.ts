export interface AdminNavbarItem {   
  label: string;
  path?: string;
  children?: AdminNavbarItem[];  
}

export type AdminNavbarItems = AdminNavbarItem[];


