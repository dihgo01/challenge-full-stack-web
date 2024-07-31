import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Report } from './entities/report.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { User } from '../users/entities/user.entity';

export class ReportPresenter {
    id: string;
    id_api: string;
    report: string;
    total_price: number;
    description: string;
    another_language: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Report) {
        this.id = output.id;
        this.id_api = output.id_api;
        this.report = output.report;
        this.total_price = output.total_price;
        this.description = output.description;
        this.another_language = output.another_language;
        this.createdAt = output.createdAt;
    }
}

export class ReportCollectionPresenter extends CollectionPresenter {
    data: ReportPresenter[];

    constructor(output: { data: Report[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Report) => new ReportPresenter(i));
    }
}
