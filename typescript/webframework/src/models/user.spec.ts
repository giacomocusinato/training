import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { User } from './user';
import { Model } from './model';

jest.mock('axios');

describe('User class', () => {
  test('makeUser', async () => {
    const user = User.makeUser({ id: 1, name: 'Foo' });

    expect(user).toBeInstanceOf(Model);
    expect(user.get('id')).toBe(1);
    expect(user.get('name')).toBe('Foo');

    mocked(Axios.get).mockResolvedValueOnce({});
    expect(await user.fetch()).resolves;
  });
});
