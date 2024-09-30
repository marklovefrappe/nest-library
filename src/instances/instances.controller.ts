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
  create(
    @Body(new ValidationPipe({ transform: true }))
    createInstanceDto: CreateInstanceDto,
  ) {
    return this.instancesService.create(createInstanceDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    listInstanceDto: ListInstanceDto,
  ) {
    return this.instancesService.findAll(listInstanceDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.instancesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateInstanceDto: UpdateInstanceDto,
  ) {
    return this.instancesService.update(id, updateInstanceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.instancesService.remove(+id);
  // }
}
