import Axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { Collection } from './collection';
import { Model } from './model';
import { Attributes } from './attributes';
import { Eventing } from './eventing';
import { ApiSynch } from './api-synch';

jest.mock('axios');

describe('Collection', () => {
  type TestType = {
    id?: number;
    name?: string;
  };
  let model: Model<TestType>;
  let collection: Collection<Model<TestType>, TestType>;
  let collectionData: TestType[] = [
    { id: 1, name: 'Foo' },
    { id: 2, name: 'Bar' }
  ];

  function makeCollection() {
    return new Collection<Model<TestType>, TestType>('/models', makeModel);
  }

  function makeModel(data: TestType) {
    return new Model(
      new Attributes<TestType>(data),
      new Eventing(),
      new ApiSynch<TestType>('/model')
    );
  }

  beforeEach(() => (collection = makeCollection()));

  test('events', () => {
    const callback = jest.fn();
    collection.on('event', callback);
    collection.trigger('event');

    expect(callback).toBeCalled();
  });

  test('fetch - success', async () => {
    mocked(Axios.get).mockResolvedValueOnce({ data: collectionData });
    const onSave = jest.fn();
    collection.on('save', onSave);

    await collection.fetch();

    expect(onSave).toBeCalled();
  });

  test('fetch - failed request', async () => {
    mocked(Axios.get).mockRejectedValueOnce({ data: collectionData });
    const onError = jest.fn();
    collection.on('error', onError);

    await collection.fetch();

    expect(onError).toBeCalled();
  });
});
