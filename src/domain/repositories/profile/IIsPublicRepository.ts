import { IsPublicDTO } from "@/application/usecases/profile/dtos/IsPublicDTO";
import { IsPublic } from "@/domain/entities/profile/IsPublic";

export interface IIsPublicRepository {
  // 특정 유저의 공개 설정 조회
  findByUserId(userId: string): Promise<IsPublic[]>;

  // 특정 유저의 공개 설정 업데이트
  update(userId: string, settings: IsPublicDTO[] | IsPublic[]): Promise<void>;
}