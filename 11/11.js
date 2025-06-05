const yesterday = () => {
  let yday = new Date() ;
  yday.setDate(yday.getDate() - 1) ; //어제 날짜

  return yday.toISOString().slice(0, 10);

  // let y = yday.getFullYear() ; //연도4자리
  // let m = yday.getMonth() + 1 ; //월 
  // m = m < 10 ? '0' + m : m ;

  // let d = yday.getDate() ; //일
  // d = d < 10 ? '0' + d : d ;
  
  // return y+String(m).padStart(2, '0')+String(d).padStart(2,'0') ;
}

const getPoster = (mvNm) => {
  console.log("getPoster" , mvNm);
  const tmdbApi = "" ;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApi}&query=${mvNm}` ;
  const poster = document.querySelector(".poster") ;

  fetch(url)
    .then(resp => resp.json())
    .then(data => poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data.results[0].poster_path}" />`) 
    .catch(err => console.log(err)) ;

  
}
const getMvList = (dt, ul, gubun) => {
  console.log("dt=", dt) 
  const apikey = "" 

  let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apikey}&targetDt=${dt}`;
  
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
           const mv = encodeURIComponent(item.movieNm);
           return `<li onClick=getPoster("${mv}")>
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
    let tags = mvList.join('') ;
     
    ul.innerHTML = tags ;                              
     
  })
  .catch(err => console.log(err)) 
  ;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector("main ul") ;
  const dtIn = document.querySelector("#dt") ;
  const bt = document.querySelector(".divRadio > button")
  dtIn.setAttribute("max", yesterday()) ;

  dtIn.value = yesterday() ; 
  getMvList(dtIn.value.replaceAll('-',''), ul) ;
  console.log(yesterday())

  dtIn.addEventListener("change" , () => { 
    getMvList(dtIn.value.replaceAll('-',''), ul, "") ;
  });
  
  bt.addEventListener("click" , (e)=>{
    e.preventDefault();
    const gubun = document.querySelector("[type=radio]:checked").value ;
    document.querySelector(".poster").innerHTML = "" ; 
    getMvList(dtIn.value.replaceAll('-',''), ul, gubun) ;
  });
});
