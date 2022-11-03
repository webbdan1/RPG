

// Getting the DOM Elements
const resultDOM = document.getElementById("result");
//const copybtnDOM = document.getElementById("copy");
const lengthDOM = document.getElementById("length");
const lowercaseDOM = document.getElementById("enableLowercase");
const uppercaseDOM = document.getElementById("enableUppercase");
const numbersDOM = document.getElementById("enableDigits");
const specialsDOM = document.getElementById("enableSpecial");
const generatebtn = document.getElementById("generate");
const form = document.getElementById("passwordGeneratorForm");

//copybtnDOM.addEventListener("click", () => {
//  const textarea = document.createElement("textarea");
//  const passwordToCopy = resultDOM.innerText;
//  // A Case when Password is Empty
//  if (!passwordToCopy) return;
//  // Copy Functionality
//  textarea.value = passwordToCopy;
//  document.body.appendChild(textarea);
//  textarea.select();
//  document.execCommand("copy");
//  textarea.remove();
//  alert("Password Copied to Clipboard");
//  resultDOM.innerText = "Password Copied to Clipboard";
//});


 form.addEventListener("submit",async (e) => {
    e.preventDefault();

    if (document.getElementById("copy-message")){
        oldCopyMessage = document.getElementById("copy-message");
        oldCopyMessage.parentNode.removeChild(oldCopyMessage);
    }
    const characterAmount = lengthDOM.value;
    const includeUppercase = uppercaseDOM.checked;
    const includeLowercase = lowercaseDOM.checked;
    const includeDigits = numbersDOM.checked;
    const includeSpecial = specialsDOM.checked;

    const url = '/_calculate'; // the URL to send the HTTP request to
    const body = JSON.stringify({enableUppercase :  includeUppercase,
                                 enableLowercase :  includeLowercase,
                                 enableDigits : includeDigits,
                                 enableSpecial : includeSpecial,
                                 length : characterAmount}); // whatever you want to send in the body of the HTTP request
    const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
    const method = 'POST';
    const response = await fetch(url, { method, body, headers });
    const data = await response.text(); // or response.json() if your server returns JSON
    console.log(data)
    resultDOM.innerText = data


    const textarea = document.createElement("textarea");
    const passwordToCopy = resultDOM.innerText;
    // A Case when Password is Empty
    if (!passwordToCopy) return;
    // Copy Functionality
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    // create label
    const label = document.createElement("label");
    label.setAttribute("id", "copy-message");
    label.setAttribute("type", "text");
    label.innerHTML = "Copied to clipboard";

    // insert label
    document.body.appendChild(label);
});