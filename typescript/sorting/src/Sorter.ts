export interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

export abstract class Sorter implements Sortable {
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    for (let i = this.length; i > 0; --i) {
      for (let j = 0; j < i - 1; ++j) {
        if (this.compare(j, j + 1)) this.swap(j, j + 1);
      }
    }
  }
}
