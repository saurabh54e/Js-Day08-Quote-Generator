const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);

function updateThemeIcon() {
  themeToggle.innerText = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );

  updateThemeIcon();
});

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("new-quote");

const apiUrl = "https://thequoteshub.com/api/";

async function getQuote() {
  quote.innerText = "Loading...";
  author.innerText = "";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    quote.innerText = data.text;
    author.innerText = data.author;

  } catch (error) {
    quote.innerText = "Stay consistent, even when it's hard.";
    author.innerText = "You";
    console.log("Error:", error);
  }
}

// button click
btn.addEventListener("click", getQuote);

// initial load
getQuote();

const copyBtn = document.getElementById("copy-quote");
copyBtn.addEventListener("click", () => {
  const text = `${quote.innerText}`;
  navigator.clipboard.writeText(text);
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = "Copy Quote";
    }, 2000);
});

