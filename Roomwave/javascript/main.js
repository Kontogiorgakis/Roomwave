"use strict";

$(document).ready(function() {

  $("#avatar-btn").click(function() {
    $("#admin-settings").toggleClass("d-none");
  });

  $("#logout-btn").click(function() {
    window.location.href = "admin.html";
  });

  $("#admin-form").submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      contentType: "application/x-www-form-urlencoded",
      url: "php/users/login.php",
      data: {
        user_type: 'admin',
        email: $('#email').val(),
        password: $('#password').val()
      },
      success: function (xhr) {
        window.location.href = "admin_dashboard.html";
      },
      error: function(xhr) {
        alert("There is a problem connecting you. Please try again later.");
      }
    });
  });
});