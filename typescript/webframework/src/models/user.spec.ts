import { User, UserProps } from './user';

describe('User class', () => {
  let user: User;
  let userData: UserProps = { name: 'Foo', age: 10 };

  it('exists', () => {
    const user = new User(userData);
    expect(user.get('name')).toBe('Foo');
  });
});
