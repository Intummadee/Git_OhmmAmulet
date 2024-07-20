
// เพื่อถ้า refresh หน้า arrayของทั้งสองก็จะยังเหมือนกัน
var arrayProductLocal = JSON.parse(localStorage.getItem('arrayProduct')) || [];
arrayProduct = [...arrayProductLocal]


// นับจำนวน product จาก localStorage
var numberProduct = arrayProductLocal.reduce((total, product) => total + product.Count, 0);
document.getElementById("numberProduct").innerText = numberProduct;





arrayProduct.forEach(item => {
    const divBox = document.createElement("div");
    divBox.id = "box";
    
    // Img , Left side 
    const divImg = document.createElement("div");
    const img = document.createElement('img');
    img.src = item.Image;
    divImg.appendChild(img);
    divBox.appendChild(divImg);
    
    // Right side
    const rightSideBox = document.createElement('div');
    rightSideBox.className = 'rightSideBox';

    const nameProductBox = document.createElement('h4');
    nameProductBox.id = 'nameProductBox';
    nameProductBox.innerHTML = item.ProductName + ' <span id="priceProductBox">'+ item.Price +' Baht</span>';

    const calculateDiv = document.createElement('div');
    calculateDiv.id = 'calculateDiv';

    const minusDiv = document.createElement('div');
    minusDiv.className = 'minus';
    minusDiv.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5891 23.1781C5.18841 23.1781 0 17.9897 0 11.5891C0 5.18841 5.18841 0 11.5891 0C17.9897 0 23.1781 5.13991 23.1781 11.5406C23.1781 17.9412 17.9897 23.1781 11.5891 23.1781ZM11.5891 1.21225C5.91576 1.21225 1.26074 5.86726 1.26074 11.5406C1.26074 17.2139 5.91576 21.8689 11.5891 21.8689C17.2624 21.8689 21.9174 17.2139 21.9174 11.5406C21.9174 5.86726 17.2624 1.21225 11.5891 1.21225Z" fill="#134563"/>
            <path d="M5.38232 10.8618H17.7472V12.2195H5.38232V10.8618Z" fill="#134563"/>
        </svg>
    `;


    const plusDiv = document.createElement('div');
    plusDiv.className = 'plus';
    plusDiv.innerHTML = `
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 24.8234C5.6937 24.8234 0.176514 19.3062 0.176514 12.4999C0.176514 5.6937 5.6937 0.176514 12.5 0.176514C19.3062 0.176514 24.8234 5.6937 24.8234 12.4999C24.8234 19.3062 19.3062 24.8234 12.5 24.8234ZM12.5 1.51714C6.46714 1.51714 1.51714 6.46714 1.51714 12.4999C1.51714 18.5328 6.46714 23.4828 12.5 23.4828C18.5328 23.4828 23.4828 18.5328 23.4828 12.4999C23.4828 6.46714 18.5328 1.51714 12.5 1.51714Z" fill="#134563"/>
            <path d="M5.95142 11.7781H19.0483V13.2218H5.95142V11.7781Z" fill="#134563"/>
            <path d="M11.7781 5.95142H13.2218V19.0483H11.7781V5.95142Z" fill="#134563"/>
        </svg>
    `;

    const quantityP = document.createElement('p');
    quantityP.textContent = item.Count.toString();

    // เพิ่มปุ่มลด จำนวน และปุ่มเพิ่ม เข้าไปใน calculateDiv
    calculateDiv.appendChild(minusDiv);
    calculateDiv.appendChild(quantityP);
    calculateDiv.appendChild(plusDiv);


    let totalPrice = parseInt(item.Count) * parseInt(item.Price);
    console.log(totalPrice , item.Count , item.Price);
    const sumPriceDiv = document.createElement('div');
    sumPriceDiv.innerHTML = '<h4><span id="sumPrice">'+ totalPrice.toString() +'</span> Baht</h4>';

    rightSideBox.appendChild(nameProductBox);
    rightSideBox.appendChild(calculateDiv);
    rightSideBox.appendChild(sumPriceDiv);
    divBox.appendChild(rightSideBox);
    
    document.getElementById("list").appendChild(divBox);
});

document.getElementById("clearCart").addEventListener("click" , ()=>{
    arrayProduct = []
    localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct));
    // ถ้า clear cart หมายเลขตรงไอคอน ตะกร้าก็เหลือ 0
    document.getElementById("numberProduct").innerText = 0;
    const list = document.getElementById('list'); // ลบ box ใน list
    while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
        list.removeChild(list.firstChild);
    }

});




// function askForLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             function(position) {
//                 // ฟังก์ชั่นที่เรียกเมื่อได้ข้อมูลตำแหน่ง
//                 var latitude = position.coords.latitude;
//                 var longitude = position.coords.longitude;
//                 console.log("Latitude: " + latitude);
//                 console.log("Longitude: " + longitude);
//                 // คุณสามารถทำสิ่งต่างๆ กับข้อมูลตำแหน่งที่นี่
//             },
//             function(error) {
//                 // ฟังก์ชั่นที่เรียกเมื่อไม่สามารถรับข้อมูลตำแหน่งได้
//                 console.error("Error getting location: ", error);
//             }
//         );
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// // เรียกใช้ฟังก์ชั่นขอสิทธิ์เข้าถึงตำแหน่งเมื่อหน้าเว็บโหลด
// window.onload = askForLocation;
