const header = document.querySelector("header");
const h1 = document.querySelector("main.info > h1");
const main = document.querySelector("main.info");
    window.addEventListener("scroll", function() {
            if (window.scrollY > 0) {
                header.style.position = "fixed";
                header.style.width = "100%";
                header.style.top = "0";
                h1.style.position = "fixed";
                h1.style.right = "0.5rem";
                h1.style.backgroundColor = "black";
                h1.style.margin = "0";
                h1.style.borderRadius = "3px";
                h1.style.top = "0.5rem";
                main.style.marginTop = "2rem";
            } else {
                header.style.position = "";
                h1.style.position = "";
                h1.style.margin = "";
                h1.style.width = "";
                h1.style.borderRadius = "";
                h1.style.backgroundColor = "";
                h1.style.margin = "";
                main.style.marginTop = "";
            }

    })