class Heap {
  function Heap(cmp) {
    this._heap = [];
    if (typeof cmp === 'function') {
      this._cmp = cmp;
    } else {
      this._cmp = function (a, b) {
        return a - b;
      };
    }
  }

  function heapify(index) {
    var extr = index;
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var temp;
    if (left < this._heap.length &&
        this._cmp(this._heap[left], this._heap[index]) > 0) {
      extr = left;
    }
    if (right < this._heap.length &&
        this._cmp(this._heap[right], this._heap[index]) > 0 &&
        this._cmp(this._heap[right], this._heap[left]) > 0) {
      extr = right;
    }
    if (index !== extr) {
      temp = this._heap[index];
      this._heap[index] = this._heap[extr];
      this._heap[extr] = temp;
      this._heapify(extr);
    }
  }

  function changeKey(index, value) {
    this._heap[index] = value;
    var elem = this._heap[index];
    var parent = Math.floor(index / 2);
    var temp;
    if (elem !== undefined) {
      while (parent >= 0 && this._cmp(elem, this._heap[parent]) > 0) {
        temp = this._heap[parent];
        this._heap[parent] = elem;
        this._heap[index] = temp;
        index = parent;
        parent = Math.floor(parent / 2);
      }
      this._heapify(index);
    }
    return parent;
  }

  function update(node) {
    var idx = this._heap.indexOf(node);
    if (idx >= 0) {
      this.changeKey(idx, node);
    }
  }

  function add(value) {
    this._heap.push(value);
    return this.changeKey(this._heap.length - 1, value);
  }

  function extract() {
    if (!this._heap.length) {
      throw 'The heap is already empty!';
    }
    var extr = this._heap.shift();
    this._heapify(0);
    return extr;
  }

  function getCollection() {
    return this._heap;
  }

  function isEmpty() {
    return !this._heap.length;
  }
}
