import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { Model } from './model';
import { Eventing } from './eventing';
import { ApiSynch } from './api-synch';
import { Attributes } from './attributes';

jest.mock('axios');

describe('Model,', () => {
  type TestType = {
    id?: number;
    name?: string;
  };
  let model: Model<TestType>;
  let modelData: TestType = { name: 'Foo' };

  beforeEach(
    () =>
      (model = new Model(
        new Attributes<TestType>(modelData),
        new Eventing(),
        new ApiSynch<TestType>('')
      ))
  );

  test('getters', () => {
    const onChange = jest.fn();
    model.on('change', onChange);
    model.on('save', onChange);
    model.set({ name: 'Bar' });
    model.trigger('save');

    expect(model.get('name')).toBe('Bar');
    expect(onChange).toBeCalledTimes(2);
  });

  test('fetch success', async () => {
    const modelId = 1;
    model = new Model(
      new Attributes<TestType>({ id: modelId }),
      new Eventing(),
      new ApiSynch<TestType>('')
    );
    mocked(Axios.get).mockResolvedValue({
      data: { ...modelData, id: modelId }
    });

    const onChange = jest.fn();
    model.on('change', onChange);

    await model.fetch();

    expect(model.get('id')).toBe(1);
    expect(onChange).toBeCalled();
  });

  test('fetch fail - no id', async () => {
    await expect(model.fetch()).rejects.toThrowError();
  });

  test('fetch fail - request error', async () => {
    model = new Model(
      new Attributes<TestType>({ id: 1 }),
      new Eventing(),
      new ApiSynch<TestType>('')
    );
    const onError = jest.fn();
    model.on('error', onError);
    mocked(Axios.get).mockRejectedValueOnce({});

    await model.fetch();

    expect(onError).toBeCalled();
  });

  test('save success', async () => {
    mocked(Axios.post).mockResolvedValueOnce({ data: { ...modelData, id: 1 } });
    const onSave = jest.fn();
    model.on('save', onSave);

    await model.save();
    expect(model.get('id')).toBe(1);
    expect(onSave).toBeCalled();
  });

  test('save fail', async () => {
    mocked(Axios.post).mockRejectedValueOnce({});
    const onError = jest.fn();
    model.on('error', onError);

    await model.save();

    expect(model.get('id')).toBeUndefined();
    expect(onError).toBeCalled();
  });
});
