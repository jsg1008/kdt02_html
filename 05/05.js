const lotto = () => {
    document.getElementById("nlist").innerHTML = "";

    let arr = [ ];

    while (arr.length<6) {
        let n = Math.floor(Math.random()*45)+1 ; //45개를 만들어서 소수점을 떼고 1씩 더해서 숫자 0의 가능성을 지운다

        if (arr.includes(n)) continue; //랜덤수가 이미 존재한다면 한번 더 위로 가서 난수를 생성

        arr.push(n);
    }

    arr.sort((a, b) => a - b); //오름차순 정렬
    
    let bonus = [];
    while (bonus.length < 1) {
         let n = Math.floor(Math.random()*45)+1 ; 

         if(arr.includes(n)) continue ;
         bonus.push(n);
    }
    
    // arr.push('+'); //arr 배열의 끝에 플러스 기호를 추가
    arr = [...arr, ...bonus]; // 배열 합치기
    

    //태그 배열
    let tags = arr.map( item => `<span class="sp${Math.floor(item/10)}">${item}</span>`);

    tags.splice(6, 0, "<span id='spPlus'>+</span>") ;
    
    tags = tags.join('');
    
    console.log(tags)
    document.getElementById("nlist").innerHTML = tags;
}