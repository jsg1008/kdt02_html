const yesterday = () => {
  let tttday = new Date(); // tttday를 오늘로 선언
  tttday.setDate(tttday.getDate()-1); // 오늘에서 하루를 빼고 어제로 만듦
  return tttday.toISOString().slice(0, 10); //tttday 날짜 객체를 ISO 8601 형식의 문자열로 변환. slice를 안한다면 시간 정보도 다 들어가게 됨. 그래서 10개 이후로는 자르는것.
}

 


const getMvList = (dt, ul, multiMovieYn) => { // dt와 ul이라는 매개변수를 받는 것
  console.log("dt=", dt, multiMovieYn) 
  const url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=2a350cfbca6c428eb04c71e21cc681e7&targetDt=" + dt + "&"+ multiMovieYn ;
  
  // console.log(url)
  fetch(url)  //api를 요청하는 것
  .then(resp => resp.json()) //응답 데이터를 json으로 변환
  .then(data => {
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ; //일일 박스오피스목록을 추출하는 것
    console.log(dailyBoxOfficeList)
    
    const mvList = dailyBoxOfficeList.map((item) => { //영화 정보 객체들의 배열을 li형태 HTML문자열로 바꿔주는 역할. 각 li에는 영화정보가 들어감. 

    let rankChangeHTML = '';

    const rankInten = parseInt(item.rankInten);

    if (rankInten > 0) { 
        rankChangeHTML= `<span class="sp0">☀️ ${item.rankInten}</span>`;
      } else if (rankInten < 0 ) {
        rankChangeHTML= `<span class="sp1">⛈️ ${item.rankInten}</span>`;
      } else {
        rankChangeHTML= `<span class="sp2">➖ ${item.rankInten}</span>`;
      }
// return 다음에 백틱을 쓰지 않고 문장을 넘기면,  return 다음에 세미콜론이 있는 것으로 인식하기 때문에 오류가 남
      return `<li> 
                <span class="spRank">${item.rank}</span> 
                <span class="spMv">${item.movieNm}</span>
                ${rankChangeHTML}
            </li>`; 
    });
    let tags = mvList.join('') ;//join으로 li으로 나열된 정보들의 쉼표, 공백을 지우고, 하나로로 합침. 그러기 위해서 tags라는 변수를 선언함. 
     
    ul.innerHTML = tags ; //최종 html을 생성해서 리스트에 출력                             
    
  })
  .catch(err => console.log(err)) 
  ;
}


document.addEventListener("DOMContentLoaded", ()=>{ //이벤트 초기화 작업. html로딩이 끝나고 실행됨
  const ul = document.querySelector("main > ul") ; // ul 요소 가져오기
  const dtIn = document.querySelector("#dt") ; // dtIn 요소 가져오기
  dtIn.setAttribute("max", yesterday()); //dtIn이라는, date 인풋 요소가, max 값을 어제라는 함수로 설정함으로써, 최대 선택 가능 날짜가 어제가 되게 한 것

  dtIn.value = yesterday(); // dtIn의 값이 어제라는 함수로 선언.
  getMvList(dtIn.value.replaceAll('-',''), ul); //영화 목록을 가져오는 함수. 인자는 2개. 하나는 dtIn에서 value로 선택되어진 값. -를 제외값을 공백으로 다 대체한 날짜.
// 다른 요소 하나는 ul.즉 리스트 영역. 

  dtIn.addEventListener("change" , () => { //dtIn 값이 바뀌면 다시 한번 영화목록 가져오는 함수가 실행됨
    getMvList(dtIn.value.replaceAll('-',''), ul) ;
  });
  bt.addEventListener("click", (e)=>{
    e.preventDefault();
    const rVal=document.querySelector("[type=radio]:checked").value;
    console.log(rVal);
  });
  bt.addEventListener("click" , () => { 
    getMvList(dtIn.value.replaceAll('-',''), ul) ;
  });
  
});