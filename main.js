"use strict";

var xName2 = "";
var xTagFunTrue = false;
var xTagMetaTrue = false;
var xTagUrgentTrue = false;
var dontJudgeMe = false;

//arrays to save all notes
var allNotesArray = [];

//hide and show functions
function hideDisplay(element) {
  element.classList.remove("visible");
  element.classList.add("hidden");
}

function showDisplay(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function toggleDisplay(element) {
  if (element.classList.contains("hidden")) {
    showDisplay(element)
  } else {
    hideDisplay(element)
  }
}

function hideVis(element) {
  element.style.visibility = "hidden";
}

function showVisi(element) {
  element.style.visibility = "visible";
}

// add event listener for menu buttons.
document.getElementById("new-note").addEventListener("click", newNoteWindowOpen);
document.getElementById("constr-close").addEventListener("click", newNoteWindowClose);
document.getElementById("logout-button").addEventListener("click", logout);

// When the page is laod
newNoteWindowClose();
logout();

// Note Window open
function newNoteWindowOpen() {
  showDisplay(document.getElementById("constr-new-note"));
}
// Note Window close
function newNoteWindowClose() {
  hideDisplay(document.getElementById("constr-new-note"));
}

/*gets information on note when user hits submit button. Sets al information to a new 
object "userNote" and pushes that to the AllUserNotes Array and sends note data to
MakeNewNote constructor*/
document.getElementById("constr-submit").addEventListener("click", getInputFromForm);

function getInputFromForm() {

  var userInputTitle = document.getElementById("constr-title").value;

  //get tags if it is select
  var htmlTags = document.querySelectorAll("[js-tag]");
  var userInputTags = [];
  htmlTags.forEach((item) => {
    var check = item.checked;
    if (check == true) {
      userInputTags.push(item.value);
    }
  });

  var userInputSubject = document.getElementById("constr-subject").value;

  var userInputDate = new Date();

  // create new note class
  var newNote = new Note(
    userInputTitle,
    userInputTags,
    userInputSubject,
    userInputDate
  );

  //save data
  allNotesArray.push(newNote);

  createNoteDiv(newNote);

  document.getElementById("constr-form").reset();
}
/* 
Constructor for notes.
All "ID's" have the note number added to them so that the constructor adds data to the correct note
*/
var startId = 1;

function Note(title, tags, subject, date) {
  this.title = title;
  this.tags = tags;
  this.subject = subject;
  this.date = date;

  this.replies = [];
  this.number = startId++;
  this.voteNumber = 0;
}

//Create new note here
function createNoteDiv(note) {

  note.tags.forEach((item) => {
    //changed to handle image tags
    switch (item) {
      case "F":
        xTagFunTrue = true;
        break;
      case "M":
        xTagMetaTrue = true;
        break;
      case "U":
        xTagUrgentTrue = true;
        break;
    }
  });

  var dateString = note.date.toLocaleDateString();

  /**number means level of div child from main-parent */
  //0. new element: main div wrapper
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "individualNote");
  newMainDiv.setAttribute("id", "new-main-div" + note.number);
  newMainDiv.setAttribute("js-noteDiv", note.number)
  document.getElementById("main-parent").appendChild(newMainDiv);

  //  1. new element changed innerhtml to createElement for security 
  var xTitle = document.createElement("div");
  xTitle.setAttribute("id", "new-title-div" + note.number);
  xTitle.setAttribute("class", "newNoteTopTitle");
  xTitle.textContent = note.title;
  document.getElementById("new-main-div" + note.number).appendChild(xTitle);

  //  1. first element inside note: subject
  var xSubject = document.createElement("div");
  xSubject.setAttribute("id", "new-subject-div" + note.number);
  xSubject.setAttribute("class", "subjectInNote");
  xSubject.textContent = note.subject;
  document.getElementById("new-main-div" + note.number).appendChild(xSubject);

  //  1. new vote div
  var newVoteDiv = document.createElement("DIV");
  newVoteDiv.setAttribute("id", "new-vote-div" + note.number);
  newVoteDiv.setAttribute("class", "voteDiv");
  document.getElementById("new-main-div" + note.number).appendChild(newVoteDiv);

  //    2. vote number
  var newVotetext = document.createElement("p");
  newVotetext.innerHTML = note.voteNumber;
  newVotetext.setAttribute("id", "vote-n-" + note.number);
  newVotetext.setAttribute("class", "voteNumber");
  newVotetext.setAttribute("js-noteVote", "")
  document.getElementById("new-vote-div" + note.number).appendChild(newVotetext);

  //    2. vote button
  var newVoteButton = document.createElement("input");
  newVoteButton.setAttribute("id", "vote-b-" + note.number);
  newVoteButton.setAttribute("js-access", "");
  newVoteButton.src = "upvote3.png";
  newVoteButton.type = "image";
  newVoteButton.setAttribute("class", "voteButton");
  document.getElementById("new-vote-div" + note.number).appendChild(newVoteButton);

  //  1. second element inside note: noteinfo wrapper div
  var xNoteinfo = document.createElement("div");
  xNoteinfo.setAttribute("id", "new-note-info-div" + note.number);
  xNoteinfo.setAttribute("class", "noteInfo");
  document.getElementById("new-main-div" + note.number).appendChild(xNoteinfo);

  //    2. NAME
  var xName = document.createElement("div");
  xName.setAttribute("id", "new-tags-div" + note.number);
  xName.setAttribute("class", "usernameMadenote");
  xName.textContent = xName2;
  document.getElementById("new-note-info-div" + note.number).appendChild(xName);

  //    2. DATE element inside noteinfo wrapper div
  var xDate = document.createElement("div");
  xDate.setAttribute("id", "new-date-div" + note.number);
  xDate.setAttribute("class", "dateInNote");
  xDate.textContent = dateString;
  document.getElementById("new-note-info-div" + note.number).appendChild(xDate);

  //  1. TAG element tagwrapper
  var tagWrapper = document.createElement("div");
  tagWrapper.setAttribute("id", "tagwrapper" + note.number);
  tagWrapper.setAttribute("class", "tagwrapper");
  document.getElementById("new-main-div" + note.number).appendChild(tagWrapper);

  //    2.TagFun
  var xTagFun = document.createElement("img");
  xTagFun.setAttribute("src", "fun10.png");
  xTagFun.setAttribute("class", "funloggaInNote");
  if (xTagFunTrue) {
    document.getElementById("tagwrapper" + note.number).appendChild(xTagFun);
    xTagFunTrue = false;
    dontJudgeMe = true;
  };

  //    2.TagMeta
  var xTagMeta = document.createElement("img");
  xTagMeta.setAttribute("src", "meta10.png");
  xTagMeta.setAttribute("class", "metaloggaInNote");
  if (xTagMetaTrue) {
    document.getElementById("tagwrapper" + note.number).appendChild(xTagMeta);
    xTagMetaTrue = false;
    dontJudgeMe = true;
  };

  //    2.TagUrgent
  var xTagUrgent = document.createElement("img");
  xTagUrgent.setAttribute("src", "urgent10.png");
  xTagUrgent.setAttribute("class", "urgentloggaInNote");
  if (xTagUrgentTrue) {
    document.getElementById("tagwrapper" + note.number).appendChild(xTagUrgent);
    xTagUrgentTrue = false;
    dontJudgeMe = true;
  };

  //    2. show Replys             
  var showReplyButton = document.createElement("input");
  showReplyButton.setAttribute("id", "ReplyButton" + note.number);
  showReplyButton.setAttribute("js-access", "");
  showReplyButton.src = "omegapog2.png";
  showReplyButton.type = "image";
  showReplyButton.setAttribute("class", "showReplyButton");
  document.getElementById("new-date-div" + note.number).appendChild(showReplyButton);

  //    2. comment numbers        
  var showCommentsNumbers = document.createElement("b");
  showCommentsNumbers.setAttribute("id", "commentNumbers" + note.number);
  showCommentsNumbers.setAttribute("class", "commentNumbers");
  showCommentsNumbers.innerText = "0 comments";
  document.getElementById("new-date-div" + note.number).appendChild(showCommentsNumbers);

  //  1. third element inside note: replay wrapper div
  var xReplyParent = document.createElement("div");
  xReplyParent.setAttribute("id", "new-reply-parent-div" + note.number);
  xReplyParent.setAttribute("class", "replyParent hidden");
  document.getElementById("new-main-div" + note.number).appendChild(xReplyParent);

  //    2. Reply button element
  var xReplyButton = document.createElement("button");
  xReplyButton.setAttribute("id", "new-title-reply-button" + note.number);
  xReplyButton.setAttribute("class", "replyButton");
  xReplyButton.innerText = "Reply";
  document.getElementById("new-reply-parent-div" + note.number).appendChild(xReplyButton);

  //    2. Reply textarea element
  var xReplyTextarea = document.createElement("textarea");
  xReplyTextarea.setAttribute("id", "new-title-reply-textarea" + note.number);
  xReplyTextarea.setAttribute("class", "replyTextarea");
  xReplyTextarea.setAttribute("maxlength", "100");
  document.getElementById("new-reply-parent-div" + note.number).appendChild(xReplyTextarea);

  //    2. Replay child element wrapper
  var xReplyChild = document.createElement("div");
  xReplyChild.setAttribute("id", "new-reply-child-div" + note.number);
  xReplyChild.setAttribute("class", "replyChild");
  document.getElementById("new-reply-parent-div" + note.number).appendChild(xReplyChild);

  //    2.
  if (dontJudgeMe) {
    document.getElementById("new-reply-parent-div" + note.number).style.top = "-220px";
    dontJudgeMe = false;
  }

  // setting eventlistener to reply button. Adds data from textfield to new div in reply parent div
  document.getElementById("new-title-reply-button" + note.number)
    .addEventListener("click", function () {
      var newReply = document.createElement("DIV");
      var userReplyText = document.getElementById("new-title-reply-textarea" + note.number).value;
      if (userReplyText == "") { } else {
        newReply.innerText = xName2 + " " + "said: " + userReplyText;
        document
          .getElementById("new-reply-child-div" + note.number)
          .prepend(newReply);
        //changed order tp push newest reply first  
        newReply.setAttribute("id", "reply-div" + note.number);
        newReply.setAttribute("class", "reply");
        document.getElementById("new-title-reply-textarea" + note.number).value = "";
        note.replies.push(userReplyText);
        //added comment counter
        document.getElementById("commentNumbers" + note.number).innerText = note.replies.length + " comments";
      }
    });

  //open replay window up or close..
  document.getElementById("ReplyButton" + note.number).addEventListener("click", function () {
    toggleDisplay(document.getElementById("new-reply-parent-div" + note.number));
  });

  //vote function
  document.getElementById("vote-b-" + note.number).addEventListener("click", () => {
    note.voteNumber++;
    document.getElementById("vote-n-" + note.number).innerHTML = note.voteNumber;
  });
}


