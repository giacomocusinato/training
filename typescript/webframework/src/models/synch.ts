import Axios, { AxiosPromise } from 'axios';

export interface Synchable {
  id?: number;
}

export class Synch<T extends Synchable> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return Axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    if (data.id) {
      return Axios.put(`${this.rootUrl}/${data.id}`, data);
    }
    return Axios.post(this.rootUrl, data);
  }
}
