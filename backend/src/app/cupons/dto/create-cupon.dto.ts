import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCuponDto {
    @IsNotEmpty()
    name_coupon: string;

    @IsNotEmpty()
    @IsNumber() 
    discount: number;

    @IsNotEmpty()
    @IsEnum(['Porcentagem', 'Valor'])
    type: string;

    @IsOptional()
    @IsString()
    description: string;
}
