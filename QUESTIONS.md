# Questions

Q1: Explain the output of the following code and why

```js
setTimeout(function () {
  console.log('1');
}, 100);
console.log('2');
```

A1: Synchronous code will execute in the order they are written. As `setTimeout` is an async function, when it is reached in the execution stack it will be added to the task queue as a macrotask and executed when the main thread is free. This executes the `setTimeout` function only, not the callback, which creates a timer, after the time `100` is done, it will push the callback to the bottom of the task queue. So the order of output would a console log of `2` and then `1`.

Q2: Explain the output of the following code and why

```js
function foo(d) {
  if (d < 10) {
    foo(d + 1);
  }
  console.log(d);
}
foo(0);
```

A2: As this is a recursive function, it will call itself each time the value of `d` is changed. So it will start with `0`, the `if` statement will evaluate `true` and it will be incremented. It will then call itself again, a new function added to the top of the call stack, with the value of `1`. This will repeat until the `if` statement evaluates false, when `d = 10`, where it will then continue the execution stack and console log `10`. The remaining functions are still in the call stack and then start running in an Last in First Out basis so it will console log incrementally from 10 - 0. If the console log statement was executed before the if statement then it would log incrementally from 0 - 10 because it is called before the increment happens and therefore not relying on the call stack for it's log value.

Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
function foo(d) {
  d = d || 5;
  console.log(d);
}
```

A3: By using the `OR` operator, it evaluates non-zero values. This includes `0` being evaluated as `false`. So if you passed in the value of `0`, you would get the output of `5`. It would also evaluate any data type passed, so a random string would show instead of the default value as there is no checking for a number.

Q4: Explain the output of the following code and why

```js
function foo(a) {
  return function (b) {
    return a + b;
  };
}
var bar = foo(1);
console.log(bar(2));
```

A4: The output is `3`. The outer function `foo` defines a variable called `a`, this is available to the inner function, a closure, through lexical function scope. This then returns another function that defines another variable called `b` and returns a value so it is available in outer scopes. When the outer function is assigned to a variable `bar` and passed a value of `1`, `a` now equals `1` and a function is returned and so `bar` is now a closure and equals a function that has the lexical scope of `'a = 1'` and requires a `b` variable passed to it. So when you call the new variable `bar` and pass it a value of `2`, `b` now equals `2` and `1 + 2 = 3`.

Q5: Explain how the following function would be used

```js
function double(a, done) {
  setTimeout(function () {
    done(a * 2);
  }, 100);
}
```

A5: You would call the `double` function and pass it the number you want doubled alongside a callback function, assigned to `done`, to handle the doubled value returned and any type errors if you passed an invalid value type.
