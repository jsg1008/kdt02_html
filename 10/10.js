
document.addEventListener("DOMContentLoaded", ()=>{
  const cols = document.querySelectorAll(".col") ;
  const bt = document.querySelector(".row > button") ;
  const msg = document.querySelector("#msg") ;
  let arr = [0,0,0,0,0,0,0,0,1] ;
  let flag = false ; 

  for(let [idx, col] of cols.entries()) {
    col.innerHTML = idx + 1 ;
    col.addEventListener("click" , ()=>{
      console.log(idx, col)

      if ( !flag ) {
        msg.innerHTML = "폭탄을 섞어주세요" ;
        return ;
      }
    //클릭을 하고 난 뒤에 값이 배열된게 달라진다
    //클릭한 위치에 값을 가져오는 함수를 써야 한다 

    
    //클릭한 위치에 값이 0이면 하트가 나온다
    //클릭한 위치에 값이 1이면 폭탄이 나온다
    if (msg.innerHTML=="실패!"){
      return;
    }

    if (msg.innerHTML=="게임 성공!"){
      return;
    }

    if (arr[idx]==0){
      col.innerHTML = '<img src="../img/hart.png">';
      msg.innerHTML = "폭탄을 못찾았습니다. 게임 속행!"

      // 게임이 끝났으므로 모든 하트가 다 보여져야 한다. 
      bt.innerHTML = "게임중" ;
      cnt++

    if (cnt==8 ){
        msg.innerHTML = "게임 성공!";
        let idx1 = arr.indexOf(1);
        cols[idx1].innerHTML = '<img src="../img/hart.png">';
        cnt=0;
        flag=false;     
        bt.innerHTML = "폭탄 섞기" ;
      }
     
    }
    else { //폭탄
      msg.innerHTML = "실패!";
      col.innerHTML = '<img src="../img/boom.png">';
      flag=false;     
      bt.innerHTML = "폭탄 섞기" ;
      msg.innerHTML = "";
      
    }
    });
  }    
    bt.addEventListener("click", ()=>{
      if ( !flag ) {
        arr.sort(() => Math.random() - 0.5);
        console.log(arr);
        flag = true ;
        bt.innerHTML = "게임중 ...." ;
        msg.innerHTML = "도전!"
        for (let col of cols) {
        col.innerHTML = "";
      }
     }
     cnt=0;
    });
});