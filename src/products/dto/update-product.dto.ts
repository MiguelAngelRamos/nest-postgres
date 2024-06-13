import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto){

  @ApiProperty({example: 'Macbook Pro M3', description: 'El nombre del producto actualizado', required: false})
  name?: string;
  @ApiProperty({example: 'Portatil de alta gama, la nueva generacion de procesadores ARM', description: 'Descripción del producto actualizado', required: false})
  description?:string;
  @ApiProperty({example: 2600000.0, description: 'El precio del producto actualizado', required: false})
  price?: number;
}