//DOM생성
document.addEventListener('DOMContentLoaded', ()=>{
//DOM 요소 가져오기    
    const sel1 = document.querySelector("#sel1") ; //sel을 먼저 선언 후 id를 가져오는 것 
    const sel2 = document.getElementById("sel2") ; //2개가 같은거
//인풋 가져오기
    const txt1 = document.querySelector("input");//처음 만나는 인풋을 가져오게 됨
    const txt2 = document.querySelector("[readonly]"); //속성을 가져오는 것

    const lab1 = document.querySelector("[for = txt1]"); //속성의 값을 가져오는 것
    const lab2 = document.querySelector("[for = txt2]"); 

    // console.log(lab1)
    // console.log(lab2)

//2. 셀렉터 값 변경될때

    sel1.addEventListener('change', () => {
        // sel2 변경
        if (sel1.value == "℃") sel2.value ="℉";
        else sel2.value = "℃";
        //label 변경
        lab1.innerHTML = sel1.value;
        lab2.innerHTML = sel2.value;
        //input 초기화
        txt1.value = "";
        txt2.value = "";
    });

      sel2.addEventListener('change', () => {
        // sel2 변경
        if (sel2.value == "℃") sel1.value ="℉";
        else sel1.value = "℃";
        //label 변경
        lab1.innerHTML = sel1.value;
        lab2.innerHTML = sel2.value;
        //input 초기화
        txt1.value = "";
        txt2.value = "";
        txt1.focus();
    });
    //3. input 요소 입력시 할 일
    txt1.addEventListener("input", () => {
        if (sel1.value == "℃") {
            // 섭씨를 화씨로
            txt2.value=parseFloat((txt1.value*(9/5)+32)).toFixed(2);
            
        } else {
            //화씨를 섭씨로
            //tofixed는 소수점 2째자리에서 반올림 해주는 것
            //float 안 써도 되는 듯 (number로 해놨기 때문)
            txt2.value=parseFloat(((txt1.value-32)*5/9)).toFixed(2);
        }
    });
});