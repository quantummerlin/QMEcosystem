// ============================================
// LOVE BLUEPRINT SYNTHESIS
// ============================================
// Combines Venus (how they love), Mars (what they desire), 
// and 7th House (who they attract) for comprehensive
// relationship pattern analysis
// ============================================

function generateLoveBlueprint(venusSign, marsSign, house7Sign) {
    // Venus-Mars combinations create unique love expressions
    const venusMarsPatterns = {
        'Fire-Fire': {
            dynamic: 'Pionero apasionado',
            keywords: 'atrevido, espontáneo, aventurero, directo',
            essence: 'ama con fuego, deseos con fuego: una doble llama de búsqueda apasionada y afecto audaz.'
        },
        'Fire-Earth': {
            dynamic: 'Llama constante',
            keywords: 'acción romántica apasionada pero fundamentada, deseo estable',
            essence: 'ama con fuego, deseos con tierra: el romance apasionado se encuentra con el compromiso práctico'
        },
        'Fire-Air': {
            dynamic: 'Chispa brillante',
            keywords: 'juguetón, expresivo, romance social, pasión intelectual',
            essence: 'ama con fuego, deseos con aire: el entusiasmo brillante se encuentra con una conexión curiosa'
        },
        'Fire-Water': {
            dynamic: 'Vapor y calor',
            keywords: 'Acción intensa, emocional, pasión protectora, fuego profundo.',
            essence: 'ama con fuego, deseos con agua: la intensidad apasionada se encuentra con la profundidad emocional'
        },
        'Earth-Fire': {
            dynamic: 'Pasión fundamentada',
            keywords: 'Leal pero emocionante, aventura sensual, chispa estable.',
            essence: 'ama con tierra, desea con fuego: la devoción sensual se encuentra con la búsqueda activa'
        },
        'Earth-Earth': {
            dynamic: 'montaña sólida',
            keywords: 'Construcción firme, sensual, tradicional y paciente.',
            essence: 'ama con la tierra, desea con la tierra: la doble conexión a tierra crea una lealtad inquebrantable'
        },
        'Earth-Air': {
            dynamic: 'Soñador práctico',
            keywords: 'Afecto reflexivo, atracción mental, comunicación fundamentada.',
            essence: 'ama con la tierra, desea con el aire: la devoción tangible se encuentra con la conexión intelectual'
        },
        'Earth-Water': {
            dynamic: 'Jardín fértil',
            keywords: 'nutritivo, emocionalmente estable, profundidad sensual, atención al paciente',
            essence: 'ama con la tierra, deseos con el agua: el cuidado práctico se encuentra con la intuición emocional'
        },
        'Air-Fire': {
            dynamic: 'Llama alimentada por el viento',
            keywords: 'Comunicación emocionante, social, aventurera, lúdica.',
            essence: 'ama con aire, desea con fuego: el encanto intelectual se encuentra con una búsqueda audaz'
        },
        'Air-Earth': {
            dynamic: 'corazón pensante',
            keywords: 'Afecto lógico, ideas estables, compromiso comunicativo.',
            essence: 'ama con aire, desea con tierra: la conexión mental se encuentra con la devoción física'
        },
        'Air-Air': {
            dynamic: 'Doble brisa',
            keywords: 'Intelectual, mariposa social, amante de la libertad, comunicativa.',
            essence: 'ama con aire, desea con aire: la doble ligereza crea un romance que da prioridad a la amistad'
        },
        'Air-Water': {
            dynamic: 'Niebla y niebla',
            keywords: 'Inteligencia emocional, comunicación intuitiva, pensamiento fluido.',
            essence: 'ama con aire, desea con agua: la conexión mental se encuentra con un sentimiento profundo'
        },
        'Water-Fire': {
            dynamic: 'Océano hirviendo',
            keywords: 'Acción intensa y emocional, fuego protector, pasión profunda.',
            essence: 'ama con agua, deseos con fuego: la profundidad emocional se encuentra con el impulso apasionado'
        },
        'Water-Earth': {
            dynamic: 'Raíces profundas',
            keywords: 'Estabilidad enriquecedora, arraigado emocionalmente, profundidad del paciente.',
            essence: 'ama con agua, desea con tierra: la sabiduría emocional se encuentra con la devoción leal'
        },
        'Water-Air': {
            dynamic: 'Formación de nubes',
            keywords: 'Comunicación intuitiva, ideas emocionales, expresión fluida.',
            essence: 'ama con agua, desea con aire: el sentimiento profundo se encuentra con la exploración mental'
        },
        'Water-Water': {
            dynamic: 'Océano profundo',
            keywords: 'psíquico, empático, profundamente intuitivo, fusionando almas.',
            essence: 'ama con agua, desea con agua: la doble profundidad crea una fusión emocional oceánica'
        }
    };
    
    // Get elements
    const venusElement = venusSign.element;
    const marsElement = marsSign.element;
    const pattern = venusMarsPatterns[`${venusElement}-${marsElement}`];
    
    // 7th house adds the "type" they attract
    const house7Archetypes = {
        'Aries': 'Iniciadores audaces, líderes confiados, guerreros apasionados.',
        'Taurus': 'proveedores estables, almas sensuales, compañeros leales',
        'Gemini': 'Comunicadores ingeniosos, mentes curiosas, espíritus juguetones.',
        'Cancer': 'cuidadores cariñosos, anclas emocionales, constructores de viviendas',
        'Leo': 'Artistas radiantes, corazones generosos, espíritus creativos.',
        'Virgo': 'Curanderos serviciales, analistas reflexivos, servidores devotos.',
        'Libra': 'Diplomáticos armoniosos, apreciadores estéticos, socios justos.',
        'Scorpio': 'Transformadores intensos, profundidades apasionadas, almas magnéticas.',
        'Sagittarius': 'filósofos aventureros, espíritus libres, buscadores de la verdad',
        'Capricorn': 'Constructores ambiciosos, líderes responsables, triunfadores pacientes.',
        'Aquarius': 'Rebeldes innovadores, individuos únicos, visionarios humanitarios.',
        'Pisces': 'Artistas soñadores, curanderos compasivos, almas místicas.'
    };
    
    const attracted = house7Archetypes[house7Sign.name];
    
    return {
        title: `Plano del Amor: ${pattern.dynamic}`,
        subtitle: `Venus en ${venusSign.name} × Marte en ${marsSign.name} → Casa 7 en ${house7Sign.name}`,
        keywords: pattern.keywords.split(',').map(k => k.trim()),
        pattern: pattern.dynamic,
        essence: pattern.essence,
        attracted: attracted,
        venusElement: venusElement,
        marsElement: marsElement,
        synthesis: generateLoveSynthesis(venusSign, marsSign, house7Sign, pattern, attracted)
    };
}

