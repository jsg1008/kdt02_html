const init = (cols) =>{
      msg.innerHTML = "" ;
      msg.innerHTML = "" ;
      for (let col of cols) {
        col.innerHTML = "" ;
      }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const cols = document.querySelectorAll(".col") ;
  const bt = document.querySelector(".row > button") ;
  const msg = document.querySelector("#msg") ;
  const gbox = document.querySelector(".gbox");
  const hbox = document.querySelector(".hbox");

  let arr = [0,0,0,0,0,0,0,0,1] ;
  let flag = false ; 
  let cnt = 0;
  hbox.style.display = "none" ;

  for(let [idx, col] of cols.entries()) {
    // col.innerHTML = idx + 1 ;
    col.addEventListener("click" , ()=>{
      if ( !flag ) {
        msg.innerHTML = "폭탄을 섞어주세요" ;
        return ;
      }
      if (msg.innerHTML == "실패!")  return ;
      
      if ( arr[idx] == 0) {
        //하트
        col.innerHTML = '<img src="../img/hart.png">' ;
        cnt++ ;

        console.log(cnt, arr.indexOf(1))
        if ( cnt == 8 ) {
          // cols[arr.indexOf(1)].innerHTML = '<img src="../img/hart.png">' ;
          hbox.style.display = "flex" ;
          gbox.style.display = "none" ;
          hbox.innerHTML = '<img src="../img/hart.png">';
          
          msg.innerHTML = "성공!" ;
          flag = false ;
          bt.innerHTML = "폭탄섞기" ;
        }
      }
      else  {
        //폭탄
        col.innerHTML = '<img src="../img/boom.png">' ;
        msg.innerHTML = "실패!" ;
        flag = false ;
        bt.innerHTML = "폭탄섞기" ;
      }
    }) ;
  }

  bt.addEventListener("click", ()=>{
    if ( !flag ) {
      arr.sort(() => Math.random() - 0.5);
      bt.innerHTML = "게임중 ...." ;
      flag = true ;
      
      cnt = 0 ;
      console.log(arr);
      hbox.style.display = "none" ;
      gbox.style.display = "block" ;
      init(cols) ;
    }
  })
});