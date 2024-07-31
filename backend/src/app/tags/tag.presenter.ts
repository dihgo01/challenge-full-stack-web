import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Tag } from './entities/tag.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { Doctor } from '../doctor/entities/doctor.entity';

export class TagPresenter {
    id: string;
    tag: string;
    doctor_id: string;
    doctor: Doctor;
    lots: string;
    bind: string;
    country: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Tag) {
        this.id = output.id;
        this.tag = output.tag;
        this.doctor_id = output.doctor_id;
        this.doctor = output.doctor;
        this.lots = output.lots;
        this.bind = output.bind;
        this.country = output.country;
        this.createdAt = output.createdAt;
    }
}

export class TagCollectionPresenter extends CollectionPresenter {
    data: TagPresenter[];

    constructor(output: { data: Tag[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Tag) => new TagPresenter(i));
    }
}
