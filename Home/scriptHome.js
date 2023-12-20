document.addEventListener("DOMContentLoaded", () => {
    // Attach click event listeners to navigation links
    document.querySelectorAll(".project-nav a").forEach((link) => {
        link.addEventListener("click", function (event) {
            // Prevent default link behavior
            event.preventDefault();

            // Get the href attribute of the clicked link
            const href = this.getAttribute("href");

            // Load the content from the href and display it in the main-content div
            if (href.startsWith("/Home/")) {
                // Checks if the href is a path to a file
                fetch(href)
                    .then((response) => response.text())
                    .then((html) => {
                        document.getElementById("main-content").innerHTML =
                            html;
                    })
                    .catch((error) =>
                        console.error("Error loading content:", error)
                    );

                // Extract the section name from the URL
                const folderName = href.split("/")[2];
                const sectionName = href.split("/").pop().split(".").shift();
                updateNavigationBasedOnNavType(sectionName, folderName);
            } else {
                // Handle internal page anchors (like #Decomposition, #Analogie, etc.)
                document.getElementById(
                    "main-content"
                ).innerHTML = `<h2>${this.textContent}</h2><p>Content for ${this.textContent}...</p>`;
            }
        });
    });
});

// Define the navigation structure
const empathyNavigation = [
    { name: "empathy", url: "/Home/Empathy/empathy.html" },
    { name: "problem1", url: "/Home/Empathy/problem1.html" },
    { name: "problem2", url: "/Home/Empathy/problem2.html" },
    { name: "solution1", url: "/Home/Empathy/solution1.html" },
    { name: "solution2", url: "/Home/Empathy/solution2.html" },
];

const decompositionNavigation = [
    { name: "ideas", url: "/Home/Decomposition/ideas.html" },
    { name: "final product", url: "/Home/Decomposition/final.html" },
];


const contextNavigation = [
    { name: "cairo", url: "/Home/Context/cairo.html" },
    { name: "redBricks", url: "/Home/Context/redBricks.html" },
    { name: "hirschhornBubble", url: "/Home/Context/hirschhornBubble.html" },
    { name: "carroofs", url: "/Home/Context/carroofs.html" },
];

const blendNavigation = [
    { name: "gurzelen", url: "/Home/Blend/gurzelen.html" },
    { name: "collage", url: "/Home/Blend/collage.html" },
    { name: "blend", url: "/Home/Blend/blend.html" },
];

const styleNavigation = [
    { name: "trachestomyTube", url: "/Home/Style/trachestomyTube.html" },
    { name: "problemspace", url: "/Home/Style/problemspace.html" },
    { name: "solutionspace", url: "/Home/Style/solutionspace.html" },
];


function updateNavigationBasedOnNavType(sectionName, folderName) {
    let navigationArray;
    switch (folderName) {
        case "Empathy":
            navigationArray = empathyNavigation;
            break;
        case "Decomposition":
            navigationArray = decompositionNavigation;
            break;
        case "Style":
            navigationArray = styleNavigation;
            break;
        case "Context":
            navigationArray = contextNavigation;
            break;
        case "Blend":
            navigationArray = blendNavigation;
            break;
        // Add more cases for other navigation types
    }
    updateNavigation(sectionName, navigationArray);
}

// Function to update navigation based on current subsection
function updateNavigation(currentSectionName, navigationArray) {
    const observer = new MutationObserver((mutations, obs) => {
        const leftButton = document.getElementById("left-button");
        const rightButton = document.getElementById("right-button");
        const currentIndex = navigationArray.findIndex(
            (section) => section.name == currentSectionName
        );
        prevSection = navigationArray[currentIndex - 1];
        nextSection = navigationArray[currentIndex + 1];

        if (leftButton && rightButton) {
            obs.disconnect(); // Stop observing once elements are found

            if (prevSection) {
                document.getElementById("left-button").style.display = "block";
                document.getElementById("left-button").onclick = () => {
                    fetch(prevSection.url)
                        .then((response) => response.text())
                        .then((html) => {
                            document.getElementById("main-content").innerHTML =
                                html;
                        })
                        .catch((error) =>
                            console.error("Error loading content:", error)
                        );
                    updateNavigation(prevSection.name, navigationArray);
                };
            } else {
                document.getElementById("left-button").style.display = "none";
            }

            if (nextSection) {
                document.getElementById("right-button").style.display = "block";
                document.getElementById("right-button").onclick = () => {
                    fetch(nextSection.url)
                        .then((response) => response.text())
                        .then((html) => {
                            document.getElementById("main-content").innerHTML =
                                html;
                        })
                        .catch((error) =>
                            console.error("Error loading content:", error)
                        );
                    updateNavigation(nextSection.name, navigationArray);
                };
            } else {
                document.getElementById("right-button").style.display = "none";
            }
        }
    });

    observer.observe(document.body, {
        childList: true, // Observe direct children
        subtree: true, // Observe all descendants
        attributes: true, // Do not observe attribute changes
    });
}
