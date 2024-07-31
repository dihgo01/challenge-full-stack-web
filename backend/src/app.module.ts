import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { DoctorModule } from './app/doctor/doctor.module';
import { RepresentativeModule } from './app/representative/representative.module';
import { TagsModule } from './app/tags/tags.module';
import { PatientsModule } from './app/patients/patients.module';
import { CuponsModule } from './app/cupons/cupons.module';
import { OrdersModule } from './app/orders/orders.module';
import { ReportsModule } from './app/reports/reports.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    UsersModule,
    DoctorModule,
    RepresentativeModule,
    AuthModule,
    TagsModule,
    PatientsModule,
    CuponsModule,
    OrdersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
