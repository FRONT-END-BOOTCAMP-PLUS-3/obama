export interface ProfileHeaderDTO {
  user: {
    user_id: string;
    name: string;
    birth_date: string;
    phone: string;
  };
  snsInformation: {
    SNS_Type: string;
    SNS_id: string;
  }[];
}