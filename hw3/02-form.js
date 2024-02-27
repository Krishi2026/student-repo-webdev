// Add your code here
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let allFieldsValid = true;
    let formattedDate = "";
    for (const [key, value] of formData.entries()) {
      if (key === "dob") {
        const dobValue = formData.get("dob");
        formattedDate = formatDateString(dobValue);
      } else if (value.trim() === "") {
        alert(`${key} cannot be empty or just whitespace.`);
        allFieldsValid = false;
        break;
      }
    }
    if (allFieldsValid) {
      console.group("========= Form Submission =========");
      console.log(`name: ${formData.get("name")}`);
      console.log(`username: ${formData.get("username")}`);
      console.log(`email: ${formData.get("email")}`);
      console.log(`Date of Birth: ${formattedDate}`);
      console.log(`pronouns: ${formData.get("pronouns")}`);
      console.groupEnd();
    }
  });
});

function formatDateString(dob) {
  const [year, month, day] = dob.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(year, month - 1, day);
  const formattedMonth = monthNames[date.getMonth()];
  return `${formattedMonth} ${date.getDate()}, ${date.getFullYear()}`;
}
