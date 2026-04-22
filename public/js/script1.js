
    const navBtn = document.getElementById("adminHeaderNav");
    const navDropDown = document.getElementById("adminDropDown");

    navBtn.addEventListener("click", function() {
        const dropped = navDropDown.classList.toggle("showDropDown");
        if (dropped) {
            navBtn.setAttribute("class", "fa-solid fa-xmark")
        } else {
            navBtn.setAttribute("class", "fa-solid fa-bars")
        }
    })
