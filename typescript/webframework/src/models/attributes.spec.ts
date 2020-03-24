import { Attributes } from './attributes';

describe('User class', () => {
  type TestType = {
    id?: number;
    name?: string;
    age?: number;
  };
  let attributes: Attributes<TestType>;
  let data: TestType = { name: 'Foo', age: 10 };

  beforeEach(() => (attributes = new Attributes(data)));

  test('get', () => {
    expect(attributes.get('name')).toBe('Foo');
    expect(attributes.get('age')).toBe(10);
  });

  test('set', () => {
    attributes.set({ name: 'Bar', age: 20 });
    expect(attributes.get('name')).toBe('Bar');
    expect(attributes.get('age')).toBe(20);

    attributes.set({ age: 30 });
    attributes.set({});
    expect(attributes.get('name')).toBe('Bar');
    expect(attributes.get('age')).toBe(30);
  });

  test('getAll', () => {
    expect(attributes.getAll()).toBe(data);
  });
});
