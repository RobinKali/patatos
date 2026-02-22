<?php
// /php/faq-data.php

$faq_categories = [
    [
        'category' => 'ONS VERHAAL',
        'items' => [
            [
                'question' => 'Waar komen jullie aardappelen vandaan?',
                'answer' => 'We werken uitsluitend samen met lokale, regeneratieve boerderijen in Nederland. Onze boeren gebruiken geen kunstmest of chemische bestrijdingsmiddelen, waardoor de bodem gezond blijft en de aardappelen puur smaken.'
            ],
            [
                'question' => 'Wat maakt PATATOS anders dan andere foodtrucks?',
                'answer' => 'Geen industriële rommel. We snijden onze frites met de hand, maken al onze sauzen zelf en gebruiken biologische zonnebloemolie. Het is fast food met een slow food mentaliteit.'
            ],
            [
                'question' => 'Zijn jullie gerechten allergeen-vriendelijk?',
                'answer' => 'We vermelden allergenen duidelijk bij elk gerecht op locatie. Onze frites zijn glutenvrij (gefrituurd in aparte olie), maar omdat we in een kleine truck werken, kunnen we kruisbesmetting nooit 100% uitsluiten.'
            ],
            [
                'question' => 'Zijn er plantaardige opties?',
                'answer' => 'Absoluut. Maar liefst 60% van ons menu is volledig plantaardig of heeft een veganistische optie. Probeer bijvoorbeeld onze Green Patch of Smoke Signal - je zult het vlees niet missen.'
            ]
        ]
    ],
    [
        'category' => 'AGENDA & LOCATIES',
        'items' => [
            [
                'question' => 'Hoe weet ik waar de truck staat?',
                'answer' => 'Volg ons op Instagram @patatosos voor dagelijkse updates, of check de locatiekaart op deze website. We updaten onze planning aan het begin van elke maand.'
            ],
            [
                'question' => 'Staan jullie ook op festivals en markten?',
                'answer' => 'Jazeker! We zijn vaak te vinden op streetfood festivals in Nederland en wekelijkse versmarkten. Check de \'Locaties\' sectie om te zien waar we komend weekend staan.'
            ],
            [
                'question' => 'Kunnen jullie op vaste locaties staan?',
                'answer' => 'We hebben momenteel één vaste spot per week en variëren de rest van de dagen om de straatcultuur levendig te houden. Maar we zijn altijd op zoek naar toffe pop-up locaties!'
            ]
        ]
    ],
    [
        'category' => 'CATERING',
        'items' => [
            [
                'question' => 'Is PATATOS beschikbaar voor privé-evenementen?',
                'answer' => 'Ja! We cateren bruiloften, bedrijfsfeesten, en privé-evenementen voor groepen vanaf 50 personen. Neem contact met ons op via het boekingsformulier onderaan de pagina voor een offerte.'
            ],
            [
                'question' => 'Wat kost catering?',
                'answer' => 'Onze prijzen hangen af van de groepsgrootte, de locatie, en het gekozen menu. Vraag een offerte aan en we maken binnen 48 uur een voorstel op maat.'
            ],
            [
                'question' => 'Hoe ver van tevoren moet ik boeken?',
                'answer' => 'Voor het zomerseizoen (mei-september) raden we aan minstens 3 tot 6 maanden van tevoren te boeken, aangezien we snel vol zitten. Voor andere maanden kun je ons korter van tevoren proberen!'
            ],
            [
                'question' => 'Kunnen we het menu aanpassen?',
                'answer' => 'Zeker, we denken graag mee over een specifiek menu-item dat past bij het thema van je evenement. Laat het ons weten bij je aanvraag!'
            ]
        ]
    ]
];

// Optionally return as JSON if requested via AJAX
if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
    header('Content-Type: application/json');
    echo json_encode($faq_categories);
    exit;
}

return $faq_categories;
?>
