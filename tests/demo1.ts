let message1: string = "bye";
console.log(message1);
let age: number = 25;
console.log(age);
let isStudent: boolean = true;
console.log(isStudent);
let names: string[] = ["Alice", "Bob", "Charlie"];
console.log(names);
let numArray: number[] = [1, 2, 3, 4, 5];
console.log(numArray);
let data: any = "This can be any type";
console.log(data);
data = 42;
console.log(data);

function add(a: number, b: number): number {
    return a + b;
}
add(3, 5);

let user: { name: string; age: number } = { name: "John", age: 30 };
console.log(user);