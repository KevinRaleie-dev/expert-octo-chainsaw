import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './Appointment';

/**
 * TODO: add 3 new fields, the avatarUrl, appointments associated with the user
 * and a list of patient files that the user as created
 */
@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('text')
    email: string;

    @Field()
    @Column('text')
    username: string;

    @Field()
    @Column('text')
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