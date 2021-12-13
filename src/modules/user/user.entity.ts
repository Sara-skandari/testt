import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Session } from './auth/session.entity';
import { PhoneEmailValidation } from './auth/phone-email-validation.entity';
// import { Profile } from './profile/profile.entity';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID | string;

  @Column({ name: 'username' })
  @Index('username', { unique: true, sparse: true })
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phone: string;

  @Column({ default: false })
  emailVerification: boolean;

  @Column({ default: false })
  phoneVerification: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  addUsername() {
    if (this.phone) this.username = this.phone;
    else this.username = this.email;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // hash the password
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }

  // Relations
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(
    () => PhoneEmailValidation,
    (phoneEmailValidation) => phoneEmailValidation.userId,
  )
  phoneEmailValidations: PhoneEmailValidation[];
}
