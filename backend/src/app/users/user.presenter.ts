import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { User } from './entities/user.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';

export class UserPresenter {
    id: string;
    name: string;
    email: string;
    type: string;
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: User) {
        this.id = output.id;
        this.name = output.name;
        this.email = output.email;
        this.type = output.type;
        this.createdAt = output.createdAt;
    }
}

export class UserCollectionPresenter extends CollectionPresenter {
    data: UserPresenter[];

    constructor(output: { data: User[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: User) => new UserPresenter(i));
    }
}
