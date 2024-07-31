import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Patient } from './entities/patient.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { User } from '../users/entities/user.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Tag } from '../tags/entities/tag.entity';

export class PatientPresenter {
    id: string;
    name: string;
    doctor_id: string;
    doctor: Doctor;
    tag_id: string;
    tag: Tag;
    gender: string;
    cpf: string;
    height: string;
    weight: string;
    age: Date;
    under_age: string;
    responsible_name: string;
    responsible_document: string;
    observation: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Patient) {
        this.id = output.id;
        this.name = output.name;
        this.doctor_id = output.doctor_id;
        this.doctor = output.doctor;
        this.tag_id = output.tag_id;
        this.tag = output.tag;
        this.cpf = output.cpf;
        this.gender = output.gender;
        this.height = output.height;
        this.weight = output.weight;
        this.age = output.age;
        this.under_age = output.under_age;
        this.responsible_name = output.responsible_name;
        this.responsible_document = output.responsible_document;
        this.observation = output.observation;
        this.createdAt = output.createdAt;
    }
}

export class PatientCollectionPresenter extends CollectionPresenter {
    data: PatientPresenter[];

    constructor(output: { data: Patient[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Patient) => new PatientPresenter(i));
    }
}
