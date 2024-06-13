import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @ApiProperty({example: 'Macbook Pro', description: 'El nombre del producto'})
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({example: 'Portatil de alta gama', description: 'Descripción del producto', required: false})
  description?:string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({example: 2400000.0, description: 'El precio del producto'})
  price: number;


}