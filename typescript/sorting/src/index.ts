import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([9, 6, 3, 2]);
numbersCollection.sort();
console.log(numbersCollection.data);

const charactersCollection = new CharactersCollection('HelloWorld');
charactersCollection.sort();
console.log(charactersCollection.data);

const list = new LinkedList();
list.add(5);
list.add(9);
list.add(4);
list.add(1);
list.sort();
console.log(list.toArray());
