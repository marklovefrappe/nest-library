import { Injectable } from '@nestjs/common';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { InstancesRepository } from './instances.repository';
import { InstancesFormatter } from './instances.formatter';
import { ListInstanceDto } from './dto/list-instance.dto';

@Injectable()
export class InstancesService {
  constructor(
    private readonly db: InstancesRepository,
    private readonly format: InstancesFormatter,
  ) {}

  async create(createInstanceDto: CreateInstanceDto): Promise<string> {
    const { bookId } = createInstanceDto;

    const book = await this.db.getBookById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    const { bookInstances } = book;
    let subfix = 1;
    if (bookInstances && bookInstances.length) {
      subfix = bookInstances.length + 1;
    }
    const barcode = `${book.isbn}-${subfix}`;

    const createInstanceObj = {
      ...createInstanceDto,
      status: 'available' as 'available' | 'rented' | 'damaged',
      barcode,
      book: {
        connect: { id: createInstanceDto.bookId },
      },
      bookId: undefined,
    };

    await this.db.createBookInstance(createInstanceObj);

    return 'Create book instance successfully';
  }

  async findAll(listInstanceDto: ListInstanceDto) {
    const bookInstances = await this.db.listBookInstance(listInstanceDto);

    const response = this.format.formatFindAll(bookInstances);
    return response;
  }

  async findOne(id: number) {
    const bookInstance = await this.db.getBookInstanceById(id);
    if (!bookInstance) {
      throw new Error('Book instance not found');
    }

    const response = this.format.formatFindOne({ bookInstance });
    return response;
  }

  async update(id: number, updateInstanceDto: UpdateInstanceDto) {
    const bookInstance = await this.db.getBookInstanceById(id);
    if (!bookInstance) {
      throw new Error('Book instance not found');
    }

    await this.db.updateBookInstance(id, updateInstanceDto);

    return 'Update book instance successfully';
  }

  // remove(id: number) {
  //   return `This action removes a #${id} instance`;
  // }
}
