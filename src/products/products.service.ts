import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable, from } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>) { }

  create(createProductDto: CreateProductDto):Observable<Product> {
    const product = this.productRepository.create(createProductDto);
    return from(this.productRepository.save(product));
  }

  findAll(): Observable<Product[]> {
    return from(this.productRepository.find())
  }

  findOne(id: number):Observable<Product>{
    return from(this.productRepository.findOneBy({id}))
  }

  update(id: number, updateProductDto: UpdateProductDto):Observable<any> {
    return from(this.productRepository.update(id, {...updateProductDto}))
  }

  remove(id: number): Observable<any> {
    return from(this.productRepository.delete(id));
  }
}
