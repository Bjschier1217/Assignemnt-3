// Select elements
const input = document.querySelector("#hex-input");
const addBtn = document.querySelector("#add-btn");
const paletteGrid = document.querySelector("#palette-grid");
const errorMsg = document.querySelector("#error-msg");
const countDisplay = document.querySelector("#swatch-count");

// Regex for valid hex (# + 6 hex chars)
const hexRegex = /^#[0-9A-Fa-f]{6}$/;

// Add color function
function addColor() {
    const value = input.value.trim();

    // Validate input
    if (!hexRegex.test(value)) {
        errorMsg.textContent = "Please enter a valid hex color (e.g. #FF5733)";
        return;
    }

    // Clear error
    errorMsg.textContent = "";

    // Create swatch div
    const swatch = document.createElement("div");
    swatch.classList.add("swatch");
    swatch.style.backgroundColor = value;

    // Create label
    const label = document.createElement("span");
    label.textContent = value;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-btn");

    // Delete functionality
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent toggle click
        swatch.remove();
        updateCount();
    });

    // Toggle selected
    swatch.addEventListener("click", () => {
        swatch.classList.toggle("selected");
    });

    // Build structure
    swatch.appendChild(label);
    swatch.appendChild(deleteBtn);
    paletteGrid.appendChild(swatch);

    // Clear input
    input.value = "";

    // Update counter
    updateCount();
}

// Update counter
function updateCount() {
    const count = document.querySelectorAll(".swatch").length;
    countDisplay.textContent = count;
}

// Button click
addBtn.addEventListener("click", addColor);

// Enter key support
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addColor();
    }
});