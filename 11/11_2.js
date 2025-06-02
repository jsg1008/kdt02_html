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

const getPoser = (mvNm) => {
  console.log("getPoster", mvNm);
  const postapikey = "b42483d9af611184a5e87b9980e11075"; 
  
  let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${postapikey}&query=${mvNm}`;
  const poster = document.querySelector(".divPost");
  fetch(url2)
  .then(resp => resp.json())
   .then(data => 
    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}"/>`)
  .catch(err =>console.log(err));
   }





const getMvList = (dt, ul, gubun) => {
  console.log("dt=", dt) 
  const apikey = "6c7b330f88e9be5e7ba303308cfc3baf" 

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
    let tags = mvList.join('') ;
     
    ul.innerHTML = tags ;                              
     
  })
  .catch(err => console.log(err));
}

const ddtt = (ul) => {
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
     const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    console.log(dailyBoxOfficeList)
    const mvListDetail = dailyBoxOfficeList.map((item) => {
      `<li>${openDt}</li>`
    let tags2 = mvListDetail.join('');
    detail.innerHTML = tags2 ;
    })
  .catch(error => console.log(err));
  })
}


document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector(".mvul") ;
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
    document.querySelector(".poster").innerHTML="";
    getMvList(dtIn.value.replaceAll('-',''), ul, gubun) ;
    document.querySelector(".detail").innerHTML="";
    ddtt()
      });
});