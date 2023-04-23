const searchForm = document.querySelector("#search-form");

const SpeechRecognition = window.webkitSpeechRecognition;

// const checkCompatibility = () => {
//   if(SpeechRecognition)return true;
//   return false;
// }


if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  // recognition.lang = "hi-IN"

  
  recognition.continuous = true;
  const micButton = searchForm.querySelector("button");
  const micIcon = micButton.firstElementChild;
  micButton.addEventListener("click", (e) => {
    // console.log(e);
    e.preventDefault();
    if (micIcon.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  recognition.addEventListener("start", (e) => {
    console.log("Start Speech Recognition");
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
  });

  recognition.addEventListener("end", (e) => {
    console.log("Stop Speech Recognition");
    micIcon.classList.add("fa-microphone");
    micIcon.classList.remove("fa-microphone-slash");
  });

  recognition.addEventListener("result", (e) => {
    // console.log(e);

    const detectedText= e.results[e.resultIndex][0].transcript;
    const instruction = detectedText.toLowerCase().trim(); 
    
    if(instruction === "stop recording"){
      searchForm.q.value = "";
      recognition.stop();
    }
    else if(!searchForm.q.value) {
      searchForm.q.value = detectedText;
    } else {
      if(detectedText === "go"){
        // searchForm.submit();
      } else if(detectedText === "reset input") {
        searchForm.q.value = "";
      }
      else {
        searchForm.q.value = detectedText;
      }
    }
    
    // searchForm.submit();
  });
} else {
  const button = searchForm.querySelector("button");
  button.remove();
  console.log("Speech Recognition Not Supported");
}


/**
 *
 * CLick on Mic Button -> recognition.start() -> Auto Fire 'start' event
 * -> starts recording your speech, until you stop ->
 * Once recording finishes -> Browser generates the results -> Auto Fire 'result' event -> Auto Fire 'end' event
 */
