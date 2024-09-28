import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'hok',
      sex: 'male',
    },
    {
      id: 2,
      name: 'heng',
      sex: 'male',
    },
    {
      id: 1,
      name: 'mus',
      sex: 'male',
    },
    {
      id: 1,
      name: 'lee',
      sex: 'male',
    },
  ];

  getList() {
    return this.users;
  }
}
