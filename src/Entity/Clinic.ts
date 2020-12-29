import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './Appointment';
import { PatientFile } from './PatientFile';
import { Service } from './Service';
import { Staff } from './Staff';

/**
 * As we create a clinic, we immediately add its relations
 */

@ObjectType()
@Entity()
export class Clinic {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nameOfClinic: string;

  @Field()
  @Column()
  phoneNumber: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  avatarUrl: string;

  @Field()
  @Column()
  password: string;

  patientFiles: PatientFile[];

  workersAtClinic: Staff[];

  typesOfServices: Service[];

  appointments: Appointment[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
