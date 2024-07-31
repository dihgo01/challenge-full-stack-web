import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    patient_id: string;

    @IsNotEmpty()
    @IsString()
    doctor_id: string;

    @IsNotEmpty()
    subtotal_price: number;

    @IsNotEmpty()
    total_price: number;

    @IsNotEmpty()
    discount_value: number;

    @IsNotEmpty()
    representative_id: string;

    @IsOptional()
    @IsEnum(['Porcentagem', 'Valor'])
    type_discount: string;

    @IsOptional()
    @IsEnum(['Porcentagem', 'Valor'])
    send_kit: string;

    @IsOptional()
    url_csv: string;

    @IsOptional()
    @IsEnum(['Pendente', 'Em análise', 'Em transporte', 'Concluído', 'Cancelado'])
    status_order: string;

    @IsNotEmpty()
    products: Array<{
        id?: string;
        product_id: string;
    }>;
}
