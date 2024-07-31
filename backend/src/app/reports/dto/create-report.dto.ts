import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateReportDto {
    @IsOptional()
    id_api: string;

    @IsNotEmpty()
    report: string;

    @IsNotEmpty()
    total_price: number;

    @IsOptional()
    description: string;

    @IsOptional()
    another_language: string;
}
