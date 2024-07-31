import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../presenters/collection.presenter';
import { Order } from './entities/order.entity';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { User } from '../users/entities/user.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Patient } from '../patients/entities/patient.entity';
import { OrderProduct } from './entities/order-product.entity';

export class OrderPresenter {
    id: string;
    code_order: string;
    patient_id: string;
    patient: Patient;
    doctor_id: string;
    doctor: Doctor;
    subtotal_price: number;
    total_price: number;
    discount_value: number;
    type_discount: string;
    send_kit: string;
    url_csv: string;
    status_order: string;
    products: OrderProduct[];
    @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date;

    constructor(output: Order) {
        this.id = output.id;
        this.code_order = output.code_order;
        this.patient_id = output.patient_id;
        this.patient = output.patient;
        this.doctor_id = output.doctor_id;
        this.doctor = output.doctor;
        this.subtotal_price = output.subtotal_price;
        this.total_price = output.total_price;
        this.discount_value = output.discount_value;
        this.type_discount = output.type_discount;
        this.send_kit = output.send_kit;
        this.url_csv = output.url_csv;
        this.status_order = output.status_order;
        this.products = output.products;
        this.createdAt = output.createdAt;
    }
}

export class OrderCollectionPresenter extends CollectionPresenter {
    data: OrderPresenter[];

    constructor(output: { data: Order[]; paginationProps: PaginationPresenterProps }) {
        const { data, paginationProps } = output;
        super(paginationProps);
        this.data = data.map((i: Order) => new OrderPresenter(i));
    }
}
