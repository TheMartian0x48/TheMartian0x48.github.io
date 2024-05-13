let rootQS = document.querySelector(":root");

if (sessionStorage.getItem("focusMode") == "disabled") {
  unsetFocusMode();
}

function setFocusMode() {
  sessionStorage.setItem("focusMode", "enabled");
  rootQS.style.setProperty("--gyp_bg", "#f5e8d5");
}

function unsetFocusMode() {
  sessionStorage.setItem("focusMode", "disabled");
  rootQS.style.setProperty("--gyp_bg", "#fff");
}

function toggleFocusMode() {
  if (sessionStorage.getItem("focusMode") == "enabled") {
    unsetFocusMode();
  } else {
    setFocusMode();
  }
}
