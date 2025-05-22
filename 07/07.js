document.addEventListener('DOMContentLoaded', ()=>{
  const imgs = document.querySelectorAll(".mdiv img") ;
  const bts = document.querySelectorAll(".mdiv button") ; 
  const msg = document.querySelector("#msg") ;

  for(let [idx, bt] of bts.entries()) {
 
    bt.addEventListener('click' , (e)=>{
      //0. 버튼이벤트 방지
      e.preventDefault();
      
      //1. 컴퓨터 랜덤수 생성 , 이미지 변경
      let n = Math.floor(Math.random() * 6) + 1 ;
      imgs[0].setAttribute('src', `../img/${n}.png`) ;

      //2. 사용자 선택 수, 이미지 변경
      // let usern = parseInt(bt.innerHTML[0]);
      let usern = idx + 1 ;
      imgs[1].setAttribute('src', `../img/${usern}.png`) ;

      //3. 컴퓨터 수와 사용자 수가 같은 지 비교
      if ( n == usern ) {
        msg.innerHTML = "맞음" ;
      }
      else {
        msg.innerHTML = "틀림" ;
      }

    }) ;
  }




});