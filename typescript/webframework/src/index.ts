import { User } from './models/user';

const user = User.makeUser({ name: 'Foo' });
console.log(user.get('name'));
