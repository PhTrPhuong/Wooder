// ------
/* LOADING PAGE */
function loadPage() {
    let body = document.querySelector("body"),
        imgs = document.querySelectorAll("img").length;

    let loadedCount = 0;

    new imagesLoaded(body)
        .on("progress", () => {
            loadedCount++;
            percent = Math.floor((loadedCount / imgs) * 100);
            handleLoading(percent);
        })
        .on("done", () => {
            // console.log("done");
            hideLoading();
        });

    function handleLoading(percent) {
        const progress = document.querySelector(".loading .progressbar__inner"),
            textPercent = document.querySelector(".loading .loading__percent");

        progress.style.width = `${percent}%`;
        textPercent.innerHTML = `${percent}%`;
    }

    function hideLoading() {
        let loading = document.querySelector(".loading");
        loading.classList.add("--hide");

        document.body.classList.remove("--disable-scroll");
    }
}
loadPage();

// ------
/* MOUSE MOVE */
function mouseMove(e) {
    const mouse = document.querySelector(".mouse");
    let xCoord = e.clientX - mouse.clientWidth / 2;
    let yCoord = e.clientY - mouse.clientHeight / 2;
    mouse.style.transform = `translate(${xCoord}px, ${yCoord}px)`;

    function mouseOver() {
        mouse.classList.add("--hover");
    }
    function mouseOut() {
        mouse.classList.remove("--hover");
    }

    const videos = document.querySelectorAll(".scvideos .circle");
    videos.forEach(function (item) {
        item.addEventListener("mouseover", mouseOver);
        item.addEventListener("mouseout", mouseOut);
    });

    const gallerys = document.querySelectorAll(".scgallery .imgwrap");
    gallerys.forEach(function (item) {
        item.addEventListener("mouseover", mouseOver);
        item.addEventListener("mouseout", mouseOut);
    });

    document
        .querySelector(".scwatch #mouse-hover")
        .addEventListener("mouseover", mouseOver);
    document
        .querySelector(".scwatch #mouse-hover")
        .addEventListener("mouseout", mouseOut);
}
window.addEventListener("mousemove", mouseMove);

// ------
/* PROGRESS BAR ON SCROLL */
const progressBar = () => {
    let progress = document.querySelector(".progressbar-scroll");
    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        let height = document.body.offsetHeight - window.innerHeight;
        let percent = Number(scrollY / height) * 100;
        progress.style.width = percent + "%";
    });
};
window.addEventListener("load", progressBar);

// ------
/* BACK TO TOP */
function clickBackToTop() {
    const btn = document.querySelector(".footer__btn");
    btn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}
clickBackToTop();

// ------
/* HEADER SCROLLING - change background */
function changeBgHeader() {
    const header = document.querySelector(".header");
    let scrollY = window.scrollY;

    if (scrollY > header.clientHeight) {
        header.classList.add("--bg-black");
    } else {
        header.classList.remove("--bg-black");
    }
}
window.addEventListener("scroll", changeBgHeader);

// ------
/* HANDLE SELECT LANG */
function handleLang() {
    const lang = document.querySelector(".header__right-lang"),
        langItems = lang.querySelectorAll(".dropdown li"),
        langCurrent = lang.querySelector(".current .current__text");

    lang.addEventListener("click", (e) => {
        e.stopPropagation();
        lang.classList.toggle("--show");
    });

    langItems.forEach((item) => {
        item.addEventListener("click", () => {
            let langText = item.textContent;
            let langCurrentPrev = langCurrent.textContent;
            langCurrent.innerHTML = langText;
            item.innerHTML = langCurrentPrev;
        });
    });

    document.addEventListener("click", () => {
        lang.classList.remove("--show");
    });
}
handleLang();

// ------
/* TABS NEWS */
function handleTabsNews() {
    let tabs = document.querySelectorAll(".scnews__tabs-wrap li"),
        listNews = document.querySelectorAll(".scnews__list");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            // Hide all class Active of Tabs
            tabs.forEach(function (tab) {
                tab.classList.remove("--active");
            });
            // Add class active to Tab
            this.classList.add("--active");
            // Hide all news list
            listNews.forEach(function (newslist) {
                newslist.classList.remove("--show");
            });
            // Get ID with dataset
            let id = this.dataset.tabId;
            // Add class show to News list
            document
                .querySelector(".scnews__list-" + id)
                .classList.add("--show");
        });
    });
}
handleTabsNews();

