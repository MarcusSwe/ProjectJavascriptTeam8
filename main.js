"use strict";

var xName2 ="";
var xCommentNumber = 0;
var xTagFunTrue = false;
var xTagMetaTrue = false;
var xTagUrgentTrue = false;

//hide and show functions
function hide(...elements) {
  elements.forEach((el) => {
    el.classList.remove("visible");
    el.classList.add("hidden");
  })
}

function show(...elements) {
  elements.forEach((el) => {
    el.classList.remove("hidden");
    el.classList.add("visible");
  })
}

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
  show(document.getElementById("constr-new-note"));
}
// Note Window close
function newNoteWindowClose() {
  hide(document.getElementById("constr-new-note"));
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

  var userInputSubject = document.getElementById("constr-subject").value;

  var userInputDate = new Date();

  // create new note class
  var newNote = new Note(
    userInputTitle,
    userInputTags,
    userInputSubject,
    userInputDate
  );

  allNotesArray.push(newNote);
  console.log(allNotesArray);

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
  this.voteNumber = 0;
}

//Create new note here

function createNoteDiv(note) {
  var title = note.title;
  var tags = note.tags;
  var subject = note.subject;
  var date = note.date;
  var number = note.number;


  //create string with tags
  var tagString = "";
  tags.forEach((item) => {
    //tagString += item + " ";
    //check input value, if true image will get added to DOM with below code downstairs
    if(item == "F"){ 
      xTagFunTrue = true;
    };

    if(item == "M"){ 
      xTagMetaTrue = true;
    };

    if(item == "U"){ 
      xTagUrgentTrue = true;
    };

  });


  var dateString = date.toLocaleDateString(); //+ " " + date.toLocaleTimeString();

  //new element: main div wrapper
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "individualNote");
  newMainDiv.setAttribute("id", "new-main-div" + number); 
  document.getElementById("main-parent").appendChild(newMainDiv);  
  // new element changed innerhtml to createElement for security 
  
            var xTitle = document.createElement("div");
            xTitle.setAttribute("id","new-title-div" + number);
            xTitle.setAttribute("class", "newNoteTopTitle");
            xTitle.textContent = title;
            document.getElementById("new-main-div" + number).appendChild(xTitle);      
                

            //first element inside note: subject
            var xSubject = document.createElement("div");
            xSubject.setAttribute("id","new-subject-div" + number);
            xSubject.setAttribute("class","subjectInNote");
            xSubject.textContent = subject;
            document.getElementById("new-main-div" + number).appendChild(xSubject);

            // new vote div
            var newVoteDiv = document.createElement("DIV");
            newVoteDiv.setAttribute("id", "new-vote-div" + number);
            newVoteDiv.setAttribute("class", "voteDiv");
            document.getElementById("new-main-div" + number).appendChild(newVoteDiv);

                      //vote number
                      var newVotetext = document.createElement("p");
                      newVotetext.innerHTML=note.voteNumber;
                      newVotetext.setAttribute("id", "vote-n-" + number);
                      newVotetext.setAttribute("class", "voteNumber");
                      document.getElementById("new-vote-div" + number).appendChild(newVotetext);

                     //vote button
                      var newVoteButton = document.createElement("input");
                      newVoteButton.setAttribute("id", "vote-b-" + number);
                      newVoteButton.src = "upvote3.png";
                      newVoteButton.type = "image";
                      newVoteButton.setAttribute("class", "voteButton");
                      document.getElementById("new-vote-div" + number).appendChild(newVoteButton);

     
            //second element inside note: noteinfo wrapper div
            var xNoteinfo = document.createElement("div");
            xNoteinfo.setAttribute("id","new-note-info-div" + number);
            xNoteinfo.setAttribute("class","noteInfo");
            document.getElementById("new-main-div" + number).appendChild(xNoteinfo);
       
                      //NUMBER element inside noteinfo wrapper div
                     // var xNumber = document.createElement("div");
                      //xNumber.setAttribute("id","new-number-div" + number);
                      //xNumber.setAttribute("class","noteNumber");
                      //xNumber.textContent = number;
                      //document.getElementById("new-note-info-div" + number).appendChild(xNumber);                                    


                     //NAME
                     var xName = document.createElement("div");
                     xName.setAttribute("id","new-tags-div" + number);
                     xName.setAttribute("class","usernameMadenote");
                     xName.textContent = xName2;
                     document.getElementById("new-note-info-div" + number).appendChild(xName);

                      //DATE element inside noteinfo wrapper div
                      var xDate = document.createElement("div");
                      xDate.setAttribute("id","new-date-div" + number);
                      xDate.setAttribute("class","dateInNote");
                      xDate.textContent = dateString;
                      document.getElementById("new-note-info-div" + number).appendChild(xDate);


                      //TAG element tagwrapper
                      var tagWrapper = document.createElement("div");
                      tagWrapper.setAttribute("id", "tagwrapper" + number);
                      tagWrapper.setAttribute("class", "tagwrapper");
                      document.getElementById("new-main-div" + number).appendChild(tagWrapper);
                      
                              var xTagFun = document.createElement("img");
                              xTagFun.setAttribute("src","fun10.png");
                              xTagFun.setAttribute("class","funloggaInNote");
                              if (xTagFunTrue){
                              document.getElementById("tagwrapper" + number).appendChild(xTagFun);
                              var xTagFunTrue = false;
                              };                      

                              var xTagMeta = document.createElement("img");
                              xTagMeta.setAttribute("src","meta10.png");
                              xTagMeta.setAttribute("class","metaloggaInNote");
                              if (xTagMetaTrue){
                              document.getElementById("tagwrapper" + number).appendChild(xTagMeta);
                              var xTagMetaTrue = false;
                              };                      

                              var xTagUrgent = document.createElement("img");
                              xTagUrgent.setAttribute("src","urgent10.png");                                            
                              xTagUrgent.setAttribute("class","urgentloggaInNote");
                              if (xTagUrgentTrue){
                              document.getElementById("tagwrapper" + number).appendChild(xTagUrgent);
                              var xTagUrgentTrue = false;
                              };

               
          
                      
            //show Replys             
            var showReplyButton = document.createElement("input");
            showReplyButton.setAttribute("id", "ReplyButton" + number);
            showReplyButton.src = "omegapog2.png";
            showReplyButton.type = "image";
            showReplyButton.setAttribute("class", "showReplyButton");
            document.getElementById("new-date-div" + number).appendChild(showReplyButton);           

            //comment numbers        
            var showCommentsNumbers = document.createElement("b");
            showCommentsNumbers.setAttribute("id", "commentNumbers" + number);
            showCommentsNumbers.setAttribute("class", "commentNumbers");
            showCommentsNumbers.innerText = parseInt(xCommentNumber) + " comments";
            document.getElementById("new-date-div" + number).appendChild(showCommentsNumbers);
                        
                

            //third element inside note: replay wrapper div
            var xReplyParent = document.createElement("div");
            xReplyParent.setAttribute("id","new-reply-parent-div" + number);
            xReplyParent.setAttribute("class", "replyParent");
            document.getElementById("new-main-div" + number).appendChild(xReplyParent);                    
                              
                      //Reply button element
                      var xReplyButton = document.createElement("button");
                      xReplyButton.setAttribute("id","new-title-reply-button" + number);
                      xReplyButton.setAttribute("class","replyButton");
                      xReplyButton.innerText = "Reply";
                      document.getElementById("new-reply-parent-div" + number).appendChild(xReplyButton);

                      //Reply textarea element
                      var xReplyTextarea = document.createElement("textarea");
                      xReplyTextarea.setAttribute("id","new-title-reply-textarea" + number);
                      xReplyTextarea.setAttribute("class","replyTextarea");
                      xReplyTextarea.setAttribute("maxlength","100");
                      document.getElementById("new-reply-parent-div" + number).appendChild(xReplyTextarea);

                       //Replay child element wrapper
                       var xReplyChild = document.createElement("div");
                       xReplyChild.setAttribute("id","new-reply-child-div" + number);
                       xReplyChild.setAttribute("class", "replyChild");
                       document.getElementById("new-reply-parent-div" + number).appendChild(xReplyChild);

                               
                              




  // setting eventlistener to reply button. Adds data from textfield to new div in reply parent div
  document
    .getElementById("new-title-reply-button" + number)
    .addEventListener("click", function () {
      var newReply = document.createElement("DIV");
      var userReplyText = document.getElementById(
        "new-title-reply-textarea" + number
      ).value;
      if (userReplyText == "") {} else {
        newReply.innerText = xName2 + " " + "said: " + userReplyText;
        document
          .getElementById("new-reply-child-div" + number)
          .prepend(newReply);
        newReply.setAttribute("id", "reply-div" + number);
        newReply.setAttribute("class", "reply");
        document.getElementById("new-title-reply-textarea" + number).value = "";
        note.replies.push(userReplyText);
        //added comment counter
        xCommentNumber = parseInt(document.getElementById("commentNumbers" + number).innerText) +1;
        document.getElementById("commentNumbers" + number).innerText = parseInt(xCommentNumber) + " comments";
        xCommentNumber = 0;
      }
    });




//open replay window up or close..
    document.getElementById("ReplyButton" + number).addEventListener("click", function(){
      document.getElementById("new-reply-parent-div" + number).classList.toggle("show");

    });






  //vote function
  document.getElementById("vote-b-" + number).addEventListener("click", () => {
    note.voteNumber++;
    document.getElementById("vote-n-" + number).innerHTML = note.voteNumber;
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
       name;
      xName2 = name;
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

