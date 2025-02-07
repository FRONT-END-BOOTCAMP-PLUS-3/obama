import { SmalltalkSubject } from "../../entities/smalltalk/SmalltalkSubject";

export interface IsmalltalkSubjectRepository {
  findAll():Promise<SmalltalkSubject[] | null>;
  findById(id:number):Promise<SmalltalkSubject | null>;
}