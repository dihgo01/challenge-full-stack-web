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
import { Doctor } from "src/app/doctor/entities/doctor.entity";
import { User } from "src/app/users/entities/user.entity";

@Table({
    tableName: 'tags',
    paranoid: true,
})
export class Tag extends Model<Tag> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    doctor_id: string;

    @BelongsTo(() => Doctor, 'doctor_id')
    doctor: Doctor;

    @Column({ allowNull: false, })
    tag: string;

    @Column({ allowNull: false, })
    lots: string;

    @Column({
        allowNull: false,
        defaultValue: 'Não',
        type: DataType.ENUM('Sim', 'Não')
    })
    bind: string;

    @Column({ allowNull: true, })
    country: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
