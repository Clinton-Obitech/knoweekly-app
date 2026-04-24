const header = document.querySelector("header");
const main = document.querySelector("main");
const nav = document.querySelector(".public-blogs > nav");
    window.addEventListener("scroll", function() {
            if (window.scrollY > 0) {
                header.style.position = "fixed";
                header.style.top = "0";
                header.style.width = "100%";
                main.style.marginTop = "3.5rem";
            } else {
                header.style.position = "";
                main.style.marginTop = "";
                header.style.width = "";
            }

    })