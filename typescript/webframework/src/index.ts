import { UserForm } from './views/user-form';
import { User } from './models/user';
import { UserShow } from './views/user-show';
import { UserEdit } from './views/user-edit';

const user = User.makeUser({ name: 'Foo', age: 20 });

const userEdit = new UserEdit(document.getElementById('root'), user);
userEdit.render();
