document.addEventListener("DOMContentLoaded", ()=>{
    const conSearch = document.querySelector("#txt1");
    const conEnter = document.querySelector(".formDiv > button");
    const conCancel = document.querySelector(".formDiv > [type=reset]");
    const div=document.querySelector(".contentMain")

     conEnter.addEventListener("click", (e)=>{
       e.preventDefault();
       console.log(conSearch.value);
       if (conSearch.value !=""){
            getInform(conSearch.value);
        } 
        
    });
});


const getInform = () => {

    const apikey = "s8VsZNvdipWkAE%2BTVXO0AdTTrG9I%2BnuchpAGg7dJhVeSHdvqhNKhCIF15TOQx7XRSgofq6gM3NqIQBeEeEGkFg%3D%3D" 
    
    let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${apikey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&
keyword=${conSearch.value}&_type=json`;

    fetch(url) 
    .then(resp => resp.json())
    .then(data => {
    const informList = data.response.body.items.item;
    console.log("informList", informList);
    let list= informList.map((item) => {
        let changeHTML = '';
        return `${item.galTitle}, ${item.galWebImageUrl}, ${item.galPhotographyLocation}`;
 
       
    let tags = list.join('') ;
    div.innerHTML = tags ;
    div
    img.setAttribute("src" , "galWebImageUrl") ;                              
    console.log(item.galTitle);
  })
  .catch(err => console.log(err)) ;
})
}