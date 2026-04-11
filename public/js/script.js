{
    //go back to previous page
    const button = document.getElementById("goBack");

    button.addEventListener("click", () => {
        window.history.back();
    })
}

{
    function disableSubmitButton() {
        document.querySelector("form button").disabled = true;
    }
}

{
    const button = document.querySelectorAll(".public-blogs article button");
    const content = document.querySelectorAll(".public-blogs article p");
    const blog = document.querySelectorAll(".public-blogs article");

    button.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            const c = content[index]
            const b = blog[index]

            
                if (c.classList.toggle("show")) {
                    btn.innerHTML = "done reading";

                    b.style.margin = "0 0 3rem";
                    b.style.border = "none";
        
                } else {
                    btn.innerHTML = "continue reading";

                    b.style.margin = "0rem 1rem 2rem";
                    b.style.borderWidth = "1.5px 0 1.5px";
                    b.style.borderColor = "black";
                    b.style.borderStyle = "solid";
                }
        })
    })
}

{
    function homepage() {
        window.location.href = "/";
    }
}