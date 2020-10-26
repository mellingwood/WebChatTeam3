var id;

$(document).ready(function () {
    $('#sendText').click(sendText);
    $('#checkText').click(sendText);
    $('#enter').click(makeid);

    var input = document.getElementById("textinput");
    // Respond to enter key
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendText();
      }
    });


});

function makeid() {
  id = document.getElementById("usernameinput").value;
  console.log("ID:", id);
}

// Function to force scrollable window at bottom
function updateScroll(){
    var element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
}


 // Respond to send button
function sendText() {
  console.log("sendText");
  // Get the text from the text box
  inText = $('#textinput').val();
  // Clear the input text
  $('#textinput').val("");

  //document.getElementById('chatBox').innerHTML += "<font color='red'>You: </font>" + inText+"<br />";
  // force to bottom
  updateScroll();

  message=inText.replace("","+");
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team3_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

function processResults(data) {
  // add to the bottom of the chat box
  console.log("got:"+data);
  $('#chatBox').append(data);

  setTimeout(function(){sendText();}, 1000);

}
