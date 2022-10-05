const bannerContainer = document.getElementById("banner-container");

const loginContainer = document.getElementById("login-container");

slideIn(loginContainer);

function slideOut(element) {
  return new Promise((resolve) => {
    function callback() {
      element.style.display = "none";
      element.removeEventListener("animationend", callback);
      resolve();
    }
    element.style.animation = "slide-out .4s ease-in-out";
    element.addEventListener("animationend", callback);
  });
}

function slideIn(element) {
  function callback() {
    element.removeEventListener("animationend", callback);
    element.style.animation = "none";
  }
  element.style.display = "flex";
  element.style.animation = "slide-in 1s ease-in-out";
  element.addEventListener("animationend", callback);
}

function clientError(message) {
  const error = document.createElement("div");
  error.innerHTML = "<span class='material-icons' style='display:inline-block'>error</span>"+ message;
  error.className = "error";
  setTimeout(() => {
    error.style.animation = "hide-banner .6s ease-in-out";
    error.addEventListener("animationend", () => error.remove());
  }, 8000);
  bannerContainer.appendChild(error);
}

function clientSuccess(message) {
  const success = document.createElement("div");
  success.innerHTML = "<span class='material-icons' style='display:inline-block'>check</span>" + message;
  success.className = "success";
  setTimeout(() => {
    success.style.animation = "hide-banner .6s ease-in-out";
    success.addEventListener("animationend", () => success.remove());
  }, 3500);
  bannerContainer.appendChild(success);
}