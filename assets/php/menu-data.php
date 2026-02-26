<?php
// /assets/php/menu-data.php

$menu_items = [
    [
        'name' => 'Earth Cuts',
        'desc' => 'Raw skin fries, organic sunflower oil, sea salt',
        'price' => '€6.50',
        'img' => 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600&h=800'
    ],
    [
        'name' => 'The Forest Stack',
        'desc' => 'Burger, wild mushrooms, garlic mayo, hemp seeds',
        'price' => '€14.00',
        'img' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600&h=600'
    ],
    [
        'name' => 'Muddy Croquettes',
        'desc' => 'Heritage potato, chickpea flour, parsley broth',
        'price' => '€9.50',
        'img' => 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600&h=900'
    ],
    [
        'name' => 'Truffle Rain',
        'desc' => 'Loaded fries, truffle oil, parmesan snow, chives',
        'price' => '€11.00',
        'img' => 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600&h=700'
    ],
    [
        'name' => 'The Chorizo Bomb',
        'desc' => 'Loaded fries, spicy chorizo, aioli, pickled onion',
        'price' => '€10.50',
        'img' => 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600&h=600'
    ],
    [
        'name' => 'Green Patch',
        'desc' => 'Plant-based loaded fries, herb cream, roasted veg',
        'price' => '€9.00',
        'img' => 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=600&h=800'
    ],
    [
        'name' => 'The Golden Ratio',
        'desc' => 'Classic fries, gold curry sauce, crispy shallots',
        'price' => '€7.50',
        'img' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600&h=900'
    ],
    [
        'name' => 'Smoke Signal',
        'desc' => 'BBQ pulled jackfruit on fries, slaw, smoked paprika',
        'price' => '€10.00',
        'img' => 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=600&h=700'
    ],
    [
        'name' => 'Midnight Stack',
        'desc' => 'Double smash burger, black bun, caramelized onion',
        'price' => '€15.50',
        'img' => 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=600&h=800'
    ]
];

// Return as JSON
if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
    header('Content-Type: application/json');
    echo json_encode($menu_items);
    exit;
}

return $menu_items;
?>