function generateLoveSynthesis(venusSign, marsSign, house7Sign, pattern, attracted) {
    const synthesis = `El corazón de este pequeño habla el lenguaje de ${pattern.dynamic.toLowerCase()}. Su Venus en ${venusSign.name} significa que expresa el afecto a través de ${getVenusExpression(venusSign.name)}, mientras que Marte en ${marsSign.name} lo impulsa hacia ${getMarsDesire(marsSign.name)}.

La magia ocurre en la danza entre cómo ama y lo que desea. ${pattern.essence}. Esto crea una firma romántica única que se irá desarrollando a medida que crezca - ${pattern.keywords}.

Su casa 7 en ${house7Sign.name} revela un patrón fascinante: magnetiza naturalmente a ${attracted}. Esto no es aleatorio - es su alma buscando espejos perfectos y maestros en las relaciones. Observa cómo, incluso de niño, se siente atraído por ciertos tipos de personalidad, ciertas energías que reflejan ${get7thHouseMeaning(house7Sign.name)}.

A medida que crezca en su yo relacional, descubrirá que el amor no es solo una cosa - es la hermosa complejidad de desear (Marte), dar (Venus) y recibir (casa 7) todo entrelazado en su propio lenguaje amoroso único.`;

    return synthesis;
}

function getVenusExpression(sign) {
    const expressions = {
        'Aries': 'Gestos atrevidos, afecto directo y competencia juguetona: aman a través de la acción y el coraje.',
        'Taurus': 'Toque sensual, presencia leal y regalos tangibles: aman a través de la devoción física y la estabilidad.',
        'Gemini': 'palabras, ideas y comunicación lúdica: les encanta a través de la estimulación mental y la variedad',
        'Cancer': 'Cuidado cariñoso, sintonía emocional y ternura protectora: aman a través del sentimiento y la seguridad.',
        'Leo': 'gran romance, expresión creativa y calidez generosa: aman a través del resplandor y la celebración.',
        'Virgo': 'servicio servicial, detalles bien pensados ​​y atención dedicada: les encantan los actos de mejora',
        'Libra': 'Armonía, belleza y asociación amable: aman a través del equilibrio y la apreciación estética.',
        'Scorpio': 'Lealtad intensa, fusión profunda e intimidad transformadora: aman a través de una poderosa fusión emocional.',
        'Sagittarius': 'Compañerismo aventurero, expresión honesta y conexión filosófica: aman a través de la libertad y la verdad.',
        'Capricorn': 'Asociación comprometida, devoción responsable y construcción conjunta: aman a través del tiempo y los logros.',
        'Aquarius': 'Amistad única, libertad intelectual y conexión humanitaria: aman a través de la individualidad y los ideales.',
        'Pisces': 'Compasión ilimitada, fantasía romántica y fusión espiritual: aman a través de los sueños y la empatía.'
    };
    return expressions[sign];
}

