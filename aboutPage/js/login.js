let login = document.getElementById("submit");
let form = document.getElementById("loginForm");
let email = document.getElementById("email");
let password = document.getElementById("password");
let togglePassword = document.getElementById("togglePassword");

// Show / Hide Password section

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.textContent = "Hide";
  } else {
    password.type = "password";
    togglePassword.textContent = "Show";
  }
});

// Login section

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();

  if (emailValue === "" || passwordValue === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all fields!",
    });

    return;
  }

  if (passwordValue.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 8 characters.",
    });

    return;
  }

  localStorage.setItem("email", emailValue);

  Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: "Welcome back!",
    timer: 2000,
    showConfirmButton: false,
  });

  // login section

  login.addEventListener("click", () => {
    window.location.href = "../homePage/home.html";
  });

  setTimeout(() => {
    window.location.href = "../doctorPage/patient-dashboard.html";
  }, 2000);

});
