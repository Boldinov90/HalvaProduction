<?php  
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'detroid90@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 's90038430015158s90'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('detroid90@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('detroid90@mail.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Новая заявка на обратный звонок с сайта HALVAPRODUCTION.RU';
$mail->Body    = '<strong>Поступила новая заявка на обратный звонок</strong><br><strong>Имя: </strong>' .$name . '<br><strong>Телефон: </strong>' .$phone .  '<br><strong>Электронный адрес: </strong>'.$email;
$mail->AltBody = '';

if(!$mail->send()) {
    $message = "Ошибка";
} else {
    $message = "Сообщение успешно отправлено!";
}
    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>