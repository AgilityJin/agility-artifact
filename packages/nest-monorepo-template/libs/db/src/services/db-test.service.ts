import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../entities';
import { Repository } from 'typeorm';
import { DbBaseService } from '../db-base.service';

@Injectable()
export class DbTestService extends DbBaseService<Test> {
  constructor(
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,
  ) {
    super(testRepo);
  }
}
