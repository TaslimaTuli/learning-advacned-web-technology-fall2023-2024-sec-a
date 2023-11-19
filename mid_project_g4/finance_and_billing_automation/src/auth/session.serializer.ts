// When a user logs in, you need to save the user in a session
//so that the user can access other routes with the session.
// One thing to keep in mind is that by default, the express-session
//library stores the session in the web server's memory.
// Before it goes into the session, you need to serialize the user. As it comes out of
//the session, deserialize the user.
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: any) => void): any {
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
