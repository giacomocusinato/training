import { Model } from '../models/model';

export abstract class View<T extends Model<K>, K> {
  protected regions: { [key: string]: Element } = {};

  constructor(public parent: Element | null, public model: T) {
    this.render = this.render.bind(this);
    this.bindEvents = this.bindEvents.bind(this);

    model.on('change', this.render);
    model.on('save', this.render);
  }

  private bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  private mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) this.regions[key] = element;
    }
  }

  protected eventsMap(): { [key: string]: (e: Event) => void } {
    return {};
  }

  protected regionsMap(): { [key: string]: string } {
    return {};
  }

  protected onRender(): void {}

  public abstract template(): string;

  public render(): void {
    if (!this.parent) {
      throw Error('No parent found');
    }

    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
