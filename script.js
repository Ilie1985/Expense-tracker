//Bring all the elements that I need from the DOM

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//===========================================================================

// initialise a variable that stores the dummy transactions( an array of objects) untill the local storage is created
const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];
let transactions = dummyTransactions;
//====================================================================

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
const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
${transaction.text} <span>${sign} ${transaction.amount} </span>
`;
};
