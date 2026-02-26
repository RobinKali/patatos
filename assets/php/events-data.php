<?php
// /assets/php/events-data.php

$events = [
    ['name' => 'Noordermarkt Amsterdam', 'date' => '2026-03-08', 'time' => '10:00–17:00', 'address' => 'Noordermarkt, Amsterdam', 'lat' => 52.3749, 'lng' => 4.8864, 'type' => 'Markt'],
    ['name' => 'Rollende Keukens', 'date' => '2026-05-17', 'time' => '12:00–22:00', 'address' => 'Westergasfabriek, Amsterdam', 'lat' => 52.3872, 'lng' => 4.8754, 'type' => 'Festival'],
    ['name' => 'Foodhallen Utrecht', 'date' => '2026-04-12', 'time' => '11:00–20:00', 'address' => 'Vredenburg, Utrecht', 'lat' => 52.0907, 'lng' => 5.1214, 'type' => 'Pop-up'],
    ['name' => 'Breda Street Food Festival', 'date' => '2026-06-20', 'time' => '13:00–23:00', 'address' => 'Chassépark, Breda', 'lat' => 51.5888, 'lng' => 4.7759, 'type' => 'Festival'],
    ['name' => 'Vaste Spot Rotterdam', 'date' => 'Elke Vrijdag', 'time' => '11:30–15:00', 'address' => 'Binnenrotte, Rotterdam', 'lat' => 51.9225, 'lng' => 4.4792, 'type' => 'Vast']
];

// Optionally return as JSON if requested via AJAX
if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
    header('Content-Type: application/json');
    echo json_encode($events);
    exit;
}

return $events;
?>