/*******************  user login/account below *******************/

// this array stores all users
var userArray = [];

// add test users
userArray.push({
  username: "Emil",
  password: "123"
});
userArray.push({
  username: "Changzhou",
  password: "456"
});
userArray.push({
  username: "Marcus",
  password: "789"
});

// this div contains Login or Account forms
var accountDiv = document.getElementById("login-div");
var accountButton = document.getElementById("accountButton");

// opens or closes accountDiv
accountButton.addEventListener("click", function () {
  toggleDisplay(accountDiv)
});

//logout function
function logout() {
  // hide buttons
  var allButtons = document.querySelectorAll("[js-access]");
  allButtons.forEach(el => {
    hideVis(el)
  });

  var replyBoxes = document.querySelectorAll(".replyParent");
  replyBoxes.forEach(el => {
    hideDisplay(el)
  });

  showVisi(document.getElementById("accountButton"));

  newNoteWindowClose();

  document.getElementById("login-state").innerHTML = "Not logged in";
}

//login function
function login() {
  var allButtons = document.querySelectorAll("[js-access]");
  allButtons.forEach(el => {
    showVisi(el)
  });

  hideVis(accountButton);
  hideDisplay(accountDiv);
}

// Button to add user
document.getElementById("new-user").addEventListener("click", function () {
  new AddUser(
    document.getElementById("new-username").value,
    document.getElementById("new-password").value);
  document.getElementById("new-user-form").reset();
});

