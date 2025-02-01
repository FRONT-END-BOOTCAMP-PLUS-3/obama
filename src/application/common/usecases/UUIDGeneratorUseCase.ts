import { IUUIDGeneratorUseCase } from '@/application/common/usecases/interfaces/IUUIDGeneratorUseCase';
import { v7 as uuidv7 } from 'uuid';

export class UUIDGeneratorUseCase implements IUUIDGeneratorUseCase {
  generate(): string {
    return uuidv7();
  }
}