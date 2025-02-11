import { SNSInformation } from "@/domain/entities/profile/SNSInformation";

export interface ProfileDTO {
  id: string;
  picture: string;
  name: string;
  birthDate: string;
  phone: string;
  email: string;

  mbti: string;
  hobbies: string[];
  interests: string[];
  trip: string[];
  food: string[];
  topic: string[];
  worry: string;
  lifeMovie: string;
  ideal: string;
  recentSong: string;
  favoritePet: string;
  introduce: string;
  
  snsInformation: SNSInformation[];
}
