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
import { Tag } from "src/app/tags/entities/tag.entity";

@Table({
    tableName: 'patients',
    paranoid: true,
})
export class Patient extends Model<Patient> {

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @ForeignKey(() => Doctor)
    @Column({ allowNull: false })
    doctor_id: string;

    @BelongsTo(() => Doctor, 'doctor_id')
    doctor: Doctor;

    @ForeignKey(() => Tag)
    @Column({ allowNull: false })
    tag_id: string;

    @BelongsTo(() => Tag, 'tag_id')
    tag: Tag;

    @Column({ allowNull: false, })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(15)
    })
    cpf: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM('M', 'F')
    })
    gender: string;

    @Column({ allowNull: true, })
    height: string;

    @Column({ allowNull: true, })
    weight: string;

    @Column({ allowNull: true, })
    age: Date;

    @Column({
        allowNull: false,
        type: DataType.ENUM('Sim', 'Não')
    })
    under_age: string;

    @Column({ allowNull: true, })
    responsible_name: string;

    @Column({ allowNull: true, })
    responsible_document: string;

    @Column({
        allowNull: true,
        type: DataType.TEXT()
    })
    observation: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
