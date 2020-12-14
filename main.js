"use strict";
// Make newnote button and add properties.
var newNoteButton = document.getElementById("new-note");
newNoteButton.addEventListener("click", newNoteWindowOpen);
document
  .getElementById("constr-close")
  .addEventListener("click", newNoteWindowClose);
var logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", function () {
  logout();
});
//arrays to save all notes
var allNotesArray = [];
newNoteWindowClose();

logout();

// Note Window open
function newNoteWindowOpen() {
  document.getElementById("constr-new-note").style.visibility = "visible";
}
// Note Window close
function newNoteWindowClose() {
  document.getElementById("constr-new-note").style.visibility = "hidden";
}

/*gets information on note when user hits submit button. Sets al information to a new 
object "userNote" and pushes that to the AllUserNotes Array and sends note data to
MakeNewNote constructor*/
var submitButton = document.getElementById("constr-submit");
submitButton.addEventListener("click", function () {
  getInputFromForm();
});
function getInputFromForm() {
  var userInputTitle = document.getElementById("constr-title").value;
  //console.log(userInputTitle);

  //get tags if it is select
  var htmlTags = document.querySelectorAll("[js-tag]");
  var userInputTags = [];
  htmlTags.forEach((item) => {
    var check = item.checked;
    if (check == true) {
      userInputTags.push(item.value);
    }
  });
  //console.log(userInputTags);

  /*   var userInputTag1 = document.getElementById("constr-tag1").checked;
    console.log(userInputTag1);
    var userInputTag2 = document.getElementById("constr-tag2").checked;
    console.log(userInputTag2);
    var userInputTag3 = document.getElementById("constr-tag3").checked;
    console.log(userInputTag3); */

  var userInputSubject = document.getElementById("constr-subject").value;
  //console.log(userInputSubject);

  //var userInputDate = new Date().toDateString();
  var userInputDate = new Date();
  //console.log(userInputDate);

  /*   var userNote = [
      userInputTitle,
      userInputTag1,
      userInputTag2,
      userInputTag3,
      userInputSubject,
      userInputDate,
    ];
    allNotesArray.push(userNote);
    console.log(allNotesArray);
    var note1 = new MakeNewNote(
      userInputTitle,
      userInputTag1,
      userInputTag2,
      userInputTag3,
      userInputSubject,
      userInputDate
    ); */

  // create new note class
  var newNote = new Note(
    userInputTitle,
    userInputTags,
    userInputSubject,
    userInputDate
  );

  allNotesArray.push(newNote);
  console.log("allNotesArray: " + allNotesArray);

  createNoteDiv(newNote);

  document.getElementById("constr-form").reset();
  //newNoteWindowClose();
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
}

