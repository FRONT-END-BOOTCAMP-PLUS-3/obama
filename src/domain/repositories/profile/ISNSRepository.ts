import { SNSInformation } from "@/domain/entities/profile/SNSInformation";

export interface ISNSRepository {
    findAllByUserId(userId: number): Promise<SNSInformation[]>;
}
