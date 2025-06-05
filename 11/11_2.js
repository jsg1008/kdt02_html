const yesterday = () => {  // 어제 날짜를 yyyy-mm-dd로 반환하는 함수
  let yday = new Date() ; //현재 날짜와 시간을 변수에 저장
  yday.setDate(yday.getDate() - 1) ; //현재 날짜에서 하루를 빼고 어제 날짜로 저장

  return yday.toISOString().slice(0, 10);//반환 값 중 앞 10글자만 잘라서 반환

  // let y = yday.getFullYear() ; //연도4자리
  // let m = yday.getMonth() + 1 ; //월 
  // m = m < 10 ? '0' + m : m ;

  // let d = yday.getDate() ; //일
  // d = d < 10 ? '0' + d : d ;
  
  // return y+String(m).padStart(2, '0')+String(d).padStart(2,'0') ;
}

const getPoser = (mvNm) => { //영화 이름을 받아서 포스터 이미지를 가져오는 함수
  console.log("getPoster", mvNm); //디버깅용 영화 이름 출력
  const postapikey = ""; //api키
  
  let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${postapikey}&query=${mvNm}`; //영화 이름 검색 api url생성
  const poster = document.querySelector(".divPost"); //html에서 .divPost 클래스 요소를 찾음
  fetch(url2) // api 요청
  .then(resp => resp.json()) // 응답을 json으로 반환
   .then(data =>  // 검색 결과 중 첫번째 영화의 포스터를 img 태그로 삽입
    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}"/>`)
  .catch(err =>console.log(err)); //에러가 나면 콘솔에 출력
   }

const getMvList = (dt, ul, gubun) => { //영화 순위 목록 가져오는 함수
  console.log("dt=", dt) //날짜 확인용 
  const apikey = "6c7b330f88e9be5e7ba303308cfc3baf" //영화진흥위원회 api 키

  let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apikey}&targetDt=${dt}`;
  
  if (gubun == "r2") {
    url = `${url}&multiMovieYn=N`
  } else if (gubun == "r3") {
    url = `${url}&multiMovieYn=Y`
  } 

  // console.log(url)
  fetch(url) 
  .then(resp => resp.json())
  .then(data => {
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    console.log(dailyBoxOfficeList)
    const mvList = dailyBoxOfficeList.map((item) => {
      const mv=encodeURIComponent(item.movieNm);
      
      return `<li onClick=getPoser("${mv}")>
                <span class="spRank">${item.rank}</span> 
                <span class="spMv">${item.movieNm}</span>
                ${parseInt(item.rankInten) > 0 
                  ? '<span class="spR"><i class="fa-solid fa-arrow-up"></i>' + Math.abs(item.rankInten) + "</span>"
                  : parseInt(item.rankInten) < 0 
                    ?'<span class="spB"><i class="fa-solid fa-arrow-down"></i>' + Math.abs(item.rankInten) + "</span>"
                    :'<i class="fa-solid fa-minus sp"></i>'
                }
            </li>` }
    ) ;
    let tags = mvList.join('') ; //html 문자열로 합치기
     
    ul.innerHTML = tags ;//html 목록에 삽입
     
  })
  .catch(err => console.log(err)); //에러 처리
}

const ddtt = (data) => {
  const detail = document.querySelector(".detail");
  const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
  const mvListDetail = dailyBoxOfficeList.map(item => 
    `<li>${item.openDt}</li>`
  );
  detail.innerHTML = mvListDetail.join('');
}

document.addEventListener("DOMContentLoaded", ()=>{ //문서가 로딩완료되면 실행
  const ul = document.querySelector(".mvul") ;
  const dtIn = document.querySelector("#dt") ;
  const bt = document.querySelector(".divRadio > button")
  

  dtIn.setAttribute("max", yesterday()) ;//날짜 입력창 최대값을 어제로 제한

  dtIn.value = yesterday() ;  // 기본값을 어제로
  getMvList(dtIn.value.replaceAll('-',''), ul) ;// 어제 날짜 영화 순위 목록 보여줌
  console.log(yesterday())

  dtIn.addEventListener("change" , () => { //날짜를 바꾸면 자동으로 목록 갱신
    getMvList(dtIn.value.replaceAll('-',''), ul, "") ;
  });
  
  bt.addEventListener("click" , (e)=>{ //버튼을 누르면 라디오 값(gubun)에 따라 영화 목록 필터링
    e.preventDefault();
    const gubun = document.querySelector("[type=radio]:checked").value ; 
    document.querySelector(".poster").innerHTML="";
    getMvList(dtIn.value.replaceAll('-',''), ul, gubun) ;
    document.querySelector(".detail").innerHTML="";
    ddtt()
      });
});
