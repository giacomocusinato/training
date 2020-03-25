import { User, UserProps } from '../models/user';
import { View } from './view';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <h1>User detail</h1>
        <div class="user-show-name">User name: ${this.model.get('name')}</div>
        <div class="user-show-age">User age:  ${this.model.get('age')}</div>
      </div>
    `;
  }
}
