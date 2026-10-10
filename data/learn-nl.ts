import { Lesson } from './learn';

export const LESSONS_NL: Lesson[] = [
    // --- Cursus 1: Angst Begrijpen ---
    {
        id: '1',
        courseId: 'understanding-anxiety',
        title: 'Wat is angst?',
        icon: null,
        iconSource: require('../assets/images/learn/icon_anxiety.jpeg'),
        color: 'bg-teal-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Wat is angst?',
                text: [
                    'Angst is een veelzijdige en diepgaande emotionele toestand die veel verder gaat dan gewone stress of een vluchtige bezorgdheid. Het is een fundamentele, biologische reactie die optreedt wanneer iemand anticipeert op een toekomstige dreiging—ongeacht of die dreiging reëel, direct en fysiek is, of geheel abstract en denkbeeldig.',
                    'In de kern is angst een beschermingsmechanisme van bezorgdheid; een toestand waarin de geest zich projecteert in een mogelijk toekomstig scenario vol gevaar of mislukking. Het is een geavanceerd overlevingssysteem, geen teken dat je \'kapot\' bent.',
                    'Om werkelijk te begrijpen waarom angst zo aanvoelt, moeten we terugreizen in de tijd naar de barre, meedogenloze omgevingen van onze prehistorische voorouders.'
                ],
                image: '🏃',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'Voor onze voorouders ging \'stress\' niet over het halen van een deadline; het was een kwestie van leven of dood. Geritsel in het gras kon een roofdier betekenen. Wie overleefde, kon ogenblikkelijk overschakelen van ontspanning naar opperste fysieke paraatheid.',
                    'Deze noodzaak tot snelheid dreef de evolutie van de \'vecht- of vlucht\'-reactie. Zodra gevaar wordt waargenomen, slaat de amygdala alarm en komen adrenaline en cortisol vrij.',
                    'Tegenwoordig leven we in een moderne wereld met een oerbrein. De \'tijgers\' van nu zijn e-mails en volle treinen. Ons alarmsysteem kan het verschil niet zien tussen een roofdier en spreken in het openbaar.'
                ]
            },
            {
                type: 'conclusion',
                text: [
                    'De eerste stap naar herstel is een meelevend begrip ontwikkelen voor dit mechanisme. Je bent geen \'nerveus persoon\'; je ervaart een tijdelijke, intense fysiologische reactie.',
                    'Net zoals je angst voor bepaalde triggers hebt aangeleerd, kun je die ook weer afleren. Door te oefenen kun je het \'volume\' van je amygdala omlaag draaien.',
                    'Ga door naar de volgende les over de Fysieke & Mentale Effecten, waarin we de beangstigende symptomen van angst ontleden en laten zien dat het onschadelijke biologische processen zijn.'
                ]
            }
        ]
    },
    {
        id: '2',
        courseId: 'understanding-anxiety',
        title: 'Fysieke & Mentale Effecten',
        icon: '🧠',
        iconSource: null,
        color: 'bg-orange-100',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Fysieke & Mentale Effecten',
                text: [
                    'Paniekaanvallen staan bekend om hun intense fysieke impact. Het komt ontzettend vaak voor dat mensen naar de spoedeisende hulp snellen, overtuigd dat ze sterven. Dit zit niet \'tussen je oren\'; het is een ingrijpende biologische gebeurtenis.',
                    'Hartkloppingen zijn simpelweg je hart dat bloed naar je spieren pompt om je voor te bereiden op rennen. Ademhalingsklachten zoals ademnood ontstaan doordat hyperventilatie de pH-waarde van je bloed tijdelijk verschuift.',
                    'Koude handen? Dat is bloed dat naar je vitale organen trekt ter bescherming. Misselijkheid? Dat is je spijsvertering die tijdelijk pauzeert om energie te sparen.'
                ],
                image: '🧠',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'Mentaal wordt de prefrontale cortex (logica) tijdelijk gedempt en neemt de amygdala (emotie) het over. Dit veroorzaakt \'racende gedachten\' en impulsieve beslissingen.',
                    'Gevoelens zoals derealisatie (de wereld lijkt onecht) en depersonalisatie (je voelt je losgekoppeld van je lichaam) zijn oeroude verdedigingsmechanismen om je emotioneel te distantiëren van trauma.',
                    'Deze effecten creëren een vicieuze cirkel: een fysiek symptoom maakt je bang, er komt meer adrenaline vrij en het symptoom verergert. Deze cirkel doorbreken begint met het herkennen van het symptoom als een onschadelijk alarmsysteem dat vals alarm slaat.'
                ]
            }
        ]
    },
    {
        id: '3',
        courseId: 'understanding-anxiety',
        title: 'Oorzaken & Theorieën',
        icon: null,
        iconSource: require('../assets/images/learn/icon_causes.jpeg'),
        color: 'bg-blue-100',
        duration: '7 min',
        content: [
            {
                type: 'intro',
                title: 'Oorzaken & Theorieën',
                text: [
                    'De vraag \'Waarom ik?\' staat centraal bij angst. Het is zelden één enkele oorzaak, maar een \'biopsychosociaal\' samenspel van factoren. Genetica kan het geweer laden, maar de omgeving haalt de trekker over.',
                    'Hersenchemie speelt een rol: onevenwichtigheden in serotonine, noradrenaline en GABA kunnen het voor de hersenen moeilijker maken om de rem op opwinding te zetten.',
                    'Omgevingsfactoren zoals onveiligheid in de jeugd of chronische moderne stress kunnen het brein kalibreren op overmatige waakzaamheid.'
                ],
                image: 'nerd',
                imageColor: 'bg-blue-100'
            },
            {
                type: 'continuation',
                text: [
                    'Psychologische \'cognitieve vervormingen\' voeden het vuur: catastroferen, zwart-witdenken en emotioneel redeneren wekken angst van binnenuit op.',
                    'Evolutionaire theorie suggereert dat angst een \'mismatch\'-ziekte is: oude hardware in een hypermoderne wereld.',
                    'Door deze kennis te integreren ontstaat een holistische genezing: je biologie kalmeren, je gedachten herkaderen en je leefomgeving aanpassen.'
                ]
            }
        ]
    },
    {
        id: '4',
        courseId: 'understanding-anxiety',
        title: 'De Cyclus van Angst',
        icon: '🔄',
        iconSource: null,
        color: 'bg-pink-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'De Cyclus van Angst',
                text: [
                    'Angst werkt vaak in een zichzelf in stand houdende cyclus. Het begint meestal met een Trigger—intern (een gedachte, een lichamelijke sensatie) of extern (een specifieke plek, een situatie).',
                    'Deze trigger leidt tot een Perceptie van Gevaar: je brein bestempelt de situatie als onveilig. Dit activeert onmiddellijk de Angstreactie (lichamelijke symptomen, spanning).',
                    'Cruciaal is dat de volgende stap vaak Vermijding of Veiligheidsgedrag is. Je verlaat het feestje, pakt een pilletje of leidt jezelf af. Hoewel dit kortstondige opluchting biedt, bevestigt het aan je brein dat de situatie daadwerkelijk gevaarlijk was.'
                ],
                image: '🔄',
                imageColor: 'bg-pink-100'
            },
            {
                type: 'conclusion',
                text: [
                    'Deze cyclus versterkt de angst in de loop van de tijd. De enige manier om hem te doorbreken is je reactie veranderen. In plaats van te vluchten, leer je \'aanwezig te blijven\' bij het gevoel.',
                    'Door de trigger onder ogen te zien en te overleven zonder veiligheidsgedrag, herprogrammeer je je amygdala: \'Dit voelt ongemakkelijk, maar ik ben veilig.\''
                ]
            }
        ]
    },
    {
        id: '5',
        courseId: 'understanding-anxiety',
        title: 'Mythen Ontkracht',
        icon: '🚫',
        iconSource: null,
        color: 'bg-red-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Mythen Ontkracht',
                text: [
                    'Mythe 1: \'Angst is een zwakte.\' Onwaar. Het vergt juist immense energie en kracht om te functioneren terwijl je de last van angst draagt. Het is biologisch, geen karakterfout.',
                    'Mythe 2: \'Je kunt je er gewoon overheen zetten.\' Onwaar. Je kunt met wilskracht net zomin een plotselinge adrenalinegolf stoppen als diabetes wegwensen.',
                    'Mythe 3: \'Angst betekent dat je gek wordt.\' Onwaar. Angst is in feite een toestand van hyper-helderheid: je bent je overmatig bewust van de realiteit, niet het contact ermee aan het verliezen.'
                ],
                image: '🚫',
                imageColor: 'bg-red-100'
            }
        ]
    },
    {
        id: '6',
        courseId: 'understanding-anxiety',
        title: 'Jouw Persoonlijke Patroon',
        icon: '🧩',
        iconSource: null,
        color: 'bg-indigo-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Jouw Persoonlijke Patroon',
                text: [
                    'Angst uit zich bij iedereen anders. De een voelt het in de maag, de ander in de borst. De een piekert over gezondheid, de ander over sociale situaties.',
                    'Het ontdekken van jouw unieke \'handtekening\' is cruciaal. Wat zijn jouw vroege waarschuwingssignalen? Prikkelbaarheid? Klemmen van je kaken? Slecht slapen?',
                    'Door je persoonlijke patroon in kaart te brengen, kun je vroegtijdig ingrijpen voordat een rimpeling van angst aanzwelt tot een vloedgolf.'
                ],
                image: '🧩',
                imageColor: 'bg-indigo-100'
            }
        ]
    },

    // --- Cursus 2: Korte Termijn Verlichting ---
    {
        id: '7',
        courseId: 'short-term-relief',
        title: 'Box Ademhaling',
        icon: '📦',
        iconSource: null,
        color: 'bg-cyan-100',
        duration: '3 min',
        content: [
            {
                type: 'intro',
                title: 'Box Ademhaling',
                text: [
                    'Box ademhaling (vierkantsademhaling) is een krachtige techniek die door Navy SEALs wordt gebruikt om kalm te blijven onder extreme druk. Het reguleert het autonome zenuwstelsel.',
                    'De methode is eenvoudig: 4 seconden inademen, 4 seconden vasthouden, 4 seconden uitademen, 4 seconden vasthouden. Het visualiseren van een vierkant helpt hierbij.'
                ],
                image: '📦',
                imageColor: 'bg-cyan-100'
            },
            {
                type: 'exercise',
                title: 'Probeer het nu',
                text: [
                    'Laten we oefenen. Sluit je ogen als dat veilig voelt.',
                    'Adem in... 2... 3... 4.',
                    'Vasthouden... 2... 3... 4.',
                    'Adem uit... 2... 3... 4.',
                    'Vasthouden... 2... 3... 4.',
                    'Herhaal deze cyclus een paar minuten om je hartslag te verlagen en je geest te kalmeren.'
                ]
            }
        ]
    },
    {
        id: '8',
        courseId: 'short-term-relief',
        title: 'Aarden 5-4-3-2-1',
        icon: '🌳',
        iconSource: null,
        color: 'bg-green-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: '5-4-3-2-1 Aardingstechniek',
                text: [
                    'Wanneer je gedachten naar de toekomst racen, moet je ze verankeren in het heden. Deze techniek gebruikt je vijf zintuigen om je terug te brengen naar de realiteit.',
                    'Benoem 5 dingen die je ziet. Let op kleine details—een barstje in de muur, hoe het licht op een oppervlak valt.',
                    'Benoem 4 dingen die je kunt voelen. Voel de stof van je kleding, het koele glas water, het oppervlak van de tafel.'
                ],
                image: '🌳',
                imageColor: 'bg-green-100'
            },
            {
                type: 'continuation',
                text: [
                    'Benoem 3 dingen die je hoort. Luister voorbij de voor de hand liggende geluiden—verkeer in de verte, een vogel, het zoemen van de koelkast.',
                    'Benoem 2 dingen die je kunt ruiken. Zeep, koffie, regen?',
                    'Benoem 1 ding dat je kunt proeven. Tandpasta van vanochtend, een pepermuntje of een slok water.',
                    'Deze oefening dwingt je hersenen om zintuiglijke input te verwerken, waardoor er minder capaciteit overblijft voor de vicieuze cirkel van angstige gedachten.'
                ]
            }
        ]
    },
    {
        id: '9',
        courseId: 'short-term-relief',
        title: 'Progressieve Spierontspanning',
        icon: '💪',
        iconSource: null,
        color: 'bg-yellow-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Spierontspanning',
                text: [
                    'Angst slaat spanning op in het lichaam, vaak zonder dat we het doorhebben. PMR houdt in dat je specifieke spiergroepen bewust aanspant en vervolgens diep ontspant.',
                    'Door doelbewust spanning te creëren, leer je herkennen hoe het voelt, en het loslaten dat volgt activeert een ontspanningsreactie.'
                ],
                image: '💪',
                imageColor: 'bg-yellow-100'
            },
            {
                type: 'exercise',
                text: [
                    'Begin bij je tenen. Krul ze 5 seconden stevig aan... en laat los. Voel hoe de spanning wegebt.',
                    'Ga naar je kuiten. Aanspannen... en ontspannen.',
                    'Bovenbenen. Aanspannen... loslaten.',
                    'Handen en armen. Maak vuisten... en ontspan.',
                    'Schouders. Trek ze op naar je oren... en laat ze vallen.',
                    'Gezicht. Knijp je ogen en mond samen... en verzacht.',
                    'Scan je lichaam op eventuele resterende spanning en laat ook die los.'
                ]
            }
        ]
    },
    {
        id: '10',
        courseId: 'short-term-relief',
        title: 'Surfen op de Golf',
        icon: '🌊',
        iconSource: null,
        color: 'bg-blue-200',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Surfen op de Golf',
                text: [
                    'Vechten tegen een paniekaanval is als vechten tegen een muistroom—je raakt alleen maar uitgeput. De veiligste manier is meedrijven.',
                    'Visualiseer je angst als een oceaangolf. Hij heeft een piek, maar moet uiteindelijk breken en wegebben. Geen enkele paniekaanval duurt eeuwig.',
                    'Zeg tegen jezelf: \'Ik ben bereid dit ongemakkelijke gevoel te ervaren. Het kan me geen kwaad doen. Ik laat het over me heen spoelen.\''
                ],
                image: '🌊',
                imageColor: 'bg-blue-200'
            }
        ]
    },
    {
        id: '11',
        courseId: 'short-term-relief',
        title: 'De STOP-Methode',
        icon: '🛑',
        iconSource: null,
        color: 'bg-red-200',
        duration: '3 min',
        content: [
            {
                type: 'intro',
                title: 'De STOP-Methode',
                text: [
                    'S - Stop. Pauzeer even met waar je mee bezig bent.',
                    'T - Take a breath (Haal adem). Maak opnieuw verbinding met je ademhaling—het anker van het huidige moment.',
                    'O - Observe (Observeer). Wat gebeurt er vanbinnen? Wat gebeurt er om je heen? Merk het op zonder oordeel.',
                    'P - Proceed (Ga door). Vervolg waar je mee bezig was, maar met deze nieuwe rust, aandacht en intentie.'
                ],
                image: '🛑',
                imageColor: 'bg-red-200'
            }
        ]
    },
    {
        id: '12',
        courseId: 'short-term-relief',
        title: 'Koud Water Schok',
        icon: '❄️',
        iconSource: null,
        color: 'bg-cyan-200',
        duration: '2 min',
        content: [
            {
                type: 'intro',
                title: 'Koud Water Schok',
                text: [
                    'Soms is het brein te luid voor mentale technieken. Dan heb je een fysieke reset nodig. Dit maakt gebruik van de \'duikreflex\' van zoogdieren.',
                    'Spat ijskoud water in je gezicht, vooral rond je ogen en neus, of houd er een koud kompres tegenaan.',
                    'Dit stuurt een krachtig signaal naar de nervus vagus om je hartslag onmiddellijk te vertragen en energie te sparen. Het is een biologische harde herstart bij paniek.'
                ],
                image: '❄️',
                imageColor: 'bg-cyan-200'
            }
        ]
    },
    {
        id: '13',
        courseId: 'short-term-relief',
        title: 'Schud het van je af',
        icon: '🐕',
        iconSource: null,
        color: 'bg-orange-200',
        duration: '2 min',
        content: [
            {
                type: 'intro',
                title: 'Schud het van je af',
                text: [
                    'Wilde dieren schudden na een achtervolging letterlijk de adrenaline van zich af. Mensen bevriezen vaak en slaan de spanning op.',
                    'Ga staan en schud krachtig je handen, armen en benen los. Veer op je hielen. Beweeg vrijuit.',
                    'Dit helpt overtollige stresshormonen in je spieren af te breken en geeft je lichaam het signaal dat het gevaar geweken is.'
                ],
                image: '🐕',
                imageColor: 'bg-orange-200'
            }
        ]
    },

    // --- Cursus 3: Lange Termijn Veerkracht ---
    {
        id: '14',
        courseId: 'long-term-resilience',
        title: 'Slaaphygiëne',
        icon: '😴',
        iconSource: null,
        color: 'bg-indigo-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Slaaphygiëne',
                text: [
                    'Slaap en angst beïnvloeden elkaar wederzijds. Angst verstoort je slaap; slecht slapen verergert angst.',
                    'Geef prioriteit aan een ontspannende avondroutine. Geen schermen het laatste uur voor het slapengaan. Houd je slaapkamer koel en donker.',
                    'Kun je na 20 minuten nog niet slapen? Sta dan op. Je bed associëren met woelen creëert geconditioneerde slapeloosheid.'
                ],
                image: '😴',
                imageColor: 'bg-indigo-200'
            }
        ]
    },
    {
        id: '15',
        courseId: 'long-term-resilience',
        title: 'Voeding & Darmgezondheid',
        icon: '🥦',
        iconSource: null,
        color: 'bg-green-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Voeding & Darmgezondheid',
                text: [
                    'De darmen worden vaak het \'tweede brein\' genoemd. Ongeveer 95% van je serotonine wordt in je darmen aangemaakt.',
                    'Verminder cafeïne en alcohol—beide zijn krachtige aanjagers van angstgevoelens.',
                    'Kies voor volwaardige voeding, vezels en gefermenteerde producten om een gezond microbioom te ondersteunen, dat via de nervus vagus direct veiligheidssignalen naar je brein stuurt.'
                ],
                image: '🥦',
                imageColor: 'bg-green-200'
            }
        ]
    },
    {
        id: '16',
        courseId: 'long-term-resilience',
        title: 'Bewegen als Medicijn',
        icon: '🚴',
        iconSource: null,
        color: 'bg-red-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Bewegen als Medicijn',
                text: [
                    'Lichaamsbeweging draait niet alleen om conditie; het is een van de meest effectieve natuurlijke strategieën tegen angst.',
                    'Het verbrandt stresshormonen (cortisol en adrenaline), stimuleert de aanmaak van endorfines en went je lichaam aan fysieke opwinding.',
                    'Als je rent, klopt je hart snel—maar niet uit angst. Dit helpt je brein te desensitiseren voor het gevoel van een bonzend hart.'
                ],
                image: '🚴',
                imageColor: 'bg-red-100'
            }
        ]
    },
    {
        id: '17',
        courseId: 'long-term-resilience',
        title: 'Basisprincipes van Mindfulness',
        icon: '🧘',
        iconSource: null,
        color: 'bg-purple-100',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Basisprincipes van Mindfulness',
                text: [
                    'Mindfulness is simpelweg het vermogen om op elk moment te weten wat er in je hoofd omgaat, zonder erdoor meegesleept te worden.',
                    'Het leert je een stap terug te doen en gedachten te observeren als \'mentale gebeurtenissen\' in plaats van onweerlegbare feiten.',
                    'Begin klein. Doe de afwas en wees alleen bezig met de afwas. Voel de warmte, het zeepsop, het gewicht van het bord. Dat is mindfulness.'
                ],
                image: '🧘',
                imageColor: 'bg-purple-100'
            }
        ]
    },
    {
        id: '18',
        courseId: 'long-term-resilience',
        title: 'Cognitieve Herstructurering',
        icon: '🛠️',
        iconSource: null,
        color: 'bg-gray-200',
        duration: '7 min',
        content: [
            {
                type: 'intro',
                title: 'Cognitieve Herstructurering',
                text: [
                    'Dit is de kern van CGT (Cognitieve Gedragstherapie). Het draait om het herkennen en uitdagen van negatieve denkpatronen.',
                    'Vang de gedachte: \'Het gaat helemaal mislukken.\' Onderzoek het: \'Welk bewijs heb ik hiervoor? Welk bewijs spreekt dit tegen?\' Verander het: \'Het kan lastig worden, maar ik heb me voorbereid en ik kan hiermee omgaan.\'',
                    'Het is geen krampachtig positief denken; het is realistisch en evenwichtig denken.'
                ],
                image: '🛠️',
                imageColor: 'bg-gray-200'
            }
        ]
    },
    {
        id: '19',
        courseId: 'long-term-resilience',
        title: 'Basisprincipes van Blootstellingstherapie',
        icon: '🪜',
        iconSource: null,
        color: 'bg-yellow-200',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Basisprincipes van Blootstellingstherapie',
                text: [
                    'We ontwijken vaak wat we vrezen, maar vermijding voedt angst. Blootstelling (exposure) betekent de angst geleidelijk en veilig onder ogen komen.',
                    'Bouw een \'angstladder\'. Als je bang bent voor liften, kan stap 1 zijn naar een foto van een lift kijken. Stap 2, bij een lift gaan staan. Stap 3, even in- en uitstappen.',
                    'Het doel is habituatie (gewenning): in de situatie blijven totdat de angst vanzelf zakt, waarmee je je brein bewijst dat je veilig bent.'
                ],
                image: '🪜',
                imageColor: 'bg-yellow-200'
            }
        ]
    },
    {
        id: '20',
        courseId: 'long-term-resilience',
        title: 'Een Steunsysteem Opbouwen',
        icon: '🤝',
        iconSource: null,
        color: 'bg-teal-200',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Een Steunsysteem Opbouwen',
                text: [
                    'Mensen zijn sociale wezens. Isolatie voedt angst en eenzaamheid.',
                    'Je hebt geen grote menigte nodig. Slechts één of twee vertrouwde personen bij wie je eerlijk kunt zijn, maakt al een wereld van verschil.',
                    'Kwetsbaarheid is kracht. Zeggen: \'Ik voel me momenteel angstig\' kan direct de druk verlagen om het te verbergen of de schijn op te houden.'
                ],
                image: '🤝',
                imageColor: 'bg-teal-200'
            }
        ]
    },
    {
        id: '21',
        courseId: 'long-term-resilience',
        title: 'Zelfcompassie',
        icon: '❤️',
        iconSource: null,
        color: 'bg-rose-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Zelfcompassie',
                text: [
                    'We zijn vaak onze eigen strengste criticus. We verwijten onszelf dat we angstig zijn, wat schaamte toevoegt aan de angst.',
                    'Behandel jezelf zoals je een bang kind of een dierbare vriend zou behandelen. Je zou niet tegen hen schreeuwen.',
                    'Je zou zeggen: \'Het is oké. Ik ben bij je. Dit is moeilijk, maar je staat er niet alleen voor.\' Bied diezelfde tederheid en vriendelijkheid aan jezelf aan.'
                ],
                image: '❤️',
                imageColor: 'bg-rose-200'
            }
        ]
    }
];
