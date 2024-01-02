// Local Storage
let userData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : [];

// Toggle Buttons
const container = document.getElementById("container");
const registerToggle = document.getElementById("register");
const loginToggle = document.getElementById("login");
const okBtn = document.getElementById("ok");

registerToggle.addEventListener("click", () => {
  container.classList.add("active");
  clearRegInputs();
});

loginToggle.addEventListener("click", () => {
  container.classList.remove("active");
  clearSignInInputs();
});

// Sign In and Sign Up Buttons
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

// Sign Up Inputs
const nameInput = document.querySelector('input[type="text"]');
const emailInputSignUp = document.getElementById("signUpEm");
const passInputSignUp = document.getElementById("signUpPass");

// Sign in Inputs
const emailInputSignIn = document.getElementById("signInEm");
const passInputSignIn = document.getElementById("signInPass");

const nameRegex = /^([A-Za-z][ 0-9]*)+/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

signUpBtn.addEventListener("click", () => {
  checkInputsForSignUp();
});

signInBtn.addEventListener("click", () => {
  checkInputsForSignIn();
});

function checkInputsForSignUp() {
  let nameValue = nameInput.value;
  let emailValue = emailInputSignUp.value;
  let passValue = passInputSignUp.value;

  let checkName = false;
  let checkEmail = false;
  let checkPassword = false;

  if (nameValue == "") {
    setErrFor(nameInput, `Sorry, Name can't be empty`);
  } else if (!nameRegex.test(nameValue)) {
    setErrFor(nameInput, `Sorry, Invalid Name`);
  } else {
    setSuccessFor(nameInput);
    checkName = true;
  }

  if (emailValue == "") {
    setErrFor(emailInputSignUp, `Sorry, email can't be empty`);
  } else if (!emailRegex.test(emailValue)) {
    setErrFor(emailInputSignUp, `Sorry, Invalid Email`);
  } else if (userData != []) {
    let checkEmailValue = false;
    userData.forEach((el) => {
      if (el.userEmail === emailValue) {
        checkEmailValue = true;
      }
    });

    if (checkEmailValue) {
      setErrFor(emailInputSignUp, "Email is already exist");
    } else {
      setSuccessFor(emailInputSignUp);
      checkEmail = true;
    }
  } else {
    setSuccessFor(emailInputSignUp);
    checkEmail = true;
  }

  if (passValue == "") {
    setErrFor(passInputSignUp, `Sorry, password can't be empty`);
  } else {
    setSuccessFor(passInputSignUp);
    checkPassword = true;
  }

  if (checkName && checkEmail && checkPassword) {
    let user = {
      userName: nameValue,
      userEmail: emailValue,
      userPass: passValue,
    };

    userData.push(user);
    localStorage.setItem("userData", JSON.stringify(userData));

    document.querySelector(".success-reg").style.display = "flex";
    clearRegInputs();
  }
}

function setErrFor(input, message) {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.style.paddingBottom = "10px";

  formControl.classList.add("error");
  formControl.classList.remove("success");
  small.innerText = message;
}

function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

function clearRegInputs() {
  nameInput.value = "";
  emailInputSignUp.value = "";
  passInputSignUp.value = "";

  nameInput.parentElement.classList.remove("success");
  nameInput.parentElement.classList.remove("error");
  emailInputSignUp.parentElement.classList.remove("success");
  emailInputSignUp.parentElement.classList.remove("error");
  passInputSignUp.parentElement.classList.remove("success");
  passInputSignUp.parentElement.classList.remove("error");
}

function checkInputsForSignIn() {
  let emailValue = emailInputSignIn.value;
  let passValue = passInputSignIn.value;
  let userName;
  if (emailValue == "") {
    setErrFor(emailInputSignIn, `Pleaze enter your email`);
  } else if (
    !userData.some((v) => {
      return v.userEmail == emailValue;
    })
  ) {
    setErrFor(emailInputSignIn, `Sorry, email is not exist`);
  } else if (
    userData.some((v) => {
      return v.userEmail == emailValue;
    })
  ) {
    setSuccessFor(emailInputSignIn);
  }

  if (
    userData.some((v) => {
      return v.userEmail == emailValue;
    }) &&
    passValue == ""
  ) {
    setSuccessFor(emailInputSignIn);
    setErrFor(passInputSignIn, `Pleaze enter the password`);
  } else if (
    userData.some((v) => {
      return v.userEmail == emailValue && v.userPass != passValue;
    })
  ) {
    setSuccessFor(emailInputSignIn);
    setErrFor(passInputSignIn, "Sorry, Invalid Password");
  } else if (
    userData.some((v) => {
      userName = v.userName;
      return v.userEmail == emailValue && v.userPass == passValue;
    })
  ) {
    localStorage.setItem("userName", JSON.stringify(userName));
    location.href = "profile.html";
    clearSignInInputs();
  }
}

function clearSignInInputs() {
  emailInputSignIn.value = "";
  passInputSignIn.value = "";

  emailInputSignIn.parentElement.classList.remove("success");
  emailInputSignIn.parentElement.classList.remove("error");
  passInputSignIn.parentElement.classList.remove("success");
  passInputSignIn.parentElement.classList.remove("error");
}

okBtn.addEventListener("click", (e) => {
  let successReg = okBtn.parentElement.parentElement;
  successReg.style.display = "none";
});
