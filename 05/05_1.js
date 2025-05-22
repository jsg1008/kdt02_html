let arr1 = [];
let arr2 = [1,2,3];
let arr3 = Array();
let arr4 = Array(1,2,3);

console.log(arr1);
console.log(arr2);
console.log(arr3);
// console.log(arr4);

// arr4.length = 0; //배열 지우기가 됨
// console.log(arr4);

let n = Math.floor(Math.random()*5) + 1 ; // 1~5 난수 만들기
arr4.push(n);
console.log(arr4);

for (let c of arr2) {
    console.log(c);
}

// for (let i in arr2){
//     console.log(arr[i]);
// }

// let arr5 = arr2.map((item) => {return item*2});
let arr5 = arr2.map( item => item*2); //인수 item이 하나면 괄호 생략. 바로 리턴문이 나올 경우 중괄호와 리턴 생략 가능
console.log(arr5);

// let arr6 = arr2.filter((item) => {return item % 2==0}); 생략되기 전
let arr6 = arr2.filter(item => item % 2==0);
console.log(arr6);

// let arr51=[]; // 맵의 기능을 표현한 것
// for (let n of arr2){
//     arr51.push(n*2 );
// }

let arr61= [];
for (let n of arr2){
    if (n%2==0) arr61.push(n);
}
console.log(arr61);
