// Add your code here
document.addEventListener("DOMContentLoaded", function () {
  let main = document.querySelector("main");
  let section = document.createElement("section");
  let h1 = document.querySelector("h1");
  section.className = "container";
  main.appendChild(section);
  section.appendChild(h1);
  let img = document.createElement("img");
  img.className = "img";
  img.src = "../images/krishna.png";
  img.width = "200";
  img.alt = "Introduction picture of Krishna Karthik Chava.";
  section.appendChild(img);
  let p = document.createElement("p");
  p.className = "bio";
  p.textContent =
    " My name is Krishna Karthik Chava and I am a dedicated graduate student currently pursuing a Master's degree in Computer Science at PortlandState University, driven by a passion for exploring the realms of Computer Science.";
  section.appendChild(p);
  let sentences = p.textContent.split(". ");
  let firstSentenceSpan = document.createElement("span");
  firstSentenceSpan.className = "first-sentence";
  firstSentenceSpan.textContent = sentences[0] + ". ";
  p.textContent = "";
  p.appendChild(firstSentenceSpan);
  p.appendChild(document.createTextNode(sentences.slice(1).join(". ")));
});
