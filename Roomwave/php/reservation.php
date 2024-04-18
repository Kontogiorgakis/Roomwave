<?php
  $reservation = json_decode(file_get_contents('php://input'), true);
  file_put_contents('reservation.json', json_encode($reservation));
?>
