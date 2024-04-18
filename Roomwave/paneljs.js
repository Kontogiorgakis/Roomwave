/*Get Params*/
const params = new URLSearchParams(window.location.search);
const userLogin = params.get("user");

/*Show date panel*/
function dateTake(){
    setBackOpacity()
    const dateDiv = document.getElementById("dater")

    //opacity
    document.getElementById("explore").style.opacity = "70%";
    if(dateDiv.style.display==="flex"){
        dateDiv.style.display = "none"
        //opacity
    document.getElementById("explore").style.opacity = "100%";
    }else{
        dateDiv.style.display = "flex"
        document.getElementById("timer").style.display ="none"
        document.getElementById("guester").style.display ="none"

        /*Get current day*/
        const date = new Date();
        document.getElementById("numberDown1").value = date.getDate();
        document.getElementById("numberDown2").value = date.getMonth()+1;
        document.getElementById("numberDown3").value = date.getFullYear();
    }
}

/*Close date*/
function closeDate(){
    //opacity
    document.getElementById("explore").style.opacity = "100%";
    const dateDiv = document.getElementById("dater")
    if(dateDiv.style.display==="flex")
        dateDiv.style.display = "none"
}

/*Display date*/
function dateShow(){
    const day = document.getElementById("numberDown1").value;
    const month = document.getElementById("numberDown2").value;
    const year = document.getElementById("numberDown3").value;
    const date = document.getElementById("calendarText1")

    date.innerText = day+" / "+month+" / "+year.slice(-2)
    closeDate()
}


/*---------------------------------Hour----------------------------------*/
/*Show date panel*/
function hourTake(){
    setBackOpacity()
    //opacity
    document.getElementById("explore").style.opacity = "70%";
    const dateDiv = document.getElementById("timer")
    if(dateDiv.style.display==="flex"){
        dateDiv.style.display = "none"
        //opacity
    document.getElementById("explore").style.opacity = "100%";
    }else{
        dateDiv.style.display = "flex"
        document.getElementById("guester").style.display ="none"
        document.getElementById("dater").style.display ="none"

        /*Get current day*/
        const date = new Date();
        document.getElementById("hourDown").value = date.getHours()+1;
        document.getElementById("minuteDown").value = "00"
    }
}

/*Close date*/
function closeHour(){
    //opacity
    document.getElementById("explore").style.opacity = "100%";
    const dateDiv = document.getElementById("timer")
    if(dateDiv.style.display==="flex")
        dateDiv.style.display = "none"
}

/*Display date*/
function hourShow(){
    const hour = document.getElementById("hourDown").value;
    const minute = document.getElementById("minuteDown").value;
    if(minute==="0"){
        minute = "00"
    }
    const time = document.getElementById("calendarText2")

    time.innerText = hour+" : "+minute
    closeHour()
}

/*---------------------------------Guests----------------------------------*/
/*Show date panel*/
function guestTake(){
    setBackOpacity()
    //opacity
    document.getElementById("explore").style.opacity = "70%";
    const dateDiv = document.getElementById("guester")
    if(dateDiv.style.display==="flex"){
        dateDiv.style.display = "none"
        //opacity
        document.getElementById("explore").style.opacity = "100%";
    }else{
        dateDiv.style.display = "flex"
        document.getElementById("timer").style.display ="none"
        document.getElementById("dater").style.display ="none"

        /*Get current day*/
        const date = new Date();
        document.getElementById("guestDown").value = 2;
    }
}

/*Close date*/
function closeGuest(){
    //opacity
    document.getElementById("explore").style.opacity = "100%";
    const dateDiv = document.getElementById("guester")
    if(dateDiv.style.display==="flex")
        dateDiv.style.display = "none"
}

/*Display date*/
function guestShow(){
    const guests = document.getElementById("guestDown").value;
    const guest = document.getElementById("calendarText3")

    guest.innerText = guests
    closeGuest()
}


/*Filters*/
function removeTitle(room){
    document.getElementById(room).style.display = "none"
}

