import { IsNotEmpty, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { IsCpfValid } from "../../validators/cpf.validator";

export class UpdateDoctorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()    
    email: string;

    @IsNotEmpty()
    @IsOptional()
    representative_id: string;

    @IsNotEmpty()
    @IsEnum(['Pessoa Física', 'Pessoas Jurídica'])
    type_person: string;

    @IsOptional()
    social_reason: string;

    @IsOptional()
    cnpj: string;

    @IsOptional()
    @IsCpfValid({ message: 'CPF Inválido' })
    cpf: string;

    @IsOptional()
    telephone: string;

    @IsOptional()
    mobile: string;

    @IsOptional()
    profession: string;

    @IsOptional()
    zip_code: string;

    @IsOptional()
    address: string;

    @IsOptional()
    address_number: number;

    @IsOptional()
    complement: string;

    @IsOptional()
    district: string;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;

    @IsOptional()
    @IsString()
    observation: string;
}
