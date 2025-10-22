import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BaseService<T extends { id?: number | string }> {
  constructor(protected readonly repo: Repository<T>) {}

  findAll(relations: string[] = []): Promise<T[]> {
    return this.repo.find({ relations });
  }

  async findOne(id: number | string, relations: string[] = []): Promise<T> {
    // Accept both number and string (controllers often pass +id => number)
    const item = await this.repo.findOne({ where: { id } as any, relations });
    if (!item) throw new NotFoundException(`Resource with id=${id} not found`);
    return item;
  }

  create(data: Partial<T>): Promise<T> {
    const e = this.repo.create(data as any);
    return this.repo.save(e as any);
  }

  async update(id: number | string, data: Partial<T>): Promise<T> {
    await this.findOne(id); // this will throw an error  if it goes  missing
    await this.repo.update(id as any, data as any);
    return this.findOne(id);
  }

  async remove(id: number | string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id as any);
  }
}
