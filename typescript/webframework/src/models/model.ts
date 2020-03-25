import { AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  set(data: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): Promise<AxiosResponse>;
  save(data: T): Promise<AxiosResponse>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attrs: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on.bind(this.events);
  }
  get trigger() {
    return this.events.trigger.bind(this.events);
  }
  get get() {
    return this.attrs.get.bind(this.attrs);
  }

  set(data: T): void {
    this.attrs.set(data);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attrs.get('id');
    if (!id) throw new Error('Cannot fetch without an id');

    try {
      const resp = await this.sync.fetch(id as number);
      return this.set(resp.data);
    } catch (err) {
      this.events.trigger('error');
    }
  }

  async save(): Promise<void> {
    try {
      const resp = await this.sync.save(this.attrs.getAll());
      this.set(resp.data);
      this.events.trigger('save');
    } catch (err) {
      this.events.trigger('error');
    }
  }
}
