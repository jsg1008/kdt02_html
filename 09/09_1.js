document.addEventListener("DOMContentLoaded", ()=>{

  const img=document.querySelector(".mdiv > img") ;
  const bt=document.querySelector("bt");
  const bt2=document.querySelector("#btArea > button");
  const txt1=document.querySelector("txt1") ;
  const btArea=document.querySelector("btArea") ;
  const btInput=document.querySelector("btInput") ;

  let flag = false;
  let n ;

  btArea.style.display = 'none' ;

  bt.addEventListener("click", () => {
    if (flag==false) {
      n=Math.floor(Math.random*100)+1;
      flag=true;
    }
    if (txt1.value=null){
      alert("숫자를 입력하세요!");
      txt1.focus();
      return ;
    }

    if (txt1.value > n) {
      img.setAttribute("src", "../img/down.png") ;
    } else if 

  
      
  

  });

});

