document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const text =
    "C:\\Users\\Petar> type about_me.txt`\n\n" +
    ">>My name is Petar Huljek.\n\n" +
    ">> I am a world renowned software engineer\n" +
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
  }

  window.addEventListener("wheel", handleScroll);

  activateSection(currentSectionIndex);
  typeWritter(text, cmdCode);
});

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Perform form submission logic (e.g., AJAX request)
    console.log("Form submitted:", { name, email, subject, message });
  });

function typeWritter(text, element) {
  let index = 0;
  const delay = 0;

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
