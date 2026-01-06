<?php
/**
 * Contact Form Handler
 * Elena Vance Realty Microsite
 */

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING) ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '';
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING) ?? '';
$interest = filter_input(INPUT_POST, 'interest', FILTER_SANITIZE_STRING) ?? '';
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) ?? '';

// Validate required fields
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($interest)) {
    $errors[] = 'Please select your interest';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// In production, you would:
// 1. Send an email notification
// 2. Save to a database
// 3. Integrate with a CRM
// 4. Add spam protection (reCAPTCHA, honeypot, etc.)

// Example email sending (uncomment and configure in production)
/*
$to = 'elena@elenavance.com';
$subject = "New Contact Form Submission - $interest";

$body = "
New contact form submission from the website:

Name: $name
Email: $email
Phone: $phone
Interest: $interest

Message:
$message

---
Sent from Elena Vance Realty website
";

$headers = [
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion()
];

mail($to, $subject, $body, $headers);
*/

// Log submission (for demo purposes)
$log_entry = date('Y-m-d H:i:s') . " | $name | $email | $interest\n";
// file_put_contents('contact_log.txt', $log_entry, FILE_APPEND);

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Thank you for your message. I will be in touch within 24 hours.'
]);
