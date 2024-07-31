import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Representative } from './entities/representative.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { User } from '../users/entities/user.entity';

export class RepresentativePresenter {
    id: string;
    name: string;
    user_id: string;
    user: User;
    type_person: string;
    social_reason: string;
    cnpj: string;
    cpf: string;
    telephone: string;
    mobile: string;
    zip_code: string;
    address: string;
    address_number: number;
    complement: string;
    district: string;
    city: string;
    state: string;
    country: string;
    observation: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Representative) {
        this.id = output.id;
        this.name = output.name;
        this.user_id = output.user_id;
        this.user = new User({
            id: output.user.id,
            name: output.user.name,
            email: output.user.email,
            type: output.user.type,
            createdAt: output.user.createdAt,
            updatedAt: output.user.updatedAt,
        });;
        this.type_person = output.type_person;
        this.social_reason = output.social_reason;
        this.cnpj = output.cnpj;
        this.cpf = output.cpf;
        this.telephone = output.telephone;
        this.mobile = output.mobile;
        this.zip_code = output.zip_code;
        this.address = output.address;
        this.address_number = output.address_number;
        this.complement = output.complement;
        this.district = output.district;
        this.city = output.city;
        this.state = output.state;
        this.country = output.country;
        this.observation = output.observation;
        this.createdAt = output.createdAt;
    }
}

export class RepresentativeCollectionPresenter extends CollectionPresenter {
    data: RepresentativePresenter[];

    constructor(output: { data: Representative[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Representative) => new RepresentativePresenter(i));
    }
}
