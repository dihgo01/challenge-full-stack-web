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
    tableName: 'reports_products',
    paranoid: true,
})
export class Report extends Model<Report> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({ allowNull: true, })
    id_api: string;

    @Column({ allowNull: false, })
    report: string;

    @Column({ allowNull: true, })
    total_price: number;

    @Column({ allowNull: true, })
    description: string;

    @Column({ allowNull: true, })
    another_language: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
