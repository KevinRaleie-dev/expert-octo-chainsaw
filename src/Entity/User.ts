import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
    email: String;

    @Field()
    @Column('text')
    username: String;

    @Field()
    @Column('text')
    password: String;

    @Field()
    @Column()
    avatarUrl: string;

    @Field()
    appointments: Appointment[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}