"use strict";

var xName2 ="";
var xCommentNumber = 0;
var xTagFunTrue = false;
var xTagMetaTrue = false;
var xTagUrgentTrue = false;
var dontJudgeMe = false;


//hide and show functions
function hide(element) {
  element.classList.remove("visible");
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

function toggleDisplay(element) {
  if (element.classList.contains("hidden")) {
    show(element)
  } else {
    hide(element)
  }
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


  tags.forEach((item) => {
    //changed to handle image tags
    switch(item) {
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


  var dateString = date.toLocaleDateString(); //+ " " + date.toLocaleTimeString();

  //new element: main div wrapper
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "individualNote");
  newMainDiv.setAttribute("id", "new-main-div" + number);
  newMainDiv.setAttribute("js-noteDiv", number)
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
                      newVotetext.setAttribute("js-noteVote", "")
                      document.getElementById("new-vote-div" + number).appendChild(newVotetext);

                     //vote button
                      var newVoteButton = document.createElement("input");
                      newVoteButton.setAttribute("id", "vote-b-" + number);
                      newVoteButton.setAttribute("js-access", "");
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
                              xTagFunTrue = false;    
                              dontJudgeMe = true;                            
                              };                      

                              var xTagMeta = document.createElement("img");
                              xTagMeta.setAttribute("src","meta10.png");
                              xTagMeta.setAttribute("class","metaloggaInNote");
                              if (xTagMetaTrue){
                              document.getElementById("tagwrapper" + number).appendChild(xTagMeta);
                              xTagMetaTrue = false;                              
                              dontJudgeMe = true;
                              };                      

                              var xTagUrgent = document.createElement("img");
                              xTagUrgent.setAttribute("src","urgent10.png");                                            
                              xTagUrgent.setAttribute("class","urgentloggaInNote");
                              if (xTagUrgentTrue){
                              document.getElementById("tagwrapper" + number).appendChild(xTagUrgent);
                              xTagUrgentTrue = false;                            
                              dontJudgeMe = true;
                              };

               
          
                      
            //show Replys             
            var showReplyButton = document.createElement("input");
            showReplyButton.setAttribute("id", "ReplyButton" + number);
            showReplyButton.setAttribute("js-access", "");
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
            xReplyParent.setAttribute("class", "replyParent hidden");             
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

               if(dontJudgeMe) {
                document.getElementById("new-reply-parent-div" + number).style.top = "-220px";  
                dontJudgeMe = false;
               }
               
              
               




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
        //changed order tp push newest reply first  
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
      toggleDisplay(document.getElementById("new-reply-parent-div" + number));
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
var accountButton = document.getElementById("accountButton");

// opens or closes accountDiv
//accountDiv.innerHTML = ""; // sets initial value of login div to ""
accountButton.addEventListener("click", function () {

  toggleDisplay(accountDiv)

  /* if (accountDiv.innerHTML == "") {
    loginShow();    
    document.getElementById("login-div").style.display = "block";                   
    } else {
      
    accountClose();
    
  } */
});

//logout function
function logout() {
  var allButtons = document.querySelectorAll("[js-access]");
  allButtons.forEach(el => {hide(el)});

  var replyBoxes = document.querySelectorAll(".replyParent");
  replyBoxes.forEach(el => {hide(el)});

  show(document.getElementById("accountButton"));

  newNoteWindowClose();

  document.getElementById("login-state").innerHTML = "Not logged in";

/*   newNoteButton.style.visibility = "hidden";
  logoutButton.style.visibility = "hidden";
  document.getElementById("login-state").innerHTML = "Not logged in";
  console.log(document.getElementsByClassName("replyChild"));
  if (allNotesArray.length > 0) {
    var i;
    for (i = 1; i <= allNotesArray.length; i++) {
      //document.getElementById("new-reply-child-div"+i).style.visibility = "hidden";
      document.getElementById("vote-b-"+i).style.visibility = "hidden";
      //added replay button
      //document.getElementById("ReplyButton"+i).style.visibility = "hidden";
      document.getElementById("new-title-reply-button" + i).style.display = "none";
      document.getElementById("new-title-reply-textarea" + i).style.display = "none";
    };
  } */

}
//login function
function login() {
  var allButtons = document.querySelectorAll("[js-access]");
  allButtons.forEach(el => {show(el)});

  hide(accountButton);
  hide(accountDiv);

/*   newNoteButton.style.visibility = "visible";
  logoutButton.style.visibility = "visible";
  if (allNotesArray.length > 0) {
    var i;
    for (i = 1; i <= allNotesArray.length; i++) {
      //document.getElementById("new-reply-child-div"+i).style.visibility = "visible";
      document.getElementById("vote-b-"+i).style.visibility = "visible";
      //added reply button
      //document.getElementById("ReplyButton"+i).style.visibility = "visible";
      document.getElementById("new-title-reply-button" + i).style.display = "block";
      document.getElementById("new-title-reply-textarea" + i).style.display = "block";
    };
  }
  document.getElementById("login-div").style.display = "none"; */  
}


//Button to add user
document.getElementById("new-user").addEventListener("click", function () {
  new AddUser(
    document.getElementById("new-username").value, 
    document.getElementById("new-password").value);
  document.getElementById("new-user-form").reset();
});

// constructs user from username+password and sends user to userArray
function AddUser(name, password) {

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

// shows Login/new user form in accountDiv
document.getElementById("user-login-button").addEventListener("click", ()=>{
  show(document.getElementById("login-form"));
  hide(document.getElementById("new-user-form"));
});

document.getElementById("new-user-button").addEventListener("click", ()=>{
  hide(document.getElementById("login-form"));
  show(document.getElementById("new-user-form"));
});



function loginShow() {
  accountDiv.innerHTML = "";
  //login button
  var loginButton = document.createElement("button");
  loginButton.setAttribute("id","user-login-button");
  var loginButtonText = document.createTextNode("Login");
  loginButton.appendChild(loginButtonText);
  accountDiv.appendChild(loginButton);
  //new account button
  var newAccountButton = document.createElement("button");
  newAccountButton.setAttribute("id","new-user-button");
  var NewAccButtonText = document.createTextNode("New Account");
  newAccountButton.appendChild(NewAccButtonText);
  accountDiv.appendChild(newAccountButton);
  // login H4
  var loginH4 = document.createElement("h4");
  var loginH4Text = document.createTextNode("Login");
  loginH4.appendChild(loginH4Text);
  accountDiv.appendChild(loginH4);
  // login p
  var loginP = document.createElement("p");
  var loginPText = document.createTextNode("Input username and and password to login.");
  loginP.appendChild(loginPText);
  accountDiv.appendChild(loginP);
  //login form
  var loginForm = document.createElement("form");
  loginForm.setAttribute("id","login-form");
  accountDiv.appendChild(loginForm);
        // label username
        var loginUsernameLabel = document.createElement("label");
        loginUsernameLabel.setAttribute("for","login-username");
        var userLabelText = document.createTextNode("Username");
        loginUsernameLabel.appendChild(userLabelText);
        loginForm.appendChild(loginUsernameLabel);
        // input text username
        var loginUsernameInput = document.createElement("input");
        loginUsernameInput.setAttribute("id","login-username");
        loginUsernameInput.setAttribute("type","text");
        loginUsernameInput.setAttribute("name","login-username");
        loginUsernameInput.setAttribute("placeholder","Input Username");
        loginForm.appendChild(loginUsernameInput);
        // label password
        var loginPasswordLabel = document.createElement("label");
        loginPasswordLabel.setAttribute("for","login-password");
        var passLabelText = document.createTextNode("Password");
        loginPasswordLabel.appendChild(passLabelText);
        loginForm.appendChild(loginPasswordLabel);
        // input password
        var loginPasswordInput = document.createElement("input");
        loginPasswordInput.setAttribute("id","login-password");
        loginPasswordInput.setAttribute("type","password");
        loginPasswordInput.setAttribute("name","login-password");
        loginPasswordInput.setAttribute("placeholder","Input Password");
        loginForm.appendChild(loginPasswordInput);
        // submit button
        var loginSubmitButton = document.createElement("button");
        loginSubmitButton.setAttribute("id","user-login");
        loginSubmitButton.setAttribute("name","login-user");
        loginSubmitButton.setAttribute("type","button");
        var logSubmitText = document.createTextNode("Submit");
        loginSubmitButton.appendChild(logSubmitText);
        loginForm.appendChild(loginSubmitButton);
  
  // accountDiv.innerHTML =
  //   "<button id=user-login-button>Login</button>" +
  //   "<button id=new-user-button>New Account</button>" +
  //   "<h4>Login</h4>" +
  //   "<p>Input username and and password to login.</p>" +
  //   "<form id=login-form>" +
  //   "<label for=login-usenamer>Username</label>" +
  //   "<input id=login-username type=text name=login-username placeholder=Input username>" +
  //   "<label for=login-password>Password</label>" +
  //   "<input id=login-password type=password name=login-password placeholder=Input password>" +
  //   "<input type=button id=user-login name=login-user value=Submit>" +
  //   "</form>";
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
document.getElementById("user-login").addEventListener("click", function () {
  ValidateLogin(
    document.getElementById("login-username").value,
    document.getElementById("login-password").value);
});
function ValidateLogin(name, pass) {

  var i;
  var correct;
  for (i = 0; i < userArray.length; i++) {
    if (name + pass== userArray[i].username+userArray[i].password) {
      correct = true;
    }
  }
  if (correct) {
    document.getElementById("login-form").reset();
    document.getElementById("login-state").innerHTML =
       name;
      xName2 = name;
    login();
    // accountClose();
  } else {
    document.getElementById("login-state").innerHTML =
      "Login failed. Try again.";
  }
}
// closes accountDiv
function accountClose() {
  accountDiv.innerHTML = "";
  document.getElementById("login-div").style.display = "none"; 
}
//shows new account in accountDiv and gets Data from user input
function newUserShow() {
  accountDiv.innerHTML = "";
  //login button
  var loginButton = document.createElement("button");
  loginButton.setAttribute("id","user-login-button");
  var loginButtonText = document.createTextNode("Login");
  loginButton.appendChild(loginButtonText);
  accountDiv.appendChild(loginButton);
  //new account button
  var newAccountButton = document.createElement("button");
  newAccountButton.setAttribute("id","new-user-button");
  var NewAccButtonText = document.createTextNode("New Account");
  newAccountButton.appendChild(NewAccButtonText);
  accountDiv.appendChild(newAccountButton);
  // login H4
  var loginH4 = document.createElement("h4");
  var loginH4Text = document.createTextNode("New Account");
  loginH4.appendChild(loginH4Text);
  accountDiv.appendChild(loginH4);
  // login p
  var loginP = document.createElement("p");
  var loginPText = document.createTextNode("Input new username and and password to create new user account.");
  loginP.appendChild(loginPText);
  accountDiv.appendChild(loginP);
  //login form
  var loginForm = document.createElement("form");
  loginForm.setAttribute("id","new-user-form");
  accountDiv.appendChild(loginForm);
        // label username
        var loginUsernameLabel = document.createElement("label");
        loginUsernameLabel.setAttribute("for","login-username");
        var userLabelText = document.createTextNode("Username");
        loginUsernameLabel.appendChild(userLabelText);
        loginForm.appendChild(loginUsernameLabel);
        // input text username
        var loginUsernameInput = document.createElement("input");
        loginUsernameInput.setAttribute("id","new-username");
        loginUsernameInput.setAttribute("type","text");
        loginUsernameInput.setAttribute("name","new-username");
        loginUsernameInput.setAttribute("placeholder","Input Username");
        loginForm.appendChild(loginUsernameInput);
        // label password
        var loginPasswordLabel = document.createElement("label");
        loginPasswordLabel.setAttribute("for","login-password");
        var passLabelText = document.createTextNode("Password");
        loginPasswordLabel.appendChild(passLabelText);
        loginForm.appendChild(loginPasswordLabel);
        // input password
        var loginPasswordInput = document.createElement("input");
        loginPasswordInput.setAttribute("id","new-password");
        loginPasswordInput.setAttribute("type","text");
        loginPasswordInput.setAttribute("name","new-password");
        loginPasswordInput.setAttribute("placeholder","Input Password");
        loginForm.appendChild(loginPasswordInput);
        // submit button
        var loginSubmitButton = document.createElement("button");
        loginSubmitButton.setAttribute("id","new-user");
        loginSubmitButton.setAttribute("name","submit-user");
        loginSubmitButton.setAttribute("type","button");
        var logSubmitText = document.createTextNode("Create");
        loginSubmitButton.appendChild(logSubmitText);
        loginForm.appendChild(loginSubmitButton);
  // accountDiv.innerHTML =
  //   "<button id=user-login-button>Login</button>" +
  //   "<button id=new-user-button>New Account</button>" +
  //   "<h4>New Account</h4>" +
  //   "<p>Input new username and and password to create new user account.</p>" +
  //   "<form id=new-user-form>" +
  //   "<label for= new-username>Username</label>" + 
  //   "<input id=new-username type=text name=new-username placeholder='Input new username'>" + 
  //   "<label for=new-password>Password</label>" +
  //   "<input id=new-password type=text name=new-password placeholder='Input wanted password'>" +
  //   "<input type=button id=new-user name=submit-user value=Create>" +
  //   "</form>";
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



//*******************Sort Function*************************/

var sortButton = document.getElementById("sortButton")
sortButton.addEventListener('click',sortData);

function sortData() {
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

      sortButton.innerHTML = "sort by number"

    // sort by number
    }else {
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


