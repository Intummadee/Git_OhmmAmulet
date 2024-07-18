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