const clock = document.querySelector(".clock");

function getTime() {
  const date = new Date();

  let amPm = "AM";

  // let hours = String(date.getHours()).padStart(2, "0");
  let hours = date.getHours();

  if (hours >= 12) amPm = "PM";

  if (hours >= 13) {
    hours %= 12;
    // hours = hours % 12;
  }

  // let hours2 = date.getHours() >= 13 ? date.getHours() % 12 : date.getHours();

  hours = String(hours).padStart(2, "0");

  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}  ${amPm}`;
}

getTime();
setInterval(getTime, 1000);

const QUOTE_LIST = "quoteList";

function getQuotes() {
  const quotes = document.querySelector(".quotes");
  let savedQuotes = localStorage.getItem(QUOTE_LIST);

  if (!savedQuotes) {
    localStorage.setItem(QUOTE_LIST, JSON.stringify(["명언"]));

    savedQuotes = localStorage.getItem(QUOTE_LIST);
  }

  let parsedQuotes = JSON.parse(savedQuotes);

  quotes.innerText =
    parsedQuotes[Math.floor(Math.random() * parsedQuotes.length)];
}

getQuotes();

function onClickQuotes() {
  const quotes = document.querySelector(".quotes");
  const newQuote = document.querySelector(".new-quote");

  quotes.style.display = "none";
  newQuote.style.display = "block";
}

function onClickNewQuote() {
  const quotes = document.querySelector(".quotes");
  const newQuote = document.querySelector(".new-quote");
  const newQuoteInput = document.querySelector(".new-quote-input");

  if (!newQuoteInput.value) return;

  let savedQuotes = localStorage.getItem(QUOTE_LIST);
  let parsedQuotes = JSON.parse(savedQuotes);

  parsedQuotes.push(newQuoteInput.value);

  localStorage.setItem(QUOTE_LIST, JSON.stringify(parsedQuotes));

  quotes.innerText = newQuoteInput.value;
  newQuoteInput.value = "";

  quotes.style.display = "block";
  newQuote.style.display = "none";
}

async function getNft() {
  const nftImg = document.querySelector(".nft-img");
  const nftName = document.querySelector(".nft-name");
  const nftDesc = document.querySelector(".nft-desc");

  const response = await axios.get(
    "https://olbm.mypinata.cloud/ipfs/QmRorh39WMRCWapGfZbDiCWyFmTDhB4XxcQg2wgAb8VTiy"
  );

  nftImg.src = response.data.image;
  nftName.innerText = response.data.name;
  nftDesc.innerText = response.data.description;
}

getNft();
