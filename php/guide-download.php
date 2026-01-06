<?php
/**
 * Guide Download Form Handler
 * Elena Vance Realty Microsite
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING) ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '';
$updates = filter_input(INPUT_POST, 'updates', FILTER_SANITIZE_STRING) === 'on';

$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// In production:
// 1. Add to email marketing list (Mailchimp, ConvertKit, etc.)
// 2. Send automated email with PDF attachment
// 3. Track conversion in analytics

// Example: Add to mailing list
/*
$mailchimp_api_key = 'your-api-key';
$mailchimp_list_id = 'your-list-id';

$data = [
    'email_address' => $email,
    'status' => 'subscribed',
    'merge_fields' => [
        'FNAME' => $name
    ],
    'tags' => ['guide-download']
];

// Add to Mailchimp via API...
*/

echo json_encode([
    'success' => true,
    'message' => 'Check your inbox! The guide is on its way.',
    'download_url' => '/assets/downloads/considered-buyers-guide.pdf'
]);
