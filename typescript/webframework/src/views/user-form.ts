import { User, UserProps } from '../models/user';
import { View } from './view';

export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
      <div class="form">
        <input class="name" placeholder="${this.model.get('name')}" />
        <button class="set-name">Change name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      <div>
    `;
  }

  eventsMap(): { [key: string]: (e: Event) => void } {
    return {
      'click:button.set-name': this.onSetNameClick,
      'click:button.set-age': this.onSetAgeClick,
      'click:button.save-model': this.onSaveClick
    };
  }

  onSetAgeClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 70) });
  };

  onSetNameClick = (): void => {
    const input = document.querySelector('input.name') as HTMLInputElement;
    this.model.set({ name: input.value });
  };

  onSaveClick = (): Promise<void> => {
    return this.model.save();
  };
}
