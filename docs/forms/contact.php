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
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);
  if (!empty($_POST['newsletter'])) {
    $contact->add_message( $_POST['newsletter'], 'Newsletter Opt-in');
  }

  $result = $contact->send();
  echo $result;

  // Send a basic thank-you autoresponse to the sender (best effort).
  if (!empty($_POST['email'])) {
    $to = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if ($to) {
      $subject = 'Obrigado pelo seu contacto — Ler+Saúde';
      $snippet = substr((string)($_POST['message'] ?? ''), 0, 300);
      $message = "<html><body>".
                 "<p>Olá " . htmlspecialchars($_POST['name'] ?? '') . ",</p>".
                 "<p>Obrigado pelo seu contacto. Recebemos a sua mensagem e iremos responder em breve.</p>".
                 "<p>Resumo da sua mensagem: <em>". nl2br(htmlspecialchars($snippet)) ."</em></p>".
                 "<p>— Equipa Ler+Saúde</p>".
                 "</body></html>";
      $headers = "MIME-Version: 1.0" . "\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
      $headers .= 'From: Ler+Saúde <' . $receiving_email_address . '>' . "\r\n";
      @mail($to, $subject, $message, $headers);
    }
  }
?>
