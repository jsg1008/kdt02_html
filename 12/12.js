//데이터 가져오기 함수
const getData = (txtKw, content) => {
    const apikey = "s8VsZNvdipWkAE%2BTVXO0AdTTrG9I%2BnuchpAGg7dJhVeSHdvqhNKhCIF15TOQx7XRSgofq6gM3NqIQBeEeEGkFg%3D%3D" ;
    const baseurl = "https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?";
    let url = `${baseurl}serviceKey=${apikey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${txtKw.value}&_type=json`;
    console.log(url);

    fetch(url) // data를 달라고 요청함. 비동기. 
    .then(resp => resp.json()) // data가 오면 json으로 받음
    .then(data => {
        const items = data.response.body.items.item;
        let tags = items.map (item => `
        <div class="card">
            <div class="cardImg">
                <img src="${item.galWebImageUrl}"/>
            </div>
            <div class="cardDiv">
                <span class="sp1">${item.galTitle}</span>
                <span class="sp2">${item.galPhotographyLocation}</span>
            </div>
        </div>
            
        `); //map의 결과는 array가 된다
        tags = tags.join('');
        content.innerHTML = tags;
    })
    
    .catch(err => console.log(err)); //오류가 났을때의 fetch문법
}

document.addEventListener("DOMContentLoaded", ()=>{
    const txtKw=document.querySelector("#txt1");
    const bt1=document.querySelector(".formDiv > button");
    const bt2=document.querySelector(".formDiv > [type=reset]");//속성을 대괄호
    const content=document.querySelector(".content");
    
    bt1.addEventListener("click", (e)=>{
        e.preventDefault(); //자기 자신에게 바로 뿌려지는걸 막는 역할
            // data를 가져와서 뿌려줘야 하는 역할
        if (txtKw.value == "") {
            alert("키워드를 입력하세요.");
            txtKw.focus();
            return;
        }

        getData(txtKw, content); // 보낼 곳을 쓰는것
    });

    bt2.addEventListener("click", ()=>{
        content.innerHTML="";
    });
});