function putBackTitle(room){
    document.getElementById(room).style.display = "block"
}

/*Reserve go to form*/

function reserve(room){
    //first if
    const date = document.getElementById("calendarText1").innerText
    const time = document.getElementById("calendarText2").innerText
    const guests = document.getElementById("calendarText3").innerText
    if(date==="Date" || time==="Time" || guests==="Guests"){
        alert("Please fill in the details listed at the top of the page")
        return;
    }

    let imageForm = "";
    console.log(room);
    if(room==="Study Hive"){
        imageForm="form1.png"
    }else if(room==="Brainstorm Bunker"){
        if(guests>8){
            alert("the guests you declared do not fit in the room!")
            return;
        }
        imageForm="form2.png"
    }else if(room==="Innovation Room"){
        if(guests>5){
            alert("the guests you declared do not fit in the room!")
            return;
        }
        imageForm="form3.png"
    }else if(room==="Idea Lab"){
        if(guests>7){
            alert("the guests you declared do not fit in the room!")
            return;
        }
        imageForm="form4.png"
    }else if(room==="Think Tank"){
        if(guests>5){
            alert("The guests you declared do not fit in the room!")
            return;
        }
        imageForm="form5.png"
    }
    console.log(date+" "+time+" "+guests)
    window.location.href = 'form/form.html?room=' + room +'&img=' + imageForm + '&date=' + date + '&time=' + time + '&guests=' + guests + '&user=' + userLogin ;
}
function openNotifications(){
    if(document.getElementById("notifications").style.display === "block"){
        document.getElementById("notifications").style.display = "none"
        document.getElementById("user").style.pointerEvents = "auto"
    }else{
        document.getElementById("notifications").style.display = "block"
        document.getElementById("user").style.pointerEvents = "none"
    }
}

