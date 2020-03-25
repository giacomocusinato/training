import { Model } from '../models/model';

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element | null, public model: T) {
    this.render = this.render.bind(this);
    this.bindEvents = this.bindEvents.bind(this);

    model.on('change', this.render);
    model.on('save', this.render);
  }

  protected eventsMap(): { [key: string]: (e: Event) => void } {
    return {};
  }

  abstract template(): string;

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    if (!this.parent) {
      throw Error('No parent found');
    }

    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
