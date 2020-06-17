import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
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

  @Column({ nullable: true })
  userId: number;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
