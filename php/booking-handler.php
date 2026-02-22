<?php
// /php/booking-handler.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read JSON input or POST form data
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    $errors = [];

    if (empty($name)) {
        $errors[] = 'Naam is verplicht.';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Geldig e-mailadres is verplicht.';
    }
    if (empty($message)) {
        $errors[] = 'Bericht is verplicht.';
    }

    if (count($errors) > 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
        exit;
    }

    // Save to booking.json
    $booking = [
        'id' => uniqid(),
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'message' => $message
    ];

    $filename = __DIR__ . '/../bookings.json';
    $bookings = [];
    if (file_exists($filename)) {
        $existing = json_decode(file_get_contents($filename), true);
        if (is_array($existing)) {
            $bookings = $existing;
        }
    }
    $bookings[] = $booking;

    // Create bookings.json if it doesn't exist and save
    if (file_put_contents($filename, json_encode($bookings, JSON_PRETTY_PRINT))) {

        // Simulate sending email
        $to = 'hello@patatos.nl';
        $subject = 'Nieuwe Boekingsaanvraag van ' . $name;
        $body = "Naam: $name\nE-mail: $email\n\nBericht:\n$message";
        $headers = "From: noreply@patatos.nl\r\nReply-To: $email";

        // @mail($to, $subject, $body, $headers); // Uncomment in production

        echo json_encode(['success' => true, 'message' => 'Bedankt! We hebben je aanvraag ontvangen en nemen snel contact op.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Er is een fout opgetreden bij het opslaan. Probeer het later opnieuw.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>