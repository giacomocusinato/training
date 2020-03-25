import { Attributes } from '../models/attributes';
import { Eventing } from '../models/eventing';
import { ApiSynch } from '../models/api-synch';
import { Model } from '../models/model';
import { View } from './view';

describe('View', () => {
  const onClick = jest.fn();
  type TestProps = {
    id?: number;
    name?: string;
  };
  class TestModel extends Model<TestProps> {}
  class TestView extends View<TestModel, TestProps> {
    template(): string {
      return '<div id="foo">Foo</div>';
    }
  }
  class TestViewWithEvents extends TestView {
    eventsMap() {
      return {
        'click:#foo': onClick
      };
    }
  }
  let model: Model<TestProps>;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    model = new Model(
      new Attributes<TestProps>({ name: 'Foo' }),
      new Eventing(),
      new ApiSynch<TestProps>('')
    );
  });

  afterEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('render', () => {
    const view = new TestView(document.getElementById('root'), model);
    view.render();

    const element = document.getElementById('foo');
    expect(element).toBeInstanceOf(HTMLDivElement);
    expect((element as HTMLDivElement).textContent).toBe('Foo');
  });

  test('render failure', () => {
    document.body.innerHTML = '';
    const view = new TestView(document.getElementById('root'), model);
    expect(view.render).toThrowError();
  });

  test('events', () => {
    const view = new TestViewWithEvents(document.getElementById('root'), model);
    view.render();

    const element = document.getElementById('foo');
    (element as HTMLDivElement).click();

    expect(onClick).toBeCalled();
  });
});
