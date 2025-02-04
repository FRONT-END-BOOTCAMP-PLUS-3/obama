import { SmalltalkSubject } from "../entities/SmalltalkSubject";

export interface IsmalltalkSubjectRepository {
  findAll():Promise<SmalltalkSubject[]>;
  findById(id:number):Promise<SmalltalkSubject | null>;
}