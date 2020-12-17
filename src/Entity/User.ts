import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './Appointment';

//  TODO: update the user entity to accept first name and last name upon register
@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    @IsEmail()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field(() => [Appointment])
    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Array<Appointment>;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}