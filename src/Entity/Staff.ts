import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// TODO: remember to add the clinic relation
@ObjectType()
@Entity()
export class Staff {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    personalDetails: string;

    @Field()
    @Column()
    surname: string;

    @Field()
    @Column()
    avatarUrl: string;

    @Field()
    @Column()
    available: boolean;

    @Field()
    @CreateDateColumn()
    createAt: Date;

    @Field()
    @UpdateDateColumn()
    updateAt: Date;

}