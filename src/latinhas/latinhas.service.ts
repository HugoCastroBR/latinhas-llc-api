import { Injectable } from '@nestjs/common';
import { CreateLatinhaDto } from './dto/create-latinha.dto';
import { UpdateLatinhaDto } from './dto/update-latinha.dto';

@Injectable()
export class LatinhasService {
  create(createLatinhaDto: CreateLatinhaDto) {
    return 'This action adds a new latinha';
  }

  findAll() {
    return `This action returns all latinhas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} latinha`;
  }

  update(id: number, updateLatinhaDto: UpdateLatinhaDto) {
    return `This action updates a #${id} latinha`;
  }

  remove(id: number) {
    return `This action removes a #${id} latinha`;
  }
}
