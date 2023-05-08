function myFunction() {
  //Validation for input field
  var name = document.getElementById("name");
  if (name.value == "") {
    swal("**Please Enter Your Name");
  } else {
    setTimeout(() => {
      swal(`Hi ${name.value},All the best,Enjoy your game`);
    }, 1000);

    //GO TO HOME button enable
    var btn = document.querySelector(".btn");
    btn.disabled = false;

    //Display Canvas
    document.querySelector("#msg_section").style.display = "none";
    document.querySelector("#canvas_section").style.display = "block";
  }
}
