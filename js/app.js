// constante

const li_email = document.querySelector("#login_email");
const li_pass = document.querySelector("#login_pass");
const li_err_up = document.querySelector("#login_err_up");
const li_err1 = document.querySelector("#login_err1");
const li_err2 = document.querySelector("#login_err2");
const all_users = document.querySelector("#users");

const re_fname = document.querySelector("#register_fname");
const re_lname = document.querySelector("#register_lname");
const re_email = document.querySelector("#register_email");

const re_p1 = document.querySelector("#register_pass");
const re_p2 = document.querySelector("#register_pass_confirm");
const re_terms = document.querySelector("#register_terms");
const re_err1 = document.querySelector("#register_err1");
const re_err2 = document.querySelector("#register_err2");
const re_err3 = document.querySelector("#register_err3");
const re_err4 = document.querySelector("#register_err4");
const re_err5 = document.querySelector("#register_err5");
const re_err6 = document.querySelector("#register_err6");

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^\d{10,13}|^\+\d{11}/g;

const user = {
  email: "",
  pass: "",
};

const BASE_URL = "https://backend-curs.herokuapp.com";
const ENDPOINTS = {
  LOG_IN: "/users/login",
  REGISTER: "/users/register",
  POST: "/posts",
  GET_USERS: "/users",
};

// functia de eroare

function handlePrintError(msg, el, bd) {
  el.innerText = msg;
  el.style.display = "block";
  bd.style.borderColor = "red";

  setTimeout(() => {
    el.style.display = "none";
  }, 2000);
}

// functia de validare

function corectRegister(cbrd) {
  cbrd.style.backgroundColor = "#80ed99";
  cbrd.style.borderColor = "#d9d9d9";
}

// functie de eroare login

// functia de login

async function handleSubmitLoginForm() {
  if (li_email.value === "") {
    handlePrintError("Email is required", li_err1, li_email);

    return;
  }

  if (!li_email.value.match(emailRegExp)) {
    handlePrintError("Invalid email address.", li_err1, li_email);

    return;
  }

  if (li_pass.value.length < 8) {
    handlePrintError("Passowrd to short.", li_err2, li_pass);

    return;
  }

  if (li_email.value === user.email && li_pass.value === user.pass) {
    alert("Login success");
    window.location.reload();
  }

  // fetch pentru login

  const request1 = await fetch(BASE_URL + ENDPOINTS.LOG_IN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: li_email.value,
      password: li_pass.value,
    }),
  });
  const response1 = await request1.json();

  if (response1.token) {
    localStorage.setItem("token", response1.token);

    window.location.replace(BASE_URL /*+ ENDPOINTS.POST*/);
  } else {
    alert(response1.message);
  }
}

// functie de register

async function handleSubmitRegisterForm() {
  if (re_fname.value.length < 2) {
    handlePrintError("First name is required", re_err1, re_fname);

    return;
  } else {
    corectRegister(re_fname);
  }

  if (re_lname.value.length < 2) {
    handlePrintError("Last name is required", re_err2, re_lname);
    return;
  } else {
    corectRegister(re_lname);
  }

  if (re_email.value.length === "") {
    handlePrintError("Email is required", re_err3, re_email);
    return;
  }

  if (!re_email.value.match(emailRegExp)) {
    handlePrintError("Email is required", re_err3, re_email);
    return;
  } else {
    corectRegister(re_email);
  }

  if (re_p1.value.length < 8 || re_p2.value.length < 8) {
    handlePrintError("Password to short", re_err5, re_p1);
    return;
  } else {
    corectRegister(re_p1);
  }

  if (re_p1.value !== re_p2.value) {
    handlePrintError("Password do not mach", re_err6, re_p2);
    return;
  } else {
    corectRegister(re_p2);
  }

  if (re_terms.checked === false) {
    handlePrintError("You must agree to the terms", re_err7, re_err7);
    return;
  }

  // fetch pentru cont creat cu succes

  const request = await fetch(BASE_URL + ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: re_fname.value,
      last_name: re_lname.value,
      email: re_email.value,
      password: re_p1.value,
    }),
  });
  const response = await request.json();
  if (response.email) {
    localStorage.setItem("email", response.email);
  }
  if (response.password) {
    localStorage.setItem("password", response.password);
    alert("Cont creeat cu succes!");
    window.location.href = "login.html";
  } else {
    alert(response.message);
  }
}

// fetch pentru get all users,posts (care nu merge)

// all_users.addEventListener("click", async () => {
//   const request2 = await fetch(BASE_URL + ENDPOINTS.POST, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer USER_TOKEN_HERE",
//     },
//   });
//   const response2 = await request2.json();
//   if (response2.user) {
//     localStorage.getItem("user", response2.user);
//   }
//   // if (response2.password) {
//   //   localStorage.getItem("password", response2.password);
//   //   window.location.reload();
//   // }
//   else {
//     alert("orice");
//   }
// });