function openProfile(){
    if(document.getElementById("profile").style.display === "block"){
        document.getElementById("profile").style.display = "none"
        document.getElementById("bell").style.pointerEvents = "auto"
    }else if(document.getElementById("reservations").style.display === "block"){
        document.getElementById("reservations").style.display = "none"
    }else if(document.getElementById("reservations").style.display === "none" && document.getElementById("profile").style.display === "none"){
        document.getElementById("bell").style.pointerEvents = "auto"
    }else{
        document.getElementById("profile").style.display = "block"
        /*Change name user*/
        if(userLogin==="user1"){
            document.getElementById("profileText").innerText = "Hello Kosta!"
        }else if(userLogin==="user2"){
            document.getElementById("profileText").innerText = "Hello Eleni!"
        }
        document.getElementById("bell").style.pointerEvents = "none"
    }
}
function myReservations(){
    document.getElementById("profile").style.display = "none"
    document.getElementById("bell").style.pointerEvents = "none"
    document.getElementById("reservations").style.display = "block";

    /*Set Reservation from Backend*/
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/reservation.json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

        var reservations = JSON.parse(xhr.responseText);
        /*Show them*/
        if(reservations.length !== 0){
            var top = 71;
            for(let res of reservations){
                if(res.username === userLogin){
                    console.log(res);
                    // Get the div with id "reservation"
                    const reservationDiv = document.createElement('div');
                    /*Date Time Guests*/
                    let resDate = ""
                    let mat = res.date
                    let secondslash = mat.indexOf("/",mat.indexOf("/")+1);
                    resDate = mat.substring(0,secondslash);

                    const resTime = res.time
                    const resGuests = res.guests
                    /*Picture and Name*/
                    let picture = ""
                    let name = ""
                    if(res.roomname === "Study Hive"){
                        picture = "resPic1.png"
                        name = "Room 01 / Study Hive"
                    }else if(res.roomname === "Brainstorm Bunker"){
                        picture = "resPic2.png"
                        name = "Room 02 / Brainstorm Bunker"
                    }else if(res.roomname === "Innovation Room"){
                        picture = "resPic3.png"
                        name = "Room 03 / Innovation Room"
                    }else if(res.roomname === "Idea Lab"){
                        picture = "resPic4.png"
                        name = "Room 04 / Idea Lab"
                    }else{
                        picture = "resPic5.png"
                        name = "Room 05 / Think Tank"
                    }

                    /*Status*/
                    let icon = ""
                    let status = ""
                    let edit = ""
                    if(res.approved === 0){
                        icon = "<svg class=\"iconRes\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z\"/></svg>?"
                        status = "Pending"
                        edit = "<svg  onclick=\"editReservation()\" class=\"iconRes\" style=\"fill: #D49AD2; width:25px; height:25px; margin-left:12%; margin-top:8%;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z\"/></svg>"
                    }else if(res.approved === 1){
                        icon = "<svg class=\"iconRes\" style=\"fill:#65B500; \" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z\"/></svg>"
                        status = "Confirmed"
                        edit = "<svg onclick=\"editReservation()\" class=\"iconRes\" style=\"fill: #D49AD2; width:25px; height:25px; margin-left:12%; margin-top:8%; display:none;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z\"/></svg>"
                    }else{
                        icon = "<svg class=\"iconRes\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z\"/></svg>"
                        status = "Declined"
                        edit = "<svg onclick=\"editReservation()\" class=\"iconRes\" style=\"fill: #D49AD2; width:25px; height:25px; margin-left:12%; margin-top:8%; display:none;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z\"/></svg>"
                    }

                    //Parent
                    const parent = document.getElementById('reservations');
                    console.log(top)

                    // Set the innerHTML of the div to the HTML code
                    reservationDiv.innerHTML = `
                        <div id="divReservation" style="top:`+top+`px;">
                            <img id="picture" src="assets/`+picture+`">
                            <div id="infoRes">
                                <div id="nameRes">`+name+`</div>
                                <div id="editline" style="display: flex; margin-top: 5%;">
                                    `+icon+`
                                    <div id="status">`+status+`</div>
                                    `+edit+`
                                    <svg onclick="deleteReservation()" class="iconRes" style="fill: #C54848; width:25px; height:25px; margin-left:12%; margin-top:8%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                </div>
                                <div id="editline" style="display: flex; margin-top: 5%;">
                                        <svg class="iconRes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg>
                                        <div class="dateRes">`+resDate+`</div>
                                    
                                        <svg class="iconRes" style="margin-left:3%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                                        <div class="dateRes">`+resTime+`</div>

                                        <svg class="iconRes" style="margin-left:3%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                                        <div class="dateRes">`+resGuests+`</div>
                                </div>
                                <div id="resLine"></div>
                                <div id="idOfRes" style="display:none">`+res.id+`</div>
                            </div>
                        </div>
                    </div>`

                    parent.appendChild(reservationDiv.cloneNode(true));
                    top = top+211;

                }
            }
        }
    }
  };
  xhr.send();
}

function showNotifications(){
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/notifications.json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

        var notifications = JSON.parse(xhr.responseText);
        console.log(notifications.length)
        /*Show them*/
        if(notifications.length !== 0){
            document.getElementById("noti").style.display = "block"
            var top = 71;
            for(not of notifications){
                if(not.username === userLogin){
                    /*HTML GO SHOW*/
                    // Get the parent element where you want to append the HTML
                    const parent = document.getElementById('notifications');

                    /*Create Parameters*/
                    var status = "";
                    var icon = "";
                    if(not.status === "pending"){
                        status = "Your reservation at "+not.time+" at "+not.date+" is expected to be approved by the admin."
                        icon = "<svg id=\"notiIcon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z\"/></svg>"
                    }else if(not.status === "confirmed"){
                        status = "Your booking has been approved. Please be at the venue 10 minutes before."
                        icon = "<svg id=\"notiIcon\" style=\"fill:#65B500; \" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z\"/></svg>"
                    }else if (not.status === "declined"){
                        status = "Your reservation at "+not.time+" at "+not.date+" has been declined."
                        icon = "<svg id=\"notiIcon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z\"/></svg>"
                    }else if (not.status === "qr"){
                        status = "The QR Code has been sent to your email."
                        icon = "<svg id=\"notiIcon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zM64 96v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336zm64 16v64h64V352H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64H320v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16v64c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V304zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z\"/></svg>"
                    }
                    // Create a new div element to hold the HTML
                    const div = document.createElement('div');

                    // Set the innerHTML of the div to your desired HTML
                    div.innerHTML = `
                        <div id="goNotis" style="top:`+top+`px;">
                            `+icon+`
                            <div id="notisGoText">`+status+`</div>
                            <div id="notiTime">`+not.notification_time+`</div>
                            <div id="lineNoti"></div>
                        </div>
                    `;
                    parent.appendChild(div.cloneNode(true));
                    top = top+67;
                }
            }

        }else{
            document.getElementById("noti").style.display = "none"
            document.getElementById("noNotis").style.display = "block";
        }
        console.log(notifications)
    }
  };
  xhr.send();
}

