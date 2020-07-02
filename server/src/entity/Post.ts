import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Field()
  @Column('int', { nullable: true })
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
