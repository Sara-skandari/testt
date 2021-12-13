import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  skills: string[];
}
