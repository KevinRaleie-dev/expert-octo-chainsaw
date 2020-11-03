import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clinic } from "./Clinic";
import { Service } from "./Service";
import { User } from "./User";

/**
 * there's roughly 3 relationships in this entity:
 * 1. the user thats making the appoinment
 * 2. the clinic where this appointment is taking place
 * 3. the service that the user selected for the appointment
 */
@ObjectType()
@Entity()
export class Appointment {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    patient: User;

    bookedService: Service;

    clinic: Clinic;

    @Field()
    @Column()
    completed: boolean;
    
    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}