// ------
/* HANDLE POPUP VIDEO */
function handleVideo() {
    const btnVideos = document.querySelectorAll(".scvideos .circle"),
        btnWatch = document.querySelector(".scwatch .btnwatch");

    const popupVideo = document.querySelector(".popup"),
        iframeVideo = popupVideo.querySelector("#iframe"),
        closeVideo = popupVideo.querySelector(".icon");

    function showPopup() {
        popupVideo.classList.add("--show");
        document.body.classList.add("--disable-scroll");
    }

    function closePopup() {
        popupVideo.classList.remove("--show");
        document.body.classList.remove("--disable-scroll");
        document.querySelector("#iframe").src = "";
        // iframeVideo.src = "";
    }

    /* --VIDEOs-- */
    btnVideos.forEach((item) => {
        item.addEventListener("click", () => {
            showPopup();

            // Get ID with dataset
            let id = item.dataset.videoId;
            // let id = item.getAttribute("data-video-id");
            document.querySelector("#iframe").src =
                "https://www.youtube.com/embed/" + id + "?autoplay=1";
        });
    });

    /* --WATCH VIDEO-- */
    btnWatch.addEventListener("click", (e) => {
        showPopup();
        // Get ID with getAttribute
        let id = e.target.getAttribute("data-video-id");
        iframeVideo.setAttribute(
            "src",
            `https://www.youtube.com/embed/${id}?autoplay=1`
        );
    });

    closeVideo.addEventListener("click", () => {
        closePopup();
    });

    popupVideo.addEventListener("click", () => {
        closePopup();
    });
}
handleVideo();

// ------
/* HANDLE ACCORDION */
function handleAccordion() {
    const accordions = document.querySelectorAll(".scaccordion .accordion");

    accordions.forEach(function (item, index) {
        item.addEventListener("click", function () {
            this.classList.toggle("--active");

            let answer = item.querySelector(".accordion__answer");
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

            removeActive(index);
        });
    });

    function removeActive(index1) {
        accordions.forEach((item2, index2) => {
            if (index1 != index2) {
                item2.classList.remove("--active");

                let answer = item2.querySelector(".accordion__answer");
                answer.style.maxHeight = null;
            }
        });
    }
}
handleAccordion();

// ------
/* NAV MENU MOBILE */
function menuMobile() {
    const header = document.querySelector(".header"),
        btnMenu = header.querySelector(".btnmenu"),
        logo = header.querySelector(".header__logo"),
        lang = header.querySelector(".header__right-lang"),
        menuMobile = document.querySelector(".menumobile");

    btnMenu.addEventListener("click", function () {
        this.classList.toggle("--active");
        menuMobile.classList.toggle("--show");
        document.body.classList.toggle("--disable-scroll");
        logo.classList.toggle("--hidden");
        lang.classList.toggle("--hidden");
        navLinksMobile();
    });

    function navLinksMobile() {
        const menuItemsMobile = document.querySelectorAll(
            ".menumobile ul li a"
        );

        menuItemsMobile.forEach((item) => {
            item.addEventListener("click", function (e) {
                hideNav();
                e.preventDefault();

                const attrHref = item.getAttribute("href");
                const heightHeader = document.querySelector("header");
                window.scrollTo({
                    top:
                        document.querySelector(attrHref).offsetTop -
                        heightHeader.offsetHeight,
                    behavior: "smooth",
                });
                removeActiveMenu();
                item.classList.add("--active");
            });
        });

        function removeActiveMenu() {
            menuItemsMobile.forEach(function (item) {
                item.classList.remove("--active");
            });
        }
    }

    function hideNav() {
        btnMenu.classList.remove("--active");
        menuMobile.classList.remove("--show");
        document.body.classList.remove("--disable-scroll");
        logo.classList.remove("--hidden");
        lang.classList.remove("--hidden");
    }

    window.addEventListener("resize", function () {
        let wWindow = window.innerWidth;
        if (wWindow > 991) {
            hideNav();
        }
    });
}
menuMobile();

// ------
/* SCROLL TO SECTION */
function scrollToSection() {
    const menuItems = document.querySelectorAll(".header .header__menu li a");
    const heightHeader = document.querySelector("header");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const attrHref = item.getAttribute("href");
            window.scrollTo({
                top:
                    document.querySelector(attrHref).offsetTop -
                    heightHeader.offsetHeight,
                behavior: "smooth",
            });

            removeActiveMenu();
            item.classList.add("--active");
        });
    });

    function removeActiveMenu() {
        menuItems.forEach(function (item) {
            item.classList.remove("--active");
        });
    }

    // active menu when scrolling
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", function () {
        sections.forEach(function (section, index) {
            let scrollY = window.scrollY,
                sectionTop = section.offsetTop - heightHeader.offsetHeight,
                sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                removeActiveMenu();
                menuItems[index].classList.add("--active");
            }
        });
    });
}
scrollToSection();

// ------
/* GALLERY */
Fancybox.bind('[data-fancybox="images"]', {
    Thumbs: {
        type: "classic",
    },
    Carousel: {
        infinite: true,
        // transition: "slide",
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev",
        },
    },
});