function getMarsDesire(sign) {
    const desires = {
        'Aries': 'Conquista, desafío y acción inmediata: su deseo arde ardiente, rápido y sin miedo.',
        'Taurus': 'Placer sensual, construcción constante y satisfacción física: su deseo se mueve lenta, profunda y sensualmente.',
        'Gemini': 'Estimulación mental, variedad e intercambio lúdico: su deseo vive en la curiosidad y la comunicación.',
        'Cancer': 'Seguridad emocional, conexión protectora e intimidad enriquecedora: su deseo fluye a través del sentimiento y la seguridad.',
        'Leo': 'Pasión creativa, expresión dramática y atención de admiración: su deseo irradia orgullo y alegría.',
        'Virgo': 'Perfección, servicio útil y conexión reflexiva: su deseo se manifiesta a través del análisis y la mejora.',
        'Libra': 'Armonía, placer estético y asociación amable: su deseo busca el equilibrio y la belleza.',
        'Scorpio': 'fusión intensa, poder transformador y verdad profunda: su deseo se sumerge en profundidades emocionales',
        'Sagittarius': 'Exploración aventurera, crecimiento filosófico y libertad: su deseo se expande a través de la experiencia y el significado.',
        'Capricorn': 'logro, dominio y éxito duradero: su deseo aumenta constantemente hacia metas ambiciosas.',
        'Aquarius': 'Innovación, expresión única e ideales revolucionarios: su deseo se rebela hacia el futuro.',
        'Pisces': 'trascendencia espiritual, creación artística y compasión ilimitada: su deseo se disuelve en el amor universal.'
    };
    return desires[sign];
}

function get7thHouseMeaning(sign) {
    const meanings = {
        'Aries': 'su necesidad de desarrollar coraje, independencia y autoafirmación a través de la asociación',
        'Taurus': 'su necesidad de aprender estabilidad, sensualidad y el valor de la paciencia a través de las relaciones',
        'Gemini': 'su necesidad de cultivar la comunicación, la curiosidad y la flexibilidad mental a través de la conexión',
        'Cancer': 'su necesidad de abrazar la vulnerabilidad emocional, la crianza y la construcción del hogar a través del amor',
        'Leo': 'su necesidad de brillar con luz propia, creatividad y autoexpresión generosa a través de la asociación',
        'Virgo': 'su necesidad de desarrollar el discernimiento, el servicio y la devoción práctica a través de las relaciones',
        'Libra': 'su necesidad de dominar la armonía, la diplomacia y el arte de la verdadera asociación',
        'Scorpio': 'su necesidad de sumergirse en la profundidad emocional, la transformación y el poder auténtico a través de la intimidad',
        'Sagittarius': 'su necesidad de expandirse a través de la aventura, la búsqueda de la verdad y el crecimiento filosófico',
        'Capricorn': 'su necesidad de construir estructuras duraderas, abrazar la responsabilidad y lograr a través de la asociación',
        'Aquarius': 'su necesidad de innovar, abrazar la singularidad y conectar con ideales colectivos a través de las relaciones',
        'Pisces': 'su necesidad de rendirse, desarrollar la compasión y disolver los límites a través de la conexión espiritual'
    };
    return meanings[sign];
}
