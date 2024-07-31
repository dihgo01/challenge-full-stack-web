import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    tag: string;

    @IsNotEmpty()
    doctor_id: string;

    @IsNotEmpty()
    lots: string;

    @IsNotEmpty()
    @IsEnum(['Sim', 'Não'])
    bind: string;

    @IsNotEmpty()
    country: string;
}
