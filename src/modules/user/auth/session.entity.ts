import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';

export enum Action {
  Login = 'LOGIN',
  SignUp = 'SIGNUP',
}

@Entity()
export class Session extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  sessionToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @BeforeInsert()
  addExpiresAt() {
    this.expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90);
  }
}
