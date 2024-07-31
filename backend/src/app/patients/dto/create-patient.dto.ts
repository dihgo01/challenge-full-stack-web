import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCpfValid } from "src/app/validators/cpf.validator";

export class CreatePatientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    doctor_id: string;

    @IsNotEmpty()
    tag_id: string;

    @IsNotEmpty()
    @IsEnum(['M', 'F'])
    gender: string;

    @IsNotEmpty()
    @IsCpfValid({ message: 'CPF Inválido' })
    cpf: string;

    @IsNotEmpty()
    height: string;

    @IsNotEmpty()
    weight: string;

    @IsNotEmpty()
    @IsDate()
    age: Date;

    @IsOptional()
    under_age: string;

    @IsOptional()
    responsible_name: string;

    @IsOptional()
    responsible_document: string;

    @IsOptional()
    @IsString()
    observation: string;
}
