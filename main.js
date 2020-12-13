//"use strict";
document
  .getElementById("new-note")
  .addEventListener("click", newNoteWindowOpen);
document
  .getElementById("constr-close")
  .addEventListener("click", newNoteWindowClose);
newNoteWindowClose();

//arrays to save all note
var allNotesArray = [];

function newNoteWindowOpen() {
  document.getElementById("constr-new-note").style.visibility = "visible";
}

function newNoteWindowClose() {
  document.getElementById("constr-new-note").style.visibility = "hidden";
}
var submitButton = document.getElementById("constr-submit");
submitButton.addEventListener("click", function () {
  getInputFromForm();
});

/*gets information on note when user hits submit button. Sets al information to a new 
object "userNote" and pushes that to the AllUserNotes Array and sends note data to
MakeNewNote constructor*/
function getInputFromForm() {
  var userInputTitle = document.getElementById("constr-title").value;
  console.log(userInputTitle);

  //get tags if it is select
  var htmlTags = document.querySelectorAll('[js-tag]');
  var userInputTags = [];
  htmlTags.forEach((item) => {
    var check = item.checked;
    if (check == true) {
      userInputTags.push(item.value);
    }
  })
  console.log(userInputTags);

  /*   var userInputTag1 = document.getElementById("constr-tag1").checked;
    console.log(userInputTag1);
    var userInputTag2 = document.getElementById("constr-tag2").checked;
    console.log(userInputTag2);
    var userInputTag3 = document.getElementById("constr-tag3").checked;
    console.log(userInputTag3); */

  var userInputSubject = document.getElementById("constr-subject").value;
  console.log(userInputSubject);

  //var userInputDate = new Date().toDateString();
  var userInputDate = new Date();
  console.log(userInputDate);

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
    userInputDate);

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

  //creat String to show
  var tagString = "";
  tags.forEach((item) => {
    tagString += item + " ";
  });

  var dateString = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  //new element: main div wrapper
  var newMainDiv = document.createElement("DIV");
  newMainDiv.setAttribute("class", "idividualNote");
  newMainDiv.setAttribute("id", "new-main-div" + number); 
  document.getElementById("main-parent").appendChild(newMainDiv);
  
  // new element changed innerhtml to createElement for security 
  
            //first element inside note: subject
            var xSubject = document.createElement("div");
            xSubject.setAttribute("id","new-subject-div" + number);
            xSubject.textContent = subject;
            document.getElementById("new-main-div" + number).appendChild(xSubject);

            //second element inside note: noteinfo wrapper div
            var xNoteinfo = document.createElement("div");
            xNoteinfo.setAttribute("id","new-note-info-div" + number);
            xNoteinfo.setAttribute("class","noteInfo");
            document.getElementById("new-main-div" + number).appendChild(xNoteinfo);
       
                      //NUMBER element inside noteinfo wrapper div
                      var xNumber = document.createElement("div");
                      xNumber.setAttribute("id","new-number-div" + number);
                      xNumber.setAttribute("class","noteNumber");
                      xNumber.textContent = number;
                      document.getElementById("new-note-info-div" + number).appendChild(xNumber);
          
                      //TITLE element inside noteinfo wrapper div
                      var xTitle = document.createElement("div");
                      xTitle.setAttribute("id","new-title-div" + number);
                      xTitle.textContent = title;
                      document.getElementById("new-note-info-div" + number).appendChild(xTitle);
          
                      //DATE element inside noteinfo wrapper div
                      var xDate = document.createElement("div");
                      xDate.setAttribute("id","new-date-div" + number);
                      xDate.textContent = dateString;
                      document.getElementById("new-note-info-div" + number).appendChild(xDate);
          
                      //TAG element inside noteinfo wrapper div
                      var xTag = document.createElement("div");
                      xTag.setAttribute("id","new-tags-div" + number);
                      xTag.textContent = tagString;
                      document.getElementById("new-note-info-div" + number).appendChild(xTag);

            //third element inside note: replay wrapper div
            var xReplyParent = document.createElement("div");
            xReplyParent.setAttribute("id","new-reply-parent-div" + number);
            xReplyParent.setAttribute("class", "replyParent");
            document.getElementById("new-main-div" + number).appendChild(xReplyParent);

                       //Replay child element wrapper
                       var xReplyChild = document.createElement("div");
                       xReplyChild.setAttribute("id","new-reply-child-div" + number);
                       xReplyChild.setAttribute("class", "replyChild");
                       document.getElementById("new-reply-parent-div" + number).appendChild(xReplyChild);

                               //Reply button element
                               var xReplyButton = document.createElement("button");
                               xReplyButton.setAttribute("id","new-title-reply-button" + number);
                               xReplyButton.setAttribute("class","replyButton");
                               xReplyButton.innerText = "Reply";
                               document.getElementById("new-reply-child-div" + number).appendChild(xReplyButton);

                               //Reply textarea element
                               var xReplyTextarea = document.createElement("textarea");
                               xReplyTextarea.setAttribute("id","new-title-reply-textarea" + number);
                               xReplyTextarea.setAttribute("class","replyTextarea");
                               xReplyTextarea.innerText = "Reply";
                               document.getElementById("new-reply-child-div" + number).appendChild(xReplyTextarea);
   



  


  // setting eventlistener to reply button. Adds data from textfield to new div in reply parent div
  
 
  document
    .getElementById("new-title-reply-button" + number)
    .addEventListener("click", function () {
      var newReply = document.createElement("DIV");
      var userReplyText = document.getElementById("new-title-reply-textarea" + number)
        .value;
   
      newReply.textContent = userReplyText;

      document
        .getElementById("new-reply-parent-div" + number)
        .appendChild(newReply);
      newReply.setAttribute("id", "reply-div" + number);
      newReply.setAttribute("class", "reply");
      document.getElementById("new-title-reply-textarea" + number).value = "";
      note.replies.push(userReplyText);
    });
 
 
 }
