import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { User } from '../models/user';
import { UserForm } from './user-form';

jest.mock('axios');

describe('User class', () => {
  let user: User;
  let userForm: UserForm;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    user = User.makeUser({ name: 'Foo' });
    userForm = new UserForm(document.querySelector('#root'), user);
  });

  test('render', async () => {
    userForm.render();

    const nameInput = document.querySelector('input.name');
    const setNameBtn = document.querySelector('button.set-name');
    const setAgeBtn = document.querySelector('button.set-age');
    const saveModelBtn = document.querySelector('button.save-model');

    expect(nameInput).toBeInstanceOf(HTMLInputElement);
    expect(setNameBtn).toBeInstanceOf(HTMLButtonElement);
    expect(setAgeBtn).toBeInstanceOf(HTMLButtonElement);
    expect(saveModelBtn).toBeInstanceOf(HTMLButtonElement);
  });

  test('set name', () => {
    userForm.render();
    (document.querySelector('input.name') as HTMLInputElement).value = 'Bar';
    (document.querySelector('button.set-name') as HTMLButtonElement).click();

    expect(user.get('name')).toBe('Bar');
  });

  test('set random age', () => {
    userForm.render();
    (document.querySelector('button.set-age') as HTMLButtonElement).click();

    expect(user.get('age')).toBeDefined();
  });

  test('set name', () => {
    mocked(Axios.get).mockResolvedValueOnce({
      data: { id: 1, name: 'Bar', age: 30 }
    });
    userForm.render();
    (document.querySelector('button.save-model') as HTMLButtonElement).click();

    setTimeout(() => {
      expect(user.get('id')).toBe(1);
      expect(user.get('name')).toBe('Bar');
      expect(user.get('age')).toBe(30);
    });
  });
});
