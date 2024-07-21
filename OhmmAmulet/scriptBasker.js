
// เพื่อถ้า refresh หน้า arrayของทั้งสองก็จะยังเหมือนกัน
var arrayProductLocal = JSON.parse(localStorage.getItem('arrayProduct')) || [];
arrayProduct = [...arrayProductLocal]


// นับจำนวน product จาก localStorage
var numberProduct = arrayProductLocal.reduce((total, product) => total + product.Count, 0);
document.getElementById("numberProduct").innerText = numberProduct;




let total_Bill = 0;
if (arrayProduct.length > 0){
    while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
        list.removeChild(list.firstChild);
    }
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
        nameProductBox.innerHTML = item.ProductName;
        
    
        const priceProductBoxNew = document.createElement('h4');
        priceProductBoxNew.id = 'priceProductBox';
        priceProductBoxNew.innerHTML = item.Price + ' Baht';
    
    
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
        total_Bill += totalPrice;
        // console.log(totalPrice , item.Count , item.Price);
        const sumPriceDiv = document.createElement('div');
        sumPriceDiv.innerHTML = '<h4><span id="sumPrice">'+ totalPrice.toString() +'</span> Baht</h4>';
    
        rightSideBox.appendChild(nameProductBox);
        rightSideBox.appendChild(priceProductBoxNew);
        rightSideBox.appendChild(calculateDiv);
        rightSideBox.appendChild(sumPriceDiv);
        divBox.appendChild(rightSideBox);
        
        document.getElementById("list").appendChild(divBox);
    });
}
else{
    while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
        list.removeChild(list.firstChild);
    }
    if (arrayProduct.length === 0) {
        document.getElementById('list').innerText = 'Your basket is empty.';
    }
}


document.getElementById("CountPriceBaht").innerText = total_Bill;


document.getElementById("clearCart").addEventListener("click" , ()=>{

    Swal.fire({
        title: "Are you sure?",
        text: "To Clear All Product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clear it!"
      }).then((result) => {
        if (result.isConfirmed) {
            arrayProduct = []
            localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct));
            // ถ้า clear cart หมายเลขตรงไอคอน ตะกร้าก็เหลือ 0
            document.getElementById("numberProduct").innerText = "0";
            const list = document.getElementById('list'); // ลบ box ใน list
            while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
                list.removeChild(list.firstChild);
            }
            document.getElementById('list').innerText = 'Your basket is empty.';
            document.getElementById("CountPriceBaht").innerText = "0";
          Swal.fire({
            title: "Success!",
            icon: "success"
          });
        }
      });
    



});


// plus
document.querySelectorAll('.plus').forEach(function(iconPlus) {
    iconPlus.onclick = function() {
        event.preventDefault();

        let rightSideBox = iconPlus.closest('.rightSideBox'); // ควรใช้ closest กับคลาสหรือตัวเลือกที่เป็นตัวแม่ที่ตรงกันมากกว่า
        
        // จากตัวแม่ที่มีคลาส rightSideBox หาองค์ประกอบ nameProductBox
        let productNameElement = rightSideBox.querySelector('#nameProductBox');
        let productNameSelect = productNameElement.textContent.trim(); // กระดิ่งทอง
        
        let productIndex = arrayProduct.findIndex(item => item.ProductName === productNameSelect);
        var numberProduct; // เก็บจำนวนสินค้าตอนนี้ เพื่อเอาไปคูณกับราคาสินค้านี้เพื่อเอาราคาทั้งหมด กับ ไว้ใช้ตอนแสดงจำนวนใน tag p คือจำนวนที่อยู่ระหว่าง+กับ-
        
        // เช็กเงื่อนไขเพราะ มันจะมีคำที่มีช่องว่างอย่าง  "ฮินะ มัตสึริ 89 Baht" หรือ "กระดิ่งทอง / กระพรวนทอง"
        if (productIndex != -1){
            // หาชื่อเจอใน arrayProduct
            arrayProduct[productIndex].Count += 1;
            numberProduct = arrayProduct[productIndex].Count
        }
        
        
        

        // nameProductBox ถ้ากดปุ่ม + เลยต้องมาแก้จำนวนสินค้า
        let calculateDiv = rightSideBox.querySelector('#calculateDiv');
        let pTags = calculateDiv.getElementsByTagName("p");
        let calNewCount = 0;
        for (let i = 0; i < pTags.length; i++) {
            // calNewCount = parseInt(pTags[i].textContent) + 1;
            pTags[i].textContent = numberProduct;
        }

        // เปลี่ยนราคาตามจำนวนที่เปลี่ยนไป
        let sumPriceDiv = rightSideBox.querySelector('#sumPrice');
        let priceOfProduct = rightSideBox.querySelector('#priceProductBox');
        let calNewSumPrice = parseInt(numberProduct) * parseInt(priceOfProduct.innerHTML.split(" ")[0]);
        sumPriceDiv.innerHTML = calNewSumPrice.toString();
        
        
        localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct)); // เก็บ arrayProduct ไว้ใน localStorage
        
        var numberProduct = arrayProduct.reduce((total, product) => total + (parseInt(product.Price)*product.Count) , 0);
        document.getElementById("CountPriceBaht").innerText = numberProduct.toString();
        
    }
});



