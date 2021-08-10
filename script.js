'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};

createUserName(accounts);

//Update UI
const updateUI = function (acc) {
  //Display movement
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

//Event Handler
let currAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting the form
  e.preventDefault();
  console.log('LOGIN');

  currAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log(currAccount);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    //clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur(); // to loose the focus from pin input field

    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    //update UI
    updateUI(currAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  inputTransferTo.value = inputTransferAmount.value = '';
  console.log(receiverAcc);
  if (
    amount > 0 &&
    amount <= currAccount.balance &&
    receiverAcc?.userName !== currAccount.userName
  ) {
    //tranfer amount
    currAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currAccount.userName === inputCloseUsername.value &&
    currAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currAccount.userName
    );

    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }

  //clear fields
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* 
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2, 4));
console.log(arr.slice(2));
console.log(arr.slice(-3));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

//splice
//splice returns the removed element of array in array form
// console.log(arr.splice(2));
//it mutate or changes the original array.
console.log(arr.splice(-1));
console.log(arr);
console.log(arr.splice(1, 2)); //second parameter in splice method is the number of element to remove or delete
console.log(arr);

//Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['k', 'j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//Join
console.log(letters.join(' - '));
 */

/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You Deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
  }
}

console.log('-----FOR EACH------');

movements.forEach(function (movement, i, arr) {
  // console.log(arr);
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You Deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
  }
});
 */

//for each on map and set

//Map
/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'USD', 'GBP']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});
 */

//coding challenge 1

/* const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia;
  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2, 2);
  // console.log(dogsJuliaCopy);

  const dogs = [...dogsJuliaCopy, ...dogsKate];
  console.log(dogs);
  dogs.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog Number ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog Number ${i + 1} is an still a puppy 🐶`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]); */

//map()
/* const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return euroToUsd * mov;
// });

const movementsUSD = movements.map(mov => euroToUsd * mov);

console.log(movements);
console.log(movementsUSD);

const movementUSDFor = [];

for (const movement of movements) {
  movementUSDFor.push(movement * euroToUsd);
}

console.log(movementUSDFor);

const movementDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'Deposited' : 'withdraw'} ${Math.abs(
      mov
    )}`
);

console.log(movementDescription);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};

createUserName(accounts);

console.log(accounts);
 */

//filters
/* console.log(movements);
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

console.log(deposits);

const depositsFor = [];

for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}

console.log(depositsFor);

const withDrawals = movements.filter(mov => mov < 0);

console.log(withDrawals); */

//accoumulator ->   SNOWBALL
// console.log(movements);
// const balance = movements.reduce(function (acc, mov, i, arr) {
//   console.log(acc);
//   return acc + mov;
// }, 0);

/* const balance = movements.reduce((acc, mov) => acc + mov, 0);

console.log(balance);

let balance2 = 0;

for (const mov of movements) {
  balance2 += mov;
}

console.log(balance2);

//maximum value
const max = movements.reduce((acc, curr) => {
  if (acc < curr) return curr;
  else return acc;
}, movements[0]);

console.log(max); */

//coding challenge 2

/* const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((age, i) => (age <= 2 ? 2 * age : 16 + age * 4));

  console.log(humanAges);
  const adultHumanAges = humanAges.filter(humanAge => humanAge >= 18);

  console.log(adultHumanAges);

  // const averageAdultHumanAges =
  //   adultHumanAges.reduce((acc, curr) => acc + curr, 0) / adultHumanAges.length;

  const averageAdultHumanAges = adultHumanAges.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );

  return averageAdultHumanAges;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
 */
/* const euroToUsd = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositUSD); */

//coding challenge 3
//arrow function, calc average human age using chaining

/* const calcAverageHumanAge = ages =>
  ages
    .map((age, i) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); */

//find method which works on array and return a value from an array when a specific condition is met.
/* const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const accountDetail = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountDetail); */
