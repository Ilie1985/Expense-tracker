//Bring all the elements that I need from the DOM

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const formTextAmount = "Please enter a valid value !";

//===========================================================================

//DUMMY DATA BASE

// //initialise a variable that stores the dummy transactions( an array of objects) untill the local storage is created
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];
// let transactions = dummyTransactions;
//====================================================================
// CREATE LOCAL STORAGE

//create a variable assign it to localStorage.getItem() and pass in transactions
//its going to be a string array when we pull it out so we need to parse it with JSON.parse
//check if it`s something in the local storage with ternary operator
//if its not = to null it means that its true so use localStorageTransactions
//else set it to be an empty array

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const localStorageTransactions = JSON.parse(localStorage.getItem(transactions));
//=======================================================================

// addTransaction FUNCTIONALITY

//since this is a submit event ,pass the e parameter and call e.preventDefault so that it doesn`t actually submit
//make sure there are no empty values by checking it and give a message
//create an object called transaction , similar to what is in dummyTransactions with id text and amount
// create a function that generates a random id for the transaction object
// set text to text.value in the object
//set amount to amount .value  in the object and convert it from  a string to a number by adding + sign
// push the object to our array of objects (dummyTransactions/transactions)
//add it to the DOM
//update values in the DOM
//clear the inputs

const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    (text.placeholder = `${formTextAmount}`),
      (amount.placeholder = `${formTextAmount}`);
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    // console.log(transaction);
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
};
//=========================================================================

// generateID FUNCTIONALITY
//generate a random number with Math.floor(Math.random())

const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

//==================================================================

//removeTransaction  BY ID FUNCTIONALITY

// take transactions and filter ,for each transaction  call in a function and evaluate each ID and if its not equal to the id that`s passed in than its going to go in to the array
//invoke init to update all the data on the page

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => {
    return transaction.id !== id;
  });

  updateLocalStorage();

  init();
};
//==================================================================

// addTransactionDOM FUNCTIONALITY

//add transactions to the DOM ,to be displayed
//take in a transaction param
//distinguish the income from the expense
//create a variable that takes in transaction(the object).amount(property in the object)
//use ternary operator
//if the amount is less than 0 give back a - (minus ) else give back a + (plus)
//create a new element called item using document.createElement()
//add class based on value using ternary operator ,if the transaction.amount is less than 0 return class minus else return class plus
// populate item element using innerHTML
//transaction.amount already has a sign ("-") in dummyTransactions , so to get rid of the sign  i need to wrap transaction.amount in a Math.abs method (math absolute) which will turn it into an absolute number it removes the negative sign
//after the span put a delete button
//add the element to the DOM --> list.appendChild(item)
//add inline event listener on button
//invoke the removeTransaction function

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount
  )} </span> <button class ="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">X</button>
`;
  list.appendChild(item);
};
//=====================================================================

//updateValues FUNCTIONALITY

//update the balance, income and expense
//create a new array of just the amounts with .map() and save it in a variable called amounts
//invoke the function updateValues inside the init function
//total up the amounts with the reduce method
//append the accumulator to item and start at 0
//add toFixed method which will add two decimal places
//get the income by creating a variable called income, with .filter method return only the item  greater than 0
// add total amount of income with reduce()
//add toFixed method which will add two decimal places
//get only the expense following the same steps as for the income
// multiply it with -1 so that we can have a positive number
//insert income expense and balance into the DOM with innerText

const updateValues = () => {
  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });
  const total = amounts
    .reduce((acc, item) => {
      return (acc += item);
    }, 0)
    .toFixed(2);
  // console.log(total);
  // console.log(amounts);
  const income = amounts
    .filter((item) => {
      return item > 0;
    })
    .reduce((acc, item) => {
      return (acc += item);
    }, 0)
    .toFixed(2);
  // console.log(income);

  const expense = (
    amounts
      .filter((item) => {
        return item < 0;
      })
      .reduce((acc, item) => {
        return (acc += item);
      }, 0) * -1
  ).toFixed(2);
  // console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};
//=============================================================================

// updateLocalStorage FUNCTIONALITY

//apply the setItem method on localStorage
//takes in transactions
//stringify what we get
//invoke updateLocalstorange inside the addTransaction function
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
//==================================================================

//init FUNCTIONALITY

//clear out the list
// for each transaction invoke addTransactionDOM
//call init function
const init = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
};
init();
//==========================================================================

//EVENT LISTENERS

form.addEventListener("submit", addTransaction);
