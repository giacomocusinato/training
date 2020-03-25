import { User } from '../models/user';
import { UserEdit } from './user-edit';

describe('User class', () => {
  let user: User;
  let userEdit: UserEdit;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    user = User.makeUser({ name: 'Foo', age: 10 });
    userEdit = new UserEdit(document.querySelector('#root'), user);
  });

  test('render', () => {
    userEdit.render();

    const userShow = document.querySelector('.user-show');
    const userForm = document.querySelector('.user-form');

    expect(userShow).toBeInstanceOf(HTMLDivElement);
    expect(userForm).toBeInstanceOf(HTMLDivElement);
  });

  test('render regions', () => {
    userEdit.render();

    const userShow = document.querySelector('.user-show');
    const userForm = document.querySelector('.user-form');

    expect(userShow?.childElementCount).toBeGreaterThanOrEqual(1);
    expect(userForm?.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