/* 
  function MakeNewNote(title, tag1, tag2, tag3, subject, date) {
  this.title = title;
  this.tag1 = tag1;
  this.tag2 = tag2;
  this.tag3 = tag3;
  this.subject = subject;
  this.date = date;
  var number = allNotesArray.length;
  //new element: main div
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "idividualNote");
  newMainDiv.setAttribute("id", "new-main-div" + number);
  document.getElementById("main-parent").appendChild(newMainDiv);
  // new element: subject div
  var newSubjectDiv = document.createElement("DIV");
  newSubjectDiv.setAttribute("id", "new-subject-div" + number);
  newSubjectDiv.innerHTML = subject;
  document.getElementById("new-main-div" + number).appendChild(newSubjectDiv);
  // new element: note info (contains "number", "title", "tags". "date" and "answer button")
  var newNoteInfoDiv = document.createElement("DIV");
  newNoteInfoDiv.setAttribute("class", "noteInfo");
  newNoteInfoDiv.setAttribute("id", "new-note-info-div" + number);
  document.getElementById("new-main-div" + number).appendChild(newNoteInfoDiv);
  // new element: number inside newNoteInfoDov
  var NewNoteNumber = document.createElement("DIV");
  NewNoteNumber.innerHTML = number;
  NewNoteNumber.setAttribute("class", "noteNumber");
  NewNoteNumber.setAttribute("id", "new-number-div" + number);
  document
    .getElementById("new-note-info-div" + number)
    .appendChild(NewNoteNumber);
  // new element: title inside newNoteInfoDiv
  var newTitleDiv = document.createElement("DIV");
  newTitleDiv.innerHTML = title;
  newTitleDiv.setAttribute("id", "new-title-div" + number);
  document
    .getElementById("new-note-info-div" + number)
    .appendChild(newTitleDiv);
  // new element: Date inside newNoteInfoDiv
  var newTitleDate = document.createElement("DIV");
  newTitleDate.innerHTML = date;
  newTitleDate.setAttribute("id", "new-date-div" + number);
  document
    .getElementById("new-note-info-div" + number)
    .appendChild(newTitleDate);
  // new element: tags inside newNoteInfoDiv
  var newtitleTags = document.createElement("DIV");
  newtitleTags.setAttribute("id", "new-tags-div" + number);
  document
    .getElementById("new-note-info-div" + number)
    .appendChild(newtitleTags);
  if (tag1 == true) {
    newtitleTags.appendChild(document.createTextNode("Fun "));
  }
  if (tag2 == true) {
    newtitleTags.appendChild(document.createTextNode("Serious "));
  }
  if (tag3 == true) {
    newtitleTags.appendChild(document.createTextNode("URGENT! "));
  }
  // new element: reply parent div
  var newReplyParentDiv = document.createElement("DIV");
  document
    .getElementById("new-main-div" + number)
    .appendChild(newReplyParentDiv);
  newReplyParentDiv.setAttribute("id", "new-reply-parent-div" + number);
  newReplyParentDiv.setAttribute("class", "replyParent");
  // new element: reply child div
  var newReplyChildDiv = document.createElement("DIV");
  document
    .getElementById("new-reply-parent-div" + number)
    .appendChild(newReplyChildDiv);
  newReplyChildDiv.setAttribute("id", "new-reply-child-div" + number);
  newReplyChildDiv.setAttribute("class", "replyChild");
  // new element: Reply Button inside reply form
  var newTitleReplyButton = document.createElement("BUTTON");
  var newTitleReplyButtonName = document.createTextNode("Reply");
  newTitleReplyButton.appendChild(newTitleReplyButtonName);
  newTitleReplyButton.setAttribute("id", "new-title-reply-button" + number);
  newTitleReplyButton.setAttribute("class", "replyButton");
  document
    .getElementById("new-reply-child-div" + number)
    .appendChild(newTitleReplyButton);
  // new element: Reply TEXTAREA inside reply form
  var newTitleReplyTextarea = document.createElement("TEXTAREA");
  newTitleReplyTextarea.setAttribute(
    "id",
    "new-title-reply-textarea" + number
  );
  newTitleReplyTextarea.setAttribute(
    "placeholder",
    "Write your reply here and press 'Reply'"
  );
  newTitleReplyTextarea.setAttribute("class", "replyTextarea");
  document
    .getElementById("new-reply-child-div" + number)
    .appendChild(newTitleReplyTextarea); 
    // setting eventlistener to reply button. Adds data from textfield to new div in reply parent div
  document
    .getElementById("new-title-reply-button" + number)
    .addEventListener("click", function () {
      var newReply = document.createElement("DIV");
      var userReplyText = document.getElementById("new-title-reply-textarea" + number)
        .value;
      newReply.innerHTML = userReplyText;
      document
        .getElementById("new-reply-parent-div" + number)
        .appendChild(newReply);
      newReply.setAttribute("id", "reply-div" + number);
      newReply.setAttribute("class", "reply");
      document.getElementById("new-title-reply-textarea" + number).value = "";
    });
  }
    */

function createNoteDiv(note) {
  var title = note.title;
  var tags = note.tags;
  var subject = note.subject;
  var date = note.date;
  var number = note.number;

  //create String to show
  var tagString = "";
  tags.forEach((item) => {
    tagString += item + " ";
  });

  var dateString = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  //new element: main div
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "idividualNote");
  newMainDiv.setAttribute("id", "new-main-div" + number);
  document.getElementById("main-parent").appendChild(newMainDiv);

  // new element: note info (contains "number", "title", "tags". "date" and "answer button")
  newMainDiv.innerHTML =
    "<div id='new-subject-div+number+" +
    number +
    "'>" +
    subject +
    "</div>" +
    "<div class='noteInfo' id='new-note-info-div" +
    number +
    "'>" +
    "<div class='noteNumber' id='new-number-div" +
    number +
    "'>" +
    number +
    "</div>" +
    "<div id='new-title-div" +
    number +
    "'>" +
    title +
    "</div>" +
    "<div id='new-date-div" +
    number +
    "'>" +
    dateString +
    "</div>" +
    "<div id='new-tags-div" +
    number +
    "'>" +
    tagString +
    "</div>" +
    "</div>" +
    "<div id='new-reply-parent-div" +
    number +
    "' class='replyParent'>" +
    "<div id='new-reply-child-div" +
    number +
    "' class='replyChild'>" +
    "<button id='new-title-reply-button" +
    number +
    "' class=replyButton>Reply</button>" +
    "<textarea id='new-title-reply-textarea" +
    number +
    "' placeholder='Write your reply here and press 'Reply'' class='replyTextarea'>" +
    "</textarea></div></div>";

  // setting eventlistener to reply button. Adds data from textfield to new div in reply parent div
  document
    .getElementById("new-title-reply-button" + number)
    .addEventListener("click", function () {
      var newReply = document.createElement("DIV");
      var userReplyText = document.getElementById(
        "new-title-reply-textarea" + number
      ).value;
      if (userReplyText == "") {
      } else {
        newReply.innerHTML = userReplyText;
        document
          .getElementById("new-reply-parent-div" + number)
          .appendChild(newReply);
        newReply.setAttribute("id", "reply-div" + number);
        newReply.setAttribute("class", "reply");
        document.getElementById("new-title-reply-textarea" + number).value = "";
        note.replies.push(userReplyText);
      }
    });
}

