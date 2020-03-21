import { Eventing } from './eventing';

describe('Eventing', () => {
  let eventing: Eventing;

  beforeEach(() => (eventing = new Eventing()));
  it('on', () => {
    eventing.on('change', () => {});
    eventing.on('change', () => {});
    eventing.on('click', () => {});

    expect(eventing.events.change.length).toBe(2);
    expect(eventing.events.click.length).toBe(1);
  });

  it('trigger', () => {
    const events = [
      { name: 'change', callback: jest.fn(() => 0) },
      { name: 'change', callback: jest.fn(() => 1) },
      { name: 'click', callback: jest.fn(() => {}) }
    ];
    events.forEach(e => eventing.on(e.name, e.callback));
    eventing.trigger('change');
    events.forEach((e, index) => {
      e.name === 'change'
        ? expect(e.callback).toHaveReturnedWith(index)
        : expect(e.callback).not.toBeCalled();
    });
  });
});