// Minus - ฟังชันสำหรับเมื่อกดลบจำนวนสินค้า จะต้องคำนวณพวกราคาใหม่
document.querySelectorAll('.minus').forEach(function(iconPlus) {
    iconPlus.onclick = function() {
        event.preventDefault();
        let rightSideBox = iconPlus.closest('.rightSideBox'); // ควรใช้ closest กับคลาสหรือตัวเลือกที่เป็นตัวแม่ที่ตรงกันมากกว่า
        
        // จากตัวแม่ที่มีคลาส rightSideBox หาองค์ประกอบ nameProductBox
        let productNameElement = rightSideBox.querySelector('#nameProductBox');
        let productNameSelect = productNameElement.textContent.trim(); // กระดิ่งทอง
        let productIndex = arrayProduct.findIndex(item => item.ProductName === productNameSelect);
        
        var numberProduct; 
        console.log("🥘 ", arrayProduct);
        
        if (productIndex != -1){
            // หาชื่อเจอใน arrayProduct
            if (arrayProduct[productIndex].Count - 1 > -1){
                arrayProduct[productIndex].Count -= 1;
                numberProduct = arrayProduct[productIndex].Count
                console.log("🥘 ", numberProduct);
            }
            else{
                arrayProduct[productIndex].Count = 0
                numberProduct = 0
            }
        }

        // ถ้า เป็น 0 แล้วให้ขึ้นถามว่าอยากลบออกจากตะกร้าเลยไหม
        if(numberProduct == 0){

            if (confirm("Are you sure you won't take this product?")) {
                event.preventDefault();
                let box = rightSideBox.closest('#box');
                box.remove();
                arrayProduct = arrayProduct.filter(item => item.ProductName !== productNameSelect)
            }
            else{
                arrayProduct[productIndex].Count = 1
                numberProduct = 1
            }
        }



        // nameProductBox ถ้ากดปุ่ม - เลยต้องมาแก้จำนวนสินค้าในแสดงระหว่าง + กับ - 
        let calculateDiv = rightSideBox.querySelector('#calculateDiv');
        let pTags = calculateDiv.getElementsByTagName("p");
        
        for (let i = 0; i < pTags.length; i++) {
            pTags[i].textContent = numberProduct;
        }

        // เมื่อลบจำนวนสินค้า ก็ต้องมาเปลี่ยน ราคารวมของสินค้าชนิดนี้
        let sumPriceDiv = rightSideBox.querySelector('#sumPrice'); // ราคาสินค้าทั้งหมดของสินค้านั้น
        let priceOfProduct = rightSideBox.querySelector('#priceProductBox'); // ราคาสินค้าที่ขาย 1 ชิ้น
        let calNewSumPrice = parseInt(numberProduct) * parseInt(priceOfProduct.innerHTML.split(" ")[0]);
        sumPriceDiv.innerHTML = calNewSumPrice.toString();

        localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct)); // เก็บ arrayProduct ไว้ใน localStorage
        var numberProduct = arrayProduct.reduce((total, product) => total + (parseInt(product.Price)*product.Count) , 0);
        document.getElementById("CountPriceBaht").innerText = numberProduct.toString();


        if (arrayProduct.length == 0){
            while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
                list.removeChild(list.firstChild);
            }
            if (arrayProduct.length === 0) {
                document.getElementById('list').innerText = 'Your basket is empty.';
            }
        }
        


    }
});



document.getElementById("BackHome").addEventListener("click", () => {
    window.location.href = 'index.html';
});


// import Swal from 'sweetalert2';



document.getElementById("checkOut").addEventListener("click", () => {
    var arrayProductLocal = JSON.parse(localStorage.getItem('arrayProduct')) || [];

    if (arrayProductLocal.length > 0){
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order completed",
        });
        arrayProduct = []
        localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct));
        // ถ้า clear cart หมายเลขตรงไอคอน ตะกร้าก็เหลือ 0
        document.getElementById("numberProduct").innerText = "0";
        const list = document.getElementById('list'); // ลบ box ใน list
        while (list.firstChild) { // ตรวจสอบว่ามีโหนดลูกตัวแรกอยู่หรือไม่.
            list.removeChild(list.firstChild);
        }
    
        if (arrayProduct.length === 0) {
            document.getElementById('list').innerText = 'Your basket is empty.';
            document.getElementById("CountPriceBaht").innerText = "0";
        }
      
    }
    else{
        Swal.fire("Your basket is empty!! Pls Back To Home and add our Products.");
    }
});
