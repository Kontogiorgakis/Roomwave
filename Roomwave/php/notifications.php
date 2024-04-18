<?php
  $notification = json_decode(file_get_contents('php://input'), true);
  file_put_contents('notifications.json', json_encode($notification));
?>
