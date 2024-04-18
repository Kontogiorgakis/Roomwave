<?php
    // Μετατρέπουμε το περιεχόμενο του users.json σε associative array
    $users = json_decode(file_get_contents('users.json'), true);

    function validateCredentials($is_admin) {
        global $users;
        $authenticated = false;
        if (count($users) > 1 && isset($_POST['email']) && isset($_POST['password'])) {
            $email = $_POST['email'];
            $password = $_POST['password'];
            foreach ($users as $user) {
                if ($user['email'] == $email && $user['password'] == $password && $user['admin'] == $is_admin) {
                    $authenticated = true;
                    break;
                }
            }
            if ($authenticated) 
                http_response_code(200);
            else 
                http_response_code(401);
        } 
    }

    if (isset($_POST['user_type'])) {
        switch ($_POST['user_type']) {
            case 'user':
                validateCredentials(0);
                break;
            case 'admin':
                validateCredentials(1);
                break;
        }
    }
?>
