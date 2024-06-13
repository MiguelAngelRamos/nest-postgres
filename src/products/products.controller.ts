import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable } from 'rxjs';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService:ProductsService) {}

  @Post()
  create(@Body() createProductDto:CreateProductDto): Observable<Product> {
    return this.productsService.create(createProductDto);
  }

  findAll(): Observable<Product[]> {
    return this.productsService.findAll();
  }

  findOne(@Param('id') id:string):Observable<Product>{
    //* + hace la transformacion a numeric
    return this.productsService.findOne(+id);
  }

  update(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto):Observable<any> {
    return this.productsService.update(+id, updateProductDto);
  }

  remove(id: string): Observable<any> {
   return this.productsService.remove(+id);
  }

}
