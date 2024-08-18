const form = document.querySelector("form");
const inputText = document.querySelector("#inpuText");
const resultText = document.querySelector("#result");
const btnSumbit = document.querySelector("#btnSubmit");

btnSumbit.addEventListener("click", (event) => {
  event.preventDefault();

  const text = inputText.value;
  console.log(text);

  if (text) {
    fetch("/spellcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        resultText.textContent = "Loading Your Text......";
        const correctText = replaceWithBestCandidate(data);
        console.log(correctText);

        resultText.textContent = `Your Correct Text: ${correctText}`;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    resultText.textContent = "Please Enter Your Text";
  }
});

// Function to replace text with best_candidate
function replaceWithBestCandidate(data) {
  let updatedText = data.original_text;

  data.corrections.forEach((correction) => {
    const { text, best_candidate } = correction;
    // Replace the text with the best_candidate
    updatedText = updatedText.replace(text, best_candidate);
  });

  return updatedText;
}
