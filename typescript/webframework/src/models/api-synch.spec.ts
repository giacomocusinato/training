import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { ApiSynch } from './api-synch';

jest.mock('axios');

describe('Synch', () => {
  type TestType = {
    id?: number;
    name: string;
  };
  let data = { id: 1, name: 'Foo' };
  let synch: ApiSynch<TestType>;

  beforeEach(() => (synch = new ApiSynch('')));

  it('fetch', async () => {
    mocked(Axios.get).mockResolvedValue({ data });
    const response = await synch.fetch(data.id);

    expect(Axios.get).toHaveBeenCalled();
    expect(response.data).toBe(data);
  });

  it('save', async () => {
    const newData = { name: 'Bar' };
    mocked(Axios.post).mockResolvedValue({ data: newData });
    mocked(Axios.put).mockResolvedValue({ data });

    const createResponse = await synch.save(newData);
    const updateResponse = await synch.save(data);

    expect(Axios.post).toBeCalled();
    expect(createResponse.data).toBe(newData);
    expect(Axios.put).toBeCalled();
    expect(updateResponse.data).toBe(data);
  });
});