/*******************  user login/account below *******************/

// this array stores all users
var userArray = [];
userArray.push({ username: "Emil", password: "123" });
userArray.push({ username: "Changzhou", password: "456" });
userArray.push({ username: "Marcus", password: "789" });
// this div contains Login or Account forms
var accountDiv = document.getElementById("login-div");

// opens or closes accountDiv
accountDiv.innerHTML = ""; // sets initial value of login div to ""
document.getElementById("user-account").addEventListener("click", function () {
  if (accountDiv.innerHTML == "") {
    loginShow();
  } else {
    accountClose();
  }
});

//logout function
function logout() {
  newNoteButton.style.visibility = "hidden";
  logoutButton.style.visibility = "hidden";
  document.getElementById("login-state").innerHTML = "Not logged in";
  console.log(document.getElementsByClassName("replyChild"));
  if (allNotesArray.length > 0) {
    var i;
    for (i = 1; i <= allNotesArray.length; i++) {
      document.getElementById("new-reply-child-div"+i).style.visibility = "hidden";
    };
  }
  newNoteWindowClose();
}
//login function
function login() {
  newNoteButton.style.visibility = "visible";
  logoutButton.style.visibility = "visible";
  if (allNotesArray.length > 0) {
    var i;
    for (i = 1; i <= allNotesArray.length; i++) {
      document.getElementById("new-reply-child-div"+i).style.visibility = "visible";
    };
  }
}
// constructs user from username+password and sends user to userArray
function AddUser(name, password) {
  this.username = name;
  this.password = password;
  var newUser = { username: name, password: password };
  console.log("username; " + name);
  console.log("password; " + password);
  if (name == "") {
    alert(
      "Username and/or password has no data. Enter new name and password to create account"
    );
  } else {
    userArray.push(newUser);
    alert("Welcome " + name + ". Go to login to use your new acount.");
  }
}
// shows Login form in accountDiv
function loginShow() {
  accountDiv.innerHTML =
    "<button id=user-login-button>Login</button>" +
    "<button id=new-user-button>New Account</button>" +
    "<h4>Login</h4>" +
    "<p>Input username and and password to login.</p>" +
    "<form id=login-form>" +
    "<label for=login-usenamer>Username</label>" +
    "<input id=login-username type=text name=login-username placeholder=Input username>" +
    "<label for=login-password>Password</label>" +
    "<input id=login-password type=password name=login-password placeholder=Input password>" +
    "<input type=button id=user-login name=login-user value=Submit>" +
    "</form>";
  document
    .getElementById("user-login-button")
    .addEventListener("click", loginShow);
  document
    .getElementById("new-user-button")
    .addEventListener("click", newUserShow);
  var newLoginButton = document.getElementById("user-login");
  var loginUsername = document.getElementById("login-username");
  var loginPassword = document.getElementById("login-password");
  newLoginButton.addEventListener("click", function () {
    new ValidateLogin(loginUsername.value, loginPassword.value);
  });
}
// Validates username / password. Sens you eiter in to app or displays login failed
function ValidateLogin(name, pass) {
  this.name = name;
  this.pass = pass;
  var i;
  var correct;
  for (i = 0; i < userArray.length; i++) {
    if (name == userArray[i].username) {
      correct = true;
    }
  }
  if (correct) {
    document.getElementById("login-form").reset();
    document.getElementById("login-state").innerHTML =
      "You are logged in as " + name;
    login();
    accountClose();
  } else {
    document.getElementById("login-state").innerHTML =
      "Login failed. Try again.";
  }
}
// closes accountDiv
function accountClose() {
  accountDiv.innerHTML = "";
}
//shows new account in accountDiv and gets Data from user input
function newUserShow() {
  accountDiv.innerHTML =
    "<button id=user-login-button>Login</button>" +
    "<button id=new-user-button>New Account</button>" +
    "<h4>New Account</h4>" +
    "<p>Input new username and and password to create new user account.</p>" +
    "<form id=new-user-form>" +
    "<label for= new-username>Username</label>" +
    "<input id=new-username type=text name=new-username placeholder='Input new username'>" +
    "<label for=new-password>Password</label>" +
    "<input id=new-password type=text name=new-password placeholder='Input wanted password'>" +
    "<input type=button id=new-user name=submit-user value=Create>" +
    "</form>";
  document
    .getElementById("user-login-button")
    .addEventListener("click", loginShow);
  document
    .getElementById("new-user-button")
    .addEventListener("click", newUserShow);
  var newUserButton = document.getElementById("new-user");
  var userUsername = document.getElementById("new-username");
  var userPassword = document.getElementById("new-password");
  newUserButton.addEventListener("click", function () {
    new AddUser(userUsername.value, userPassword.value);
    document.getElementById("new-user-form").reset();
  });
}
