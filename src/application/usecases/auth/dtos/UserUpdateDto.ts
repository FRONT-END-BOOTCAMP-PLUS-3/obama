import { UserData } from "@/components/dashboard/DashBoard";


export interface UserUpdateDto {
    userId: string;
    field: keyof UserData;
    newValue: string;
  };