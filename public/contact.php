<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Get form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  // Create email headers
  $headers = 'From: ' . $name . ' <' . $email . '>' . "\r\n" .
             'Reply-To: ' . $email . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  // Send email
  $to = 'arubiofc@gmail.com';
  $sent = mail($to, $subject, $message, $headers);

  // Check if email was sent
  if ($sent) {
    echo 'Your message has been sent successfully.';
  } else {
    echo 'Sorry, there was an error sending your message. Please try again later.';
  }
}
?>
