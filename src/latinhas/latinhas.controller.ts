import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LatinhasService } from './latinhas.service';
import { CreateLatinhaDto } from './dto/create-latinha.dto';
import { UpdateLatinhaDto } from './dto/update-latinha.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('latinhas')
@Controller('latinhas')
export class LatinhasController {
  constructor(private readonly latinhasService: LatinhasService) {}

  @Post()
  create(@Body() createLatinhaDto: CreateLatinhaDto) {
    return this.latinhasService.create(createLatinhaDto);
  }

  @Get()
  findAll() {
    return this.latinhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.latinhasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLatinhaDto: UpdateLatinhaDto) {
    return this.latinhasService.update(+id, updateLatinhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.latinhasService.remove(+id);
  }
}
