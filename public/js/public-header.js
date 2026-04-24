const header = document.querySelector("header");
const main = document.querySelector("main");
const nav = document.querySelector(".public-blogs > nav");
const formHeader = document.getElementById("formsHeader");
const artHeader = document.getElementById("artHeader");
    window.addEventListener("scroll", function() {
            if (window.scrollY > 0) {
                header.style.position = "fixed";
                header.style.top = "0";
                header.style.width = "100%";
                header.style.zIndex = "60"
                main.style.marginTop = "3.5rem";

                if (window.scrollY > 100) {
                  formHeader.style.display = "block";
                  artHeader.style.display = "none";
                }
            } else {
                header.style.position = "";
                main.style.marginTop = "";
                header.style.width = "";
                header.style.zIndex = "";
                formHeader.style.display = "";
                artHeader.style.display = "";
            }

    })