import { PartialType } from '@nestjs/swagger';
import { CreateLatinhaDto } from './create-latinha.dto';

export class UpdateLatinhaDto extends PartialType(CreateLatinhaDto) {}
