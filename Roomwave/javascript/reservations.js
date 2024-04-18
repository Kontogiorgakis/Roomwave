"use strict";
 
function loadReservations() {
    $.ajax({
      url: "/roomwave/php/reservation.json",
      type: "GET",
      dataType: 'json',
      success: function(reservations) {
        $.ajax({
            url: "/roomwave/php/users/users.json",
            type: "GET",
            dataType: 'json',
            success: function(users) {
                let frame = $("#reservations-wrapper"), html_code;
                frame.html('<div class="text-center text-lg-start"><h2 class="quote2">Reservations</h2></div>');
                frame.append('<hr>');

                // Απομονώνει κάθε jsonString του πίνακα reservations που αναπαριστά μία κράτηση
                for (let res of reservations) {
                    // Θα εμφανιστούν μόνο οι κρατήσεις που δεν έχει ελέγξει ο διαχειριστής
                    if (res.approved != 0) continue;

                    let image, room_num, reservation_id = res.id, roomname = res.roomname,
                    rev_date = res.date, rev_time = res.time, guests = res.guests,
                    client_username = res.username, client_fname, client_email, 
                    client_telephone, client_birthday;

                    for (let user of users) {
                        if (user.username === client_username) {
                            client_fname = user.first_name + " " + user.last_name;
                            client_email = user.email;
                            client_telephone = user.mobile;
                            client_birthday = user.birthdate;
                        }
                    }

                    switch (roomname) {
                        case "Study Hive":
                            image = "form1.png";
                            room_num = 1;
                            break;
                        case "Brainstorm Bunker":
                            image = "form2.png";
                            room_num = 2;
                            break;
                        case "Innovation Room":
                            image = "form3.png";
                            room_num = 3;
                            break;
                        case "Idea Lab":
                            image = "form4.png";
                            room_num = 4;
                            break;
                        case "Think Tank":
                            image = "form5.png";
                            room_num = 5;
                            break;
                        default:
                            break;
                    }

                    // Δημιουργία html κώδικα για προβολή κράτησης
                    html_code += `<div class="container-fluid">
                    <div class="row">
                    <div class="col-12 col-lg-5 mb-4 mb-lg-0"><img src="assets/${image}" class="img-fluid rounded" alt="Room photo"></div>
                    <div class="col-12 col-lg-7">
                        <div class="d-flex flex-column gap-2 gap-lg-4">
                        <h3 class="room-num-name">Room ${room_num} / ${roomname}</h3>

                        <div class="reserv-info d-flex flex-wrap gap-3 gap-lg-4">
                            <!-- Date -->
                            <div class="d-flex flex-row gap-2">
                            <div><i class="fa-regular fa-calendar-check"></i></div>
                            <div><p class="m-0">${rev_date}</p></div>
                            </div>
                            <!-- Time -->
                            <div class="d-flex flex-row gap-2">
                            <div><i class="fa-regular fa-clock"></i></div>
                            <div><p class="m-0">${rev_time}</p></div>
                            </div>
                            <!-- Number of people -->
                            <div class="d-flex flex-row gap-2">
                            <div><i class="fa-solid fa-user-group"></i></div>
                            <div><p class="m-0">${guests}</p></div>
                            </div>
                        </div>
            
                        <div class="client-info d-flex flex-column gap-1">
                            <div><p class="m-0">${client_fname}</p></div>
                            <div><p class="m-0">${client_email}</p></div>
                            <div><p class="m-0">${client_telephone}</p></div>
                            <div><p class="m-0">${client_birthday}</p></div>
                        </div>
            
                        <div class="d-flex flex-row justify-content-center gap-2 gap-lg-5">
                            <button type="button" class="btn approve-btn" onclick="updateReservation(${reservation_id}, ${1})">Approve</button>
                            <button type="button" class="btn reject-btn" onclick="updateReservation(${reservation_id}, ${-1})">Reject</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>`;
                    html_code += '<hr>';
                }
                frame.append(html_code);
            },
            error: function(error) {
              console.log('Error:', error);
            }
        });
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
}

// function updateReservation(id, state) {
//     $.ajax({
//       url: "php/reservations/reservation.json",
//       method: "GET",
//       success: function(reservations) {
//         console.log(JSON.stringify(reservations));

//         for (let res of reservations) {
//           if (res.id === id) {
//             res.approved = state;
//           }
//         }
  
//         // Μετατροπή του ενημερωμένου πίνακα σε μορφή JSON
//         var jsonReservations = JSON.stringify(reservations);
//         console.log(jsonReservations);
  
//         // Αποστολή των ενημερωμένων δεδομένων στον διακομιστή
//         $.ajax({
//           url: "php/reservations/reservation.json",
//           method: "POST",
//           contentType: "application/json",
//           data: jsonReservations,
//           success: function() {},
//           error: function() {}
//         });
//       }
//     });
// }

function updateReservation(id, state) {
    console.log("Beasdfasdfasdjaj")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/reservation.json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {

        var reservations = JSON.parse(xhr.responseText);
        for(let res of reservations){
            if(res.id === id){
                res.approved = state
            }
        }
        // Convert the updated array back to JSON format
        var jsonReservations = JSON.stringify(reservations);
        // Send the updated data to the server
        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "php/reservation.php");
        /*xhr2.onreadystatechange = function() {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                window.location.href = "admin_dashboard.html";
            } else {
                alert("Error: Failed to update reservations.");
            }
        };*/
        xhr2.setRequestHeader("Content-Type", "application/json");
        xhr2.send(jsonReservations);
      }
    };
    xhr.send();

        // /*Notifications Load*/
        // var lhr = new XMLHttpRequest();
        // lhr.open("GET", "php/notifications.json");
        // lhr.onreadystatechange = function() {
        // if (lhr.readyState === 4 && lhr.status === 200) {

        //     var notifications = JSON.parse(lhr.responseText);

        //     /*Create timer*/
        //     const dater = new Date();
        //     var timer = dater.getHours()+" : "+dater.getMinutes();
        //     if(state===1){
        //         /*Create new reservation*/
        //         var newNotification = {
        //             id: notifications.length + 1,
        //             status: "confirmed",
        //             username: "user1",
        //             reservation_id: id,
        //             notification_time: timer,
        //             date: "date",
        //             time: "time",
        //         };
        
        //         /*push into the backend*/
        //         notifications.push(newNotification);

        //         /*Create new reservation*/
        //         var newNotification = {
        //             id: notifications.length + 1,
        //             status: "qr",
        //             username: "user1",
        //             reservation_id: id,
        //             notification_time: timer,
        //             date: "date",
        //             time: "time",
        //         };
        
        //         /*push into the backend*/
        //         notifications.push(newNotification);
        //         console.log("Bejaj")
        //     }else{
        //         /*Create new reservation*/
        //         var newNotification = {
        //             id: notifications.length + 1,
        //             status: "declined",
        //             username: "user1",
        //             reservation_id: id,
        //             notification_time: timer,
        //             date: "date",
        //             time: "time",
        //         };
        
        //         /*push into the backend*/
        //         notifications.push(newNotification);
        //     }
        //     // Convert the updated array back to JSON format
        //     var jsonNotifications = JSON.stringify(notifications);
        //     // Send the updated data to the server
        //     var lhr2 = new XMLHttpRequest();
        //     lhr2.open("POST", "php/notifications.php");
        //     lhr2.setRequestHeader("Content-Type", "application/json");
        //     lhr2.send(jsonNotifications);
        // }
        // };
        // lhr.send()
}
  

$(document).ready(function() {
    loadReservations();
});