// navbar change color scrolled
const myNav = document.querySelector("nav");
const body = document.body;

body.addEventListener("scroll", () => {
  if (body.scrollTop > 80) {
    myNav.classList.add("nav-color");
  } else if (body.scrollTop < 80) {
    myNav.classList.remove("nav-color");
  }
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// navbar responsive
function navbarTop(x) {
  if (x.matches) {
    // If media query matches
    myNav.classList.add("fixed-top");
    myNav.classList.remove("sticky-top");
  } else {
    myNav.classList.remove("fixed-top");
    myNav.classList.add("sticky-top");
  }
}

var mobile = window.matchMedia(" (max-width: 992px)");
navbarTop(mobile); // Call listener function at run time
mobile.addListener(navbarTop); // Attach listener function on state changes

const navbarCollapse = document.querySelector(".navbar-collapse");
const navbarToggler = document.querySelector(".navbar-toggler");
navbarToggler.addEventListener("click", () => {
  if (navbarToggler.classList.contains("collapsed") && body.scrollTop < 150) {
    myNav.classList.remove("nav-color");
  } else {
    myNav.classList.add("nav-color");
  }
});

// tabs tutorial
var tabs = window.location.hash.split("#")[1];
if (tabs == "infoDetail1") {
  $("#v-pills-regis-tab").addClass("active");
  $("#v-pills-regis").addClass("show active");
} else if (tabs == "infoDetail2") {
  $("#v-pills-tambah").addClass("show active");
  $("#v-pills-tambah-tab").addClass("active");
} else if (tabs == "infoDetail3") {
  $("#v-pills-cara").addClass("show active");
  $("#v-pills-cara-tab").addClass("active");
} else {
  $("#opener").addClass("show active");
}

// hubungi kami nik dan no hp
// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    if (textbox) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    }
  });
}

setInputFilter(document.getElementById("nik"), function (value) {
  return /^-?\d*$/.test(value);
});
setInputFilter(document.getElementById("phone"), function (value) {
  return /^-?\d*$/.test(value);
});
