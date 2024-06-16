import { setupModalFunctionality, isModalOpenFunc } from './modal.js';

document.addEventListener("DOMContentLoaded", function () {
    // Scroll-related functionality
    const sections = document.querySelectorAll(".section");
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
    let currentSectionIndex = 2;
    let isScrolling = false;

    function activateSection(index) {
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
        if (isModalOpenFunc() || isScrolling) {
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
        }, 2500); // Adjust timeout duration as needed
    }

    function handleKeydown(event) {
        if (isModalOpenFunc()) {
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
        if (isModalOpenFunc()) {
            return;
        }
        this.touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (isModalOpenFunc() || !this.touchStartX) {
            return;
        }
        this.touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (isModalOpenFunc() || !this.touchStartX || !this.touchEndX) {
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

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    activateSection(currentSectionIndex);
    typeWriter(text, cmdCode);
});

// Typing effect function
function typeWriter(text, element) {
    let index = 0;
    const delay = 50;

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

// Setup modal functionality
setupModalFunctionality();