function searchTheRooms(){
    //first if
    const date = document.getElementById("calendarText1").innerText
    const time = document.getElementById("calendarText2").innerText
    const guests = document.getElementById("calendarText3").innerText
    if(date==="Date" || time==="Time" || guests==="Guests"){
        alert("Please fill in the details listed at the top of the page")
        return;
    }
    
    /*scroller*/
    window.scroll({
        top: 1024,
        left: 0,
        behavior: 'smooth'
    });

    /*show the available rooms*/
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/reservation.json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var reservation = JSON.parse(xhr.responseText);
            console.log(reservation)

            /*Compare*/
            for (const res of reservation) {
                console.log(res.time);
                if(res.time === time && res.date === date){
                    if(res.roomname === "Study Hive"){
                        document.getElementById("rowone").style.opacity = "40%";
                        document.getElementById("rowone").style.pointerEvents = "none";
                    }else if(res.roomname === "Brainstorm Bunker"){
                        document.getElementById("rowtwo").style.opacity = "40%";
                        document.getElementById("rowtwo").style.pointerEvents = "none";
                    }else if(res.roomname === "Innovation Room"){
                        document.getElementById("rowthree").style.opacity = "40%";
                        document.getElementById("rowthree").style.pointerEvents = "none";
                    }else if(res.roomname === "Idea Lab"){
                        document.getElementById("rowfour").style.opacity = "40%";
                        document.getElementById("rowfour").style.pointerEvents = "none";
                    }else if(res.roomname === "Think Tank"){
                        document.getElementById("rowfive").style.opacity = "40%";
                        document.getElementById("rowfive").style.pointerEvents = "none";
                    }
                }
            }
        }
    };
    xhr.send();
}

function setBackOpacity(){
    
    document.getElementById("rowone").style.opacity = "100%";
    document.getElementById("rowone").style.pointerEvents = "auto";
    
    document.getElementById("rowtwo").style.opacity = "100%";
    document.getElementById("rowtwo").style.pointerEvents = "auto";
    
    document.getElementById("rowthree").style.opacity = "100%";
    document.getElementById("rowthree").style.pointerEvents = "auto";
    
    document.getElementById("rowfour").style.opacity = "100%";
    document.getElementById("rowfour").style.pointerEvents = "auto";
    
    document.getElementById("rowfive").style.opacity = "100%";
    document.getElementById("rowfive").style.pointerEvents = "auto";
    
}

function deleteReservation(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/reservation.json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var reservation = JSON.parse(xhr.responseText);
            console.log("Delete")
            var userResponse = window.confirm("Do you want to delete your "+document.getElementById("status").innerText+" reservation?");
            if (userResponse) {
                const id = document.getElementById("idOfRes").innerText
                console.log(id)
                // User clicked "OK" or "Yes" button
                // Perform the desired action here
                console.log("User wants to proceed.");
            // Add your code here for the desired action
            } else {
                // User clicked "Cancel" or "No" button
                // Perform an alternative action here
                console.log("User wants to cancel.");
                // Add your code here for the alternative action
            }
        }
    };
    xhr.send();
}

function editReservation(){
    console.log("Edit")

}

function logOut(){
    window.location.href = 'user_login.html'
}