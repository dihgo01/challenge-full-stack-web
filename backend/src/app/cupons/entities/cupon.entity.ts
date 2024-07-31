import {
    Column,
    Table,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    IsUUID,
} from "sequelize-typescript";

@Table({
    tableName: 'coupons',
    paranoid: true,
})
export class Cupon extends Model<Cupon> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({ allowNull: false, })
    name_coupon: string;

    @Column({ allowNull: false, })
    discount: number;

    @Column({
        allowNull: false,
        defaultValue: 'Valor',
        type: DataType.ENUM('Porcentagem', 'Valor')
    })
    type: string;

    @Column({
        allowNull: true,
        type: DataType.TEXT(),
    })
    description: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
