import { IUUIDGenerator } from '@/application/common/interfaces/IUUIDGenerator';
import { v7 as uuidv7 } from 'uuid';

export class UUIDGeneratorUseCase implements IUUIDGenerator {
  generate(): string {
    return uuidv7();
  }
}