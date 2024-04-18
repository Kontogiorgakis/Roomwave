const params = new URLSearchParams(window.location.search);
const room = params.get("room");
const img = params.get("img")
const date = params.get("date")
const time = params.get("time")
const guests = params.get("guests")
const user = params.get("user")
let payCards = 0;

console.log(img)
console.log(date)
console.log(time)
console.log(guests)

function loader(){
    /*Set params in form*/
    document.getElementById("texter").innerText = room+" / Reservation";
    document.getElementById("basicImage").src = '../assets/'+img;

    /*reservation details*/
    console.log("mat")
    document.getElementById("dateof").value = date
    document.getElementById("timeof").value = time
    document.getElementById("guestsof").value = guests
    /*Personal informations*/

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/users/users.json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {

        var users = JSON.parse(xhr.responseText);
        
        for(let us of users){
          if(us.username === user){
            /*Names*/
            document.getElementById("firstName").value = us.first_name 
            document.getElementById("firstName").style.pointerEvents = "none";
            
            document.getElementById("lastName").value = us.last_name 
            document.getElementById("lastName").style.pointerEvents = "none";

            /*Email*/
            document.getElementById("emailMail").value = us.email 
            document.getElementById("emailMail").style.pointerEvents = "none";

            /*Mobile*/
            document.getElementById("mobileTel").value = us.mobile 
            document.getElementById("mobileTel").style.pointerEvents = "none";

            /*Birthdate*/
            document.getElementById("birthdateDate").value = us.birthdate 
            document.getElementById("birthdateDate").style.pointerEvents = "none";
          }
        }
      }
    };
    xhr.send();

    /*personal informations*/
    /*Names*/
    document.getElementById("firstName").value

}

function payment(card){
  console.log(document.getElementById(card))
  if(card==="visa"){
    document.getElementById(card).style.background = "rgba(201, 66, 115, 0.7)";
    document.getElementById("master").style.background = "rgba(41, 6, 47, 0.7)";
    payCards = 1;
  }else{
    document.getElementById(card).style.background = "rgba(201, 66, 115, 0.7)";
    document.getElementById("visa").style.background = "rgba(41, 6, 47, 0.7)";
    payCards = 1;
  }
}


function storeReservation() {
  var phr = new XMLHttpRequest();
  phr.open("GET", "../php/reservation.json");
  phr.onreadystatechange = function() {
    if (phr.readyState === 4 && phr.status === 200) {

      var reservations = JSON.parse(phr.responseText);
      
      for(let res of reservations){
        if(res.date === document.getElementById("dateof").value && res.time === document.getElementById("timeof").value &&res.roomname === room){
          alert("Reservation that date and time already exists!")
          return false;
        }
      }
      if(payCards===0){
        alert("Please select a method to pay!")
        return false;
      }

      if(!document.getElementById("checkbox").checked){
        alert("You cant continue if you dont agree with conditions and terms!")
        return false;
      }

      console.log("gagagagagagaay")
      /*Reservation Load*/
      var reservation_id = 0
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "../php/reservation.json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

          var reservations = JSON.parse(xhr.responseText);
          /*Create new reservation*/
          reservation_id = reservations.length + 1
          var newReservation = {
            id: reservation_id,
            roomname: room,
            date: date,
            time: time,
            guests: guests,
            username: user,
            approved: 0
          };

          /*push into the backend*/
          reservations.push(newReservation);
          // Convert the updated array back to JSON format
          var jsonReservations = JSON.stringify(reservations);
          // Send the updated data to the server
          var xhr2 = new XMLHttpRequest();
          xhr2.open("POST", "../php/reservation.php");
          xhr2.setRequestHeader("Content-Type", "application/json");
          xhr2.send(jsonReservations);
        }
      };
      xhr.send();

      /*Notifications Load Load*/
      var lhr = new XMLHttpRequest();
      lhr.open("GET", "../php/notifications.json");
      lhr.onreadystatechange = function() {
        if (lhr.readyState === 4 && lhr.status === 200) {

          var notifications = JSON.parse(lhr.responseText);

          /*Create timer*/
          const dater = new Date();
          var timer = dater.getHours()+" : "+dater.getMinutes();

          /*Create new reservation*/
          var newNotification = {
            id: notifications.length + 1,
            status: "pending",
            username: user,
            reservation_id: reservation_id,
            notification_time: timer,
            date: date,
            time: time,
          };

          /*push into the backend*/
          notifications.push(newNotification);
          // Convert the updated array back to JSON format
          var jsonNotifications = JSON.stringify(notifications);
          // Send the updated data to the server
          var lhr2 = new XMLHttpRequest();
          lhr2.open("POST", "../php/notifications.php");
          lhr2.setRequestHeader("Content-Type", "application/json");
          lhr2.send(jsonNotifications);
        }
      };
      lhr.send();

      /*Go to start*/
      alert("Succesfull reservation. Wait for admin response")
      window.location.href = '../panel.html?user=' + user;

      
    }



  };
  phr.send();

}

function checkValues(){
  
}