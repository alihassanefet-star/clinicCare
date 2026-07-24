const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all fields!"
    });
    return;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 8 characters."
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match"
    });
    return;
  }

  const user = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "patient"
  };

  localStorage.setItem("currentUser", JSON.stringify(user));

  Swal.fire({
    icon: "success",
    title: "Registration Successful",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "../HomePage/home.html";
  });
});