// Add new user to userArray
function AddUser(name, password) {

  var newUser = {
    username: name,
    password: password
  };

  if (name == "") {
    alert(
      "Username and/or password has no data. Enter new name and password to create account"
    );
  } else {
    userArray.push(newUser);
    alert("Welcome " + name + ". Go to login to use your new acount.");
  }
}

// shows Login/new user form in accountDiv
document.getElementById("user-login-button").addEventListener("click", () => {
  document.getElementById("new-user-form").reset();
  hideDisplay(document.getElementById("new-user-form"));
  showDisplay(document.getElementById("login-form"));
});

document.getElementById("new-user-button").addEventListener("click", () => {
  document.getElementById("login-form").reset();
  hideDisplay(document.getElementById("login-form"));
  showDisplay(document.getElementById("new-user-form"));
});

// login button
document.getElementById("user-login").addEventListener("click", function () {
  ValidateLogin(
    document.getElementById("login-username").value,
    document.getElementById("login-password").value);
});

// Validates username / password. Sens you eiter in to app or displays login failed
function ValidateLogin(name, pass) {

  var correct;
  for (var i = 0; i < userArray.length; i++) {
    if (name + pass == userArray[i].username + userArray[i].password) {
      correct = true;
    }
  }
  if (correct) {
    document.getElementById("login-form").reset();
    document.getElementById("login-state").innerHTML =
      name;
    xName2 = name;
    login();

  } else {
    document.getElementById("login-state").innerHTML =
      "Login failed. Try again.";
  }
}


