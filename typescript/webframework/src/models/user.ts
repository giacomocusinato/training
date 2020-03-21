import Axios, { AxiosResponse } from 'axios';
import { Eventing } from './eventing';
import { Synch } from './synch';
import { Attributes } from './attributes';

const rootUrl = 'http://localhost:3000/users';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public attributes: Attributes<UserProps>;

  constructor(
    attrs: UserProps,
    public events: Eventing = new Eventing(),
    public sync: Synch<UserProps> = new Synch<UserProps>(rootUrl)
  ) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.attributes);
  }

  get get() {
    return this.attributes.get.bind(this.attributes);
  }
}
