function toggle_on() {
  var menu_icon = document.getElementById("menu-icon");
  menu_icon.style.visibility = "hidden";
  var close_icon = document.getElementById("close-icon");
  close_icon.style.visibility = "visible";
  var menu = document.getElementById("menu");
  menu.style.visibility = "visible";
  var body = document.getElementsByTagName("body")[0];
  body.style.padding = "0px";
}

function toggle_off() {
  var menu_icon = document.getElementById("menu-icon");
  menu_icon.style.visibility = "visible";
  var close_icon = document.getElementById("close-icon");
  close_icon.style.visibility = "hidden";
  var menu = document.getElementById("menu");
  menu.style.visibility = "hidden";
  var body = document.getElementsByTagName("body")[0];
  body.style.padding = "10px";
}