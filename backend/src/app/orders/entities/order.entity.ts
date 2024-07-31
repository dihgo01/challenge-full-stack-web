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
    BelongsTo,
    HasMany
} from "sequelize-typescript";
import { Doctor } from "src/app/doctor/entities/doctor.entity";
import { Patient } from "src/app/patients/entities/patient.entity";
import { OrderProduct } from "./order-product.entity";

@Table({
    tableName: 'orders',
    paranoid: true,
})
export class Order extends Model<Order> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({allowNull: false,})
    code_order: string;

    @ForeignKey(() => Patient)
    @Column({ allowNull: false })
    patient_id: string;

    @BelongsTo(() => Patient, 'patient_id')
    patient: Patient;

    @ForeignKey(() => Doctor)
    @Column({ allowNull: false })
    doctor_id: string;

    @BelongsTo(() => Doctor, 'doctor_id')
    doctor: Doctor;

    @Column({ allowNull: false, })
    subtotal_price: number;

    @Column({ allowNull: false, })
    total_price: number;
    
    @Column({ allowNull: false, })
    discount_value: number;

    @Column({
        allowNull: true,
        type: DataType.ENUM('Porcentagem', 'Valor')
    })
    type_discount: string;

    @Column({
        allowNull: false,
        defaultValue: 'Sim',
        type: DataType.ENUM('Sim', 'Não')
    })
    send_kit: string;

    @Column({allowNull: true,})
    url_csv: string;

    @Column({
        allowNull: false,
        defaultValue: 'Pendente',
        type: DataType.ENUM('Pendente', 'Em análise', 'Em transporte', 'Concluído', 'Cancelado')
    })
    status_order: string;

    @HasMany(() => OrderProduct, 'order_id')
    products: OrderProduct[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
