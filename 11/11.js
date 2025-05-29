const getMvList = (dt, ul) => {
  console.log("dt=", dt);
  const url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=2a350cfbca6c428eb04c71e21cc681e7&targetDt=" + dt;

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      console.log(dailyBoxOfficeList);
      const mvList = dailyBoxOfficeList.map((item) =>
        `<li>
            <span class="spRank">${item.rank}</span> 
            <span class="spMv">${item.movieNm}</span>
            <span class="spInten">${item.rankInten}</span>
        </li>`
      );
      let tags = mvList.join('');
      ul.innerHTML = tags;
    })
    .catch(err => console.log(err));
};

document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("main > ul");
  const dtIn = document.querySelector("#dt");

  // ✅ 어제 날짜를 yyyy-MM-dd 형식으로 구해서 input의 value로 설정
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yyyy = yesterday.getFullYear();
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  const dd = String(yesterday.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  dtIn.value = formattedDate;

  // ✅ 어제 날짜로 영화 데이터 자동 조회 (yyyyMMdd 형식으로 변환해서 전달)
  getMvList(formattedDate.replaceAll('-', ''), ul);

  // ✅ 사용자가 날짜를 바꿨을 때 다시 조회
  dtIn.addEventListener("change", () => {
    getMvList(dtIn.value.replaceAll('-', ''), ul);
  });
});
