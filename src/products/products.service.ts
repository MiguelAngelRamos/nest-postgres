import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable, from } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>) { }

  create(createProductDto: CreateProductDto):Observable<Product> {
    const product = this.productRepository.create(createProductDto);
    return from(this.productRepository.save(product));
  }

  findAll() {

  }

  findOne(){

  }

  update() {

  }

  remove() {

  }
}
