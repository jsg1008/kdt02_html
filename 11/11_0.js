const yesterday=Date-1;
console.log(yesterday)


const getMvList = (dt, ul) => {
  console.log("dt=", dt) 
  const url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=2a350cfbca6c428eb04c71e21cc681e7&targetDt=" + dt;
  
  // console.log(url)
  fetch(url) 
  .then(resp => resp.json())
  .then(data => {
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    console.log(dailyBoxOfficeList)
    const mvList = dailyBoxOfficeList.map((item) => 
           `<li>
                <span class="spRank">${item.rank}</span> 
                <span class="spMv">${item.movieNm}</span>
                <span class="spInten">${item.rankInten}</span>
            </li>` 
                                  ) ;
    let tags = mvList.join('') ;
     
    ul.innerHTML = tags ;                              
    
    
  })
  .catch(err => console.log(err)) 
  ;
}


document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector("main > ul") ;
  const dtIn = document.querySelector("#dt") ;

  dtIn.addEventListener("change" , () => {
    getMvList(dtIn.value.replaceAll('-',''), ul) ;
  });
  
});