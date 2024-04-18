function login(){
    var lhr = new XMLHttpRequest();
    lhr.open("GET", "php/users/users.json");
    lhr.onreadystatechange = function() {
      if (lhr.readyState === 4 && lhr.status === 200) {
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        var users = JSON.parse(lhr.responseText);
        for(let user of users){
            if(email===user.email && password===user.password){
                if(user.admin===0){
                    window.location.href = 'panel.html?user=' + user.username
                }
            }
        }
      }
    };
    lhr.send();
}