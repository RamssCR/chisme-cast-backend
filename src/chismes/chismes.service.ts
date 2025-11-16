import { AIService } from '#ai/ai.service';
import { Chisme } from './entities/chisme.entity';
import { ChismesGateway } from './chismes.gateway';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '#common/interfaces/pagination.interface';

@Injectable()
export class ChismesService {
  constructor(
    @InjectModel(Chisme.name) private readonly chismeModel: Model<Chisme>,
    private readonly aiService: AIService,
    private readonly chismesGateway: ChismesGateway,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<Chisme>> {
    const chismes = await this.chismeModel
      .find()
      .select('-__v')
      .lean()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt')
      .exec();
    const total = await this.chismeModel.countDocuments().exec();
    return {
      data: chismes,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async create(question: string): Promise<Chisme> {
    const chisme = await this.aiService.ask(question);
    const created = await this.chismeModel.create(chisme);

    this.chismesGateway.broadcast(created);
    return created;
  }
}
