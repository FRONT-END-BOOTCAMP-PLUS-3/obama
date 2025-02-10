export interface ProfileHeaderDTO {
  user: {
    userId: string;
    name: string;
    birthDate: string;
    phone: string;
  };
  // snsInformation: {
  //   SNSType: string;
  //   SNSId: string;
  // }[];
}