import { UserForm } from './views/user-form';
import { User } from './models/user';

const user = User.makeUser({ name: 'Foo', age: 20 });
const userForm = new UserForm(document.querySelector('#root'), user);

userForm.render();
