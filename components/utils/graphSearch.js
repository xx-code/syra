import React, {Component} from 'react';

class Stack {
  constructor() {
    this.top = -1;
    this.array = [];
  }

  push(v) {
    this.top++;
    this.array[this.top] = v;
  }

  pop() {
    if (this.top == this.array.length) {
      console.log('underflow')
    } else {
      this.array.splice(this.top, 1);
      this.top--;
    }
  }

  there(i) {
    return this.array.includes(i);
  }

}

class Queue {
  constructor() {
    this.front = 0;
    this.rear = -1;
    this.array = [];
  }

  enqueue(element) {
    this.rear++;
    this.array.unshift(element);
    return 'element ' + element + ' enqueue';
  }

  dequeue() {
    if (this.front >= this.array.length) {
      console.log('underflow');
    } else {
      this.array.splice(this.front, 1);
    }
  }

  display() {
    return this.array;
  }

  lenght() {
    return this.array.length;
  }

  frontElement() {
    return this.array[this.front];
  }

}

export default class Graph {
  constructor(v) {
    this.v = v;
    this.adjList = new Map();
    this.paths = new Map();
    this.iteration = 0;
  }

  addVertex(v){
    this.adjList.set(v, []);
  }

  addEdge(v, w){
    this.adjList.get(v).push(w)
  }

  bft(s, des) {
    let visited = [];
    let i;
    for (i = 0; i < this.v; i++) {
      visited[i] = false
    }
    const queue = new Queue();

    visited[s] = true;
    queue.enqueue(s);

    while (queue.lenght() != 0) {

      s = queue.frontElement();
      let element = this.listElement[s][0].name
      this.graphSchema = this.graphSchema + element + "/ ";
      queue.dequeue();

      if (s == des) {
        console.log(this.graphSchema);
        this.graphSchema = this.graphSchema;
      }


      let adjacent = this.list[s];

      adjacent.forEach(i => {
        if (!visited[i]) {
          visited[i] = true;
          queue.enqueue(i);
        }
      })

    }

    return this.graphSchema;
  }

  dftUtil(des, stack) {

    let adjacent = this.adjList.get(stack.array[stack.top]);
    let i;
    for (i = 0; i < adjacent.length; i++) {
      if (stack.there(adjacent[i])) {
        continue;
      }

      if (adjacent[i] === des) {
        stack.push(adjacent[i]);
        this.displayFind(stack)
        stack.pop();
        break;
      }

    };


    for (i = 0; i < adjacent.length; i++) {
      if (stack.there(adjacent[i]) || adjacent[i] === des) {
        continue;
      }
      stack.push(adjacent[i]);
      this.dftUtil(des, stack);
      stack.pop();
    };

  }

  dft(s, des) {
    const stack = new Stack();

    stack.push(s)
    this.dftUtil(des, stack);
  }

  displayFind(stack) {
    let elements = [];
    stack.array.forEach(element => {
      elements.push(element);
    })
    this.paths.set(this.iteration, elements)
    this.iteration = this.iteration + 1;
  } 

}