// ------
/* SLIDER HERO */
function handleSliderHero() {
    const flktySlider = new Flickity(".schero__slider", {
        //Options
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        wrapAround: true,
        pageDots: true,
        fade: true,
        on: {
            ready: function () {
                handleDotsSlider();
            },
            change: function (index) {
                handlePagingSlider(index);
            },
        },
    });

    // Controls
    let btnPrev = document.querySelector(".schero__bottom .--prev");
    let btnNext = document.querySelector(".schero__bottom .--next");
    btnPrev.addEventListener("click", function () {
        flktySlider.previous(true);
    });
    btnNext.addEventListener("click", function () {
        flktySlider.next(true);
    });

    // Dots
    function handleDotsSlider() {
        let dotsSlider = document.querySelector(".flickity-page-dots");
        let dotsSliderBottom = document.querySelector(".schero__bottom-paging");
        dotsSliderBottom.appendChild(dotsSlider);
    }

    // Paging
    function handlePagingSlider(index) {
        let number = document.querySelector(
            ".schero__bottom-paging .number__current"
        );
        number.innerHTML = (index + 1).toString().padStart(2, "0");
    }
}

// ------
/* SLIDER CAROUSEL */
function handleSliderCarousel() {
    const flktySlider = new Flickity(".sccarousel__imgs", {
        cellAlign: "left",
        contain: true,
        draggable: ">1",
        prevNextButtons: false,
        wrapAround: false,
        pageDots: false,
        freeScroll: true,
        imagesLoaded: true,
        on: {
            ready: function () {},
            change: function () {
                handleProgressbar();
            },
        },
    });

    function handleProgressbar() {
        flktySlider.on("scroll", function (progress) {
            progress = Math.max(0, Math.min(1, progress));
            percent = (progress * 100).toFixed();
            // console.log(percent);

            const progressBar = document.querySelector(
                ".sccarousel .progressbar__inner"
            );
            progressBar.style.width = `${percent}%`;
        });
    }
}

window.addEventListener("load", function () {
    handleSliderHero();
    handleSliderCarousel();
});

// ------
/* HANDLE MODAL SIGNUP */
function handleSignUp() {
    const btnSignUp = document.querySelector("#btnsignupjs"),
        btnSignUpMobile = document.querySelector("#btnsignupmobile"),
        modal = document.querySelector(".modal"),
        modalOverlay = document.querySelector(".modal__overlay"),
        closeIcon = document.querySelector(".iconclose");

    function showModal() {
        modal.classList.add("--show");
        document.body.classList.add("--disable-scroll");
    }

    function closeModal() {
        modal.classList.remove("--show");
        document.body.classList.remove("--disable-scroll");
    }

    btnSignUp.addEventListener("click", function () {
        showModal();
    });

    btnSignUpMobile.addEventListener("click", function () {
        showModal();
    });

    closeIcon.addEventListener("click", () => {
        closeModal();
    });
    modalOverlay.addEventListener("click", () => {
        closeModal();
    });
}
handleSignUp();

