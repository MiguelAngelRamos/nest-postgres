import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Observable } from 'rxjs';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('productos')
@Controller('products')
export class ProductsController {

  constructor(private readonly productsService:ProductsService) {}

  @Post()
  @ApiOperation({summary: 'Crear un nuevo producto'})
  @ApiResponse({status: 201, description: 'El producto ha sido creado.'})
  @ApiResponse({status: 400, description: 'Datos inválidos.'})
  create(@Body() createProductDto:CreateProductDto): Observable<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener todos los productos'})
  @ApiResponse({status: 200, description: 'Lista de productos.'})
  findAll(): Observable<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un producto por ID'})
  @ApiResponse({status: 200, description: 'Detalles del producto'})
  @ApiResponse({status: 404, description: 'Producto no encontrado'})
  findOne(@Param('id') id:string):Observable<Product>{
    //* + hace la transformacion a numeric
    return this.productsService.findOne(+id);
  }
  @Patch(':id')
  @ApiOperation({summary: 'Actualizar un producto por ID'})
  @ApiResponse({status: 200, description: 'El producto ha sido actualizado'})
  @ApiResponse({status: 404, description: 'Producto no encontrado.'})
  update(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto):Observable<any> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar un producto por ID'})
  @ApiResponse({status: 200, description: 'El producto ha sido eliminado'})
  @ApiResponse({status: 404, description: 'Producto no encontrado'})
  remove(id: string): Observable<any> {
   return this.productsService.remove(+id);
  }

}
