import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * TODO: add a relation with the clinic entity and the user that created it
 */

@ObjectType()
@Entity()
export class PatientFile {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  idNumber: number;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  occupation: string;

  @Field()
  @Column()
  employer: string;

  @Field()
  @Column()
  namesOfRelative: string;

  @Field()
  @Column()
  relation: string;

  @Field()
  @Column()
  phoneNumberOfRelative: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
