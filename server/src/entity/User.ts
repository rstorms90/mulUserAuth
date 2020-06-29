import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  email: string;

  @Field()
  @Column('text')
  username: string;

  @Field()
  @Column('text', { default: 'user' })
  role: string;

  @Field()
  @Column('varchar', {
    default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png',
  })
  avatar: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column('int', { nullable: true })
  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
