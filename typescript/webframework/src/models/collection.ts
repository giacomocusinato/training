import Axios, { AxiosResponse } from 'axios';
import { Model } from './model';
import { Eventing } from './eventing';

type HasId = { id?: number };

export class Collection<T, K extends HasId> {
  private events: Eventing = new Eventing();
  public models: T[] = [];

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }

  async fetch(): Promise<void> {
    try {
      const resp = await Axios.get(this.rootUrl);
      this.models = resp.data.map(this.deserialize);
      this.events.trigger('save');
    } catch (e) {
      return this.events.trigger('error');
    }
  }
}
