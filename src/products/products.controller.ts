import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable } from 'rxjs';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService:ProductsService) {}

  @Post()
  create(@Body() createProductDto:CreateProductDto): Observable<Product> {
    return this.productsService.create(createProductDto);
  }

}
