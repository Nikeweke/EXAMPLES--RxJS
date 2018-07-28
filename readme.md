# RxJS

**Manuals** - http://reactivex.io/rxjs/manual/overview.html#flow

#### Содержание
* Install
* Observable.create
* Interval
* Scan
* Sync and async execution 
* Of, from
* Subscribe and unsubscribe
* Subject
--- 

### Install 
```
npm i rx -S
```

#### Basics
* **Observable** - Observables are like functions with zero arguments, but generalize those to allow multiple values.
* **Subscription** - essentially just has an `unsubscribe()` function to release resources or cancel Observable executions.
* **Observer** - are just objects with three callbacks, one for each type of notification that an Observable may deliver. 
* **Subject** - is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

### Observer create
```js
let source = rx.Observable.create((obs) => {
  obs.onNext('asdasd')
  obs.onCompleted()
})

source.subscribe(
  (x)   => console.log(x),
  (err) => console.log(err),
  ()    => console.log('completed')
)
```

### Interval 
```js
let source = Rx.Observable.interval(1000)

source.subscribe(
  (x)   => console.log(x),
  (err) => console.log(err),
  ()    => console.log('completed')
)
```

### Scan - Incrementing with holding state
```js
 let source = Rx.Observable
                 .interval(1000)
                 .scan(count => count +1)

source.subscribe(
  (x)   => console.log(x),
  (err) => console.log(err),
  ()    => console.log('completed')
)
```

### Sync and async execution
> Subscribing to an Observable is analogous to calling a Function. 
```js
var foo = Rx.Observable.create((observer) => {
  // sync execution
  console.log('Hello');
  observer.onNext(42);
  observer.onNext(100); // "return" another value
  observer.onNext(200); // "return" yet another

  // this will be async
  setTimeout(() => observer.onNext(300), 1000) 
});

console.log('before');
source.subscribe((x) => {
  console.log(x);
});
console.log('after');
```

### Of, from
> make from array events 
```js
var observable = Rx.Observable.of([10, 20, 30]);
// OR
var observable = Rx.Observable.from([10, 20, 30]);

// 10 , 20, 30
```

### Subscribe and unsubscribe
```js
var observable = Rx.Observable.create((obs)  => {
  setInterval(() => { 
    obs.onNext('asd')
  }, 2000)
})

var subscription = observable.subscribe(x => console.log(x));
setTimeout(() => {
  subscription.dispose()
  console.log('Unsubscribe')
}, 6001)
```

### Subject
> makes a few different handlers to a observables
```js
var subject = new Rx.Subject();

subject.subscribe(
  (v) => console.log('observerA: ' + v)
);
subject.subscribe(
  (v) => console.log('observerB: ' + v)
);

subject.next(1);
subject.next(2);

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```
