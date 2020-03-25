import { Attributes } from './attributes';
import { Model } from './model';
import { Eventing } from './eventing';
import { ApiSynch } from './api-synch';
import { Collection } from './collection';

const rootUrl = 'http://localhost:3000/users';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static makeUser(props: UserProps): User {
    return new User(
      new Attributes<UserProps>(props),
      new Eventing(),
      new ApiSynch<UserProps>(rootUrl)
    );
  }

  static makeUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, this.makeUser);
  }
}
