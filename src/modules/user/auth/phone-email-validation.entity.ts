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
import { Tools } from '../../../utils/tools';

export enum ValidationType {
  EMAIL = 'email',
  PHONE = 'phone',
}

@Entity()
export class PhoneEmailValidation extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  code: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isUsed: boolean;

  @Column({ nullable: false })
  expireAt: Date;

  @Column({ type: 'enum', enum: ValidationType })
  type: ValidationType;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.phoneEmailValidations, { eager: false })
  userId: User['_id'];

  @BeforeInsert()
  setDefaulting() {
    if (!this.expireAt) this.expireAt = Tools.getExpireFromNow('10m');
    if (this.isUsed === undefined || this.isUsed === null) this.isUsed = false;
  }
}