// ------
/* HANDLE VALIDATE FORM */
function validateForm() {
    const form = document.querySelector("#formwrapjs"),
        fullname = document.querySelector("#fullname"),
        email = document.querySelector("#email"),
        username = document.querySelector("#username"),
        password = document.querySelector("#password"),
        cfpassword = document.querySelector("#cfpassword"),
        confirm = document.querySelector("#confirm");

    const showPasswordBtn = document.querySelector("#showPsswd"),
        showCfPasswordBtn = document.querySelector("#showCfPsswd");

    function getParentInput(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // Handle error
    function handleError(input, texterr = "") {
        const parentInput = getParentInput(input, ".formgroup");
        let error = parentInput.querySelector(".formmessage");

        if (texterr != "") {
            //bao loi
            error.innerText = texterr;
            parentInput.classList.add("--invalid");
        } else {
            //xoa loi
            error.innerText = texterr;
            parentInput.classList.remove("--invalid");
        }
    }

    // is Username
    function isUsername(value) {
        const regexUsername = /^[a-z0-9]+$/;
        return regexUsername.test(value);
    }

    // is Password
    function isPassword(value) {
        const regexPassword =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        return regexPassword.test(value);
    }

    // is Email
    function isEmail(value) {
        const regexEmail = /\S+@\S+\.\S+/;
        return regexEmail.test(value);
    }

    function checkInputs() {
        let arrData = [];

        // Fullname
        const valueFullName = fullname.value.trim();
        if (valueFullName == "") {
            handleError(fullname, "Vui lòng nhập trường này");
            return false;
        } else {
            arrData.push(valueFullName);
            handleError(fullname);
        }

        // Email
        const valueEmail = email.value.trim();
        if (valueEmail == "") {
            handleError(email, "Vui lòng nhập trường này");
            return false;
        } else if (!isEmail(valueEmail)) {
            handleError(email, "Email không hợp lệ");
            return false;
        } else {
            arrData.push(valueEmail);
            handleError(email);
        }

        // Username
        const valueUsername = username.value.trim();
        if (valueUsername == "") {
            handleError(username, "Vui lòng nhập trường này");
            return false;
        } else if (!isUsername(valueUsername)) {
            handleError(
                username,
                "Tên đăng nhập không được có khoảng trắng và ký tự đặc biệt"
            );
            return false;
        } else {
            arrData.push(valueUsername);
            handleError(username);
        }

        // Password
        const valuePassword = password.value.trim();
        if (valuePassword == "") {
            handleError(password, "Vui lòng nhập trường này");
            return false;
        } else if (!isPassword(valuePassword)) {
            handleError(
                password,
                "Mật khẩu phải có ít nhất 6 ký tự, gồm ký tự đặc biệt và số"
            );
            return false;
        } else {
            arrData.push(valuePassword);
            handleError(password);
        }

        // confirm Password
        const valueCfPassword = cfpassword.value.trim();
        if (valueCfPassword == "") {
            handleError(cfpassword, "Vui lòng nhập trường này");
            return false;
        } else if (valuePassword != valueCfPassword) {
            handleError(cfpassword, "Mật khẩu không trùng khớp");
            return false;
        } else {
            arrData.push(valueCfPassword);
            handleError(cfpassword);
        }

        // Confirm
        if (!confirm.checked) {
            handleError(confirm, "Vui lòng chọn xác nhận");
            return false;
        } else {
            handleError(confirm);
        }

        return arrData;
    }

    // --- Submit Form
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const isChecked = checkInputs();
        if (isChecked != false) {
            // CALL API
            console.log(isChecked);
        } else {
            console.log("error");
        }
    });

    // --- Show Password
    function showPassword(e) {
        if (
            password.type === "password" &&
            (e.type !== "keydown" || e.code === "Enter")
        ) {
            password.type = "text";
            showPasswordBtn.querySelector(".showeyes").classList.remove("show");
            showPasswordBtn.querySelector(".showeyes").classList.add("hide");
            showPasswordBtn.querySelector(".hideeyes").classList.remove("hide");
            showPasswordBtn.querySelector(".hideeyes").classList.add("show");
        }
        if (
            cfpassword.type === "password" &&
            (e.type !== "keydown" || e.code === "Enter")
        ) {
            cfpassword.type = "text";
            showCfPasswordBtn
                .querySelector(".showeyes")
                .classList.remove("show");
            showCfPasswordBtn.querySelector(".showeyes").classList.add("hide");
            showCfPasswordBtn
                .querySelector(".hideeyes")
                .classList.remove("hide");
            showCfPasswordBtn.querySelector(".hideeyes").classList.add("show");
        }
    }

    function hidePassword(e) {
        if (
            password.type !== "password" &&
            (e.type !== "keyup" || e.code == "Enter")
        ) {
            password.type = "password";
            showPasswordBtn.querySelector(".showeyes").classList.add("show");
            showPasswordBtn.querySelector(".showeyes").classList.remove("hide");
            showPasswordBtn.querySelector(".hideeyes").classList.add("hide");
            showPasswordBtn.querySelector(".hideeyes").classList.remove("show");
        }
        if (
            cfpassword.type !== "password" &&
            (e.type !== "keyup" || e.code == "Enter")
        ) {
            cfpassword.type = "password";
            showCfPasswordBtn.querySelector(".showeyes").classList.add("show");
            showCfPasswordBtn
                .querySelector(".showeyes")
                .classList.remove("hide");
            showCfPasswordBtn.querySelector(".hideeyes").classList.add("hide");
            showCfPasswordBtn
                .querySelector(".hideeyes")
                .classList.remove("show");
        }
    }

    // Mouse events:
    showPasswordBtn.addEventListener("mousedown", showPassword);
    document.addEventListener("mouseup", hidePassword);
    // Touch events (touch screens):
    showPasswordBtn.addEventListener("touchstart", showPassword);
    document.addEventListener("touchend", hidePassword);
    // Key events (keyboard navigation):
    showPasswordBtn.addEventListener("keydown", showPassword);
    document.addEventListener("keyup", hidePassword);

    // Mouse events:
    showCfPasswordBtn.addEventListener("mousedown", showPassword);
    document.addEventListener("mouseup", hidePassword);
    // Touch events (touch screens):
    showCfPasswordBtn.addEventListener("touchstart", showPassword);
    document.addEventListener("touchend", hidePassword);
    // Key events (keyboard navigation):
    showCfPasswordBtn.addEventListener("keydown", showPassword);
    document.addEventListener("keyup", hidePassword);
}
validateForm();
