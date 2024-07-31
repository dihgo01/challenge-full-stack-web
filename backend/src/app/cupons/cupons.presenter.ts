import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Cupon } from './entities/cupon.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';

export class CuponPresenter {
    id: string;
    name_coupon: string;
    discount: number;
    type: string;
    description: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Cupon) {
        this.id = output.id;
        this.name_coupon = output.name_coupon;
        this.discount = output.discount;
        this.type = output.type;
        this.description = output.description;
        this.createdAt = output.createdAt;
    }
}

export class CuponCollectionPresenter extends CollectionPresenter {
    data: CuponPresenter[];

    constructor(output: { data: Cupon[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Cupon) => new CuponPresenter(i));
    }
}
