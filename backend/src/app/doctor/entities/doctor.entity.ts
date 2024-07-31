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
import { Representative } from "src/app/representative/entities/representative.entity";
import { User } from "src/app/users/entities/user.entity";

@Table({
    tableName: 'doctors',
    paranoid: true,
})
export class Doctor extends Model<Doctor> {

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
    user_id: string;

    @BelongsTo(() => User, 'user_id')
    user: User;

    @ForeignKey(() => Representative)
    @Column({ allowNull: false })
    representative_id: string;

    @BelongsTo(() => Representative, 'representative_id')
    representative: Representative;

    @Column({ allowNull: false, })
    name: string;

    @Column({
        allowNull: false,
        defaultValue: 'Pessoa Física',
        type: DataType.ENUM('Pessoa Física', 'Pessoas Jurídica')
    })
    type_person: string;

    @Column({ allowNull: true, })
    social_reason: string;

    @Column({
        allowNull: true,
        type: DataType.STRING(20)
    })
    cnpj: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(15)
    })
    cpf: string;

    @Column({ allowNull: true, })
    telephone: string;

    @Column({ allowNull: true, })
    mobile: string;

    @Column({ allowNull: true, })
    profession: string;

    @Column({ allowNull: true, })
    zip_code: string;

    @Column({ allowNull: true, })
    address: string;

    @Column({ allowNull: true, })
    address_number: number;

    @Column({ allowNull: true, })
    complement: string;

    @Column({ allowNull: true, })
    district: string;

    @Column({ allowNull: true, })
    city: string;

    @Column({ allowNull: true, })
    state: string;

    @Column({ allowNull: true, })
    country: string;

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
