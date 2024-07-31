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
import { Doctor } from "./doctor.entity";

@Table({
    tableName: 'doctors_reports_products',
    paranoid: true,
})
export class DoctorReport extends Model<DoctorReport> {

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

    @ForeignKey(() => Doctor)
    @Column({ allowNull: false })
    doctor_id: string;

    @BelongsTo(() => Doctor, 'doctor_id')
    doctor: Doctor;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
