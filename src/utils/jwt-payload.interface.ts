import { ObjectID } from 'typeorm';

export interface Payload {
  id: ObjectID;
  username: string;
}
