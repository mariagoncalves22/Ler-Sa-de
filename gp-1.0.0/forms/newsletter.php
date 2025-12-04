<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['email'];
  $contact->from_email = $_POST['email'];
  $contact->subject ="New Subscription: " . $_POST['email'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['email'], 'Email');
  if (!empty($_POST['would_buy'])) {
    $contact->add_message( $_POST['would_buy'], 'Would Buy');
  }
  if (!empty($_POST['calls_per_month'])) {
    $contact->add_message( $_POST['calls_per_month'], 'Calls per month');
  }
  if (!empty($_POST['budget'])) {
    $contact->add_message( $_POST['budget'], 'Budget');
  }
  if (!empty($_POST['page'])) {
    $contact->add_message( $_POST['page'], 'Page');
  }

  $result = $contact->send();
  echo $result;

  // Try to send a simple thank-you autoresponse to the subscriber.
  // Note: For reliable delivery you should configure SMTP in the class above.
  if (!empty($_POST['email'])) {
    $to = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if ($to) {
      $subject = 'Obrigado pela sua subscrição — Ler+Saúde';
      $message = "<html><body>".
                 "<p>Olá,</p>".
                 "<p>Obrigado por subscrever a newsletter da Ler+Saúde. Iremos contactá-lo com novidades e convites para testes early-access.</p>".
                 "<p>Se tiver alguma questão, responda a este email.</p>".
                 "<p>— Equipa Ler+Saúde</p>".
                 "</body></html>";
      $headers = "MIME-Version: 1.0" . "\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
      $headers .= 'From: Ler+Saúde <' . $receiving_email_address . '>' . "\r\n";
      // Suppress warnings if mail not configured on server
      @mail($to, $subject, $message, $headers);
    }
  }
?>
