// 문서에서 발생하는 모든 이벤트를 감지하겠다는 뜻(돔 트리가 완성이 되면, 함수가 들어감)
// document.addEventListener('DOMContentLoaded', ()=>{}); 이게 원래 형태. 너무 길어지면 불편하니 중괄호를 열어서 줄 변경함

document.addEventListener('DOMContentLoaded', ()=>{
    const img = document.querySelector(".mdiv > img"); //쿼리셀렉터를 불러서 가져옴
    const bt = document.querySelector(".mdiv > button");//쿼리셀렉터All을 가져오면 1개라도 결과치가 배열이 됨

    bt.addEventListener('click', () => {
    //1. 1에서 6까지 랜덤 수 생성
    //2. 랜덤수에 해당하는 이미지 변경(src 속성을 바꾸기. img란 변수에 attribute의 속성을 바꾸는 함수)
    
    let n = Math.floor(Math.random()*6)+1 // 1~6까질 랜덤 수 생성

    img.setAttribute('src', `../img/${n}.png`) ; //src에 있는 속성을 바꾸는 함수
    img.setAttribute('alt', `${n}번 주사위`); //alt로 설명이 바꾸는 부분
    
    
    }); 

}); 
