$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus')
  })
  
  function login() {
    var userID = document.getElementById("username").value;
    localStorage.setItem("id", userID);
    // localStorage.setItem("log", "Logout");
  
    var login_click = document.getElementById("loginn").onclick;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username.length < 5) {
      alert("Please enter email correctly");
    }
    else if (password.length < 5) {
      alert("Please enter password correctly");
    }
    else if (login_click) {
      location.href = "login.html";
    }
    console.log(username);
  }
  
  function logout() {
    var login_click = document.getElementById("logout").onclick;
    if (login_click) {
      location.href = "index.html";
    }
  }
  
  function register() {
    alert("Register Successfully!");
  }
  
  function validate2() {
    alert("Reset password will be sent to your email");
  }
  
  // ปุ่มกดเปิดรถเข็นด้านขวาของเว็บ
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }






function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}



const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");


const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};


const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

modal.addEventListener("click" , function(event) {
  if (event.target === modal) {
    closeModal();
  }
});


const openModalBtn = document.querySelector(".btn-open");
openModalBtn.addEventListener("click", openModal);






var arrayProduct = []
var numberProduct = 0;


// เพื่อถ้า refresh หน้า arrayของทั้งสองก็จะยังเหมือนกัน
var arrayProductLocal = JSON.parse(localStorage.getItem('arrayProduct')) || [];
arrayProduct = [...arrayProductLocal]


// นับจำนวน product จาก localStorage
var numberProduct = arrayProductLocal.reduce((total, product) => total + product.Count, 0);
document.getElementById("numberProduct").innerText = numberProduct;



document.querySelectorAll('.fa.fa-plus').forEach(function(icon) {
  icon.onclick = function() {
      event.preventDefault(); // ป้องกันการ refresh หน้า

      // ดึงชื่อสินค้าและราคาออกมา
      let productElement = icon.closest('.content'); // ค้นหา element ที่ใกล้ที่สุดที่ตรงกับ selector ที่กำหนด โดยจะค้นหาจาก element ปัจจุบันขึ้นไปตามลำดับในโครงสร้าง DOM
      let productNameElement = productElement.querySelector('.productName');
      let productName = productNameElement.innerText;
      let priceElement = productElement.querySelector('.price');

      let price = priceElement.innerText;


      // ดึง image
      let imgElement = productElement.previousElementSibling.querySelector('img'); // previousElementSibling = อ้างอิงถึง element พี่น้อง (sibling) ที่อยู่ก่อนหน้า element
      //  imgElement = <img src="../src/indexPageImage/เหรียญขวัญถุงพระราหู.jpg" />
      let imgSrc = imgElement.getAttribute('src');

      


      console.log("Product Name: " + productName);
      console.log("Price: " + price);


      // ค้นหาว่าสินค้าชื่อนี้มีอยู่ใน arrayProduct แล้วหรือไม่
      let productFound = arrayProduct.find(item => item.ProductName === productName);
      if (productFound) {
        // ถ้ามีอยู่แล้ว ให้เพิ่ม count
        productFound.Count += 1;
      } else {
          // ถ้าไม่มี ให้สร้าง object ใหม่และเพิ่มเข้าไปใน array
          var collectDataProduct = { ProductName: productName, Price: price.replace("฿", ""), Count: 1 , Image : imgSrc };
          arrayProduct.push(collectDataProduct);
      }

      // เก็บ arrayProduct ไว้ใน localStorage
      localStorage.setItem('arrayProduct', JSON.stringify(arrayProduct));
      


      // นับจำนวนสินค้า เพื่อเปลี่ยนตัวเลขตรงตะกร้า
      numberProduct+=1;
      document.getElementById("numberProduct").innerText = numberProduct;

      

  };
});
  


console.log(arrayProduct);







