import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';
import { Action, Session } from './session.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  async createSession(
    user: User,
    sessionToken: string,
    action: Action,
  ): Promise<Session> {
    const session = new Session();
    session.sessionToken = sessionToken;
    session.user = user;
    session.action = action;
    return await session.save();
  }
}
