{
    const button = document.getElementById("goBack");

    button.addEventListener("click", () => {
        window.history.back();
    })
}
    function disableSubmitButton() {
        document.querySelector("form button").disabled = true;
    }

    function disableDateSubmitButton() {
        document.querySelector("#dateForm button").disabled = true;
    }

    function disableSearchSubmitButton() {
        document.querySelector("#searchForm button").disabled = true;
    }


{
    const button = document.querySelectorAll(".public-blogs article button");
    const title = document.querySelectorAll(".public-blogs article h2");
    const content = document.querySelectorAll(".public-blogs article p");
    const blog = document.querySelectorAll(".public-blogs article");
    const image = document.querySelectorAll(".public-blogs article img");

    button.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            const c = content[index]
            const b = blog[index]
            const i = image[index]
            const t = title[index]

            
                if (c.classList.toggle("show")) {
                    btn.innerHTML = "done reading";

                    b.style.margin = "0 0 3rem";
                    b.style.border = "none";
                    i.style.borderRadius = "0";
                    i.style.height = "250px";
                    t.style.display = "block";
        
                } else {
                    btn.innerHTML = "continue reading";

                    b.style.margin = "0rem 1rem 2rem";
                    b.style.borderWidth = "1.5px 0 1.5px";
                    b.style.borderColor = "black";
                    b.style.borderStyle = "solid";
                    i.style.borderRadius = "5px";
                    i.style.height = "180px";
                    t.style.display = "";
                }
        })
    })
}

    function homepage() {
        window.location.href = "/";
    }

{
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("manageDate").value = today;
}