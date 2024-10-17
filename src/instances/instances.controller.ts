import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { InstancesService } from './instances.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { ListInstanceDto } from './dto/list-instance.dto';

@Controller('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createInstanceDto: CreateInstanceDto,
  ) {
    return await this.instancesService.create(createInstanceDto);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    listInstanceDto: ListInstanceDto,
  ) {
    return await this.instancesService.findAll(listInstanceDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.instancesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateInstanceDto: UpdateInstanceDto,
  ) {
    return await this.instancesService.update(id, updateInstanceDto);
  }

  // @Post()
  // async rentBook(@Body() rentBookDto: RentBookDto) {}
}
