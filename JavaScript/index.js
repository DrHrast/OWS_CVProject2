import { setupModalFunctionality, isModalOpenFunc } from './modal.js';

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const homeButton = document.getElementById("home-button-fixed");
    const text =
        "C:\\Users\\Petar> type about_me.txt\n\n" +
        ">>My name is Petar Huljek.\n\n" +
        ">> I am a world-renowned software engineer\n" +
        "With a Bachelor's degree in Computer Sciences\n" +
        "and Information Technologies.\n\n" +
        ">>In my many years of working experience,\n" +
        "I've had the opportunity to work at esteemed companies such as\n" +
        "Google, Amazon, and Facebook.\n\n" +
        ">> During this time, I honed my skills in various technologies including\n" +
        "> - C# with .NET framework\n" +
        "> - C++, and Windows API.\n" +
        "> - Gained expertise in data sciences\n" +
        "> - Dabbled in frontend development.\n\n" +
        ">>After accumulating valuable experience\n" +
        "Next step was to embark on a journey of entrepreneurship.\n" +
        "Today, my company 'DrHrast Technologies'\n" +
        "stands at the forefront of the tech industry\n" +
        "pushing the boundaries of innovation.\n\n";
    const cmdCode = document.getElementById("cmd-code");
    let currentSectionIndex = 0;
    let isScrolling = false;

    
    homeButton.addEventListener('click', (event) => {
        currentSectionIndex = 0;
        activateSection(currentSectionIndex);
    })

    function activateSection(index) {
        if (index === 0) {
            homeButton.classList.add("hide");
        }
        else {
            homeButton.classList.remove("hide");
        }
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
        document.querySelector(".container").style.transform = `translateX(-${
            index * 100
        }vw)`;
    }

    function handleScroll(event) {
        if (isModalOpenFunc() || isScrolling || window.innerWidth <= 768) {
            return;
        }

        isScrolling = true;

        if (event.deltaY > 0) {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                activateSection(currentSectionIndex);
            }
        } else {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                activateSection(currentSectionIndex);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    function handleKeydown(event) {
        if (isModalOpenFunc() || window.innerWidth <= 768) {
            return;
        }
        if (event.key === "ArrowRight") {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                activateSection(currentSectionIndex);
            }
        } else if (event.key === "ArrowLeft") {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                activateSection(currentSectionIndex);
            }
        }
    }

    function handleTouchStart(event) {
        if (isModalOpenFunc() || window.innerWidth <= 768) {
            return;
        }
        this.touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (isModalOpenFunc() || !this.touchStartX || window.innerWidth <= 768) {
            return;
        }
        this.touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (isModalOpenFunc() || !this.touchStartX || !this.touchEndX || window.innerWidth <= 768) {
            return;
        }
        const threshold = 50;
        if (this.touchStartX - this.touchEndX > threshold) {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                activateSection(currentSectionIndex);
            }
        } else if (this.touchEndX - this.touchStartX > threshold) {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                activateSection(currentSectionIndex);
            }
        }
        this.touchStartX = null;
        this.touchEndX = null;
    }

    function isSmallScreen() {
        return window.innerWidth <= 768;
    }

    function toggleScrollHandling() {
        if (isSmallScreen()) {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        } else {
            window.addEventListener("wheel", handleScroll);
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
        }
    }

    window.addEventListener("resize", toggleScrollHandling);
    toggleScrollHandling();

    activateSection(currentSectionIndex);
    typeWriter(text, cmdCode);
});

// Type writer effect
function typeWriter(text, element) {
    let index = 0;
    const delay = 10;

    function type() {
        if (index < text.length) {
            if (text.charAt(index) === "\n") {
                element.innerHTML += "<br>";
                index++;
            } else {
                element.innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(type, delay);
        }
    }
    type();
}

setupModalFunctionality();