//*******************Sort Function*************************/

var sortButton = document.getElementById("sortButton")
sortButton.addEventListener('click', sortNotes);

function sortNotes() {
  let notes = {
    divs: document.querySelectorAll("[js-noteDiv]"),
    vote: document.querySelectorAll("[js-noteVote]")
  }

  if (notes.divs.length > 0) {

    //Sort by vote
    if (sortButton.innerHTML == "Sort by vote") {
      let newOrder = []
      notes.vote.forEach((el) => newOrder.push(el.innerHTML))
      newOrder.sort((a, b) => a - b);
      newOrder.reverse();

      notes.divs.forEach((el) => document.getElementById("main-parent").removeChild(el))

      newOrder.forEach(n => {
        notes.vote.forEach((el, index) => {
          if (el.innerHTML == n) {
            document.getElementById("main-parent").appendChild(notes.divs[index]);
          }
        })
      })

      sortButton.innerHTML = "Sort by date"

      // sort by date
    } else {
      let newOrder = []
      notes.divs.forEach((el) => newOrder.push(el.getAttribute("js-noteDiv")))
      newOrder.sort((a, b) => a - b);

      notes.divs.forEach((el) => document.getElementById("main-parent").removeChild(el))

      newOrder.forEach(n => {
        notes.divs.forEach((el, index) => {
          if (el.getAttribute("js-noteDiv") == n) {
            document.getElementById("main-parent").appendChild(notes.divs[index]);
          }
        })
      })

      sortButton.innerHTML = "Sort by vote"

    }
  }
}