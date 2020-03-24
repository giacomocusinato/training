import Axios, { AxiosResponse } from 'axios';

export interface HasId {
  id?: number;
}

export class ApiSynch<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): Promise<AxiosResponse> {
    return Axios.get(`${this.rootUrl}/${id}`);
  }

  async save(data: T): Promise<AxiosResponse> {
    if (data.id) {
      return Axios.put(`${this.rootUrl}/${data.id}`, data);
    }
    return Axios.post(this.rootUrl, data);
  }
}
