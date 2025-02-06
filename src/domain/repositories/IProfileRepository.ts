import { Profile } from "../entities/Profile";

export interface IProfileRepository {
  getProfile(userId: string): Promise<Profile>;
  updateProfile(userId: string, profileData: Partial<Profile>): Promise<void>; // 업데이트용
}
