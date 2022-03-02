"use strict";
//Basic types
let id = 2;
let company = "Google";
let isWorking = true;
let x;
let ids = [1, 2, 3, 4, 5];
let arr = [1, 2, 3, 4, 5, "Hello", true];
//tuples
let person = ["John", 23, "USA"];
//Tuples array
let employee;
employee = [
    [1, "John"],
    [2, "Jane"],
    [3, "Jack"]
];
//union 
let union = 2;
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
console.log(Color.Green);
