import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Chisme } from './entities/chisme.entity';
import { ChismesService } from './chismes.service';
import { Pagination } from '#common/interfaces/pagination.interface';
import { PaginationDto } from '#common/dtos/pagination.dto';
import { CreateChismeDto } from './dto/chisme.dto';

@Controller('chismes')
export class ChismesController {
  constructor(private readonly chismesService: ChismesService) {}

  @Get()
  async findAll(
    @Query() { page, limit }: PaginationDto,
  ): Promise<Pagination<Chisme>> {
    return await this.chismesService.findAll(page, limit);
  }

  @Post()
  async create(@Body() { question }: CreateChismeDto): Promise<Chisme> {
    return await this.chismesService.create(question);
  }
}
