import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackagingEntities } from 'src/entitities/packaging.entities';


@Injectable()
export class PackagingService {
    constructor(){}
}
