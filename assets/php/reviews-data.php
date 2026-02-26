<?php
// /assets/php/reviews-data.php

$reviews = [
    ['name' => 'Milou V.', 'city' => 'Amsterdam', 'stars' => 5, 'text' => 'De beste loaded fries die ik ooit heb gehad. De truffle rain is absurd lekker. Ze stonden op de Noordermarkt en de rij was het meer dan waard.', 'platform' => 'Google'],
    ['name' => 'Daan K.', 'city' => 'Rotterdam', 'stars' => 5, 'text' => 'PATATOS heeft onze bedrijfsborrel compleet gemaakt. Professioneel, lekker, en de truck ziet er geweldig uit. Iedereen wilde weten wie ze waren.', 'platform' => 'Google'],
    ['name' => 'Sara M.', 'city' => 'Utrecht', 'stars' => 5, 'text' => 'Als plantaardige eter was ik sceptisch over een frites truck, maar de Green Patch en de Muddy Croquettes zijn fenomenaal. Eindelijk iemand die het snapt.', 'platform' => 'Instagram'],
    ['name' => 'Joris B.', 'city' => 'Breda', 'stars' => 5, 'text' => 'Forest Stack burger is het beste wat ik in 2026 heb gegeten. Vol stop. Ze zijn ook super vriendelijk en weten alles over hun ingrediënten.', 'platform' => 'Google'],
    ['name' => 'Lena D.', 'city' => 'Den Haag', 'stars' => 5, 'text' => 'De Chorizo Bomb is verslavend. Ik volg hun Instagram om te weten waar ze staan en rij er elke keer naartoe. Worth it elke keer.', 'platform' => 'Instagram'],
    ['name' => 'Thomas W.', 'city' => 'Eindhoven', 'stars' => 5, 'text' => 'Catering voor ons straatfeest was perfect geregeld. Flexibel, eerlijk geprijsd, en ze namen de hele setup mee. De buren zijn nog steeds aan het praten erover.', 'platform' => 'Facebook'],
];

// Optionally return as JSON if requested via AJAX
if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
    header('Content-Type: application/json');
    echo json_encode($reviews);
    exit;
}

return $reviews;
?>