import {
    Column,
    Table,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    IsUUID,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { Report } from "src/app/reports/entities/report.entity";
import { Order } from "./order.entity";

@Table({
    tableName: 'orders_products',
    paranoid: true,
})
export class OrderProduct extends Model<OrderProduct> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @ForeignKey(() => Report)
    @Column({ allowNull: false })
    report_id: string;

    @BelongsTo(() => Report, 'report_id')
    report: Report;

    @ForeignKey(() => Order)
    @Column({ allowNull: false })
    order_id: string;

    @BelongsTo(() => Order, 'order_id')
    order: Order;

    @Column({ allowNull: true, })
    url_pdf: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
