let counter = 0
const log = console.log
//get the elements that we need to put the checked boxes in
let allBoxes = document.querySelectorAll(".feedback-box");
let feedbackbox = document.querySelector("#feedback-positive");

//add event listener to all checkboxes, on a click go to the function checkAllBoxes()
for (let i = 0; i < allBoxes.length; i++) {
     allBoxes[i].addEventListener("click", () => checkAllBoxes());
}

//get all the sections from the HTML
let sectionBoxes = document.querySelectorAll('.section-boxes')

//get the elements that we need to put the unchecked boxes in
let uncheckedFeedbackbox = document.querySelector("#feedback-negative")
let finishedButton = document.querySelector("#finished-button");
finishedButton.addEventListener("click", checkRemainingBoxes)

//get all the next and previous buttons and add event listeners to them
let nextButtons = document.querySelectorAll('.next-button')
let prevButtons = document.querySelectorAll('.previous-button')

//add event listeners for all the next and previous buttons. 
for (let i = 0; i < nextButtons.length; i++)  nextButtons[i].addEventListener("click", next);
for (let i = 0; i < prevButtons.length; i++)  prevButtons[i].addEventListener("click", previous);

//if the window loads, make only the first item visable
window.addEventListener("load", () => {
     for (let i = 1; i < sectionBoxes.length; i++) {
          sectionBoxes[i].style.display = 'none';
     }
})

//if the next button is clicked
function next(e) {
     //get the section where the button is clicked.
     let clickedElement = e.target.parentElement.parentElement;
     //loop through all the sections and find the one that is clicked.
     for (let i = 0; i < sectionBoxes.length; i++) {
          if (sectionBoxes[i] == clickedElement) {
               //make the next one visable. 
               clickedElement.style.display = 'none';
               sectionBoxes[i + 1].style.display = 'block';
          }
     }
}

//if the previous button is clicked
function previous(e) {
     //get the section where the button is clicked.
     let clickedElement = e.target.parentElement.parentElement;
     //loop through all the sections and find the one that is clicked.
     for (let i = 0; i < sectionBoxes.length; i++) {
          if (sectionBoxes[i] == clickedElement) {
               //make the previous one visable. 
               clickedElement.style.display = 'none';
               sectionBoxes[i - 1].style.display = 'block';

          }
     }
}

function checkAllBoxes() {
     //make variable that's going to hold the values of the boxes.
     let feedback = "";
     //loop through all boxes and check which ones are checked
     for (let i = 0; i < allBoxes.length; i++) {
          if (allBoxes[i].checked) {
               //get the checked box's label with the value.
               let div = allBoxes[i].parentElement;
               let label = div.querySelector("label");
               // place value in the feedback variable
               feedback += "✅ " + label.innerText + "<br>";
          }
     }
     //after the loop, place the feedback variable in the correct place
     feedbackbox.innerHTML = feedback
}

function checkRemainingBoxes() {
     createFormDiv()
     //make variable (empty) that's going to hold the values of the boxes.
     let unchecked = "";
     //loop through all boxes and check which ones are not checked
     for (let i = 0; i < allBoxes.length; i++) {
          if (!allBoxes[i].checked) {
               //get the unchecked box's label with the value.
               let div = allBoxes[i].parentElement;
               let label = div.querySelector("label");
               // place value in the feedback variable
               unchecked += "❌ " + label.innerText + "<br>";
          }
     }
     //after the loop, place the feedback variable in the correct place
     uncheckedFeedbackbox.innerHTML = unchecked
     createFormDiv()

}

function createFormDiv(){
     counter++
     if (counter == 1) {
     //make form where user can put in email 
     //with the set email call the function sendMail() with parameters. 
     const mailSection = document.querySelector('#mail-input-section')
     const mailInput = document.createElement('input')
     mailInput.setAttribute('placeholder', 'mail')
     const dataRight = document.querySelector('#feedback-positive')
     const dataWrong = document.querySelector('#feedback-negative')
     mailSection.appendChild(mailInput)
     const confirmbutton = document.createElement('input')
     confirmbutton.setAttribute('type', 'button')
     confirmbutton.setAttribute('value', 'Mail ')
     mailSection.appendChild(confirmbutton)

     //if the final button is pressed, send the mail. 
     confirmbutton.addEventListener('click', () => {
          sendMail(mailInput.value, dataWrong.innerText, dataRight.innerText)})
     }
}

function sendMail(mail, dataW, dataR) {
     
     const data = {
          email: mail, //needs to come from function call
          checkedBoxes: dataR,
          uncheckedBoxes: dataW
     }
     const options = {
          method : 'POST',
          body : JSON.stringify(data),
          headers: {
               'Content-Type': 'application/json'
          }
     }
     //contact the server, and give all the data to it. 
     fetch('http://localhost:8080/email', options) 
     .then(response => response.json()) 
     .then(data => console.log(data)) 
     .catch(err => console.error(err));
}