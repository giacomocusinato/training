import { User } from '../models/user';
import { UserShow } from './user-show';

describe('User class', () => {
  let user: User;
  let userShow: UserShow;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    user = User.makeUser({ name: 'Foo', age: 10 });
    userShow = new UserShow(document.querySelector('#root'), user);
  });

  test('render', () => {
    userShow.render();

    const userName = document.querySelector('.user-show-name');
    const userAge = document.querySelector('.user-show-age');

    expect(userName).toBeInstanceOf(HTMLDivElement);
    expect(userAge).toBeInstanceOf(HTMLDivElement);
    expect(
      (userName as HTMLDivElement).textContent?.includes('Foo')
    ).toBeTruthy();
    expect(
      (userAge as HTMLDivElement).textContent?.includes('10')
    ).toBeTruthy();
  });
});
