// ============================================
// ADVANCED READINGS - Part of Fortune & Transits
// ============================================

// ============================================
// PART OF FORTUNE BY SIGN
// ============================================

var PART_OF_FORTUNE_READINGS = {
    Aries: {
        title: "Parte de la fortuna en Aries: alegría a través de la acción",
        keywords: ["Iniciativa", "Coraje", "Independencia", "Liderazgo"],
        reading: `Con la Parte de Fortuna en Aries, este niño encuentra su mayor alegría y éxito natural a través de la independencia, el coraje y la toma de iniciativa. Su suerte fluye cuando son audaces, comienzan cosas nuevas y lideran en lugar de seguir.

La suerte les favorece cuando confían en sus instintos y actúan con rapidez. Tienen una habilidad natural para estar en el lugar correcto en el momento correcto cuando son auténticos y asertivos. El éxito se logra mediante el espíritu pionero y la voluntad de ir primero.

Anímelos a iniciar proyectos, asumir riesgos saludables y desarrollar habilidades de liderazgo. Su punto de fortuna se activa a través de la actividad física, los deportes competitivos y situaciones en las que pueden quedar primeros o mejores. Están aprendiendo que su coraje en sí mismo es una forma de suerte.

El universo premia su audacia. Cuando dudan o son demasiado cautelosos, la fortuna parece eludirlos. Cuando saltan con confianza, las puertas se abren mágicamente. Ayúdelos a confiar en este conocimiento interno de que la acción crea oportunidades.`,
        guidance: "La fortuna fluye a través del coraje y la iniciativa. Fomentar la acción y el liderazgo audaces."
    },
    
    Taurus: {
        title: "Parte de la fortuna en Tauro: alegría a través de la estabilidad",
        keywords: ["Seguridad", "Belleza", "Recursos", "Paciencia"],
        reading: `La Parte de la Fortuna en Tauro trae suerte al construir, crear belleza y establecer seguridad. La mayor alegría de este niño proviene de los resultados tangibles, la comodidad material y la acumulación lenta y constante de cosas valiosas, ya sea dinero, habilidades u objetos hermosos.

La fortuna les favorece en cuestiones de finanzas, naturaleza, arte y todo lo que requiera paciencia y perseverancia. Tienen una habilidad natural para atraer recursos y hacer crecer las cosas. Su "pulgar verde" se aplica tanto al dinero como a los jardines y a los proyectos creativos.

Fomentar la inversión en calidad sobre cantidad, conexión con la naturaleza y desarrollo de talentos artísticos. Su punto de fortuna se activa cantando, cocinando, haciendo jardinería o trabajando con las manos. La belleza y la comodidad no son lujos para ellos: son caminos hacia el éxito.

El universo recompensa su paciencia y aprecio por el mundo físico. Las prisas rara vez les traen suerte, pero el compromiso constante y sensual con la vida les abre puertas. Ayúdelos a confiar en que un crecimiento lento es un crecimiento real y que lo que construyen durará.`,
        guidance: "La fortuna fluye a través de la paciencia, la belleza y la creación de valor duradero. Fomentar un crecimiento lento y constante."
    },
    
    Gemini: {
        title: "Parte de la fortuna en Géminis: alegría a través de la conexión",
        keywords: ["Comunicación", "Curiosidad", "Versatilidad", "Aprendiendo"],
        reading: `Con Parte de la Fortuna en Géminis, la suerte de este niño fluye a través de la comunicación, el aprendizaje y el establecimiento de conexiones. Su mayor alegría y éxito provienen de hablar, escribir, enseñar y explorar con infinita curiosidad ideas y personas.

La suerte les favorece cuando hacen contactos, hacen preguntas, leen mucho y comparten información. Parece que "por casualidad" conocen a las personas adecuadas, encuentran el libro adecuado o escuchan exactamente lo que necesitan cuando se encuentran en un estado de abierta curiosidad y comunicación.

Fomente escribir, hablar, estudiar múltiples materias y mantener diversas amistades. Su punto de fortuna se activa a través de las redes sociales, los blogs, la enseñanza a niños más pequeños o cualquier actividad que involucre palabras e ideas. Los hermanos y vecinos también pueden ser fuentes de oportunidades.

El universo premia su agilidad mental y gracia social. Cuando están aislados o atrapados en una perspectiva, la suerte parece agotarse. Cuando se conectan, conversan y aprenden, las sincronicidades se multiplican. Ayúdelos a ver que su curiosidad en sí misma es un imán de buena suerte.`,
        guidance: "La fortuna fluye a través de la comunicación y la curiosidad. Fomentar un amplio aprendizaje y conexión."
    },
    
    Cancer: {
        title: "Parte de la fortuna en Cáncer: alegría a través de la crianza",
        keywords: ["Familia", "Emociones", "Hogar", "Cuidado"],
        reading: `La Parte de la Fortuna en Cáncer trae suerte a través de la familia, el hogar y la conexión emocional. Este niño encuentra su mayor alegría y éxito al cuidar a los demás, crear espacios seguros y honrar sus sentimientos e intuición.

La fortuna les favorece en los asuntos domésticos, los negocios familiares, las funciones de cuidado y cualquier situación en la que la inteligencia emocional importe. Tienen suerte natural con los bienes raíces, la cocina, el cuidado de los niños y la creación de hogares que parecen santuarios. Su intuición sobre las personas y el momento oportuno suele ser notablemente precisa.

Fomentar la cocina, la decoración de su espacio, el cuidado de los hermanos menores o de las mascotas y la expresión de emociones de forma saludable. Su punto de fortuna se activa a través de reuniones familiares, la creación de ambientes acogedores y la confianza en sus instintos. Lo que les parece correcto suele serlo para ellos.

El universo recompensa su autenticidad emocional y su naturaleza cariñosa. Cuando reprimen sentimientos o ignoran las necesidades familiares, la suerte disminuye. Cuando crean seguridad emocional para ellos y para los demás, las oportunidades fluyen. Ayúdelos a confiar en que el cariño es una fortaleza y que el hogar es su base de poder.`,
        guidance: "La fortuna fluye a través de la autenticidad emocional y la crianza. El hogar y la familia son fuentes de energía."
    },
    
    Leo: {
        title: "Parte de la fortuna en Leo: alegría a través de la expresión",
        keywords: ["Creatividad", "Actuación", "Alegría", "Generosidad"],
        reading: `Con Parte de la Fortuna en Leo, la suerte de este niño fluye a través de la autoexpresión creativa, el desempeño y el compartir generoso de sus dones. Su mayor alegría y éxito provienen de ser vistos, celebrados y permitidos brillar auténticamente.

La fortuna los favorece en el escenario, en las actividades creativas, en el romance y en cualquier lugar donde puedan expresar con valentía su personalidad única. Tienen suerte natural en el entretenimiento, las artes, el trabajo con niños y cualquier campo donde el carisma sea importante. Cuando se divierten y son generosos, las oportunidades aparecen mágicamente.

Fomente el teatro, el arte, la música, la danza y cualquier forma de actuación creativa. Su punto de fortuna se activa a través de elogios, celebraciones y situaciones en las que puede ser la estrella. Esto no es vanidad: es su verdadero camino hacia el éxito. Déjalos brillar.

El universo premia su auténtica alegría y su coraje creativo. Cuando atenúan la luz para encajar, la suerte desaparece. Cuando brillan sin pedir disculpas y comparten generosamente su alegría, las puertas se abren en todas partes. Ayúdelos a comprender que su felicidad misma crea fortuna para ellos y para los demás.`,
        guidance: "La fortuna fluye a través de la auténtica autoexpresión y la alegría creativa. Déjalos brillar intensamente."
    },
    
    Virgo: {
        title: "Parte de la fortuna en Virgo: alegría a través del servicio",
        keywords: ["Precisión", "Servicio", "Salud", "Mejora"],
        reading: `La Parte de la Fortuna en Virgo trae suerte a través del servicio, la atención al detalle y la mejora práctica de todo lo que toca. Este niño encuentra la mayor alegría y éxito al ser útil, crear orden y perfeccionar sus habilidades.

La suerte los favorece en los campos de la salud, las industrias de servicios, los oficios que requieren precisión y cualquier función en la que la calidad importe más que la cantidad. Tienen suerte natural cuando son organizados, serviciales y concentrados en mejorar las cosas. Su ojo para los detalles es en realidad una forma de adivinar la fortuna.

Fomentar los sistemas de organización, ayudar en las tareas del hogar, cuidar de las mascotas y desarrollar habilidades especializadas. Su punto de fortuna se activa a través de la rutina, los hábitos saludables y las oportunidades para ser genuinamente útiles. El perfeccionismo puede bloquearlos, pero la excelencia abre puertas.

El universo premia su dedicación a la mejora y al servicio. Cuando son críticos sin ser constructivos, la suerte se estanca. Cuando aplican sus habilidades con ayuda y humildad, las oportunidades se multiplican. Ayúdelos a ver que ser de servicio es la forma en que sirven a su propia fortuna.`,
        guidance: "La fortuna fluye a través de un servicio hábil y atención al detalle. Excelencia sobre perfección."
    },
    
    Libra: {
        title: "Parte de la fortuna en Libra: alegría a través de la asociación",
        keywords: ["Balance", "Relaciones", "Belleza", "Armonía"],
        reading: `Con Parte de la Fortuna en Libra, la suerte de este niño fluye a través de las relaciones, la colaboración y la creación de belleza y armonía. Su mayor éxito no proviene de esfuerzos individuales sino de asociaciones y intercambios equilibrados.

La fortuna los favorece en las artes, el derecho, el asesoramiento, el diseño y cualquier campo que requiera diplomacia o sentido estético. Tienen suerte natural en el amor y la amistad: las personas adecuadas suelen aparecer en el momento adecuado. Su fortuna se multiplica cuando la comparten con otros.

Fomentar proyectos colaborativos, actividades artísticas, habilidades de resolución de conflictos y apreciación de la belleza. Su punto de fortuna se activa a través de asociaciones, eventos sociales y situaciones que requieren justicia y equilibrio. Literalmente necesitan que otros accedan a todo su potencial de suerte.

El universo recompensa su compromiso con la armonía y la justicia. Cuando están demasiado solos o son injustos, la suerte se desvanece. Cuando crean belleza y construyen relaciones equilibradas, abundan las sincronicidades. Ayúdelos a comprender que la asociación no es una debilidad, sino su fuente de poder.`,
        guidance: "La fortuna fluye a través de la asociación y la creación de armonía. La colaboración es clave para el éxito."
    },
    
    Scorpio: {
        title: "Parte de la fortuna en Escorpio: alegría a través de la profundidad",
        keywords: ["Transformación", "Intensidad", "Fuerza", "Verdad"],
        reading: `La Parte de la Fortuna en Escorpio trae suerte a través de la profundidad, la transformación y el compromiso valiente con los misterios de la vida. Este niño encuentra la mayor alegría y éxito a través de una concentración intensa, honestidad emocional y voluntad de transformarse.

La fortuna les favorece en psicología, investigación, curación, gestión de recursos y cualquier campo que requiera profundidad y valentía. Tienen suerte natural con el dinero de otras personas, los recursos compartidos y las situaciones que requieren una profunda confianza. Las crisis a menudo revelan su suerte: tienen suerte en la transformación.

Fomente intereses profundos, habilidades de investigación, honestidad emocional y exploración de los misterios de la vida (apropiadamente para la edad). Su punto de fortuna se activa a través de conexiones profundas, experiencias transformadoras y situaciones que requieren verdadero coraje. La superficialidad bloquea su suerte.

El universo recompensa su coraje emocional y su compromiso con la verdad. Cuando son superficiales o deshonestos, la fortuna se les escapa. Cuando profundizan y abrazan la transformación, se producen poderosas sincronicidades. Ayúdalos a confiar en que la intensidad es su don y la profundidad es su camino hacia el éxito.`,
        guidance: "La fortuna fluye a través de la profundidad y la transformación. Fomente el coraje emocional y el compromiso profundo."
    },
    
    Sagittarius: {
        title: "Parte de la fortuna en Sagitario: alegría a través de la expansión",
        keywords: ["Aventura", "Sabiduría", "Libertad", "Fe"],
        reading: `Con Parte de la Fortuna en Sagitario, la suerte de este niño fluye a través de la exploración, el aprendizaje y la expansión más allá de lo familiar. Su mayor éxito proviene del optimismo, la aventura y el compromiso con el crecimiento y la verdad.

La fortuna los favorece en los viajes, la educación, las publicaciones, la enseñanza y cualquier cosa que involucre diferentes culturas o filosofías. Tienen una suerte extraordinaria cuando viajan, aprenden o comparten sabiduría. Las oportunidades a menudo vienen de lejos o a través de actividades educativas.

Fomentar la lectura amplia, viajar cuando sea posible, aprender idiomas y la exposición a diferentes culturas y creencias. Su punto de fortuna se activa a través de la expansión: física, mental o espiritual. Mantenerse pequeños y seguros en realidad bloquea su suerte.

El universo recompensa su fe y voluntad de explorar. Cuando son pesimistas o de mente estrecha, la suerte desaparece. Cuando son optimistas y están abiertos a la aventura, aparecen oportunidades asombrosas. Ayúdelos a confiar en que su pasión por los viajes y sus maravillas son en realidad herramientas para encontrar fortuna.`,
        guidance: "La fortuna fluye a través de la aventura y la expansión. Fomentar el aprendizaje amplio y la fe optimista."
    },
    
    Capricorn: {
        title: "Parte de la fortuna en Capricornio: alegría a través de los logros",
        keywords: ["Ambición", "Estructura", "Maestría", "Reconocimiento"],
        reading: `La Parte de la Fortuna en Capricornio trae suerte a través de la ambición, los logros y la construcción de estructuras duraderas. Este niño encuentra la mayor alegría y éxito a través de metas, trabajo duro y reconocimiento a través de logros genuinos.

La fortuna los favorece en los negocios, el liderazgo, los campos tradicionales y cualquier ámbito que requiera paciencia y planificación estratégica. Tienen suerte natural con las figuras de autoridad, el avance profesional y el éxito público. El tiempo es su aliado: su fortuna crece a medida que maduran.

Fomente el establecimiento de objetivos, la responsabilidad, el dominio de habilidades y el compromiso con figuras de autoridad que puedan guiarlos. Su punto de fortuna se activa a través de logros, reconocimiento público y situaciones que requieren madurez más allá de su edad. La responsabilidad temprana genera suerte posterior.

El universo premia su disciplina y visión de largo plazo. Cuando son perezosos o buscan atajos, la suerte se desvanece. Cuando trabajan de manera constante para alcanzar metas significativas, se abren puertas en los niveles más altos. Ayúdelos a confiar en que su ambición es saludable y que sus logros se multiplicarán.`,
        guidance: "La fortuna fluye a través de logros disciplinados. Establezca objetivos y recompense el progreso constante."
    },
    
    Aquarius: {
        title: "Parte de la fortuna en Acuario: alegría a través de la innovación",
        keywords: ["Innovación", "Comunidad", "Libertad", "Visión"],
        reading: `Con Parte de la Fortuna en Acuario, la suerte de este niño fluye a través de la innovación, la amistad y el trabajo hacia visiones colectivas. Su mayor éxito proviene de ser diferentes, adoptar la tecnología y contribuir a la comunidad.

La fortuna los favorece en tecnología, trabajo humanitario, esfuerzos grupales y cualquier cosa que se adelante a su tiempo. Tienen suerte natural a través de amistades y afiliaciones grupales: la gente adecuada atrae las oportunidades adecuadas. Su singularidad es en realidad su imán de fortuna.

Fomentar diversas amistades, habilidades tecnológicas, intereses humanitarios y la expresión de sus perspectivas únicas. Su punto de fortuna se activa a través de grupos, proyectos innovadores y situaciones donde se valora ser diferente. El conformismo bloquea su suerte.

El universo premia su autenticidad y compromiso con el bien colectivo. Cuando intentan encajar o son egoístas, la fortuna desaparece. Cuando aceptan lo extraño y trabajan para mejorar la comunidad, las sincronicidades explotan. Ayúdalos a confiar en que lo diferente es igual a lo afortunado para ellos.`,
        guidance: "La fortuna fluye a través de la innovación y la comunidad. Celebre su singularidad y conciencia social."
    },
    
    Pisces: {
        title: "Parte de la fortuna en Piscis: alegría a través de la compasión",
        keywords: ["Intuición", "Compasión", "Creatividad", "Espiritualidad"],
        reading: `La Parte de la Fortuna en Piscis trae suerte a través de la compasión, la imaginación y la conexión espiritual. Este niño encuentra la mayor alegría y éxito ayudando a los demás, expresando su creatividad y confiando en su poderosa intuición.

La fortuna los favorece en las artes, la curación, el trabajo espiritual y cualquier campo que requiera empatía e imaginación. Tienen suerte natural cuando siguen corazonadas intuitivas: sus sueños y sentimientos a menudo los guían al lugar correcto en el momento correcto. Su sensibilidad es en realidad una adivinación psíquica.

Fomente las artes creativas, el servicio compasivo, la exploración espiritual y la confianza en su intuición. Su punto de fortuna se activa a través de la música, el arte, el tiempo cerca del agua, la meditación y situaciones que requieren fe sobre la lógica. Su imaginación literalmente crea su suerte.

El universo recompensa su compasión y fe. Cuando son cínicos o insensibles, la suerte se desvanece. Cuando son abiertos, compasivos y persiguen sus sueños, los milagros ocurren con regularidad. Ayúdalos a comprender que su sensibilidad es un superpoder y que su amabilidad crea su fortuna.`,
        guidance: "La fortuna fluye a través de la compasión y la imaginación. Confíe en su intuición y visiones creativas."
    }
};

// ============================================
// CURRENT TRANSITS READINGS (2026)
// ============================================

var TRANSIT_READINGS = {
    saturn: {
        title: "Lecciones de Saturno: construcción de cimientos",
        currentSign: "Piscis",
        keywords: ["Disciplina", "Límites", "Estructura", "Madurez"],
        reading: `Saturno, el planeta de la estructura y la responsabilidad, actualmente está enseñando lecciones colectivas sobre los límites en los ámbitos espiritual y emocional. Para este pequeño, la influencia de Saturno significa aprender límites saludables, desarrollar resiliencia emocional y comprender que la estructura apoya los sueños en lugar de restringirlos.

A medida que crecen durante este ciclo de Saturno (2023-2026), aprenden que la compasión necesita límites, que los sueños necesitan planes y que las verdades espirituales requieren una aplicación práctica. Estos primeros años les están enseñando a equilibrar la imaginación con la realidad.

Los padres pueden apoyar esto proporcionando rutinas consistentes mientras honran las emociones, establecen límites claros con empatía y muestran que la disciplina crea la libertad de soñar en grande. Las estructuras que construyes ahora se convierten en contenedores de sus visiones futuras.`,
        guidance: "Proporcionar una estructura amorosa. Los límites son regalos que crean seguridad para los sueños."
    },
    
    pluto: {
        title: "La transformación de Plutón - Evolución colectiva",
        currentSign: "Acuario",
        keywords: ["Transformación", "Fuerza", "Renacimiento", "Evolución"],
        reading: `Plutón en Acuario (2024-2044) marca un período de 20 años de profunda transformación en la tecnología, la comunidad y la conexión humana. Este niño nace en una generación que revolucionará la forma en que la humanidad se relaciona y comparte el poder.

Son parte de una misión colectiva para transformar las estructuras de la sociedad, democratizar el poder y crear nuevas formas de comunidad. Su generación cuestionará todo sobre cómo nos organizamos y reconstruiremos desde cero con innovación e igualdad.

Estos primeros años plantan semillas para su papel futuro en la transformación colectiva. Fomente su rebelión natural, su innovación y su preocupación por la justicia. No sólo están aprendiendo a adaptarse al futuro: son la generación que lo crea.`,
        guidance: "Honre su espíritu innovador. Están aquí para ayudar a transformar el mundo."
    },
    
    jupiter: {
        title: "Las bendiciones de Júpiter: crecimiento actual",
        currentSign: "Géminis",
        keywords: ["Crecimiento", "Expansión", "Oportunidades", "Optimismo"],
        reading: `Júpiter en Géminis trae expansión a través de la comunicación, el aprendizaje y la conexión. Actualmente, las oportunidades de crecimiento surgen a través de la exposición a ideas diversas, la educación temprana y el desarrollo de habilidades de comunicación.

Este es un momento excelente para el desarrollo del lenguaje, presentar libros e historias y fomentar la curiosidad por todo. La bendición de Júpiter en Géminis significa que el aprendizaje llega con facilidad y alegría en este momento: cada pregunta es una oportunidad.

Esté atento a los talentos naturales que emergen en la comunicación. Este tránsito de Júpiter sugiere que pueden ser especialmente curiosos, verbales o interesados ​​en aprender durante este período. Alimente esa curiosidad generosamente: es el regalo de Júpiter que les abre la mente.`,
        guidance: "Alimenta su curiosidad. Los libros, las conversaciones y las diversas experiencias generan crecimiento ahora."
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        PART_OF_FORTUNE_READINGS, 
        TRANSIT_READINGS,
        HOUSE_STELLIUM_READINGS,
        WEALTH_BLUEPRINT_READINGS,
        CHAKRA_BLUEPRINT_READINGS,
        ARCHETYPE_SYNTHESIS_READINGS,
        RARITY_CALCULATIONS,
        TIMING_READINGS,
        LOCATION_READINGS,
        HEALTH_BLUEPRINT_READINGS,
        TEACHING_STYLE_READINGS,
        PHILOSOPHICAL_FRAMEWORK_READINGS,
        analyzeHouseConcentration,
        analyzeWealthBlueprint,
        analyzeArchetypes,
        analyzeTripleNumbers,
        analyzeHealthBlueprint,
        analyzeTeachingStyle,
        analyzePhilosophicalFramework,
        analyzeBirthLocation,
        analyzeCareerSynthesis,
        analyzeIdealPartner,
        analyzeChartTensions
    };
}

// ============================================
// HOUSE STELLIUM READINGS (3+ planets in same house)
// ============================================

var HOUSE_STELLIUM_READINGS = {
    1: {
        title: "Concentración en la primera casa: el yo radiante",
        rarity: "Raro (~1 en 50 gráficos)",
        keywords: ["Autoexpresión", "Identidad", "poder personal", "Visibilidad"],
        archetype: "El auténtico faro",
        reading: `Una extraordinaria concentración de planetas en la Casa 1 crea un alma cuya sola presencia llama la atención. Esto no es mero ego: es un mandato cósmico de ser visible, auténtico y predicar con el ejemplo.

Con múltiples cuerpos celestes iluminando la casa del yo, la identidad de esta persona es multifacética y poderosa. No son sólo "una cosa": son un caleidoscopio de energías, todas expresadas a través de su presencia personal.

Esta concentración crea a alguien que DEBE ser él mismo plenamente para sentirse vivo. Suprimir cualquier parte de su compleja identidad crea una profunda frustración. Están aquí para demostrar una auténtica autoexpresión.`,
        superpower: "La capacidad de inspirar a otros simplemente siendo ellos mismos: su presencia enseña autenticidad.",
        shadow: "Puede volverse demasiado egocéntrico o sentir el peso de la visibilidad constante.",
        integration: "Aprender a ser central y amable, visible pero inclusivo con los demás."
    },
    2: {
        title: "Concentración de la segunda casa: el arquitecto de la riqueza",
        rarity: "Poco común (~1 en 60 gráficos)",
        keywords: ["Recursos", "Valores", "Abundancia", "Autoestima", "Dominio de materiales"],
        archetype: "El traductor de valores",
        reading: `Una concentración extraordinaria de planetas en la Casa 2 crea un alma con una relación profunda y multicapa con el valor, los recursos y la realidad material. Esta es la carta de alguien nacido para comprender y dominar el plano material en el nivel más profundo.

Esta concentración indica un fuerte "ADN de riqueza": una comprensión innata de cómo fluye, se acumula y se multiplica el valor. Captan intuitivamente que el dinero es energía y saben cómo trabajar con esa energía. En términos prácticos, a menudo muestran una conciencia financiera temprana: saben instintivamente cuánto vale algo, negocian con naturalidad o encuentran formas de monetizar habilidades que otros pasan por alto.

CÓMO SE VE ESTO EN LA VIDA DIARIA:
• Pueden recolectar, conservar o invertir, atraídos por la creación de reservas tangibles de cualquier tipo.
• Las opciones profesionales a menudo giran en torno a la creación de valor: finanzas, bienes raíces, comercio de arte, artículos de lujo, gestión de recursos.
• Se dan cuenta de las discrepancias de precios, los activos infravalorados y los mercados sin explotar antes que otros.
• Su sensación de seguridad personal está directamente ligada a lo que han construido con sus propias manos.

LA DIMENSIÓN DE LIBRA (si el stellium está en Libra): cuando esta concentración de la Segunda Casa cae en Libra, la creación de riqueza se vuelve relacional y estética. Se ganan a través de asociaciones, belleza, mediación o creación de armonía. Su instinto financiero es más refinado que agresivo: atraen recursos mediante su encanto, su justicia y su ojo para el equilibrio. Las empresas conjuntas y los modelos de negocio colaborativos les convienen más que las empresas individuales.

LA CONEXIÓN CON LA AUTOVALOR: Múltiples planetas aquí crean a alguien cuya autoestima está íntimamente conectada con lo que pueden construir, ganar y proporcionar. Esto no es un materialismo superficial: es la forma que tiene el alma de demostrar su capacidad para manifestarse en el mundo físico. La lección es aprender que SON valiosos, no sólo lo que producen.`,
        superpower: "La capacidad de ver y crear valor donde otros no ven nada: son creadores de riqueza natural que pueden convertir cualquier habilidad, idea o conexión en un recurso tangible.",
        shadow: "Puede vincular demasiado la autoestima al éxito material, apegarse demasiado a las posesiones o sentirse inútil durante las crisis financieras. Puede acumular recursos a partir del miedo en lugar de construir a partir de la visión.",
        integration: "Comprender que la verdadera seguridad proviene del interior, sin dejar de honrar su don para la creación material. El objetivo es generar riqueza que sirva a sus valores, no valores que sirvan a su riqueza.",
        practicalAdvice: [
            "Realice un seguimiento de sus instintos financieros: inicie un diario de corazonadas sobre inversiones o compras y observe cuáles resultan correctas.",
            "Cree múltiples flujos de ingresos en lugar de depender de una sola fuente: su gráfico respalda la creación de valor diversificada",
            "Separe la autoestima del patrimonio neto mediante prácticas diarias que afirmen su valor inherente",
            "Utilice su ojo natural para detectar valor y ayudar a otros: asesoramiento financiero, curación o gestión de recursos didácticos."
        ]
    },
    3: {
        title: "Concentración en la Tercera Casa: El Maestro Comunicador",
        rarity: "Poco común (~1 en 55 gráficos)",
        keywords: ["Comunicación", "Aprendiendo", "Conexiones", "Información", "Agilidad Mental"],
        archetype: "El constructor de puentes",
        reading: `Una extraordinaria concentración de planetas en la Casa 3 crea un alma cuya vida gira en torno a la comunicación, el aprendizaje y la conexión de ideas y personas. Su mente es su instrumento principal.

Este es el cuadro de maestros, escritores, oradores y creadores de redes naturales. Múltiples planetas aquí crean a alguien que procesa todo a través del lenguaje y la lógica, aprendiendo y compartiendo constantemente.

Los hermanos, los vecinos y la educación temprana desempeñan papeles importantes en su desarrollo. Su comunidad local se convierte en su escenario de expresión.`,
        superpower: "La capacidad de traducir ideas complejas en formas accesibles y conectar personas y conceptos dispares.",
        shadow: "Puede volverse disperso, superficial o ansioso debido a una actividad mental constante.",
        integration: "Aprender a profundizar y ampliar, a encontrar calidad sobre cantidad en las conexiones."
    },
    4: {
        title: "Concentración de la Casa 4: El Creador de Raíces",
        rarity: "Poco común (~1 en 55 gráficos)",
        keywords: ["Hogar", "Familia", "Raíces", "Fundación emocional", "Ascendencia"],
        archetype: "El constructor del santuario",
        reading: `Una extraordinaria concentración de planetas en la Casa 4 crea un alma cuya base de poder es el hogar, la familia y la base emocional. Sus raíces son increíblemente profundas.

Se trata de alguien cuyo karma familiar, ascendencia y entorno familiar temprano tienen un peso enorme. Varios planetas aquí sugieren que los temas familiares dominan el viaje de la vida.

Están aquí para crear santuarios, no sólo hogares físicos, sino espacios emocionales seguros donde otros puedan sanar y crecer.`,
        superpower: "La capacidad de crear pertenencia dondequiera que vayan y de mantener un espacio para la curación emocional de los demás.",
        shadow: "Puede apegarse demasiado a la familia, tener dificultades para salir de casa o quedar atrapado en la dinámica familiar.",
        integration: "Construir un hogar interno fuerte que les permita estar arraigados pero libres."
    },
    5: {
        title: "Concentración de la Quinta Casa: La Supernova Creativa",
        rarity: "Poco común (~1 en 60 gráficos)",
        keywords: ["Creatividad", "Alegría", "Autoexpresión", "romance", "Niños"],
        archetype: "El creador radiante",
        reading: `Una extraordinaria concentración de planetas en la Quinta Casa crea un alma cuyo propósito es la expresión creativa, la alegría y la celebración de la vida. Están aquí para JUGAR en el escenario cósmico.

Este es el cuadro de los artistas, intérpretes, amantes de la vida y aquellos que traen luz a las tinieblas. Aquí, múltiples planetas exigen expresión: la energía creativa se acumula y debe ser liberada.

Los niños, el romance y los proyectos creativos son temas importantes en la vida. Es posible que tengan relaciones complejas con sus propios hijos o con el trabajo de su niño interior.`,
        superpower: "La capacidad de crear alegría y belleza que transforma la oscuridad en luz.",
        shadow: "Puede volverse dramático, buscador de atención o tratar la vida como una actuación perpetua.",
        integration: "Aprender que la creatividad más profunda proviene de la expresión auténtica, no del aplauso."
    },
    6: {
        title: "Concentración de la Sexta Casa - El Siervo Sagrado",
        rarity: "Poco común (~1 en 65 gráficos)",
        keywords: ["Servicio", "Salud", "Trabajar", "Mejora", "Rituales diarios"],
        archetype: "El sanador práctico",
        reading: `Una extraordinaria concentración de planetas en la Casa 6 crea un alma cuyo camino de vida se centra en el servicio, la salud y la naturaleza sagrada del trabajo diario. Encuentran significado siendo útiles.

Esta es la carta de los curanderos naturales, los artesanos expertos y los que mejoran todo lo que tocan. Múltiples planetas aquí crean a alguien cuya identidad está ligada a la competencia y la ayuda.

La salud (física, mental y ambiental) es un tema importante en la vida. Su propio bienestar les enseña lecciones que utilizarán para ayudar a los demás.`,
        superpower: "La capacidad de ver lo que hay que arreglar y mejorarlo sistemáticamente.",
        shadow: "Puede volverse perfeccionista, adicto al trabajo o crítico consigo mismo y con los demás.",
        integration: "Aprender que algunas cosas no necesitan arreglarse y que el descanso también es sagrado."
    },
    7: {
        title: "Concentración de la Séptima Casa: El alma de la asociación",
        rarity: "Poco común (~1 en 60 gráficos)",
        keywords: ["Asociación", "Relaciones", "Otros", "Balance", "Justicia"],
        archetype: "El compañero sagrado",
        reading: `Una extraordinaria concentración de planetas en la Casa Séptima crea un alma que se descubre a sí misma principalmente a través de la relación con los demás. "Yo soy" se convierte en "nosotros somos".

Este es el mapa de alguien cuyas lecciones de vida surgen a través de asociaciones: románticas, comerciales y todas las formas de relación uno a uno significativa. Múltiples planetas aquí crean un karma de relaciones complejo.

Pueden atraer parejas intensas que reflejen aspectos ocultos de sí mismos. La relación es su camino espiritual.`,
        superpower: "La capacidad de ver a través de los ojos de los demás y crear una profunda armonía en la asociación.",
        shadow: "Pueden perderse en las relaciones o definirse completamente a través de sus parejas.",
        integration: "Construir un fuerte sentido de uno mismo que pueda encontrarse plenamente con el otro sin perder la identidad."
    },
    8: {
        title: "Concentración en la octava casa: el navegador de profundidad",
        rarity: "Raro (~1 en 70 gráficos)",
        keywords: ["Transformación", "Recursos compartidos", "Psicología", "Muerte/Renacimiento", "Intimidad"],
        archetype: "El alquimista de las sombras",
        reading: `Una extraordinaria concentración de planetas en la Casa 8 crea un alma destinada a una transformación profunda y una comprensión íntima de los misterios de la vida. Viven en las profundidades.

Esta es la carta de los psicólogos, curanderos, investigadores de lo oculto y de quienes enfrentan la muerte (literal o metafórica) como parte de su camino. Múltiples planetas aquí crean a alguien que no puede hacer cosas superficiales.

Los recursos compartidos, las herencias y el dinero de otras personas pueden ser temas importantes. Se sienten atraídos por comprender lo que otros temen mirar.`,
        superpower: "La capacidad de transformar la oscuridad en luz y sanar al ser testigo de una verdad profunda.",
        shadow: "Puede volverse controlador, obsesivo o perderse en el inframundo de emociones intensas.",
        integration: "Aprender cuándo salir a la superficie y cómo llevar los dones de la profundidad a la luz cotidiana."
    },
    9: {
        title: "Concentración de la novena casa: el buscador de sabiduría",
        rarity: "Muy raro (~1 en 80 gráficos)",
        keywords: ["Filosofía", "Aprendizaje Superior", "Viajar", "Verdad", "Expansión"],
        archetype: "El eterno explorador",
        paradox: "The Immovable Visionary: anhela la aventura y necesita estabilidad",
        reading: `Una extraordinaria concentración de planetas en la Casa 9 crea un alma cuyo propósito de vida es la búsqueda y el intercambio de sabiduría. Nacen filósofos, viajeros y buscadores de significado.

Esta concentración es EXTREMADAMENTE RARA: tener más de 3 planetas, y mucho menos 5 planetas personales aquí, representa quizás 1 de cada 15.000 o más raros nacimientos. Esto marca a alguien con un mandato cósmico inusual para expandir la conciencia.

La educación superior, los viajes, las publicaciones, la enseñanza y la búsqueda espiritual son temas importantes en la vida. Procesan la vida buscando su significado más profundo y compartiendo lo que descubren.

LA PARADOJA VISIONARIA: Cuando se combina con signos arraigados como Tauro, esto crea el "Visionario Inamovible", alguien que sueña con horizontes distantes y al mismo tiempo necesita raíces profundas. Esto no es una contradicción, sino su don único: pueden convertir ideas visionarias en realidad práctica.`,
        superpower: "La capacidad de ver los patrones más importantes de la vida y compartir sabiduría que amplía los horizontes de los demás.",
        shadow: "Puede volverse sermoneador, inquieto, demasiado confiado o adicto a buscar sin encontrar.",
        integration: "Aprender que lo infinito se puede encontrar en lo inmediato, que la profundidad también es expansión."
    },
    10: {
        title: "Concentración de la Décima Casa: El Constructor de Legado",
        rarity: "Poco común (~1 en 55 gráficos)",
        keywords: ["Carrera", "Vida pública", "Logro", "Autoridad", "Legado"],
        archetype: "El líder destinado",
        reading: `Una extraordinaria concentración de planetas en la Casa Décima crea un alma destinada al reconocimiento público y los logros mundanos. Su luz está destinada a brillar en el mundo.

Este es el cuadro de los líderes naturales, los ejecutivos y aquellos cuyo trabajo se convierte en su legado. Múltiples planetas aquí crean relaciones complejas con la autoridad, el estatus y la imagen pública.

La carrera no es sólo un trabajo, es una vocación. Su reputación y lo que construyen en el mundo tiene un peso enorme en su desarrollo.`,
        superpower: "La capacidad de construir estructuras duraderas e inspirar a través de logros y liderazgo.",
        shadow: "Puede volverse adicto al trabajo, obsesionado con el estatus o perder la vida privada ante demandas públicas.",
        integration: "Construir un legado que incluya amor y realización interior, no sólo logros externos."
    },
    11: {
        title: "Concentración de la Casa 11: El futuro arquitecto",
        rarity: "Poco común (~1 en 60 gráficos)",
        keywords: ["Comunidad", "Futuro", "Innovación", "Amistad", "Humanitario"],
        archetype: "El visionario colectivo",
        reading: `Una extraordinaria concentración de planetas en la Casa 11 crea un alma cuyo propósito de vida se desarrolla a través de la comunidad, la amistad y la visión de un futuro colectivo. Están aquí para construir nuevos paradigmas.

Este es el cuadro de los humanitarios, los innovadores, los constructores de comunidades y aquellos que piensan en las generaciones venideras. Múltiples planetas aquí crean a alguien cuya identidad está ligada a sus tribus y causas.

La amistad no es casual: es fundamental en su camino. Se encuentran a sí mismos a través de grupos y trabajando por sueños compartidos.`,
        superpower: "La capacidad de imaginar futuros mejores e inspirar acciones colectivas hacia ellos.",
        shadow: "Puede volverse distante, rebelde por sí mismo o perder la identidad individual en grupos.",
        integration: "Equilibrar las necesidades individuales con la visión colectiva, siendo a la vez únicos y unificados."
    },
    12: {
        title: "Concentración de la Casa 12: El Alma Mística",
        rarity: "Raro (~1 en 70 gráficos)",
        keywords: ["Espiritualidad", "Sueños", "Reinos ocultos", "Sacrificio", "Trascendencia"],
        archetype: "El soñador sagrado",
        reading: `Una extraordinaria concentración de planetas en la Casa 12 crea un alma con un acceso inusual a las dimensiones espirituales, los sueños y el inconsciente colectivo. Viven entre mundos.

Esta es la carta de los místicos, los artistas, los sanadores del alma y aquellos que se sacrifican por propósitos superiores. Múltiples planetas aquí crean a alguien que puede sentir que no pertenece completamente a la realidad ordinaria.

Sus dones a menudo funcionan detrás de escena o a través de canales sutiles. Absorben energía colectiva y deben aprender higiene psíquica.`,
        superpower: "La capacidad de acceder a la sabiduría espiritual y traer sanación desde dimensiones trascendentes.",
        shadow: "Pueden escapar a la fantasía, convertirse en víctimas o perderse en la energía de los demás.",
        integration: "Mantenerse firme mientras honra su conexión con reinos invisibles."
    }
};

// ============================================
// WEALTH BLUEPRINT READINGS
// ============================================

var WEALTH_BLUEPRINT_READINGS = {
    secondHouseStellium: {
        title: "Activación del ADN de la riqueza",
        keywords: ["Inteligencia financiera", "Creación de valor", "Dominio de recursos"],
        reading: `Con un stellium en la Casa 2, esta alma lleva un potente "ADN de riqueza": una comprensión innata de cómo fluye el valor en el mundo material. No se trata sólo de dinero; se trata de reconocer, crear y multiplicar el valor en todas sus formas.

EL SUPERPODER DEL TRADUCTOR DE VALOR: Esta ubicación otorga la capacidad de ver valor donde otros no lo ven y de traducir activos intangibles en recursos tangibles. Entienden instintivamente que el dinero es energía y saben cómo mover esa energía.

INDICADORES DE RIQUEZA PRESENTES:
• Comprensión natural de la acumulación de recursos.
• Instinto de oportunidad en asuntos financieros  
• Capacidad de generar valor sostenible en el tiempo
• Talento para reconocer activos infravalorados

La combinación crea a alguien que puede convertir ideas en ingresos, habilidades en servicios y visión en valor. Su relación con el dinero es compleja: no es sólo una herramienta sino una enseñanza.`,
        guidance: "Confía en tus instintos financieros. Naciste entendiendo el valor. La clave es alinear la creación de riqueza con sus valores más profundos."
    },
    
    jupiterSaturn2ndHouse: {
        title: "La fortuna del maestro constructor",
        keywords: ["Expansión disciplinada", "Riqueza estructurada", "Edificio heredado"],
        reading: `Júpiter y Saturno juntos en la Casa 2 crean una poderosa combinación de riqueza: la expansión de Júpiter se encuentra con la estructura de Saturno en la casa de los recursos.

Ésta es la firma de quienes generan riqueza duradera mediante un crecimiento disciplinado. No energía para enriquecerse rápidamente, sino energía para enriquecerse para siempre. La clave es la paciencia unida a la visión.

Júpiter expande lo que estructura Saturno. Saturno fundamenta lo que Júpiter imagina. Juntos en la Casa 2, crean a alguien capaz de construir un legado material significativo.

PLAN DE RIQUEZA: Comience con la estructura (Saturno), luego expanda (Júpiter). Construya las bases antes de crecer. Su riqueza será estable y duradera en lugar de volátil.`,
        timing: "Las principales oportunidades de riqueza a menudo surgen durante los retornos de Saturno o los tránsitos de Júpiter a posiciones natales."
    },
    
    pluto2ndHouse: {
        title: "Riqueza transformadora",
        keywords: ["Transformación financiera", "Poder a través de recursos", "Finanzas Fénix"],
        reading: `Plutón en la Casa 2 aporta una energía intensa y transformadora a cuestiones de dinero y posesiones. Esta no es una riqueza cómoda: es poderosa, a veces volátil y siempre transformadora.

Esta ubicación a menudo indica que la relación con el dinero pasará por cambios profundos, posiblemente completas "muertes y renacimientos" financieros. Las viejas relaciones con valor deben morir para que surjan otras nuevas.

DINÁMICA DE PODER: Puede haber dinámicas de poder complejas en torno a recursos compartidos, herencias o cuestiones de control financiero. La lección del alma implica aprender una relación sana con el poder financiero.

PHOENIX ENERGY: Después de cualquier revés financiero, esta ubicación otorga una notable capacidad para volver a ascender, a menudo a mayores alturas que antes.`,
        shadow: "Tenga cuidado con el uso del dinero como poder sobre los demás, o con permitir que el dinero de los demás le controle."
    },
    
    taurus2ndHouse: {
        title: "El campo de la abundancia natural",
        keywords: ["Riqueza Orgánica", "Valor sensorial", "Prosperidad fundamentada"],
        reading: `La energía de Tauro en la Casa 2 es el signo en su hogar natural: un doble énfasis en el dominio material, la seguridad y la capacidad de atraer recursos.

Esto crea un "campo de abundancia" natural alrededor de la persona. No sólo atraen dinero: atraen comodidad, belleza, buena comida y todas las formas de riqueza sensorial.

TALENTO DE ACUMULACIÓN: Existe un don natural para la acumulación constante. Al igual que el toro pastando en el pasto, la riqueza se acumula de forma lenta pero segura mediante un esfuerzo constante y paciencia.

CREACIÓN DE VALOR: Su mayor don financiero es comprender lo que tiene un valor duradero. Rara vez se dejan seducir por inversiones improvisadas o planes para enriquecerse rápidamente.`,
        guidance: "Tu riqueza crece mejor cuando puedes tocarla, verla y sentirla. Los activos tangibles le hablan más que las inversiones abstractas."
    }
};

// ============================================
// CHAKRA BLUEPRINT READINGS
// ============================================

var CHAKRA_BLUEPRINT_READINGS = {
    taurusThroat: {
        title: "Plano del chakra de la garganta",
        chakra: "5to chakra - Vishuddha",
        bodyArea: "Garganta, cuello, tiroides, mandíbula, boca, orejas.",
        keywords: ["Expresión", "Voz", "Verdad", "Comunicación", "Cantando"],
        reading: `Tauro gobierna la garganta y, con ubicaciones significativas de Tauro, el quinto chakra (la garganta) se convierte en un punto central de poder y desafío potencial.

EL MANDATO DEL CHAKRA DE LA GARGANTA: Esta alma está aquí para encontrar su voz, literal y figurativamente. La autoexpresión no es opcional; es esencial para su bienestar. Cuando dicen su verdad, todo su sistema se alinea.

MANIFESTACIONES FÍSICAS: La zona de la garganta puede estar especialmente sensible. Podrían experimentar:
• Problemas de garganta o tiroides al suprimir la verdad
• Tensión en el cuello cuando no se siente escuchado
• Voz fuerte para cantar o hablar cuando está alineado
• Sensibilidad a lo que consumen (comida, palabras, medios)

LA VOZ DE TAURO: Su voz tiene peso y autoridad, aunque sea suave. Cuando hablan, la gente escucha, no porque hablen en voz alta, sino porque sus palabras tienen la densidad de la tierra.

EXPRESIÓN CREATIVA: A menudo existe un talento natural para cantar, hablar, trabajar la voz o cualquier forma de comunicación que utilice la voz física.`,
        healingPractices: [
            "Prácticas de canto, tarareo o tonificación.",
            "Decir la verdad incluso cuando te sientas incómodo",
            "Meditaciones del chakra de la garganta con luz azul.",
            "Carrocería de cuello y hombros.",
            "Escribir y llevar un diario para expresar lo indescriptible"
        ],
        affirmation: "Mi voz importa. Mi verdad cura. Hablo con el poder constante de la tierra."
    },
    
    chakraBySign: {
        Aries: { chakra: "3º - Plexo solar", area: "Estómago, voluntad, poder personal." },
        Taurus: { chakra: "5to - Garganta", area: "Voz, expresión, verdad." },
        Gemini: { chakra: "5to - Garganta", area: "Comunicación, brazos, manos." },
        Cancer: { chakra: "4to - Corazón", area: "Pecho, centro emocional y de crianza." },
        Leo: { chakra: "4to - Corazón", area: "Corazón, coraje, expresión de amor." },
        Virgo: { chakra: "3º - Plexo solar", area: "Sistema digestivo, análisis." },
        Libra: { chakra: "4to - Corazón", area: "Equilibrio, armonía, relaciones." },
        Scorpio: { chakra: "2do - Sacro", area: "Transformación, intimidad, poder." },
        Sagittarius: { chakra: "3º - Plexo solar", area: "Expansión, creencia, hígado/caderas." },
        Capricorn: { chakra: "1º - Raíz", area: "Huesos, estructura, fundamento." },
        Aquarius: { chakra: "6to - Tercer Ojo", area: "Visión, innovación, sistema nervioso." },
        Pisces: { chakra: "7mo - Corona", area: "Espiritualidad, pies, sistema inmunológico." }
    }
};

// ============================================
// ARCHETYPE SYNTHESIS READINGS
// ============================================

var ARCHETYPE_SYNTHESIS_READINGS = {
    wealthyMonk: {
        title: "El monje rico",
        triggers: ["estelio de tauro", "énfasis en la segunda casa", "indicadores espirituales"],
        reading: `Cuando la energía profunda de Tauro/Casa 2 se encuentra con la profundidad espiritual, se crea el arquetipo del "monje rico": alguien que entiende que la riqueza material y espiritual no son opuestos sino socios.

Ésta es el alma que sabe que el dinero es una forma de energía, que la abundancia es una ley espiritual y que uno puede tener éxito material y evolucionar espiritualmente.

EL CAMINO DEL MONJE RICO:
• Valora tanto el silencio como la prosperidad.
• Encuentra la meditación en tareas prácticas.
• Crea belleza como práctica espiritual.
• Entiende los recursos como responsabilidad
• Genera riqueza para financiar el propósito

Este arquetipo rechaza la falsa elección entre espíritu y materia. Están aquí para demostrar que se pueden tener ambas cosas: que la iluminación no requiere pobreza y que la riqueza puede servir para despertar.`,
        archetype: "Materialismo sagrado"
    },
    
    sensoryMystic: {
        title: "El místico sensorial",
        triggers: ["Luna de Tauro", "Tauro con Neptuno/casa 12"],
        reading: `Cuando la naturaleza sensorial de Tauro se encuentra con la sensibilidad espiritual, crea el "Místico Sensorial", alguien que encuentra lo divino a través de la experiencia física, no escapando de ella.

Ésta es el alma que prueba a Dios en la buena comida, siente lo sagrado en la seda sobre la piel, escucha a los ángeles en una hermosa música. Su misticismo es encarnado, no etéreo.

EL CAMINO MÍSTICO SENSORIAL:
• Experiencias espirituales a través del cuerpo.
• La naturaleza como templo principal
• El placer como camino hacia lo divino
• Intuición fundamentada y magia práctica.
• Sanación a través del tacto y la presencia

Este arquetipo colapsa la división mente/cuerpo. Saben que el espíritu no está "allí arriba" sino "justo aquí": en el peso de una taza caliente, el olor de la tierra después de la lluvia, el consuelo de un fuerte abrazo.`,
        practiceGuidance: "Tu camino espiritual pasa a través de tus sentidos, no alrededor de ellos. Honra el cuerpo como templo."
    },
    
    sacredHedonism: {
        title: "Hedonismo sagrado",
        triggers: ["énfasis en la quinta casa", "venus fuerte", "Énfasis en Tauro"],
        reading: `El "hedonismo sagrado" surge cuando alguien descubre que el placer, cuando es consciente, es un camino espiritual. Esto no es indulgencia sin conciencia: es una presencia profunda en la alegría.

LA FILOSOFÍA:
El cuerpo no es el obstáculo para el espíritu: es la puerta de entrada. El placer no es una distracción de la iluminación: puede ser la iluminación misma. La alegría no es lo opuesto a la profundidad; puede ser la profundidad misma.

PRÁCTICAS SAGRADAS DEL HEDONISMO:
• Comer como meditación (lento, presente, agradecido)
• Tocar como oración (consciente, amorosa, sanadora)
• La belleza como devoción (creándose y rodeándose de ella)
• El consuelo como práctica espiritual (cuidado del cuerpo-templo)
• La alegría como servicio (tu felicidad eleva a los demás)

Esta filosofía dice: ¿por qué Dios crearía un mundo de belleza si no estuviéramos destinados a disfrutarlo? El pecado no es el placer, es el consumo inconsciente. Cuando el placer está despierto, es adoración.`,
        shadow: "Sin conciencia, esto se convierte en mera indulgencia. Lo "sagrado" debe permanecer activo."
    },
    
    embodiedTeacher: {
        title: "El maestro encarnado",
        triggers: ["énfasis en la novena casa", "Énfasis en Tauro", "Mercurio fuerte"],
        reading: `Cuando la energía de la enseñanza (Casa 9) se encuentra con la sabiduría encarnada (Tauro), se crea "El Maestro encarnado", alguien que enseña no sólo a través de ideas sino también a través de demostraciones.

EL CAMINO DEL MAESTRO ENCARNADO:
No sólo cuentan, sino que muestran. No sólo teorizan, sino que practican. No sólo saben: viven lo que enseñan.

ESTILO DE ENSEÑANZA:
• Aprende mejor a través de la experiencia directa
• Enseña mejor a través de demostraciones prácticas.
• Valora "predicar con el ejemplo" sobre todo
• Desconfía del conocimiento puramente intelectual
• Busca hacer práctica la sabiduría abstracta

Otros aprenden de esta persona no sólo por sus palabras sino por su presencia, su firmeza, su ejemplo de vida. Su vida ES su enseñanza.`,
        optimalEnvironment: "Entornos de aprendizaje práctico, modelos de aprendizaje, aulas de naturaleza, educación experiencial."
    },
    
    completionSpecialist: {
        title: "El especialista en finalización",
        triggers: ["Luna creciente menguante", "Camino de vida 9", "casa 12"],
        reading: `Cuando la energía de la Luna Creciente Menguante (la fase final antes de la nueva) se encuentra con el Camino de Vida 9 (el número de finalización), se crea "El especialista en finalización", un alma cuyo don es terminar lo que otros comienzan y liberar lo que está completo.

Ésta es la vieja energía del alma de alguien que ha hecho esto antes, muchas veces. Llevan la sabiduría de los finales, la gracia de dejar ir, la comprensión de que la muerte deja lugar al nacimiento.

EL CAMINO DEL ESPECIALISTA EN FINALIZACIÓN:
• Talento natural para terminar proyectos.
• Capacidad para cerrar capítulos con gracia
• Sabiduría sobre cuándo se "hacen" las cosas
• Habilidad para ayudar a otros a liberarse.
• Comprender que los finales son comienzos

En un mundo obsesionado con comenzar cosas nuevas, esta alma tiene el don de completarlas. Saben que nada nuevo puede nacer hasta que lo viejo se libere adecuadamente.`,
        lifeWork: "Trabajos de hospicio, edición, terapia enfocada al cierre, gestión patrimonial, ayuda en transiciones de todo tipo."
    },
    
    aestheticAuthority: {
        title: "Autoridad estética",
        triggers: ["venus fuerte", "Énfasis en Tauro/Libra", "casa 2/7"],
        reading: `Cuando la fuerte energía de Venus se combina con las posiciones de Tauro/Libra, se crea una "Autoridad Estética", alguien cuyo gusto y ojo para la belleza conlleva una credibilidad natural.

Esta persona no sólo aprecia la belleza, sino que la define. Su sentido de lo que se ve bien, suena bien y se siente bien se vuelve influyente. Otros, naturalmente, se remiten a su criterio estético.

DOMINIOS DE AUTORIDAD ESTÉTICA:
• Estilo y apariencia personal
• Diseño de entornos y espacios.
• Evaluación de la calidad en todo.
• Elaboración de gustos culturales
• Industria de la belleza de todo tipo.

Esto no es vanidad, es un verdadero regalo. En un mundo a menudo feo o caótico, esta alma trae orden a través de la belleza, curación a través de la estética, significado a través de la forma.`,
        brandImplication: "Tu marca personal debe enfatizar el gusto, la calidad, la belleza y el criterio refinado."
    },
    
    immovableVisionary: {
        title: "El visionario inamovible",
        triggers: ["Énfasis en Tauro", "énfasis en la novena casa", "influencia de sagitario"],
        reading: `El "Visionario Inamovible" surge cuando la estabilidad de Tauro se encuentra con la visión expansiva de la Casa 9: alguien que sueña con horizontes lejanos y necesita raíces profundas.

LA PARADOJA:
Esto no es una contradicción sino un regalo único. Pueden convertir ideas visionarias en realidad práctica. Mientras otros sueñan sin construir, o construyen sin soñar, esta alma hace ambas cosas.

EL CAMINO VISIONARIO INMOVIBLE:
• Lo suficientemente anclados como para sostener grandes visiones
• Lo suficientemente visionario como para transformar cimientos estables
• Lo suficientemente paciente como para esperar a que los sueños se manifiesten
• Lo suficientemente fundamentado para hacer que la filosofía sea práctica.
• Lo suficientemente aventurero como para evitar que las raíces se conviertan en prisiones.

Éste es el filósofo-granjero, el constructor soñador, el viajero que siempre vuelve a casa. Su don es hacer que lo imposible parezca inevitable mediante un trabajo constante y paciente.`,
        challenge: "Puede sentirse dividido entre la comodidad y la aventura. La resolución: crear aventuras DESDE tu base estable."
    }
};

// ============================================
// STATISTICAL RARITY CONTEXT
// ============================================

var RARITY_CALCULATIONS = {
    // Calculate approximate rarity of stellium configurations
    calculateStelliumRarity: function(stellium) {
        if (!stellium) return null;
        
        const base = 1/12; // Base chance of any planet in any sign
        
        if (stellium.count >= 5) {
            // 5+ planets in one sign is extremely rare
            return {
                odds: "1 entre 10.000-15.000",
                description: "Extremadamente raro: configuración de mandato cósmico",
                significance: "Esta concentración es tan inusual que representa un propósito cósmico específico."
            };
        } else if (stellium.count === 4) {
            return {
                odds: "1 en 500-1000",
                description: "Muy raro: configuración de enfoque de poder",
                significance: "Fuerte concentración que sugiere importantes temas de vida en esta área."
            };
        } else if (stellium.count === 3) {
            return {
                odds: "1 en 50-100",
                description: "Poco común: énfasis significativo",
                significance: "Una concentración notable que crea aquí puntos fuertes particulares."
            };
        }
        return null;
    },
    
    // Calculate rarity of Sun-Moon same sign
    sunMoonSameSign: {
        odds: "1 entre 144",
        description: "Tener ambas luminarias en el mismo signo crea una inusual coherencia de identidad emocional",
        significance: "Cuando el Sol y la Luna comparten un signo, existe una poderosa alineación entre la voluntad consciente y las necesidades emocionales."
    },
    
    // House concentration rarity
    houseConcentrationRarity: function(count, house) {
        const descriptions = {
            9: "La concentración de planetas personales en la Casa 9 es excepcionalmente rara, lo que indica un propósito de vida filosófico/expansivo.",
            2: "La concentración de la segunda casa indica fuertes temas de riqueza/valor",
            8: "La concentración en la Casa 8 sugiere una transformación profunda como camino de vida"
        };
        
        if (count >= 5) {
            return {
                odds: "1 entre 15.000+",
                description: descriptions[house] || "Exceptional concentration in this life area",
                significance: "Esto representa un foco de energía cósmica casi sin precedentes."
            };
        } else if (count >= 3) {
            return {
                odds: "1 entre 200-500",
                description: descriptions[house] || "Significant concentration in this life area",
                significance: "Esto representa un fuerte énfasis cósmico en esta área."
            };
        }
        return null;
    }
};

// ============================================
// TIMING GRANULARITY READINGS
// ============================================

var TIMING_READINGS = {
    personalYearDetailed: {
        1: {
            theme: "New Beginnings & Independence",
            powerMonths: [1, 4, 10], // January, April, October
            dailyPowerTime: "Mañana (6 a. m. a 10 a. m.): picos de energía de la iniciativa",
            seasonalPattern: "La primavera trae una activación más fuerte",
            ageResonance: "Particularmente poderoso si la edad se reduce a 1"
        },
        2: {
            theme: "Partnership & Patience",
            powerMonths: [2, 6, 11],
            dailyPowerTime: "Tarde (16:00 a 20:00 horas): picos de energía receptiva",
            seasonalPattern: "El otoño trae equilibrio",
            ageResonance: "Particularmente poderoso si la edad se reduce a 2"
        },
        3: {
            theme: "Creativity & Expression",
            powerMonths: [3, 7, 12],
            dailyPowerTime: "Mediodía (10:00 a 14:00 horas): picos de energía creativa",
            seasonalPattern: "El verano trae expansión",
            ageResonance: "Particularmente poderoso si la edad se reduce a 3"
        },
        4: {
            theme: "Building & Foundation",
            powerMonths: [1, 4, 8],
            dailyPowerTime: "Temprano en la mañana (4 a. m. a 8 a. m.): picos de energía de la estructura",
            seasonalPattern: "El invierno trae consolidación",
            ageResonance: "Particularmente poderoso si la edad se reduce a 4 años."
        },
        5: {
            theme: "Change & Freedom",
            powerMonths: [5, 9, 11],
            dailyPowerTime: "Tarde (14:00 a 18:00 horas): picos de energía dinámicos",
            seasonalPattern: "Las estaciones de transición (primavera/otoño) traen movimiento",
            ageResonance: "Particularmente poderoso si la edad se reduce a 5 años."
        },
        6: {
            theme: "Love & Responsibility",
            powerMonths: [2, 6, 9],
            dailyPowerTime: "Tarde (6:00 p. m. a 10:00 p. m.): picos de energía del corazón",
            seasonalPattern: "El verano trae amor, el otoño trae responsabilidad.",
            ageResonance: "Particularmente poderoso si la edad se reduce a 6 años."
        },
        7: {
            theme: "Introspection & Wisdom",
            powerMonths: [3, 7, 10],
            dailyPowerTime: "Noche (22:00-02:00): picos de energía intuitivos",
            seasonalPattern: "El invierno trae profundidad",
            ageResonance: "Particularmente poderoso si la edad se reduce a 7 años."
        },
        8: {
            theme: "Power & Achievement",
            powerMonths: [1, 5, 8],
            dailyPowerTime: "Mañana (8 a.m. a 12 p.m.): picos de energía de logros",
            seasonalPattern: "La primavera y el verano traen cosecha",
            ageResonance: "Particularmente poderoso si la edad se reduce a 8 años."
        },
        9: {
            theme: "Completion & Release",
            powerMonths: [4, 9, 12],
            dailyPowerTime: "A última hora de la tarde (de 8:00 p. m. a medianoche): libera picos de energía.",
            seasonalPattern: "El otoño trae un abandono natural",
            ageResonance: "Particularmente poderoso si la edad se reduce a 9 años."
        }
    },
    
    tripleNumberSignificance: {
        title: "Activación de Número Triple",
        reading: `Cuando un número aparece tres veces en un perfil numerológico (cumpleaños, impulso del alma, pináculo, etc.), se crea una "Triple Activación", una amplificación de la energía de ese número que no se puede ignorar.

Esto no es una coincidencia; es énfasis cósmico. El universo dice "presta atención a esta energía" tres veces.

TRIPLE 3 SIGNIFICADO (si aplica):
Cuando el 3 aparece como número de cumpleaños, número de impulso del alma y pináculo actual, crea un "mandato creativo": la expresión, la comunicación y la alegría no son opcionales sino esenciales para la realización.

EFECTOS DEL NÚMERO TRIPLE:
• La energía se vuelve imposible de suprimir.
• La vida trae repetidamente temas de este número.
• Dominar este número se convierte en el trabajo central de la vida.
• Los dones de este número se amplifican.
• Los desafíos de este número deben ser enfrentados`
    }
};

// ============================================
// HEALTH CONNECTION READINGS
// ============================================

var HEALTH_BLUEPRINT_READINGS = {
    taurus: {
        title: "Plan de salud de Tauro",
        keywords: ["Garganta", "Tiroides", "Voz", "Cuello", "Metabolismo"],
        bodyRuler: "Garganta, cuello, tiroides, voz.",
        vulnerabilities: `Con énfasis en Tauro, la conciencia sobre la salud se centra en:

GARGANTA Y VOZ:
• El chakra de la garganta es tu centro de poder: protégelo
• Es posible que sea necesario controlar la función tiroidea durante toda la vida
• Tensión de la voz debido a emociones no expresadas o uso excesivo
• La tensión del cuello retiene el estrés acumulado

CONSIDERACIONES METABÓLICAS:
• Metabolismo naturalmente más lento: esto es una característica, no un error
• Se prefiere la energía constante a las ráfagas rápidas
• Puede necesitar un tiempo de recuperación más prolongado después de una enfermedad
• El peso responde al estrés y a los estados emocionales.

LA CONEXIÓN SALUD-RIQUEZA:
Esto es crucial para el énfasis de Tauro: su salud financiera y física están misteriosamente vinculadas. Cuando uno sufre, el otro suele seguirlo. El estrés financiero se manifiesta en los problemas de garganta y cuello. La negligencia física afecta la capacidad de generar ingresos.

ENFOQUE DE BIENESTAR:
• Autocuidado lento y sensorial (masajes, aromaterapia, alimentación de calidad)
• Rutina regular sobre esfuerzos esporádicos intensos
• Trabajo de voz, canto o expresión vocal como terapia.
• Conexión con la naturaleza para conectar con la tierra y sanar`,
        guidance: "Tu cuerpo es tu primera riqueza. Trátelo como el activo valioso que es.",
        affirmation: "Honro la sabiduría de mi cuerpo y los ritmos naturales."
    },
    
    moonTaurus: {
        title: "Patrones de salud de la luna de Tauro",
        emphasis: "Salud emocional a través del confort físico",
        reading: `Con la Luna en Tauro, el bienestar emocional está profundamente ligado al confort físico:

• El estrés se manifiesta físicamente más que mentalmente
• Comer reconfortante es un patrón real que hay que observar
• La necesidad de seguridad física afecta la calidad del sueño
• La privación sensorial causa angustia emocional
• El tacto y el afecto físico son esenciales para la salud emocional

MODALIDADES DE CURACIÓN:
• Masajes y trabajo corporal
• Aromaterapia y aceites esenciales
• Inmersión en la naturaleza
• Ambiente de sueño de calidad
• Objetos reconfortantes y entorno familiar.`
    }
};

// ============================================
// TEACHING STYLE READINGS
// ============================================

var TEACHING_STYLE_READINGS = {
    embodiedTeacher: {
        title: "El método del maestro encarnado",
        subtitle: "Enseñar a través del ser, no sólo del saber",
        keywords: ["Demostración", "Presencia", "Sabiduría práctica", "Paciencia"],
        reading: `Con el énfasis de la Novena Casa combinado con la energía de Tauro, enseñas a través de la encarnación en lugar de la abstracción:

SU ESTILO DE ENSEÑANZA:
• Demuestras antes de explicar
• Tu presencia enseña tanto como tus palabras.
• Paciencia con los estudiantes lentos (comprende que la profundidad requiere tiempo)
• Aplicaciones prácticas sobre marcos teóricos.
• Los estudiantes se sienten seguros y fundamentados en su presencia.

CÓMO SE APRENDE MEJOR:
• Experiencia práctica en conferencias.
• Tomarse su tiempo para absorber verdaderamente la información
• El entorno físico importa (la comodidad ayuda al aprendizaje)
• Aprender a través de todos los sentidos, no solo leyendo
• Repetición y práctica hasta que se materialice el dominio.

ENTORNOS ÓPTIMOS DE APRENDIZAJE:
• Espacios cómodos y hermosos
• Ritmo pausado con tiempo para la integración
• Entornos naturales o elementos naturales presentes
• Calidad sobre cantidad de información
• Profesor que respeta tu proceso

LO QUE ESTÁS AQUÍ PARA ENSEÑAR:
• Que la sabiduría debe vivirse, no sólo conocerse
• Que lo lento y lo constante creen un cambio duradero
• Que el cuerpo contiene inteligencia
• Que lo material y lo espiritual no están separados
• Que la paciencia es un superpoder`,
        superpower: "Hacer que conceptos espirituales complejos se sientan tangibles y alcanzables",
        shadow: "Puede sentirse frustrado con los estudiantes que quieren soluciones rápidas."
    },
    
    ninthHouseTeacher: {
        title: "Regalos de enseñanza de la novena casa",
        keywords: ["Filosofía", "Aprendizaje Superior", "Publicación", "Viajar"],
        reading: `Una fuerte energía de la Novena Casa indica dones naturales en:

• Educación superior y aprendizaje avanzado
• Publicar, difundir y compartir ideas ampliamente
• Comunicación intercultural y puentes entre mundos
• Hacer accesibles los conceptos filosóficos
• Inspirar a otros hacia el crecimiento y la expansión

EXPRESIONES DE CARRERA:
• Profesor, conferencista, líder de taller
• Autor, blogger, creador de contenido
• Guía de viaje o puente cultural
• Entrenador de vida o consejero filosófico
• Maestro religioso/espiritual`
    }
};

// ============================================
// PHILOSOPHICAL FRAMEWORK READINGS
// ============================================

var PHILOSOPHICAL_FRAMEWORK_READINGS = {
    taurus9thHouse: {
        title: "Filosofía fundamentada",
        subtitle: "Donde el material se encuentra con el significado",
        keywords: ["Sabiduría práctica", "Creencia encarnada", "Filosofía de valor"],
        reading: `La combinación de la energía de Tauro con el énfasis de la Casa 9 crea un marco filosófico único:

SU SISTEMA DE CREENCIAS:
No te interesa la filosofía que no se puede vivir. Las ideas abstractas deben pasar por el filtro del "¿Pero FUNCIONA?" Tu espiritualidad es terrenal, práctica, sensorial.

TENSIONES FILOSÓFICAS FUNDAMENTALES:
• Material vs. Espiritual (estás aquí para demostrar que son lo mismo)
• Posesión vs. Desapego (encontrarás el camino intermedio)
• Placer versus ascetismo (el hedonismo sagrado es tu camino)
• Tradición vs. Innovación (honras ambas)

CÓMO LAS CREENCIAS SE HACEN REALIDAD:
Para usted, una creencia no es real hasta que cambia el comportamiento. No sólo piensas en la abundancia, sino que la creas. No sólo crees en la autoestima, sino que la demuestras a través de elecciones.

LA FILOSOFÍA DE VALOR:
Todo es un intercambio de energía. Entiendes intuitivamente:
• El dinero como fuerza vital cristalizada
• Las posesiones como valores materializados
• El tiempo como moneda definitiva
• La calidad como práctica espiritual

ESPIRITUAL PERO PRÁCTICO:
Tu camino no se trata de renunciar al mundo sino de santificarlo. Cada compra es un voto por los valores. Cada posesión es una relación. Cada decisión financiera es una elección espiritual.`,
        keyInsight: "Demuestras tus creencias por cómo gastas tu dinero y tu tiempo.",
        integration: "Tu tarea filosófica es hacer que lo material sea sagrado sin hacer que el material sea sagrado."
    },
    
    wealthPhilosophy: {
        title: "Filosofía de la riqueza",
        keywords: ["Abundancia", "Valor", "Intercambio", "Administración"],
        reading: `Su perspectiva filosófica única sobre la riqueza:

LA RIQUEZA COMO ENERGÍA:
• El dinero no es ni bueno ni malo: es una intención amplificada.
• La abundancia fluye hacia quienes se sienten merecedores de ella.
• El pensamiento de escasez crea una realidad de escasez
• Generosidad y abundancia son la misma energía.

SUS CREENCIAS SOBRE LA RIQUEZA:
• La calidad importa más que la cantidad
• Valor duradero sobre ganancias rápidas
• Generar riqueza es una forma de respeto por uno mismo
• La libertad financiera permite un propósito en la vida

EL SALDO DAR-RECIBIR:
Con la energía de Tauro-Casa 9, comprendes que la riqueza debe fluir. El acaparamiento crea estancamiento. Dar excesivamente agota. El arte está en el ritmo: recibir con gracia, dar con intención, construir con propósito.`
    }
};

// ============================================
// BIRTH LOCATION SIGNIFICANCE
// ============================================

var LOCATION_READINGS = {
    abuDhabi: {
        title: "Firma de nacimiento de Abu Dhabi",
        coordinates: "24,4539° N, 54,3773° E",
        significance: `Nacer en Abu Dhabi conlleva firmas energéticas específicas:

ENERGÍA GEOGRÁFICA:
• El desierto se encuentra con el mar: elementos de fuego y agua en constante diálogo
• Antiguo cruce de civilizaciones y rutas comerciales
• La prosperidad moderna basada en recursos antiguos
• Punto de encuentro de influencias de Oriente y Occidente

IMPLICACIONES ASTROLÓGICAS:
• Cálculos específicos del signo ascendente basados en esta latitud
• Configuraciones de sistema de casa únicas para esta ubicación
• Ángulos solares y lunares específicos de esta geografía.

SIGNIFICADO DEL NIVEL DEL ALMA:
Elegir nacer en Abu Dhabi sugiere temas de:
• Uniendo mundos y culturas
• Prosperidad material con raíces espirituales
• Innovación moderna que honra la tradición
• Construir estructuras duraderas a partir de recursos`,
        guidance: "Tu lugar de nacimiento te eligió a TI. La energía de este lugar es parte de vuestro plano cósmico."
    }
};

// ============================================
// SYNTHESIS FUNCTIONS
// ============================================

function analyzeHouseConcentration(planetHouses) {
    if (!planetHouses) return null;
    
    const houseCounts = {};
    const houseDetails = {};
    
    // Count planets in each house
    for (const [planet, house] of Object.entries(planetHouses)) {
        if (house) {
            houseCounts[house] = (houseCounts[house] || 0) + 1;
            if (!houseDetails[house]) houseDetails[house] = [];
            houseDetails[house].push(planet);
        }
    }
    
    // Find stelliums (3+ planets in same house)
    const houseStelliums = [];
    for (const [house, count] of Object.entries(houseCounts)) {
        if (count >= 3) {
            const houseNum = parseInt(house);
            houseStelliums.push({
                house: houseNum,
                count: count,
                planets: houseDetails[house],
                reading: HOUSE_STELLIUM_READINGS[houseNum] || null,
                rarity: RARITY_CALCULATIONS.houseConcentrationRarity(count, houseNum)
            });
        }
    }
    
    return houseStelliums.length > 0 ? houseStelliums : null;
}

function analyzeWealthBlueprint(readings) {
    if (!readings) return null;
    
    const wealthIndicators = [];
    
    // Check for 2nd house stellium
    if (readings.astrology && readings.astrology.planetHouses) {
        const house2Planets = [];
        for (const [planet, house] of Object.entries(readings.astrology.planetHouses)) {
            if (house === 2) house2Planets.push(planet);
        }
        
        if (house2Planets.length >= 2) {
            wealthIndicators.push({
                type: 'secondHouseEmphasis',
                planets: house2Planets,
                significance: 'Fuerte potencial de riqueza a través del dominio de los recursos.'
            });
        }
        
        // Check for Jupiter-Saturn in 2nd
        if (house2Planets.includes('Jupiter') && house2Planets.includes('Saturn')) {
            wealthIndicators.push({
                type: 'jupiterSaturn2ndHouse',
                reading: WEALTH_BLUEPRINT_READINGS.jupiterSaturn2ndHouse
            });
        }
        
        // Check for Pluto in 2nd
        if (house2Planets.includes('Pluto')) {
            wealthIndicators.push({
                type: 'pluto2ndHouse',
                reading: WEALTH_BLUEPRINT_READINGS.pluto2ndHouse
            });
        }
    }
    
    // Check for Taurus emphasis
    if (readings.astrology && readings.astrology.stelliums) {
        const taurusStellium = readings.astrology.stelliums.find(s => s.sign === 'Taurus');
        if (taurusStellium) {
            wealthIndicators.push({
                type: 'taurusWealth',
                reading: WEALTH_BLUEPRINT_READINGS.taurus2ndHouse
            });
        }
    }
    
    return wealthIndicators.length > 0 ? wealthIndicators : null;
}

function analyzeArchetypes(readings) {
    if (!readings) return [];
    
    const archetypes = [];
    
    // Check for Wealthy Monk
    const hasTaurusStellium = readings.astrology?.stelliums?.some(s => s.sign === 'Taurus');
    const has2ndHouseEmphasis = Object.values(readings.astrology?.planetHouses || {}).filter(h => h === 2).length >= 2;
    
    if (hasTaurusStellium || has2ndHouseEmphasis) {
        archetypes.push(ARCHETYPE_SYNTHESIS_READINGS.wealthyMonk);
    }
    
    // Check for Sensory Mystic
    if (readings.astrology?.moonSign?.name === 'Taurus') {
        archetypes.push(ARCHETYPE_SYNTHESIS_READINGS.sensoryMystic);
    }
    
    // Check for Completion Specialist
    if (readings.lunar?.phase?.name === 'Waning Crescent' && readings.numerology?.lifePath === 9) {
        archetypes.push(ARCHETYPE_SYNTHESIS_READINGS.completionSpecialist);
    }
    
    // Check for Embodied Teacher
    const has9thHouseEmphasis = Object.values(readings.astrology?.planetHouses || {}).filter(h => h === 9).length >= 3;
    if (has9thHouseEmphasis && hasTaurusStellium) {
        archetypes.push(ARCHETYPE_SYNTHESIS_READINGS.embodiedTeacher);
    }
    
    // Check for Immovable Visionary
    if (hasTaurusStellium && has9thHouseEmphasis) {
        archetypes.push(ARCHETYPE_SYNTHESIS_READINGS.immovableVisionary);
    }
    
    return archetypes;
}

function analyzeTripleNumbers(readings) {
    if (!readings?.numerology) return null;
    
    const numbers = [
        readings.numerology.birthday,
        readings.numerology.soulUrge,
        readings.numerology.pinnacles?.first,
        readings.numerology.pinnacles?.second,
        readings.numerology.destiny,
        readings.numerology.lifePath
    ].filter(n => n);
    
    const counts = {};
    numbers.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
    });
    
    for (const [num, count] of Object.entries(counts)) {
        if (count >= 3) {
            return {
                number: parseInt(num),
                occurrences: count,
                significance: `Triple activación ${num}: esta energía es un mandato cósmico`,
                reading: TIMING_READINGS.tripleNumberSignificance.reading
            };
        }
    }
    
    return null;
}

function analyzeSunMoonConjunction(readings) {
    if (!readings?.astrology) return null;
    
    const sunSign = readings.astrology.sunSign?.name;
    const moonSign = readings.astrology.moonSign?.name;
    
    if (sunSign && moonSign && sunSign === moonSign) {
        return {
            ...RARITY_CALCULATIONS.sunMoonSameSign,
            sign: sunSign,
            synthesis: `Tanto el Sol como la Luna en ${sunSign} crean una poderosa coherencia interna: la identidad y la emoción están unificadas.`
        };
    }
    return null;
}

function analyzeHealthBlueprint(readings) {
    if (!readings?.astrology) return null;
    
    const healthIndicators = [];
    
    // Check for Taurus emphasis (Sun, Moon, Stellium)
    const sunSign = readings.astrology.sunSign?.name;
    const moonSign = readings.astrology.moonSign?.name;
    const hasTaurusStellium = readings.astrology.stelliums?.some(s => s.sign === 'Taurus');
    
    if (sunSign === 'Taurus' || hasTaurusStellium) {
        healthIndicators.push({
            type: 'taurusHealth',
            reading: HEALTH_BLUEPRINT_READINGS.taurus
        });
    }
    
    if (moonSign === 'Taurus') {
        healthIndicators.push({
            type: 'moonTaurusHealth',
            reading: HEALTH_BLUEPRINT_READINGS.moonTaurus
        });
    }
    
    return healthIndicators.length > 0 ? healthIndicators : null;
}

function analyzeTeachingStyle(readings) {
    if (!readings?.astrology) return null;
    
    const teachingIndicators = [];
    
    // Check for 9th House emphasis
    const planetHouses = readings.astrology.planetHouses || {};
    const house9Planets = Object.entries(planetHouses).filter(([p, h]) => h === 9).map(([p]) => p);
    
    if (house9Planets.length >= 2) {
        teachingIndicators.push({
            type: 'ninthHouseTeacher',
            planets: house9Planets,
            reading: TEACHING_STYLE_READINGS.ninthHouseTeacher
        });
    }
    
    // Check for Embodied Teacher (9th House + Taurus)
    const hasTaurusEmphasis = readings.astrology.sunSign?.name === 'Taurus' ||
                              readings.astrology.moonSign?.name === 'Taurus' ||
                              readings.astrology.stelliums?.some(s => s.sign === 'Taurus');
    
    if (house9Planets.length >= 2 && hasTaurusEmphasis) {
        teachingIndicators.push({
            type: 'embodiedTeacher',
            reading: TEACHING_STYLE_READINGS.embodiedTeacher
        });
    }
    
    return teachingIndicators.length > 0 ? teachingIndicators : null;
}

function analyzePhilosophicalFramework(readings) {
    if (!readings?.astrology) return null;
    
    const philosophyIndicators = [];
    
    // Check for 9th House + Taurus combination
    const planetHouses = readings.astrology.planetHouses || {};
    const house9Planets = Object.entries(planetHouses).filter(([p, h]) => h === 9).map(([p]) => p);
    const hasTaurusEmphasis = readings.astrology.sunSign?.name === 'Taurus' ||
                              readings.astrology.moonSign?.name === 'Taurus' ||
                              readings.astrology.stelliums?.some(s => s.sign === 'Taurus');
    
    if (house9Planets.length >= 2 && hasTaurusEmphasis) {
        philosophyIndicators.push({
            type: 'taurus9thHouse',
            reading: PHILOSOPHICAL_FRAMEWORK_READINGS.taurus9thHouse
        });
    }
    
    // Check for 2nd House emphasis (wealth philosophy)
    const house2Planets = Object.entries(planetHouses).filter(([p, h]) => h === 2).map(([p]) => p);
    if (house2Planets.length >= 2 || hasTaurusEmphasis) {
        philosophyIndicators.push({
            type: 'wealthPhilosophy',
            reading: PHILOSOPHICAL_FRAMEWORK_READINGS.wealthPhilosophy
        });
    }
    
    return philosophyIndicators.length > 0 ? philosophyIndicators : null;
}

function analyzeBirthLocation(birthPlace) {
    if (!birthPlace) return null;
    
    const place = birthPlace.toLowerCase().trim();
    
    // Check for Abu Dhabi variations
    if (place.includes('abu dhabi') || place.includes('abudhabi') || place === 'uae' || place.includes('united arab emirates')) {
        return LOCATION_READINGS.abuDhabi;
    }
    
    // Can be extended for other locations
    return null;
}

// ============================================
// STELLIUM INTEGRATION ANALYSIS
// Cross-references multiple house stelliums
// ============================================

var STELLIUM_INTEGRATION_READINGS = {
    "9-2": {
        title: "El generador de riqueza filosófica",
        subtitle: "Síntesis de Stellium de la Casa 9 + Casa 2",
        keywords: ["Puente sabiduría-riqueza", "Enseñar con fines de lucro", "Abundancia filosófica", "Valor a través de la visión"],
        reading: `Esta es una de las combinaciones de stellium más poderosas para crear riqueza significativa. La Casa 9 (filosofía, educación superior, expansión) alimenta directamente la Casa 2 (recursos, valor, dominio material), creando a alguien que literalmente puede beneficiarse de su sabiduría.

EL TUBO DE LA FILOSOFÍA AL LUCRO:
El stellium de la novena casa genera un pensamiento amplio, creencias visionarias y hambre de verdad. El stellium de la Segunda Casa traduce esas visiones en valor tangible. No es alguien que sólo piensa en la abundancia: la construye a partir de sus creencias.

CÓMO SE REALIZA ESTO EN LA VIDA REAL:
• Pueden ganar dinero enseñando, publicando, consultando o compartiendo conocimientos especializados.
• Los viajes y las experiencias interculturales se convierten en fuentes de ingresos o ideas de negocios.
• Su postura filosófica influye directamente en sus decisiones financieras (por ejemplo, inversión ética, capitalismo consciente).
• La educación superior o el estudio espiritual a menudo conducen a sus empresas más rentables.
• Ven el dinero como un vehículo para difundir su mensaje, no sólo como una comodidad personal.

EL CICLO VIRTUOSO:
Cuanto más aprenden y se expanden (Casa 9), más ganan (Casa 2). Cuantos más recursos acumulen (casa 2), más podrán invertir en crecimiento, viajes y educación (casa 9). Este ciclo que se refuerza a sí mismo puede crear tanto una sabiduría profunda como una abundancia material significativa.

TENSIÓN POTENCIAL:
La Casa IX quiere dar conocimiento libremente. La Segunda Cámara quiere una compensación justa por el valor. El desafío de la integración es valorar adecuadamente su sabiduría, sin regalarla toda ni acapararla detrás de muros de pago.`,
        guidance: "Tu mayor riqueza proviene de lo que sabes y crees. Construya negocios, carreras o inversiones que se alineen con su visión filosófica. El dinero sigue el significado.",
        practicalSteps: [
            "Cree un curso, libro o programa de entrenamiento que incluya sus conocimientos filosóficos únicos.",
            "Invierta en experiencias y educación que amplíen su visión del mundo: estas SON sus herramientas para generar riqueza",
            "Busque oportunidades comerciales internacionales o interculturales donde su amplia perspectiva le brinde una ventaja.",
            "Ponle un precio justo a tu sabiduría: cobrar menos de lo necesario deshonra tanto tu conocimiento como la capacidad de los demás para valorarlo."
        ]
    },
    "1-7": {
        title: "El dínamo de la autoasociación",
        subtitle: "Síntesis de Stellium de la Casa 1 + Casa 7",
        keywords: ["Asociación de identidad", "Equilibrio entre uno mismo y otro", "Poder relacional"],
        reading: `El eje del Yo (Casa 1) y del Otro (Casa 7) está completamente activado. Esto crea a alguien cuya identidad personal está profundamente moldeada por sus relaciones, y cuyas relaciones están profundamente moldeadas por su poder personal. El desafío es mantener la individualidad dentro de una asociación profunda.`,
        guidance: "Creces más cuando estás en una relación, pero nunca debes perderte en una."
    },
    "4-10": {
        title: "El constructor de fundaciones privadas",
        subtitle: "Síntesis de Stellium de la Casa 4 + Casa 10",
        keywords: ["Equilibrio entre el hogar y la carrera", "Fundación heredada", "Integración público-privada"],
        reading: `El eje del Hogar (Casa 4) y la Carrera (Casa 10) está totalmente activado. Esto crea a alguien que construye su legado público sobre la base de su mundo privado. Los negocios familiares, el trabajo desde casa o las carreras en bienes raíces, hotelería o servicios familiares son expresiones naturales.`,
        guidance: "Su carrera y su vida familiar están destinadas a reforzarse mutuamente, no a competir."
    },
    "2-8": {
        title: "El financiero transformacional",
        subtitle: "Síntesis de Stellium de la Casa 2 + Casa 8",
        keywords: ["Alquimia de la riqueza", "Transformación financiera", "Recursos compartidos"],
        reading: `El eje de Recursos Personales (Casa 2) y Recursos Compartidos (Casa 8) está totalmente activado. Esto crea un instinto financiero excepcional que abarca la riqueza personal Y el dinero de otras personas. La banca de inversión, los seguros, la planificación patrimonial o cualquier campo que implique transformación financiera es territorio natural.`,
        guidance: "Usted comprende ambos lados de la ecuación de la riqueza: lo que gana y lo que hereda, invierte o transforma."
    },
    "5-11": {
        title: "El catalizador de la comunidad creativa",
        subtitle: "Síntesis de Stellium de la Casa 5 + Casa 11",
        keywords: ["Redes creativas", "Comunidad alegre", "Innovación a través del juego"],
        reading: `El eje de la Creatividad Personal (Casa 5) y la Visión Colectiva (Casa 11) está totalmente activado. Esto crea a alguien que canaliza la expresión creativa personal hacia movimientos grupales, proyectos comunitarios o innovación social. Su alegría y juego se convierten en catalizadores del cambio colectivo.`,
        guidance: "Tu creatividad se amplifica a través de la comunidad. Comparta sus dones creativos con grupos que compartan su visión."
    },
    "3-9": {
        title: "El transmisor del conocimiento",
        subtitle: "Síntesis de Stellium de la Casa 3 + Casa 9",
        keywords: ["Dominio de la comunicación", "Puente Local-Global", "Poder de enseñanza"],
        reading: `El eje de la Comunicación Local (Casa 3) y del Conocimiento Superior (Casa 9) está plenamente activado. Esto crea un maestro, escritor o personalidad mediática nato que puede tomar ideas complejas y hacerlas accesibles. Unen la academia y la comprensión cotidiana.`,
        guidance: "Estás destinado a traducir grandes ideas a un lenguaje práctico. La enseñanza, la escritura y los medios son sus plataformas naturales."
    },
    "6-12": {
        title: "El sanador sagrado",
        subtitle: "Síntesis de Stellium de la Casa 6 + Casa 12",
        keywords: ["Curación Holística", "Servicio a través de la rendición", "Puente cuerpo-espíritu"],
        reading: `El eje de Salud Diaria (Casa 6) y Disolución Espiritual (Casa 12) está totalmente activado. Esto crea una persona atraída por las artes curativas que unen el cuerpo y el espíritu: medicina holística, trabajo energético, prácticas terapéuticas que abordan las causas espirituales fundamentales de los síntomas físicos.`,
        guidance: "Tu don curativo combina habilidad práctica con sensibilidad espiritual. Honra a ambos."
    }
};

function analyzeStelliumIntegration(readings) {
    if (!readings?.astrology?.planetHouses) return null;
    
    const planetHouses = readings.astrology.planetHouses;
    const houseCounts = {};
    
    for (const [planet, house] of Object.entries(planetHouses)) {
        if (house) {
            houseCounts[house] = (houseCounts[house] || 0) + 1;
        }
    }
    
    // Find houses with 3+ planets (stelliums)
    const stelliumHouses = Object.entries(houseCounts)
        .filter(([h, count]) => count >= 3)
        .map(([h]) => parseInt(h))
        .sort((a, b) => a - b);
    
    if (stelliumHouses.length < 2) return null;
    
    const integrations = [];
    
    // Check all pairs of stellium houses
    for (let i = 0; i < stelliumHouses.length; i++) {
        for (let j = i + 1; j < stelliumHouses.length; j++) {
            const h1 = stelliumHouses[i];
            const h2 = stelliumHouses[j];
            const key = `${h1}-${h2}`;
            const reverseKey = `${h2}-${h1}`;
            
            if (STELLIUM_INTEGRATION_READINGS[key]) {
                integrations.push(STELLIUM_INTEGRATION_READINGS[key]);
            } else if (STELLIUM_INTEGRATION_READINGS[reverseKey]) {
                integrations.push(STELLIUM_INTEGRATION_READINGS[reverseKey]);
            } else {
                // Generate dynamic integration for unlisted pairs
                integrations.push({
                    title: `Casa ${h1} + Casa ${h2} Resonancia`,
                    subtitle: `Integración dual de Stellium`,
                    keywords: ["Poder de enfoque múltiple", "Integración del tema de la vida", "Propósito complejo"],
                    reading: `Tener stelliums en las casas ${h1}th y ${h2}th crea un enfoque dual único en la vida. Las energías de estas dos áreas de la vida se amplifican, creando a alguien con una capacidad extraordinaria en ambos dominios. La clave para la realización es encontrar maneras de hacer que estas áreas se refuercen en lugar de competir entre sí.`,
                    guidance: `Busque carreras, relaciones o proyectos que involucren las fortalezas de su Casa ${h1} y de su Casa ${h2} simultáneamente.`
                });
            }
        }
    }
    
    return integrations.length > 0 ? integrations : null;
}

// ============================================
// AGE-SPECIFIC TIMELINE
// ============================================

var LIFE_PHASE_READINGS = {
    earlyChildhood: {
        title: "Años de fundación (edades 0-7)",
        description: "La fase de impresión",
        reading: `Los primeros siete años son el período psicológicamente más formativo de cualquier vida. Durante esta fase, el signo lunar es la influencia dominante: el niño esencialmente vive a través de su Luna, absorbiendo patrones emocionales que estarán detrás de cada decisión que tome por el resto de su vida.

Todo lo experimentado durante este tiempo se convierte en el sistema operativo emocional. Cómo se siente la seguridad, cómo es el amor, si el mundo es digno de confianza o amenazante: todo esto no se aprende intelectualmente sino que se absorbe celularmente. La energía de la Cuarta Casa da forma al ambiente hogareño literal y emocional que crea esta base.

Aquí es cuando se forman patrones de apego. Un niño que se siente constantemente visto y tranquilizado desarrolla un apego seguro que se convierte en el modelo para toda relación futura. Un niño cuyas necesidades no se satisfacen de manera consistente desarrolla estrategias adaptativas (complacer a las personas, retraimiento, hipervigilancia) que son respuestas de supervivencia brillantemente inteligentes, pero que pueden convertirse en patrones limitantes en la edad adulta.

El IC (Imum Coeli) y todos los planetas de la Casa 4 están dando forma activamente a la realidad durante esta fase. Cualquier signo que se encuentre en el CI describe la atmósfera emocional que se está absorbiendo. Cualesquiera que sean los planetas que ocupan la Casa 4, describen las energías específicas presentes en el entorno del hogar, para bien o para mal.`
    },
    middleChildhood: {
        title: "Años de Mercurio (de 7 a 14 años)",
        description: "La fase de aprendizaje",
        reading: `Entre las siete y los catorce años, Mercurio toma la delantera. La mente despierta adecuadamente: ya no solo absorbe, sino que procesa, cuestiona, categoriza y forma opiniones activamente sobre el mundo. Es entonces cuando cristaliza la identidad intelectual: ¿soy inteligente? ¿Soy bueno con las palabras? ¿Importan mis pensamientos?

El signo de Mercurio y la Casa 3 se convierten en las influencias dominantes durante esta fase. Ahora toman forma cómo se procesa la información, cómo se desarrolla la comunicación y cómo se relaciona el niño con sus hermanos, sus compañeros de escuela y su entorno inmediato. El estilo de aprendizaje se solidifica: queda claro si son estudiantes visuales, verbales, cinéticos o intuitivos.

La conciencia social explota. El niño pasa del mundo de la primera infancia, centrado en la familia, al mundo de la escuela y el vecindario, centrado en sus pares. Comienzan a comprender que otras familias operan de manera diferente, que existen reglas más allá del hogar y que necesitan encontrar su lugar en una jerarquía social que no crearon.

Aquí es también cuando la voz interior toma forma. La forma en que los adultos le hablan a este niño durante estos años se convierte literalmente en su monólogo interno. El estímulo se convierte en autoestímulo. La crítica se convierte en autocrítica. Las ubicaciones de la Tercera Casa describen no sólo cómo se comunican con los demás, sino también cómo se comunicarán consigo mismos por el resto de su vida.`
    },
    adolescence: {
        title: "El despertar de Venus (edades 14-21)",
        description: "La fase de valores",
        reading: `La adolescencia marca la activación de la energía de Venus: el despertar de los valores, la estética, las relaciones y la candente cuestión de la autoestima. No se trata sólo de enamoramientos románticos, aunque éstos ciertamente llegan. Es un análisis fundamental de lo que importa, lo que es bello y lo que vale el yo.

El signo de Venus y los temas de las Casas 2 y 7 se convierten en influencias principales. Los valores que pueden haber sido heredados de la familia ahora se cuestionan, se ponen a prueba y se reivindican o rechazan. El adolescente no está siendo difícil: está haciendo el trabajo de desarrollo esencial de decidir lo que realmente cree versus lo que le dijeron que creyera.

Las relaciones se convierten en el aula principal. Los primeros amores, los primeros desamores y las primeras experiencias de intimidad genuina entre pares enseñan lecciones que ningún padre o maestro puede transmitir. El Descendente de la Séptima Casa comienza a activarse: el tipo de persona que les atrae, los patrones de relación que llevarán hasta la edad adulta, todo comienza a formarse a través de estas primeras experiencias.

La autoestima es el campo de batalla oculto de esta fase. Los temas de valor de la Segunda Casa, tanto materiales como personales, se vuelven intensamente relevantes. Lo que sienten acerca de su cuerpo, sus habilidades, su valor de amor y éxito se está moldeando en tiempo real. Los mensajes que reciben sobre su valor durante esta fase resuenan durante décadas. Es entonces cuando se sientan las bases de su relación adulta con el dinero, la belleza y la autoestima.`
    },
    youngAdult: {
        title: "Activación Solar (Edades 21-30)",
        description: "La fase de identidad",
        reading: `Los años veinte es cuando el signo solar realmente se activa. Antes de esto, la identidad era en gran medida un reflejo de la familia, los pares y las circunstancias. Ahora se convierte en un proyecto consciente: ¿quién soy yo realmente? ¿Qué es lo que realmente quiero? La energía del signo solar, que puede haber estado latente o apagada, comienza a exigir una expresión auténtica.

Esta es la década de experimentación y comienzos en falso que en realidad no son falsos: cada carrera que se intenta, cada relación que se inicia y cada prueba de identidad enseña algo esencial. Las necesidades del signo solar se vuelven cada vez más innegociables. Un Leo Sol que pasó su adolescencia callado comienza a necesitar ser el centro de atención. Un Sol de Capricornio que vagaba por la escuela de repente desarrolla una ambición feroz.

El Medio Cielo (Casa 10) comienza a afirmarse profesionalmente. La dirección profesional, la identidad pública y la cuestión del legado empiezan a importar como antes. Las decisiones que se toman durante esta fase (qué estudiar, dónde trabajar, con quién comprometerse) son las primeras decisiones verdaderamente tomadas por uno mismo.

A finales de los años veinte se acerca el primer retorno de Saturno, lo que crea una presión cada vez mayor para ponerse serios. Lo que a principios de los años veinte parecían opciones infinitas, empiezan a reducirse a medida que la realidad exige compromiso. Esto no es una pérdida de libertad: es el desarrollo de la concentración. El regreso de Saturno entre el 27 y el 30 cristalizará todo lo que se ha estado gestando en esta década.`
    },
    saturn1: {
        title: "Primer regreso de Saturno (edades 27 a 30)",
        description: "La verificación de la realidad",
        reading: `El primer retorno de Saturno es posiblemente el tránsito astrológico más significativo de la edad adulta joven. Saturno vuelve a la posición exacta que ocupaba al nacer y todo lo que no es auténticamente tuyo se pone a prueba. Las relaciones que se basaban en la conveniencia más que en la compatibilidad genuina se rompen. Las carreras elegidas para complacer a los padres en lugar de cumplir un propósito se vuelven insoportables. La autoimagen construida sobre las expectativas de los demás y no sobre la verdad interior comienza a colapsar.

Esto no es un castigo: es una liberación disfrazada de crisis. Saturno elimina lo falso para que lo real pueda construirse adecuadamente. Las estructuras que sobrevivan al retorno de Saturno se convertirán en la verdadera base para los próximos treinta años. Los que se desmoronan necesitaban desmoronarse, incluso cuando no se siente así en el momento.

El signo de Saturno en la carta natal describe la naturaleza específica de esta prueba. Saturno en Aries pone a prueba la independencia y el coraje. Saturno en Cáncer pone a prueba la autenticidad emocional. Saturno en Capricornio pone a prueba si la ambición es genuina o performativa. Cualquier cosa que toque Saturno en la carta natal es donde ocurre la reestructuración más exigente y, en última instancia, más gratificante.

Muchas de las decisiones más importantes de la vida se toman durante o inmediatamente después del primer retorno de Saturno: matrimonio o divorcio, compromiso profesional o cambio radical, tener hijos, mudarse de país, iniciar negocios. Estas decisiones tienen peso porque se toman con conciencia adulta y no con optimismo juvenil. Lo que se elige ahora se elige con los ojos abiertos.`
    },
    earlyMiddle: {
        title: "Dominio de Marte (edades 30-40)",
        description: "La fase de construcción",
        reading: `Los años treinta son la década de la acción: la energía de Marte está en su máxima capacidad productiva. Las cuestiones de identidad de los años veinte han sido (en su mayoría) respondidas, el retorno de Saturno ha despejado los comienzos en falso y ahora es el momento de construir. El avance profesional, la creación de una familia, el establecimiento de una reputación y el trabajo serio de convertirse en quien debe ser, se aceleran.

El Medio Cielo y la Décima Casa se vuelven centrales para la vida diaria. La identidad profesional no sólo se está formando: se está probando y demostrando en el mundo real. La diferencia entre los años veinte y los treinta es que los treinta exigen resultados, no sólo potencial. Marte proporciona el impulso, la ambición y la energía competitiva necesarios para reclamar un lugar en el mundo.

Esta década suele traer la mayor vitalidad física combinada con la mayor presión externa. Hay hipotecas, hijos, exigencias profesionales, padres ancianos: las responsabilidades se multiplican mientras la energía para manejarlas está en su punto máximo. El signo de Marte describe cómo se canaliza esta energía: Marte en los signos de tierra construye metódicamente, Marte en los signos de fuego carga hacia adelante agresivamente, Marte en los signos de aire crea estrategias y redes, Marte en los signos de agua navega intuitivamente.

El peligro de esta década es perder la vida interior a causa de las exigencias externas. La construcción es necesaria, pero si las necesidades más profundas del alma (creatividad, espiritualidad, intimidad emocional) se sacrifican por completo en aras de la productividad, la cuadratura de Plutón en 36-40 ofrecerá un contundente recordatorio de que el mundo interior no puede posponerse indefinidamente.`
    },
    plutoSquare: {
        title: "Plutón Cuadratura (Edades 36-40)",
        description: "El ajuste de cuentas del poder",
        reading: `Plutón en tránsito forma una cuadratura con Plutón natal entre aproximadamente 36 y 40, lo que desencadena una confrontación con el poder, el deseo y todo lo que ha sido enterrado. Este es el tránsito que pregunta: ¿qué has tenido miedo de querer? ¿Qué poder has regalado? ¿Qué verdad has estado evitando porque enfrentarla cambiaría todo?

Este tránsito suele manifestarse como un período de intensa presión interna. Los deseos reprimidos afloran con fuerza volcánica. La persona que pasó sus treinta años siendo responsable de repente siente una necesidad desesperada de autenticidad que trasciende el deber. Puede parecer una crisis para los de afuera, pero internamente se siente como si finalmente despertara.

La posición de la casa de Plutón en la carta natal determina dónde se desarrolla este cálculo. Plutón en Libra (una generación común) lo experimenta a través de las relaciones: la dinámica de asociación que funcionó en los años veinte y treinta de repente puede parecer intolerable. Plutón en Escorpio enfrenta el ajuste de cuentas a través de la identidad misma: quiénes han estado fingiendo ser versus quiénes son en realidad.

El regalo de Plutón en Cuadratura es el poder recuperado. Todo lo que se entregó (a los padres, la pareja, los empleadores, las expectativas sociales) ahora puede recuperarse conscientemente. Esto no tiene por qué ser destructivo. La versión más saludable de este tránsito implica un autoexamen honesto, trabajo terapéutico y el coraje de realizar cambios que sirvan al yo auténtico incluso cuando sean inconvenientes para el construido.`
    },
    lateMiddle: {
        title: "Expansión de Júpiter (40-50 años)",
        description: "La fase de sabiduría",
        reading: `Los años cuarenta ponen en primer plano la energía de Júpiter: el impulso de encontrar significado, de expandirse más allá de las estructuras construidas en la década anterior y de plantearse preguntas más importantes que "¿cómo puedo tener éxito?". La pregunta es "¿qué significa realmente el éxito?" Los temas de la novena casa: filosofía, educación superior, viajes y exploración espiritual se activan con nueva urgencia.

Muchas personas experimentan un auténtico cambio vocacional durante esta década. La carrera que se construyó en los años treinta puede parecer vacía y sin significado. El deseo de enseñar, orientar y compartir la sabiduría acumulada con los demás se vuelve cada vez más fuerte. Júpiter dice: has aprendido lo suficiente como para tener algo genuino que ofrecer. Ahora compártelo.

Esto es a menudo cuando la vida espiritual se profundiza significativamente. Los marcos religiosos o filosóficos que fueron heredados o rechazados en la juventud pueden revisarse con ojos maduros. La pregunta no es si creer, sino qué resuena genuinamente ahora que se ha vivido suficiente vida para comparar las ideas con la experiencia. Algunos encuentran fe; otros encuentran la filosofía; muchos encuentran una síntesis personal que no encaja en ninguna categoría existente.

Los viajes y las experiencias interculturales, si aún no se practican, se vuelven magnéticamente atractivos durante esta fase. El mundo parece más grande y más accesible. El deseo de comprender cómo viven otras personas, qué valoran otras culturas y dónde encaja la propia perspectiva en el gran tapiz humano alimenta una genuina expansión de la conciencia.`
    },
    uranus: {
        title: "Oposición de Urano (Edades 40-44)",
        description: "La crisis de la liberación",
        reading: `La Oposición de Urano es lo que la cultura popular llama la "crisis de la mediana edad", pero tiene mucho más propósito de lo que sugiere esa etiqueta desdeñosa. Urano en tránsito se opone a Urano natal, creando una carga eléctrica que exige la liberación de cada rol, hábito e identidad que se ha convertido en una jaula en lugar de una elección.

La forma que esto adopte depende enteramente de lo que se haya suprimido. Para alguien que ha vivido auténticamente, la Oposición de Urano puede parecer una aceleración emocionante: nuevas oportunidades, avances creativos, claridad repentina sobre lo que viene después. Para alguien que ha estado viviendo una vida prestada (la carrera que querían sus padres, la relación que parecía buena pero que no parecía buena, la imagen que agradaba a todos menos a sí mismo) puede sentirse como un terremoto.

El signo de Urano en la carta natal describe la cualidad generacional de este despertar. Urano en Leo exige autenticidad creativa. Urano en Virgo exige la liberación del perfeccionismo y del deber. Urano en Libra exige la verdad en la relación. La posición de la casa lo personaliza aún más: Urano en la casa 10 se enfrenta a la liberación profesional; Urano en la Casa 4 se enfrenta a una revolución interna.

La respuesta más saludable a la oposición de Urano es hacer los cambios conscientemente en lugar de esperar a que sucedan caóticamente. La energía generará cambios de todos modos: la elección es entre subirse a la ola o ser estrellado por ella. Este es el momento de preguntar: si no tuviera obligaciones, ni una reputación que proteger, ni nadie a quien complacer, ¿qué haría? La respuesta a esa pregunta contiene la semilla del próximo capítulo.`
    },
    chiron: {
        title: "El regreso de Quirón (edades 49-51)",
        description: "El umbral de curación",
        reading: `Quirón regresa a su posición de nacimiento alrededor de los 50 años, sacando a la superficie la herida más profunda por última vez, no para reabrirla, sino para transformarla en medicina. Este es el tránsito que convierte al herido en el que sana, al quebrantado en el bellamente reparado, a la persona que sufrió en la que comprende el sufrimiento.

El signo y la casa de Quirón en la carta natal describen la naturaleza específica de esta herida y dónde se manifiesta. Quirón en Aries conlleva heridas en torno a la identidad y el derecho a existir. Quirón en la Casa Séptima tiene heridas relacionadas con la asociación y la traición. Cualesquiera que sean los detalles, el Retorno de Quirón pregunta: ¿puedes finalmente aceptar esta herida no como daño sino como sabiduría?

Muchas personas experimentan una llamada de atención durante este tránsito: no necesariamente una enfermedad grave, pero sí una señal clara del cuerpo de que algo necesita atención. El cuerpo se convierte en el mensajero de lo que la psique ha estado evitando. Esto suele ser el catalizador para un cambio genuino en el estilo de vida, un avance terapéutico o una profundización espiritual.

El regalo del Retorno de Quirón es una profunda empatía nacida de la experiencia personal. Habiendo vivido con una herida durante cincuenta años, existe una comprensión profunda disponible que ninguna cantidad de entrenamiento puede replicar. Muchas personas descubren su verdadera vocación como sanadores, mentores o guías durante o después de este tránsito, no porque hayan trascendido su herida, sino porque han aprendido a vivir con ella con la gracia suficiente para ayudar a otros a hacer lo mismo.`
    },
    saturn2: {
        title: "Segundo regreso de Saturno (edades 56-60)",
        description: "El umbral mayor",
        reading: `El segundo retorno de Saturno es la puerta de entrada a una vejez genuina. Cuando el primer retorno de Saturno preguntó "¿quién eres realmente?" el segundo pregunta "¿qué has construido y qué dejarás atrás?" Este es el tránsito del legado: evaluar no sólo lo que se logró, sino también si importó.

Las estructuras construidas después del primer regreso de Saturno (la carrera, la familia, la reputación, el hogar) se evalúan con absoluta honestidad. Algunos aguantan maravillosamente. Otros se revelan vacíos. Todavía hay tiempo para reconstruir lo que necesita reconstrucción, pero la conciencia de que el tiempo es finito añade una urgencia que antes no existía.

La jubilación, si está en el horizonte, obliga a confrontar la identidad más allá de la productividad. Para alguien cuyo sentido de sí mismo se construyó en torno a su carrera, esta transición puede parecer la muerte. Para alguien que mantuvo la vida interior junto con la vida profesional, puede parecer una liberación. El signo de Saturno describe cómo se experimenta este umbral: Saturno en los signos de tierra puede tener dificultades para liberar su identidad profesional; Saturno en signos de agua puede tener dificultades con el peso emocional del paso del tiempo.

El segundo Retorno de Saturno a menudo trae consigo un asentamiento en la autenticidad que el primer Retorno sólo inició. A los sesenta, la mayoría de la gente ha aprendido (a veces dolorosamente) que fingir es agotador y, en última instancia, inútil. El regalo es el permiso para finalmente ser exactamente quien eres, sin disculpas, actuaciones ni compromisos. El anciano que emerge de este tránsito se ha ganado el derecho a decir la verdad y la sabiduría para hacerlo con amabilidad.`
    },
    elder: {
        title: "Sabiduría de los mayores (mayores de 60 años)",
        description: "La fase de cosecha",
        reading: `Los años mayores pertenecen a los planetas exteriores: Neptuno, Plutón y las fuerzas transpersonales que operan más allá de la voluntad individual. Las preocupaciones sobre el ego que dominaron décadas anteriores se disuelven gradualmente, reemplazadas por preguntas que son a la vez más simples y más profundas: ¿qué importa? ¿Para qué fue todo esto? ¿Qué sigue después de mí?

La profundidad espiritual aumenta naturalmente durante esta fase, ya sea que se persiga conscientemente o no. Los velos entre lo personal y lo universal se adelgazan. Los sueños se vuelven más vívidos, la intuición más aguda y la sensación de conexión con algo más grande que el yo individual se fortalece. La influencia de Neptuno suaviza los límites que mantenían al ego sintiéndose separado.

El deseo de transmitir sabiduría se vuelve central. Esta no es una enseñanza impulsada por el ego: es el impulso natural de alguien que ha aprendido lo suficiente como para saber qué importa y qué no. Ser mentor de personas más jóvenes, ya sea formalmente o mediante la simple presencia y disponibilidad, se convierte en una de las actividades disponibles más satisfactorias. El anciano tiene algo que ningún joven puede tener: la perspectiva ganada a lo largo de décadas de vida.

El legado toma su forma final durante esta fase. No sólo el legado material (aunque los testamentos y las herencias importan), sino el legado intangible de cómo hicieron sentir a las personas, qué representaron y si vivieron con integridad. La cosecha no se trata de lo acumulado sino de lo que fue genuinamente dado. Los mayores más ricos, en el sentido más estricto, son aquellos que dieron más de lo que guardaron.`
    }
};

function generateAgeTimeline(readings, birthDate) {
    if (!readings || !birthDate) return null;
    
    const birth = new Date(birthDate);
    const now = new Date();
    const currentAge = Math.floor((now - birth) / (365.25 * 24 * 60 * 60 * 1000));
    
    const timeline = [];
    const phases = [
        { key: 'earlyChildhood', startAge: 0, endAge: 7 },
        { key: 'middleChildhood', startAge: 7, endAge: 14 },
        { key: 'adolescence', startAge: 14, endAge: 21 },
        { key: 'youngAdult', startAge: 21, endAge: 27 },
        { key: 'saturn1', startAge: 27, endAge: 30 },
        { key: 'earlyMiddle', startAge: 30, endAge: 36 },
        { key: 'plutoSquare', startAge: 36, endAge: 40 },
        { key: 'lateMiddle', startAge: 40, endAge: 44 },
        { key: 'uranus', startAge: 40, endAge: 44 },
        { key: 'chiron', startAge: 49, endAge: 51 },
        { key: 'saturn2', startAge: 56, endAge: 60 },
        { key: 'elder', startAge: 60, endAge: 100 }
    ];
    
    phases.forEach(phase => {
        const data = LIFE_PHASE_READINGS[phase.key];
        if (!data) return;
        
        let status = 'future';
        if (currentAge >= phase.endAge) status = 'completed';
        else if (currentAge >= phase.startAge) status = 'current';
        
        // Add Personal Year context for current phase
        let personalYearNote = '';
        if (status === 'current' && readings.numerology?.personalYear) {
            personalYearNote = `Actualmente en Año Personal ${readings.numerology.personalYear}, sumando su energía específica a esta fase de vida.`;
        }
        
        // Add sign-specific context
        let signContext = '';
        if (phase.key === 'earlyChildhood' && readings.astrology?.moonSign) {
            signContext = `Con Moon en ${readings.astrology.moonSign.name}, la base emocional está formada por las cualidades de ${readings.astrology.moonSign.name}: este es el sistema operativo emocional que se ejecuta debajo de todo.`;
        } else if (phase.key === 'middleChildhood' && readings.astrology?.mercury) {
            const mercName = readings.astrology.mercury.name || readings.astrology.mercury;
            signContext = `Con Mercurio en ${mercName}, el estilo de aprendizaje y la voz interior que se desarrollan durante esta fase llevan las cualidades de ${mercName}: dan forma a cómo se procesa la información y cómo se hablan a sí mismos de por vida.`;
        } else if (phase.key === 'adolescence' && readings.astrology?.venus) {
            const venusName = readings.astrology.venus.name || readings.astrology.venus;
            signContext = `Con Venus en ${venusName}, los valores y los patrones de relación adquieren las cualidades de ${venusName}: los primeros amores y las primeras lecciones de autoestima se filtran a través de esta energía.`;
        } else if (phase.key === 'youngAdult' && readings.astrology?.sunSign) {
            signContext = `Con el Sol en ${readings.astrology.sunSign.name}, la identidad cristaliza en torno a temas ${readings.astrology.sunSign.name}: el yo auténtico que emerge durante esta década lleva la huella inconfundible de este signo.`;
        } else if (phase.key === 'saturn1' && readings.astrology?.saturn) {
            const saturnName = readings.astrology.saturn.name || readings.astrology.saturn;
            signContext = `Con Saturno natal en ${saturnName}, este regreso prueba específicamente temas relacionados con ${saturnName}: la responsabilidad exigida se enfoca a través de la lente de este signo.`;
        } else if (phase.key === 'earlyMiddle' && readings.astrology?.mars) {
            const marsName = readings.astrology.mars.name || readings.astrology.mars;
            signContext = `Con Marte en ${marsName}, la energía constructiva de esta década se canaliza a través del estilo de ${marsName}: así es como se expresan la ambición, el impulso y la energía competitiva.`;
        } else if (phase.key === 'lateMiddle' && readings.astrology?.jupiter) {
            const jupName = readings.astrology.jupiter.name || readings.astrology.jupiter;
            signContext = `Con Júpiter en ${jupName}, la búsqueda de significado y expansión durante esta fase está coloreada por temas ${jupName}: la sabiduría y el crecimiento llegan a través de la lente particular de este signo.`;
        } else if (phase.key === 'elder' && readings.astrology?.neptune) {
            const nepName = readings.astrology.neptune.name || readings.astrology.neptune;
            signContext = `Con Neptuno en ${nepName}, la profundización espiritual de los años mayores conlleva la cualidad generacional de ${nepName}: la disolución de los límites del ego sigue el camino de este signo.`;
        }
        
        timeline.push({
            ...data,
            startAge: phase.startAge,
            endAge: phase.endAge,
            status,
            personalYearNote,
            signContext,
            startYear: birth.getFullYear() + phase.startAge,
            endYear: birth.getFullYear() + phase.endAge
        });
    });
    
    return timeline;
}

// ============================================
// VERTEX ACTIVATION TIMING
// ============================================

var VERTEX_ACTIVATION_READINGS = {
    timing: {
        title: "Cuando el destino llama",
        reading: `El vértice se llama el "eje eléctrico" de la carta: se activa repentina e inequívocamente cuando personas, eventos u oportunidades destinados entran en tu vida. A diferencia de las progresiones planetarias más lentas, las activaciones de Vertex se sienten como relámpagos del destino.

CUÁNDO ESPERAR LA ACTIVACIÓN DEL VERTEX:
• Cuando los planetas en tránsito (especialmente Júpiter, Saturno, Urano, Neptuno o Plutón) están en conjunción o en oposición al Vértice natal
• Durante eclipses que caen cerca del grado de vértice
• Cuando los planetas de otra persona están en conjunción con su Vértice (esta es la firma del "encuentro predestinado")
• Durante aspectos de Luna progresada o Sol progresados hacia el Vértice natal

CÓMO SABRÁS QUE ESTÁ PASANDO:
Las activaciones de vértice se sienten diferentes a los tránsitos regulares. Hay una cualidad extraña: la sensación de que estabas "destinado" a estar en un lugar determinado en un momento determinado. Las personas que entran en su vida durante los tránsitos de Vertex a menudo se sienten significativas al instante, como si las conociera de antes.

EL FACTOR DE RECONOCIMIENTO:
Los eventos desencadenados por los tránsitos de Vertex tienen una cualidad de "reconocimiento" más que de sorpresa. Incluso si son inesperados, algo en el fondo dice "por supuesto" en lugar de "¿qué?". Esta es la marca de los encuentros destinados frente a los aleatorios.`
    },
    bySign: {
        Aries: "Las activaciones de Vertex traen personas o situaciones nuevas y audaces que exigen valentía. Las reuniones predestinadas a menudo ocurren en entornos competitivos, actividades físicas o situaciones de crisis.",
        Taurus: "Las activaciones de vértices se producen a través de la belleza, las finanzas o las experiencias sensoriales. Los encuentros predestinados suelen ocurrir en jardines, galerías, restaurantes o mediante una apreciación compartida de la belleza.",
        Gemini: "Las activaciones de vértice llegan a través de palabras, ideas o comunicación. Las reuniones predestinadas a menudo ocurren a través de la escritura, la enseñanza, las redes sociales o conversaciones casuales.",
        Cancer: "Las activaciones de vértices se producen a través de acontecimientos familiares, vulnerabilidad emocional o situaciones enriquecedoras. Las reuniones predestinadas a menudo ocurren en el hogar, en la familia o en contextos de cuidado.",
        Leo: "Las activaciones de vértices llegan a través de la expresión creativa, la actuación o los niños. Los encuentros predestinados a menudo ocurren en el escenario, a través del arte o en situaciones que requieren coraje y visibilidad.",
        Virgo: "Las activaciones de vértice se producen a través de eventos de salud, situaciones laborales u oportunidades de servicio. Las reuniones predestinadas a menudo ocurren en lugares de trabajo, entornos de salud o mediante rutinas diarias compartidas.",
        Libra: "Las activaciones de Vertex llegan a través de asociaciones, asuntos legales o experiencias estéticas. Las reuniones predestinadas a menudo ocurren a través de presentaciones, eventos artísticos o situaciones que requieren equilibrio y mediación.",
        Scorpio: "Las activaciones de vértices se producen a través de crisis, intimidad o transformación. Las reuniones predestinadas a menudo ocurren durante experiencias emocionales intensas, vulnerabilidad compartida o enredos financieros.",
        Sagittarius: "Las activaciones de Vertex llegan a través de viajes, educación o encuentros interculturales. Los encuentros predestinados a menudo ocurren en el extranjero, en universidades o a través de comunidades filosóficas/espirituales.",
        Capricorn: "Las activaciones de Vertex se producen a través de hitos profesionales, figuras de autoridad o responsabilidad. Las reuniones predestinadas suelen ocurrir en entornos profesionales, a través de mentores o durante esfuerzos ambiciosos.",
        Aquarius: "Las activaciones de Vertex llegan a través de grupos, tecnología o causas humanitarias. Las reuniones predestinadas suelen ocurrir en reuniones sociales, a través de conexiones en línea o en comunidades de activistas.",
        Pisces: "Las activaciones de vértice se obtienen a través de experiencias espirituales, inspiración artística o servicio compasivo. Los encuentros predestinados a menudo ocurren en entornos de retiro, a través de la música/el arte o durante momentos de rendición."
    }
};

function analyzeVertexActivation(readings) {
    if (!readings?.astrology?.vertex) return null;
    
    const vertex = readings.astrology.vertex;
    const vertexSign = vertex.name || vertex;
    
    const result = {
        title: VERTEX_ACTIVATION_READINGS.timing.title,
        generalReading: VERTEX_ACTIVATION_READINGS.timing.reading,
        signSpecific: VERTEX_ACTIVATION_READINGS.bySign[vertexSign] || null,
        vertexSign: vertexSign
    };
    
    return result;
}

// ============================================
// RELATIONSHIP COMPATIBILITY EXPANSION
// ============================================

var RELATIONSHIP_STYLE_READINGS = {
    venusDescendant: {
        title: "Plano del lenguaje del amor",
        subtitle: "Venus + Síntesis de la Casa 7",
        reading: `Comprender el estilo de amor requiere mirar tanto a Venus (cómo amas) como a la Casa Séptima/Descendente (a quién atraes y qué necesitas en pareja).`
    },
    byVenusSign: {
        Aries: {
            loveStyle: "Amor es un verbo de acción para Venus en Aries. No esperan a sentirse preparados: se lanzan de cabeza con un coraje que puede dejar a la gente sin aliento. El afecto se demuestra a través de la iniciativa: planificar la cita, dar el primer paso, luchar por la relación cuando sea necesario. Quieren ser el héroe de alguien y necesitan un compañero que pueda igualar su franqueza sin inmutarse.",
            attractionPattern: "Se sienten atraídos por personas que tienen su propio fuego: independencia, confianza y voluntad de retroceder en lugar de simplemente aceptar. Nada mata la atracción más rápido que la pasividad o el juego. Quieren un deseo honesto y sin complicaciones: alguien que diga lo que quiere decir y quiera decir lo que dice.",
            conflictStyle: "Las discusiones son directas y acaloradas, pero normalmente de corta duración. Prefieren luchar abiertamente antes que dejar que se acumule el resentimiento. El peligro es decir cosas con ira de las que no pueda retractarse. Necesitan una pareja que pueda soportar el calor sin desmoronarse y que no guarde rencor porque ellos no lo hacen.",
            attachment: "Apasionado y amante de la libertad. Se comprometen profundamente pero necesitan espacio para seguir siendo ellos mismos dentro de la relación. La posesividad de ambos lados se siente asfixiante. Lo ideal es que dos personas independientes se elijan a diario, no dos personas dependientes que se aferren."
        },
        Taurus: {
            loveStyle: "Venus en Tauro ama a través de los sentidos y mediante una presencia constante. Aparecen de manera constante, sin dramatismo ni fanfarria. El amor es la comida casera, el regalo atento, la mano tomada en los momentos difíciles. Construyen el amor como construyen todo: lenta, minuciosamente y con la intención de que dure para siempre.",
            attractionPattern: "Se sienten atraídos por la estabilidad, la belleza física y las personas que se sienten como en casa. La fiabilidad les resulta realmente atractiva. Quieren a alguien que cumpla sus promesas, que huela bien y que genere consuelo. El caos, la imprevisibilidad y los juegos emocionales son profundamente poco atractivos: quieren saber qué se encuentran.",
            conflictStyle: "Lento para la ira pero formidable una vez superado su límite. Absorberán mucho antes de reaccionar, lo que significa que cuando estén molestos, ya es grave. Necesitan tiempo para procesar sus sentimientos y no se les debe presionar para que tengan una resolución inmediata. La paciencia de la pareja durante el conflicto es fundamental.",
            attachment: "Profundamente leal y posesivo en el sentido más protector. Una vez comprometidos, permanecen en esto a largo plazo y esperan lo mismo a cambio. Romper la confianza es casi imperdonable. Necesitan contacto físico, tiempo de calidad y la seguridad de que lo que han construido juntos es seguro."
        },
        Gemini: {
            loveStyle: "Venus en Géminis ama la conversación, la curiosidad y mantener las cosas interesantes. Necesitan tanto estimulación mental como conexión emocional: una relación aburrida es una relación muerta para ellos. Muestran afecto a través de mensajes de texto ingeniosos, chistes internos, haciendo preguntas reales y estando genuinamente interesados ​​en el mundo interior de su pareja.",
            attractionPattern: "Se sienten atraídos por el ingenio, la inteligencia y la tranquilidad social. Alguien que pueda defenderse en una conversación, presentar nuevas ideas y hacerlos reír siempre llamará su atención. Necesitan variedad, no necesariamente en los socios, sino en las experiencias dentro de una asociación. La rutina y la previsibilidad parecen una muerte lenta.",
            conflictStyle: "Hablarán de los problemas, a veces demasiado, a veces desde la cabeza en lugar de desde el corazón. Pueden intelectualizar las emociones en lugar de sentirlas, o utilizar el humor para desviarse de los problemas reales. Necesitan un compañero que pueda decir: 'Te oigo pensar, pero ¿qué sientes?'",
            attachment: "Luminoso y espacioso pero genuinamente atento. Necesitan libertad para socializar, explorar ideas y mantener su propia identidad. Un socio que intenta ser todo su mundo se encontrará perdiéndolo. La paradoja es que darles espacio es lo que les hace querer permanecer cerca."
        },
        Cancer: {
            loveStyle: "Venus en Cáncer ama con todo lo que tiene. Nutren, recuerdan, crean mundos emocionales tan cálidos que la pareja nunca quiere irse. El amor se demuestra a través del cuidado: recordar preferencias, anticipar necesidades, crear espacios seguros donde la vulnerabilidad no sólo se acepta sino que se valora. Cuando te aman, llevan toda tu historia emocional en su corazón.",
            attractionPattern: "Se sienten atraídos por la disponibilidad emocional, la orientación familiar y las personas que se sienten seguras. Alguien que se abre genuinamente, que valora el hogar y la cercanía, que no trata la vulnerabilidad como debilidad. Pueden sentir las paredes emocionales desde el otro lado de una habitación y no están interesados ​​en escalarlas a menos que la persona detrás de ellos esté dispuesta a salir.",
            conflictStyle: "Indirecto y protector. Es posible que se retraigan, se queden callados o utilicen señales pasivas en lugar de decir directamente lo que está mal. Las duras críticas los cortan profundamente y permanecen con ellos. Necesitan gentileza en los conflictos: el mensaje importa, pero más importa cómo se transmite. Es esencial una pareja que pueda ser honesta sin ser cruel.",
            attachment: "Profundo, devoto y, a veces, ansioso. Lo dan todo por las relaciones y necesitan tener la seguridad de que la inversión es mutua. La disponibilidad emocional de su pareja no es opcional: es la base. Recuerdan cada amabilidad y cada desaire, por lo que la coherencia en la forma en que los tratan da forma a todo."
        },
        Leo: {
            loveStyle: "Venus en Leo ama generosamente, dramáticamente y con todo el pecho. Cuando están dentro, lo están todo: grandes gestos, lealtad inquebrantable y una calidez que hace que su pareja se sienta como la persona más importante del mundo. Quieren que el romance parezca una historia que valga la pena contar. El amor debe celebrarse, no ocultarse ni restarse importancia.",
            attractionPattern: "Se sienten atraídos por la confianza, la creatividad y las personas que saben apreciarlos. La admiración no es vanidad para Venus en Leo: es el lenguaje del amor. Necesitan sentirse vistos, deseados y elegidos. Una pareja que le entusiasme, que no tenga miedo de expresarlo, que le haga sentir especial. La indiferencia es el rechazo máximo.",
            conflictStyle: "El orgullo puede ser una barrera. Les cuesta admitir sus errores y pueden volverse dramáticos cuando se sienten heridos. Necesitan que se respete su dignidad incluso durante los desacuerdos. Lo peor que puede hacer una pareja es humillarla. Los argumentos funcionan mejor cuando ambas partes reconocen primero el valor del otro y luego abordan el problema.",
            attachment: "Leal, cálido y necesitado de entusiasmo recíproco. Dan generosamente y esperan generosidad a cambio, no material, sino emocional. Un compañero que los da por sentado apaga lentamente su fuego. Necesitan un reconocimiento regular y genuino para mantener su corazón abierto y su amor fluyendo."
        },
        Virgo: {
            loveStyle: "Venus en Virgo ama a través de actos de servicio y devoción tranquila y constante. Se dan cuenta de lo que hay que hacer y lo hacen, no para recibir reconocimiento, sino porque amar significa hacer la vida de alguien más fácil y mejor. Recuerdan cómo su pareja toma el té, se dan cuenta cuando algo anda mal antes de mencionarlo, arreglan las cosas. El amor es práctico y se expresa a través de la coherencia más que de grandes gestos.",
            attractionPattern: "Se sienten atraídos por la inteligencia, la competencia y la bondad genuina. Alguien que se cuide, que tenga integridad, que preste atención a los detalles de la vida. La ostentación sin sustancia los repele. Quieren una persona real, no una actuación. La conciencia de la salud y la superación personal les resultan realmente atractivos.",
            conflictStyle: "Pueden volverse críticos bajo estrés, señalando fallas en la lógica o el comportamiento de su pareja con precisión quirúrgica. Esto proviene de la ansiedad, no de la crueldad, pero puede resultar duro. Necesitan una pareja que comprenda que sus críticas a menudo son preocupaciones desplazadas y que pueda redirigirlos suavemente para que expresen el sentimiento subyacente.",
            attachment: "Devoto y ansioso a partes iguales. Se preocupan por la relación de la misma manera que se preocupan por todo: minuciosamente. Necesitan socios que sean coherentes y que no creen dramas innecesarios. La confiabilidad les resulta profundamente tranquilizadora. Aman a través del servicio y necesitan que su servicio sea reconocido, no esperado."
        },
        Libra: {
            loveStyle: "Venus en Libra está en su signo natal, lo que crea a alguien para quien la asociación es un arte. Crean hermosas relaciones de la misma manera que otros crean hermosos hogares: con intención, equilibrio y cuidado genuino por cómo se sienten las cosas. Están atentos a la experiencia de su pareja y se aseguran de que ambas personas se sientan valoradas, escuchadas y consideradas. El romance no es un accesorio de la relación; es la atmósfera que crean naturalmente.",
            attractionPattern: "Se sienten atraídos por el refinamiento, la justicia y las personas que se comportan con gracia. Alguien que pueda mantener una conversación, que trate bien a las personas, que aprecie la belleza en todas sus formas. La mala educación, el egoísmo y la energía agresiva son profundamente desagradables. Quieren un socio que haga del mundo un lugar más agradable simplemente por estar en él.",
            conflictStyle: "Lo evitan, a veces en detrimento propio. Se adaptarán, harán concesiones y absorberán la incomodidad antes de admitir que algo anda mal. Cuando finalmente abordan el conflicto, lo hacen con mesura y diplomacia, pero los sentimientos reprimidos que hay en el fondo pueden ser mucho más intensos de lo que sugieren sus palabras. Necesitan un socio que genere seguridad para un desacuerdo honesto.",
            attachment: "Orientados a la asociación hasta el fondo. Se sienten más ellos mismos cuando forman parte de una pareja significativa. Esto no es codependencia: es una realización genuina a través de la vida compartida. Necesitan igualdad, reciprocidad y la sensación de que ambas personas contribuyen a la belleza de la relación. El desequilibrio, donde una persona da más que la otra, los erosiona lentamente."
        },
        Scorpio: {
            loveStyle: "Venus en Escorpio ama con una intensidad que puede resultar abrumadora para quienes no están preparados para ello. Este es un amor de todo o nada: no son casuales, no salen a la superficie y no fingen. Cuando eligen a alguien, lo eligen por completo y esperan lo mismo a cambio. Amor significa total transparencia emocional, profunda lealtad y la voluntad de enfrentar juntos las partes más oscuras del otro.",
            attractionPattern: "Se sienten atraídos por la profundidad, el misterio y el coraje emocional. Alguien que tenga capas, que no le tenga miedo a su propia sombra, que pueda soportar la intensidad sin correr. La superficialidad es invisible para ellos: no pueden sentirse atraídos por una superficie. Quieren saber quién es realmente alguien, detrás de todo, y son lo suficientemente pacientes como para esperar esa verdad.",
            conflictStyle: "Intenso y a veces castigador. Sienten profundamente la traición y pueden responder con retraimiento, pruebas o frialdad. El perdón se gana con esfuerzo. Necesitan una pareja que comprenda que su intensidad proviene de lo profundamente que se preocupan y que pueda permanecer presente durante las tormentas emocionales sin intensificarse ni abandonarse.",
            attachment: "Ferozmente leal y profundamente posesivo. Una vez unidos, la conexión es casi inquebrantable y esperan que sea exclusiva y total. La confianza, una vez rota, es casi imposible de reconstruir. Necesitan una pareja que comprenda que sus celos son en realidad miedo a perder y que demuestre su lealtad con acciones, no solo con palabras."
        },
        Sagittarius: {
            loveStyle: "Venus en Sagitario ama a través de la aventura, la honestidad y la búsqueda compartida de significado. Quieren una relación que expanda a ambas personas, que haga la vida más grande, no más pequeña. El afecto se demuestra planificando viajes juntos, compartiendo filosofías, riendo hasta que duela y siendo siempre genuinamente honesto, incluso cuando sea incómodo.",
            attractionPattern: "Se sienten atraídos por el optimismo, la independencia y la mentalidad abierta. Alguien que tiene sus propias aventuras, sus propias creencias, su propia vida que le entusiasma. Una pareja que quiere crecer juntos en lugar de adaptarse a la rutina. La posesividad, el pesimismo y el pensamiento estrecho son profundamente poco atractivos. Quieren un compañero de viaje, no un carcelero.",
            conflictStyle: "Contundente y a veces sin tacto. Creen que la honestidad siempre es mejor que la diplomacia, que puede resultar brutal para los socios más sensibles. También pueden evitar conflictos al irse, física o emocionalmente, en lugar de quedarse a trabajar aunque se sientan incómodos. Necesitan un socio que pueda manejar la verdad directa y que también pueda enseñarles que la entrega es importante.",
            attachment: "Amante de la libertad pero capaz de un compromiso profundo cuando no se siente como una jaula. Necesitan espacio para crecer, explorar y ser ellos mismos. La pareja que dice 've a vivir tu aventura y cuéntamelo todo cuando vuelvas a casa' se gana su corazón permanentemente. Tratar de precisarlos logra el resultado opuesto al deseado."
        },
        Capricorn: {
            loveStyle: "Venus en Capricornio ama a través del compromiso, la provisión y la construcción de algo duradero. Puede que no digan "te amo" fácilmente, pero lo demuestran a través de la lealtad, el trabajo duro y la creación constante de un futuro compartido. El amor se prueba con el tiempo, no se declara en un momento. Se toman las asociaciones tan en serio como se toman su carrera, quizás más.",
            attractionPattern: "Se sienten atraídos por la ambición, la madurez y las personas que tienen su vida en orden. Alguien que asuma responsabilidades, que tenga objetivos, que no juegue. Respetan los logros y la competencia. Un socio potencial que no es confiable, es inmaduro o no tiene ningún atractivo, independientemente de sus otras cualidades. Quieren a alguien con quien puedan construir un imperio.",
            conflictStyle: "Controlado y a veces reprimido emocionalmente. Es posible que se cierren en lugar de expresar su dolor, o que aborden los problemas de relación con el mismo pragmatismo que aplicarían a un problema empresarial. Necesitan una pareja que pueda expresar sus sentimientos con suavidad y que no interprete su reserva emocional como falta de interés.",
            attachment: "Leal, comprometido y silenciosamente dedicado. Una vez que han elegido a alguien, son notablemente consistentes. Pero necesitan sentirse respetados, dados por sentado o tratados irrespetuosamente, y silenciosamente construirán muros que se volverán permanentes. El estatus y cómo ven la relación los demás sí les importa, incluso si lo niegan."
        },
        Aquarius: {
            loveStyle: "Venus en Acuario ama a través de la conexión intelectual, los ideales compartidos y el respeto a la individualidad de cada uno. Muestran afecto estando genuinamente interesados ​​en lo que hace que su pareja sea única, apoyando su independencia y construyendo una relación que no sigue las reglas de nadie más. La amistad es la base de su romance; sin ella, la atracción por sí sola no es suficiente.",
            attractionPattern: "Se sienten atraídos por la singularidad, la inteligencia y las personas que piensan por sí mismas. Alguien que desafíe las normas, que tenga ideas interesantes, que no necesite validación externa para sentirse seguro. La conformidad y la necesidad emocional no son atractivas. Quieren una pareja que sea su mejor amiga primero, alguien con quien elegirían hablar incluso sin un interés romántico.",
            conflictStyle: "Separado y analítico. Pueden intelectualizar las emociones en lugar de sentirlas, o retirarse a una fría distancia cuando las cosas se ponen demasiado acaloradas. Luchan con las partes confusas e irracionales de las emociones humanas. Necesitan un compañero que pueda decir "vuelve a tu cuerpo y siente esto" sin juzgarlo.",
            attachment: "Independientes y algo poco convencionales en su forma de demostrar el amor. Necesitan mucho espacio y tiempo personal para sus propios intereses. Una pareja que interpreta esto como desamor siempre se sentirá insegura. Pero cuando eligen a alguien, el compromiso es genuino: simplemente parece diferente del modelo tradicional."
        },
        Pisces: {
            loveStyle: "Venus en Piscis ama con compasión ilimitada, imaginación y una especie de devoción espiritual que ve lo mejor de las personas incluso cuando ellas mismas no pueden verlo. Crean magia en las relaciones: gestos románticos que parecen poesía, una sintonía emocional tan profunda que raya en lo telepático y una voluntad de sacrificio que puede ser hermosa o autodestructiva dependiendo de la pareja.",
            attractionPattern: "Se sienten atraídos por la sensibilidad, la creatividad y la profundidad espiritual. Alguien que siente las cosas profundamente, que tiene un mundo interior lo suficientemente rico como para explorarlo sin cesar, que no le teme al lado místico de la vida. La dureza, el cinismo y la brutalidad emocional los repelen. Quieren una conexión con el alma; cualquier cosa menos les parece un acuerdo.",
            conflictStyle: "Evitativo y absorbente. Pueden asumir las emociones de su pareja como propias, lo que dificulta distinguir los sentimientos de quién. Tienden a sacrificar sus propias necesidades para mantener la paz y luego se sienten resentidos cuando no se nota ese sacrificio. Necesitan un socio que les pregunte activamente qué necesitan, porque rara vez lo ofrecen voluntariamente.",
            attachment: "Profundamente devoto y, a veces, sin límites. Pueden perderse en el amor, fusionándose tan completamente con su pareja que olvidan quiénes están solos. Necesitan una pareja que fomente activamente su individualidad y que no se aproveche de su naturaleza generosa. Cuando están sanos, su amor es el más incondicional del zodíaco."
        }
    }
};

function analyzeRelationshipStyle(readings) {
    if (!readings?.astrology) return null;
    
    const venus = readings.astrology.venus;
    const venusSign = venus?.name || venus;
    const descendant = readings.astrology.descendant;
    const descendantSign = descendant?.name || descendant;
    const mars = readings.astrology.mars;
    const marsSign = mars?.name || mars;
    const moon = readings.astrology.moonSign;
    const moonSign = moon?.name || moon;
    
    const result = {
        title: "Plano de estilo de relación",
        sections: []
    };
    
    // Venus love style - expanded with all four dimensions
    if (venusSign && RELATIONSHIP_STYLE_READINGS.byVenusSign[venusSign]) {
        const venusData = RELATIONSHIP_STYLE_READINGS.byVenusSign[venusSign];
        let venusContent = venusData.loveStyle;
        venusContent += `\n\n${venusData.attractionPattern}`;
        if (venusData.conflictStyle) {
            venusContent += `\n\n<strong>In Conflict:</strong> ${venusData.conflictStyle}`;
        }
        if (venusData.attachment) {
            venusContent += `\n\n<strong>Attachment Style:</strong> ${venusData.attachment}`;
        }
        result.sections.push({
            subtitle: `Venus en ${venusSign} - Cómo aman`,
            content: venusContent
        });
    }
    
    // Mars desire style - now with its own unique content
    if (marsSign && RELATIONSHIP_STYLE_READINGS.byVenusSign[marsSign]) {
        const marsData = RELATIONSHIP_STYLE_READINGS.byVenusSign[marsSign];
        const marsContent = `Marte revela qué enciende el deseo y cómo funciona la búsqueda en las relaciones. Con Marte en ${marsSign}, la atracción es física e instintiva: la química se enciende o no, y ninguna cantidad de lógica la cambia.\n\n${marsData.loveStyle.replace(/Shows love/gi, 'Pursues connection').replace(/love is/gi, 'desire is').replace(/They show affection/gi, 'They pursue')}\n\n<strong>Lo que enciende la química:</strong> ${marsData.attractionPattern.replace(/They're drawn/gi, 'Physical chemistry ignites with')}`;
        result.sections.push({
            subtitle: `Marte en ${marsSign} - Deseo y Química`,
            content: marsContent
        });
    }
    
    // Moon emotional needs in relationship
    if (moonSign && RELATIONSHIP_STYLE_READINGS.byVenusSign[moonSign]) {
        const moonData = RELATIONSHIP_STYLE_READINGS.byVenusSign[moonSign];
        const moonContent = `La Luna revela lo que se necesita para la seguridad emocional en las relaciones: las necesidades no negociables que, si no se satisfacen, ninguna cantidad de atracción o compatibilidad es suficiente.\n\nCon la Luna en ${moonSign}, la seguridad emocional llega a través de ${moonData.attachment || moonData.loveStyle}\n\n<strong>Cuando se activa emocionalmente:</strong> ${moonData.conflictStyle || 'Emotional reactions follow the patterns of ' + moonSign + ' energy — requiring understanding rather than logic from a partner.'}`;
        result.sections.push({
            subtitle: `Luna en ${moonSign} - Necesidades Emocionales en el Amor`,
            content: moonContent
        });
    }
    
    // Venus-Mars dynamic (if different signs)
    if (venusSign && marsSign && venusSign !== marsSign) {
        const venusElement = { Aries: 'Fuego', Taurus: 'Tierra', Gemini: 'Aire', Cancer: 'Agua', Leo: 'Fuego', Virgo: 'Tierra', Libra: 'Aire', Scorpio: 'Agua', Sagittarius: 'Fuego', Capricorn: 'Tierra', Aquarius: 'Aire', Pisces: 'Agua' };
        const vEl = venusElement[venusSign];
        const mEl = venusElement[marsSign];
        
        let dynamicContent = `Venus en ${venusSign} y Marte en ${marsSign} crean una dinámica de relación interna distintiva: lo que quieren en el amor (Venus) y cómo lo persiguen (Marte) operan de manera diferente.\n\n`;
        
        if (vEl === mEl) {
            dynamicContent += `Both Venus and Mars are in ${vEl} signs, creating consistency between desire and pursuit. What they want and how they go after it are aligned, making their romantic energy straightforward and coherent. Partners know where they stand.`;
        } else if ((vEl === 'Fire' && mEl === 'Air') || (vEl === 'Air' && mEl === 'Fire') || (vEl === 'Earth' && mEl === 'Water') || (vEl === 'Water' && mEl === 'Earth')) {
            dynamicContent += `${vEl} Venus and ${mEl} Mars are compatible elements, creating a natural flow between what they desire and how they pursue it. There's an ease to their romantic style — what they want and how they go after it support each other. This makes their approach to relationships feel authentic and integrated.`;
        } else {
            dynamicContent += `${vEl} Venus and ${mEl} Mars create an internal tension between what they want and how they pursue it. They may attract one type of person but pursue another, or send mixed signals because their heart and their drive don't speak the same language. Understanding this internal complexity helps partners navigate what might otherwise feel confusing.`;
        }
        
        result.sections.push({
            subtitle: `Dinámica Venus-Marte: corazón versus impulso`,
            content: dynamicContent
        });
    }
    
    // Descendant - who you attract
    if (descendantSign) {
        const descData = SIGN_PARTNER_QUALITIES ? SIGN_PARTNER_QUALITIES[descendantSign] : null;
        let descContent = `El Descendente en ${descendantSign} revela las cualidades que se atraen más naturalmente a esta vida a través de la asociación. Estas no son sólo preferencias: son cualidades que el alma está aprendiendo a integrar, a menudo encontrándolas primero en los demás.\n\n`;
        
        if (descData) {
            descContent += `Partners who embody ${descData.qualities} are magnetically drawn in. The ideal partnership lifestyle involves ${descData.lifestyle}.\n\n`;
            descContent += `<strong>The Growth Edge:</strong> ${descData.warning} The lesson isn't to avoid these partners — it's to develop discernment about when these qualities serve growth and when they don't.`;
        } else {
            descContent += `Partners who embody ${descendantSign} qualities are most fulfilling. What's drawn to them reflects the underdeveloped parts of themselves seeking expression through relationship.`;
        }
        
        result.sections.push({
            subtitle: `Descendiente en ${descendantSign} - A quién atraes`,
            content: descContent
        });
    }
    
    return result.sections.length > 0 ? result : null;
}

// ============================================
// CAREER SYNTHESIS ENGINE
// Generates specific career path suggestions based
// on house stelliums, sign emphasis, and key placements
// ============================================

var HOUSE_CAREER_THEMES = {
    1: { domain: "Marca personal y liderazgo", paths: ["Entrenador de vida o orador de desarrollo personal", "Entrenador físico o asesor de imagen.", "Emprendedor solitario o fundador de una startup", "Creador de YouTube, influencer o creador de marca personal", "Atleta deportivo o artista competitivo."], verb: "liderando con el ejemplo personal", specific: "Prosperan cuando ELLOS son el producto: su presencia, historia o experiencia. Trabajo por cuenta propia, creación de contenido y cualquier rol donde el magnetismo personal impulse el éxito." },
    2: { domain: "Finanzas y creación de valor", paths: ["Planificador financiero o asesor de gestión patrimonial", "Inversor inmobiliario o promotor inmobiliario", "Marchante de arte, tasador de antigüedades o curador de lujo", "Contador, banquero o analista de inversiones", "Chef, sumiller o productor de alimentos artesanales"], verb: "construir y gestionar recursos", specific: "Carreras que implican construir valor tangible, evaluar el valor y crear cosas hermosas o valiosas a partir de materias primas." },
    3: { domain: "Comunicación y Medios", paths: ["Periodista, editor o corresponsal de noticias", "Estratega de redes sociales o comercializador de contenidos.", "Presentador de podcast, presentador de radio o locutor", "Redactor, redactor técnico o traductor", "Profesor o tutor de escuela primaria"], verb: "comunicar y conectar ideas", specific: "Destacan en cualquier lugar donde se debe recopilar, sintetizar y comunicar información con claridad: medios, educación, marketing y contenido digital." },
    4: { domain: "Servicios para el hogar y la familia", paths: ["Diseñador de interiores o home stager", "Agente inmobiliario o administrador de propiedades", "Terapeuta familiar o psicólogo infantil", "Gerente de hotel o anfitrión de Airbnb", "Propietario de panadero, catering o restaurante familiar"], verb: "creando espacios seguros y enriquecedores", specific: "Carreras basadas en crear comodidad, nutrir a los demás y construir espacios donde las personas se sientan como en casa y cuidadas." },
    5: { domain: "Artes creativas y entretenimiento", paths: ["Actor, músico o artista escénico", "Director de cine, guionista o creador de contenidos", "Autor de libros infantiles o director de programas para jóvenes.", "Diseñador de juegos o director creativo", "Planificador de eventos o promotor de entretenimiento."], verb: "expresión creativa y alegría inspiradora", specific: "Necesitan un escenario, literal o metafórico. Cualquier carrera donde se valore la creatividad, el desempeño y la capacidad de brindar alegría." },
    6: { domain: "Industrias de salud y servicios", paths: ["Enfermero, paramédico o terapeuta ocupacional", "Nutricionista, dietista o entrenador de bienestar", "Veterinario o conductista animal.", "Analista de datos o ingeniero de control de calidad.", "Gerente de oficina, asistente ejecutivo o líder de operaciones"], verb: "Mejorar los sistemas y servir a los demás.", specific: "Carreras donde la atención meticulosa al detalle, la orientación al servicio y el impulso para mejorar los procesos crean resultados tangibles." },
    7: { domain: "Asociación y mediación", paths: ["Abogado, mediador o árbitro", "Terapeuta matrimonial y de parejas", "Diplomático, director de relaciones públicas o cabildero", "Gerente de desarrollo empresarial o corredor de asociaciones", "Planificador de bodas o asesor de relaciones"], verb: "creando armonía entre las personas", specific: "Se destacan en roles que requieren equilibrar intereses en competencia, construir alianzas y generar resultados beneficiosos para todas las partes." },
    8: { domain: "Transformación y recursos compartidos", paths: ["Psicólogo, terapeuta profundo o consejero de trauma", "Asegurador de seguros, planificador patrimonial o contador forense", "Detective, perfilador criminal o periodista de investigación.", "Cirujano, oncólogo o trabajador de cuidados paliativos", "Especialista en reestructuración de deuda o gestor de crisis."], verb: "facilitando una transformación profunda", specific: "Carreras que involucran riesgos de vida o muerte, recursos de otras personas, información oculta y el coraje de enfrentar lo que otros evitan." },
    9: { domain: "Educación y expansión", paths: ["Profesor universitario o investigador académico.", "Guía de viajes, consultor cultural o coordinador de estudios en el extranjero.", "Editor, agente literario o autor de liderazgo intelectual.", "Filósofo, teólogo o ministro interreligioso", "Trabajador de desarrollo internacional o corresponsal extranjero"], verb: "Ampliando horizontes y compartiendo sabiduría.", specific: "Prosperan en carreras que combinan el aprendizaje, la enseñanza, los viajes y la comunicación de ideas que cambian la forma en que las personas ven el mundo." },
    10: { domain: "Liderazgo ejecutivo y legado", paths: ["CEO, director general o ejecutivo de alto nivel", "Político, concejal o administrador gubernamental", "Arquitecto, urbanista o ingeniero civil", "Coach ejecutivo o consultor organizacional", "Juez, magistrado o alto funcionario"], verb: "construir logros públicos duraderos", specific: "Están diseñados para puestos de autoridad y responsabilidad pública: carreras donde la reputación, la disciplina y el impacto a largo plazo son importantes." },
    11: { domain: "Tecnología y trabajo humanitario", paths: ["Ingeniero de software, diseñador de UX o investigador de IA", "Director de una organización sin fines de lucro o fundador de una empresa social", "Organizador comunitario o estratega de campaña política.", "Científico ambiental o consultor de sostenibilidad.", "Ingeniero de redes o desarrollador de código abierto"], verb: "innovando para el beneficio colectivo", specific: "Carreras en la intersección de la tecnología, la comunidad y el progreso social: construyendo sistemas que sirvan a muchos, no solo a unos pocos." },
    12: { domain: "Espiritualidad y detrás de escena", paths: ["Psicoterapeuta, hipnoterapeuta o analista de sueños.", "Capellán, director espiritual o facilitador de retiros", "Editor de cine, productor musical o escritor fantasma", "Investigador médico o científico farmacéutico.", "Archivero, bibliotecario o conservador de museo"], verb: "trabajando con dimensiones invisibles", specific: "Carreras que operan detrás de escena, en soledad o en el límite entre lo visible y lo invisible: curación, investigación y producción creativa realizadas en privado." }
};

var SIGN_CAREER_FLAVORS = {
    Aries: { style: "pioneering and competitive", modifier: "en entornos dinámicos y pioneros en el mercado" },
    Taurus: { style: "patient and quality-focused", modifier: "enfatizando la artesanía, la belleza y el valor duradero" },
    Gemini: { style: "versatile and communicative", modifier: "involucrando múltiples proyectos, networking e intercambio de información." },
    Cancer: { style: "nurturing and intuitive", modifier: "centrado en el cuidado, las necesidades familiares y la conexión emocional" },
    Leo: { style: "creative and charismatic", modifier: "con visibilidad, desempeño y liderazgo inspirador" },
    Virgo: { style: "meticulous and service-oriented", modifier: "con atención al detalle, eficiencia y mejora práctica" },
    Libra: { style: "collaborative and aesthetic", modifier: "a través de asociaciones, belleza y enfoques equilibrados" },
    Scorpio: { style: "intense and investigative", modifier: "involucrando profundidad, investigación e impacto transformador" },
    Sagittarius: { style: "adventurous and philosophical", modifier: "con viajes, enseñanza y pensamiento global" },
    Capricorn: { style: "disciplined and ambitious", modifier: "construir autoridad, estructura y legado a largo plazo" },
    Aquarius: { style: "innovative and humanitarian", modifier: "usando tecnología, comunidad y métodos no convencionales" },
    Pisces: { style: "imaginative and compassionate", modifier: "a través de la visión artística, la curación y el servicio espiritual." }
};

function analyzeCareerSynthesis(readings) {
    if (!readings?.astrology) return null;

    const planetHouses = readings.astrology.planetHouses || {};
    const sunSign = readings.astrology.sunSign?.name;
    const mcSign = readings.astrology.midheaven?.name || readings.astrology.mc?.name;

    // Count planets per house
    const houseCounts = {};
    const houseDetails = {};
    for (const [planet, house] of Object.entries(planetHouses)) {
        if (house) {
            houseCounts[house] = (houseCounts[house] || 0) + 1;
            if (!houseDetails[house]) houseDetails[house] = [];
            houseDetails[house].push(planet);
        }
    }

    // Get house stelliums (3+) and strong houses (2+)
    const stelliumHouses = [];
    const strongHouses = [];
    for (const [h, count] of Object.entries(houseCounts)) {
        const hNum = parseInt(h);
        if (count >= 3) stelliumHouses.push(hNum);
        if (count >= 2) strongHouses.push(hNum);
    }

    if (stelliumHouses.length === 0 && strongHouses.length === 0) return null;

    // Determine dominant sign energy
    const signCounts = {};
    if (readings.astrology.stelliums) {
        readings.astrology.stelliums.forEach(s => {
            signCounts[s.sign] = (signCounts[s.sign] || 0) + s.count;
        });
    }
    if (sunSign) signCounts[sunSign] = (signCounts[sunSign] || 0) + 2;
    const dominantSign = Object.entries(signCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const signFlavor = SIGN_CAREER_FLAVORS[dominantSign] || SIGN_CAREER_FLAVORS[sunSign] || { style: "unique", modifier: "a su manera distintiva" };

    const scenarios = [];

    // Build career scenarios by combining house themes
    const primaryHouses = stelliumHouses.length > 0 ? stelliumHouses : strongHouses.slice(0, 2);

    primaryHouses.forEach((h, idx) => {
        const theme = HOUSE_CAREER_THEMES[h];
        if (!theme) return;
        const planets = houseDetails[h] || [];

        // Create primary scenario with specific job titles
        const topPaths = theme.paths.slice(0, 3).join(', ');
        const scenario = {
            title: theme.paths[0],
            domain: theme.domain,
            why: `${planets.join(', ')} en House ${h} crea talento natural para ${theme.verb}. ${theme.specific}`,
            signNote: `Su enfoque ${signFlavor.style} significa que esto funciona mejor ${signFlavor.modifier}`,
            examples: `Mejores partidos de su carrera: ${topPaths}`
        };
        scenarios.push(scenario);
    });

    // Cross-pollinate: if 2+ stellium houses, create combo career
    if (primaryHouses.length >= 2) {
        const h1 = HOUSE_CAREER_THEMES[primaryHouses[0]];
        const h2 = HOUSE_CAREER_THEMES[primaryHouses[1]];
        if (h1 && h2) {
            // Generate specific cross-domain career suggestions
            const comboPaths = [];
            if (h1.paths[1] && h2.paths[0]) comboPaths.push(`${h1.paths[1]} meets ${h2.paths[0]}`);
            scenarios.push({
                title: `${h1.domain} × ${h2.domain} Fusión`,
                domain: "Innovación entre dominios",
                why: `La rara combinación de la Casa ${primaryHouses[0]} (${h1.verb}) y la Casa ${primaryHouses[1]} (${h2.verb}) crea un punto ideal profesional único que pocas personas pueden llenar.`,
                signNote: `Mejor expresado ${signFlavor.modifier}`,
                examples: comboPaths.length > 0 ? `Think: ${comboPaths[0]}` : ''
            });
        }
    }

    // Add MC-based scenario if available
    if (mcSign && SIGN_CAREER_FLAVORS[mcSign]) {
        const mcFlavor = SIGN_CAREER_FLAVORS[mcSign];
        scenarios.push({
            title: `${mcSign} Camino del Medio Cielo`,
            domain: "Reputación pública y vocación",
            why: `Con ${mcSign} en el Medio Cielo, el rol público es ${mcFlavor.style}`,
            signNote: `La realización profesional llega ${mcFlavor.modifier}`
        });
    }

    return {
        title: "Escenarios de trayectoria profesional",
        subtitle: "Caminos del mundo real alineados con este gráfico",
        dominantSign: dominantSign,
        signFlavor: signFlavor,
        scenarios: scenarios,
        primaryHouses: primaryHouses,
        summary: stelliumHouses.length > 0
            ? `With stellium energy concentrated in House${stelliumHouses.length > 1 ? 's' : ''} ${stelliumHouses.join(' & ')}, career fulfilment comes through ${stelliumHouses.map(h => HOUSE_CAREER_THEMES[h]?.verb || 'focused purpose').join(' combined with ')}. The ${signFlavor.style} nature means this works best ${signFlavor.modifier}.`
            : `Strong planetary focus in House${strongHouses.slice(0, 2).length > 1 ? 's' : ''} ${strongHouses.slice(0, 2).join(' & ')} points toward ${strongHouses.slice(0, 2).map(h => HOUSE_CAREER_THEMES[h]?.verb || 'focused purpose').join(' and ')}.`
    };
}

// ============================================
// IDEAL PARTNER PROFILE GENERATOR
// Builds a dynamic partner profile from Descendant,
// Venus, Mars, Moon, and 7th House placements
// ============================================

var SIGN_PARTNER_QUALITIES = {
    Aries: { qualities: "audaz, independiente, enérgico, valiente", lifestyle: "activo, aventurero, espontaneo", warning: "Puede ser demasiado impulsivo o competitivo; puede chocar con la necesidad de calma" },
    Taurus: { qualities: "estable, sensual, paciente, confiable", lifestyle: "amante de la comodidad, conectado con la naturaleza, orientado a la rutina", warning: "Puede ser demasiado terco o posesivo; puede resistir el cambio necesario" },
    Gemini: { qualities: "ingenioso, curioso, adaptable, comunicativo", lifestyle: "Socialmente activo, intelectualmente estimulante, buscador de variedad.", warning: "Puede estar demasiado disperso o evasivo; puede tener dificultades con la profundidad emocional" },
    Cancer: { qualities: "nutritivo, emocionalmente profundo, protector, intuitivo", lifestyle: "centrado en el hogar, centrado en la familia, emocionalmente disponible", warning: "Puede ser demasiado pegajoso o de mal humor; puede tomar las cosas demasiado personalmente" },
    Leo: { qualities: "Cálido, generoso, creativo, seguro.", lifestyle: "expresivo, socialmente magnético, orientado a la celebración.", warning: "Puede ser demasiado llamativo o dramático; puede necesitar validación constante" },
    Virgo: { qualities: "reflexivo, orientado a los detalles, servicial, consciente de la salud", lifestyle: "organizado, centrado en el bienestar, en superación personal", warning: "Puede ser demasiado crítico o perfeccionista; puede pensar demasiado en las emociones" },
    Libra: { qualities: "encantador, imparcial, romántico, armonioso", lifestyle: "que aprecia la belleza, socialmente elegante, orientado a la asociación", warning: "Puede ser demasiado indeciso o evitar los conflictos; puede suprimir los verdaderos sentimientos de paz" },
    Scorpio: { qualities: "intenso, leal, perspicaz, emocionalmente valiente", lifestyle: "profundamente privado, que busca la transformación, todo o nada", warning: "Puede ser demasiado controlador o reservado; puede poner a prueba la lealtad hasta los extremos" },
    Sagittarius: { qualities: "aventurero, optimista, honesto, filosófico", lifestyle: "amante de los viajes, buscador de crecimiento, valorador de la libertad", warning: "Puede ser demasiado inquieto o directo; puede tener dificultades con la rutina o los matices emocionales" },
    Capricorn: { qualities: "Ambicioso, responsable, disciplinado, tipo proveedor.", lifestyle: "orientado a objetivos, estructurado, respetuoso de la tradición", warning: "Puede ser demasiado rígido o emocionalmente reservado; puede priorizar el trabajo sobre la conexión" },
    Aquarius: { qualities: "Único, intelectual, humanitario, independiente.", lifestyle: "poco convencional, con mentalidad comunitaria y centrado en el futuro", warning: "Puede ser demasiado distante o emocionalmente distante; puede intelectualizar los sentimientos" },
    Pisces: { qualities: "compasivo, creativo, espiritual, empático", lifestyle: "artístico, guiado por la intuición, espiritualmente abierto", warning: "Puede ser demasiado escapista o sin límites; Puede idealizar a sus socios de manera poco realista." }
};

var SIGN_COMPLEMENTS = {
    Aries: "Libra", Taurus: "Escorpión", Gemini: "Sagitario", Cancer: "Capricornio",
    Leo: "Acuario", Virgo: "Piscis", Libra: "Aries", Scorpio: "Tauro",
    Sagittarius: "Géminis", Capricorn: "Cáncer", Aquarius: "León", Pisces: "Virgo"
};

var ELEMENT_MAP = {
    Aries: "Fuego", Taurus: "Tierra", Gemini: "Aire", Cancer: "Agua",
    Leo: "Fuego", Virgo: "Tierra", Libra: "Aire", Scorpio: "Agua",
    Sagittarius: "Fuego", Capricorn: "Tierra", Aquarius: "Aire", Pisces: "Agua"
};

function analyzeIdealPartner(readings) {
    if (!readings?.astrology) return null;

    const descendantSign = readings.astrology.descendant?.name;
    const venusSign = readings.astrology.venus?.name;
    const marsSign = readings.astrology.mars?.name;
    const moonSign = readings.astrology.moonSign?.name;
    const sunSign = readings.astrology.sunSign?.name;
    const risingSign = readings.astrology.risingSign?.name;

    if (!descendantSign && !venusSign) return null;

    const result = { sections: [] };

    // 1. Core partner profile from Descendant
    if (descendantSign && SIGN_PARTNER_QUALITIES[descendantSign]) {
        const descData = SIGN_PARTNER_QUALITIES[descendantSign];
        result.sections.push({
            title: `${descendantSign} Descendiente - A quién atraes`,
            content: `La cúspide de la Casa Séptima en ${descendantSign} revela las cualidades más necesarias en un compañero de vida. Naturalmente, atraes y te sientes atraído por personas que son ${descData.qualities}. El estilo de vida de una pareja ideal es ${descData.lifestyle}. Esto refleja cualidades que complementan tu propia energía: lo que admiras en los demás es a menudo lo que estás aprendiendo a integrar en ti mismo.`
        });
    }

    // 2. Emotional security needs from Moon
    if (moonSign && SIGN_PARTNER_QUALITIES[moonSign]) {
        const moonData = SIGN_PARTNER_QUALITIES[moonSign];
        result.sections.push({
            title: `Luna en ${moonSign} - Necesidades de seguridad emocional`,
            content: `Para seguridad emocional en pareja, la Luna en ${moonSign} necesita un compañero que sea ${moonData.qualities}. La vida hogareña ideal juntos es ${moonData.lifestyle}. Sin esta base emocional, ninguna atracción sostendrá la relación a largo plazo.`
        });
    }

    // 3. Venus love language
    if (venusSign && RELATIONSHIP_STYLE_READINGS.byVenusSign[venusSign]) {
        const venusData = RELATIONSHIP_STYLE_READINGS.byVenusSign[venusSign];
        result.sections.push({
            title: `Venus en ${venusSign} - Lenguaje del amor`,
            content: `Venus muestra cómo se da y recibe el amor. ${venusData.loveStyle} Patrón de atracción: ${venusData.attractionPattern}`
        });
    }

    // 4. Mars chemistry
    if (marsSign && SIGN_PARTNER_QUALITIES[marsSign]) {
        const marsData = SIGN_PARTNER_QUALITIES[marsSign];
        result.sections.push({
            title: `Marte en ${marsSign} - Química y búsqueda`,
            content: `Marte revela qué enciende la pasión y cómo funciona la búsqueda. Con Marte en ${marsSign}, la química surge con alguien que es ${marsData.qualities}. El estilo de persecución es ${marsData.lifestyle}. La compatibilidad física y energética fluye mejor cuando estas cualidades están presentes.`
        });
    }

    // 5. Vivid Composite Partner Persona
    const keySignals = [descendantSign, moonSign, venusSign].filter(Boolean);
    const elements = keySignals.map(s => ELEMENT_MAP[s]).filter(Boolean);
    const elementCounts = {};
    elements.forEach(e => elementCounts[e] = (elementCounts[e] || 0) + 1);
    const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'balanced';

    const idealQualities = keySignals
        .map(s => SIGN_PARTNER_QUALITIES[s]?.qualities)
        .filter(Boolean)
        .join(', ')
        .split(', ');
    const uniqueQualities = [...new Set(idealQualities)].slice(0, 6);

    // Build a vivid persona paragraph
    const ELEMENT_VIBES = {
        Fire: { energy: "cálido y dinámico", date: "un día de aventuras: caminatas, música en vivo o viajes espontáneos por carretera", home: "animado y lleno de risas, con mucha pasión y franqueza" },
        Earth: { energy: "conectado a tierra y estable", date: "una comida deliciosamente cocinada, un paseo por la naturaleza o una velada tranquila en casa", home: "cómodo y estable, con placeres sensoriales: buena comida, telas suaves, rutinas tranquilas" },
        Air: { energy: "intelectualmente estimulante y socialmente atractivo", date: "una conversación estimulante tomando un café, la inauguración de una galería o un debate animado", home: "Lleno de ideas, libros por todas partes y mucha libertad para ambos socios." },
        Water: { energy: "emocionalmente profundo e intuitivamente conectado", date: "una tarde tranquila compartiendo sentimientos, un paseo al atardecer junto al agua o una experiencia creativa significativa", home: "emocionalmente seguro, profundamente íntimo y rico en comprensión tácita" }
    };

    const vibe = ELEMENT_VIBES[dominantElement] || ELEMENT_VIBES.Water;
    const descLifestyle = descendantSign ? SIGN_PARTNER_QUALITIES[descendantSign]?.lifestyle : '';
    const moonLifestyle = moonSign ? SIGN_PARTNER_QUALITIES[moonSign]?.lifestyle?.split(',')[0] : '';

    let personaContent = `<strong>Imagínate a esta persona:</strong> Alguien cuya energía es ${vibe.energy}. Entran en una habitación y notas algo ${uniqueQualities.slice(0, 2).join(' and ')} en ellos inmediatamente. Una cita perfecta parece ${vibe.date}. Juntos en casa, la vida se siente ${vibe.home}.\n\n`;

    personaContent += `They embody a blend of ${uniqueQualities.join(', ')} — qualities that ${descendantSign ? `your ${descendantSign} Descendant is specifically coded to attract` : 'your chart naturally draws in'}. `;

    if (descendantSign) {
        personaContent += `A partner with ${descendantSign} Sun or Rising would strongly activate this magnetic pull. `;
    }
    if (moonSign) {
        personaContent += `Emotionally, a ${moonSign} Moon or ${SIGN_COMPLEMENTS[moonSign] || 'compatible'} Moon provides the deepest feeling of coming home. `;
    }

    personaContent += `\n\nThe relationship thrives when both partners honour each other's need for ${keySignals.map(s => SIGN_PARTNER_QUALITIES[s]?.lifestyle?.split(',')[0]).filter(Boolean).join(', ')}. `;
    personaContent += `This isn't about finding a perfect person — it's about recognising the qualities your soul is specifically wired to grow alongside.`;

    result.sections.push({
        title: "Su pareja ideal: un retrato",
        content: personaContent
    });

    // 6. Red flags
    const redFlagSigns = [];
    if (moonSign) {
        const moonElement = ELEMENT_MAP[moonSign];
        const clashElements = { Fire: 'Agua', Water: 'Fuego', Earth: 'Aire', Air: 'Tierra' };
        const clashElement = clashElements[moonElement];
        if (clashElement) {
            const clashSigns = Object.entries(ELEMENT_MAP).filter(([s, e]) => e === clashElement).map(([s]) => s);
            redFlagSigns.push(...clashSigns.slice(0, 2));
        }
    }
    if (redFlagSigns.length > 0) {
        result.sections.push({
            title: "Desafíos de compatibilidad",
            content: `Las parejas con una fuerte energía ${redFlagSigns.join(' or ')} pueden crear fricción, no porque estos signos sean inherentemente incompatibles, sino porque sus necesidades básicas pueden chocar con los patrones de seguridad emocional aquí. Estas asociaciones requieren un esfuerzo extra consciente para salvar las diferencias elementales. La clave es comprender el lenguaje emocional de cada uno en lugar de asumir que una forma es "correcta".`
        });
    }

    return result;
}

// ============================================
// CHART TENSION RESOLVER
// Detects opposing chart energies and generates
// rhythm-based integration guidance
// ============================================

var ENERGY_AXES = {
    "stability-adventure": {
        title: "La paradoja estabilidad-aventura",
        signs: { stability: ["Tauro", "Cáncer", "Virgo", "Capricornio"], adventure: ["Sagitario", "Aries", "Géminis", "Acuario"] },
        houses: { stability: [2, 4, 6], adventure: [3, 9, 11] },
        resolution: {
            daily: "Mañana: Rutina estable, prácticas de puesta a tierra. Mediodía: Trabajo expansivo, exploración creativa. Tarde: Regreso al confort, espacios familiares.",
            weekly: "Días laborables: Trabajo y construcción estables y concentrados. Fines de semana: Exploración, aprendizaje, nuevas experiencias.",
            yearly: "La mayor parte del año: Trabajo profundo y consistente construyendo cimientos. Unos meses: viajes, estudios, aventuras que amplían horizontes.",
            life: "Construye una base segura y luego lanza aventuras DESDE esa base. Volver a integrar lo aprendido. Expande la base con nueva sabiduría. Repetir.",
            integration: "Esta alma no elige entre estabilidad y aventura: está creando una vida donde la estabilidad PERMITE la aventura y la aventura ENRIQUECE la estabilidad. La base de operaciones es la plataforma de lanzamiento, no la prisión."
        }
    },
    "independence-partnership": {
        title: "La paradoja independencia-asociación",
        signs: { independence: ["Aries", "Acuario", "Sagitario"], partnership: ["Libra", "Cáncer", "Piscis"] },
        houses: { independence: [1, 11], partnership: [7, 4, 8] },
        resolution: {
            daily: "Tiempo en solitario para proyectos independientes. Tiempo compartido para la conexión y la colaboración. Ninguno domina todo el día.",
            weekly: "Dedicar tiempo a solas para actividades personales. Dedicamos tiempo juntos para una relación profunda. Ambos son no negociables.",
            yearly: "Períodos de intensa unión equilibrados con períodos de aventuras personales o proyectos en solitario.",
            life: "Asociaciones que celebran la individualidad. Independencia que deja espacio para una conexión profunda. Elegir socios que quieran un compañero de equipo, no un clon.",
            integration: "Esta alma necesita asociaciones que mejoren, en lugar de disminuir, su independencia. Aportan más a las relaciones cuando también se realizan individualmente."
        }
    },
    "emotion-logic": {
        title: "La paradoja del corazón y la mente",
        signs: { emotion: ["Cáncer", "Piscis", "Escorpión"], logic: ["Virgo", "Géminis", "Acuario", "Capricornio"] },
        houses: { emotion: [4, 8, 12], logic: [3, 6, 10] },
        resolution: {
            daily: "Empiece a tomar decisiones con intuición (¿cómo se siente esto?), luego valídelas con lógica (¿tiene sentido?). Ninguno de los dos por sí solo ofrece una imagen completa.",
            weekly: "Permita tiempo de procesamiento emocional sin exigir explicaciones racionales. Permita tiempo analítico sin sentimientos exigentes.",
            yearly: "Las estaciones creativas e intuitivas se alternan con estaciones estructuradas y prácticas. Ambos son productivos de diferentes maneras.",
            life: "Los mayores avances se producen cuando el corazón y la mente están de acuerdo. Desarrolla TANTO la inteligencia emocional como la habilidad analítica: son complementarias, no competitivas.",
            integration: "Esta alma tiene acceso tanto a sentimientos profundos como a pensamientos agudos. El don se está volviendo bilingüe: habla con fluidez tanto el lenguaje de la emoción como el lenguaje de la razón."
        }
    },
    "visibility-privacy": {
        title: "La paradoja del centro de atención y el santuario",
        signs: { visibility: ["León", "Aries", "Sagitario"], privacy: ["Escorpión", "Cáncer", "Piscis", "Virgo"] },
        houses: { visibility: [1, 5, 10], privacy: [4, 8, 12] },
        resolution: {
            daily: "Trabajo de cara al público en horas punta de energía. Restauración privada en horas de tranquilidad. Respeta el ritmo natural.",
            weekly: "Días para estar 'on' y visible. Días de retiro y restauración. No dejes que ninguno de los dos domine toda la semana.",
            yearly: "Temporadas de visibilidad, lanzamiento y participación pública. Estaciones de retiro, reflexión e incubación creativa.",
            life: "Construir una vida pública que sea lo suficientemente auténtica como para sostenerla y una vida privada que sea lo suficientemente rica como para nutrirla. El escenario necesita un backstage.",
            integration: "Esta alma brilla más cuando ha tenido suficiente oscuridad para recargarse. Su poder público proviene de su profundidad privada."
        }
    },
    "structure-freedom": {
        title: "La paradoja estructura-libertad",
        signs: { structure: ["Capricornio", "Virgo", "Tauro"], freedom: ["Acuario", "Sagitario", "Aries", "Géminis"] },
        houses: { structure: [6, 10], freedom: [5, 9, 11] },
        resolution: {
            daily: "La rutina matutina estructurada proporciona el contenedor para la libertad creativa de la tarde. La estructura CREA libertad.",
            weekly: "Los bloques de trabajo disciplinados obtienen bloques de exploración gratuitos. Ninguno funciona sin el otro.",
            yearly: "Establecimiento de objetivos y disciplina en la carrera. Aventura espontánea en la vida personal. Ambos se alimentan mutuamente.",
            life: "Construya estructuras que sirvan a su libertad, no prisiones que la limiten. Las reglas y rutinas deben elegirse, no imponerse.",
            integration: "Esta alma descubre que la estructura y la libertad no son opuestas: la estructura es el esqueleto que permite bailar al cuerpo de la libertad."
        }
    },
    "material-spiritual": {
        title: "La paradoja material-espiritual",
        signs: { material: ["Tauro", "Virgo", "Capricornio"], spiritual: ["Piscis", "Sagitario", "Escorpión"] },
        houses: { material: [2, 6, 10], spiritual: [9, 12, 8] },
        resolution: {
            daily: "Consolidar los conocimientos espirituales en acción práctica. Dejemos que el trabajo práctico se convierta en una meditación. Ningún reino es "más alto" que el otro.",
            weekly: "Compromiso con el mundo material (trabajo, dinero, cuerpo) equilibrado con prácticas espirituales (meditación, reflexión, naturaleza).",
            yearly: "Períodos de ambición mundana impulsados ​​por períodos de renovación espiritual. Ninguno de los dos es sostenible por sí solo.",
            life: "El objetivo no es elegir entre riqueza y sabiduría, sino hacer que la sabiduría sea rentable y la riqueza tenga sentido. Conviértete en el puente entre el cielo y la tierra.",
            integration: "El don único de esta alma es aportar profundidad espiritual a la realidad material. Hacen lo sagrado práctico y lo práctico sagrado."
        }
    }
};

function analyzeChartTensions(readings) {
    if (!readings?.astrology) return null;

    const tensions = [];
    const planetHouses = readings.astrology.planetHouses || {};

    // Collect all active signs in the chart
    const chartSigns = [];
    if (readings.astrology.sunSign?.name) chartSigns.push(readings.astrology.sunSign.name);
    if (readings.astrology.moonSign?.name) chartSigns.push(readings.astrology.moonSign.name);
    if (readings.astrology.risingSign?.name) chartSigns.push(readings.astrology.risingSign.name);
    if (readings.astrology.venus?.name) chartSigns.push(readings.astrology.venus.name);
    if (readings.astrology.mars?.name) chartSigns.push(readings.astrology.mars.name);
    if (readings.astrology.mercury?.name) chartSigns.push(readings.astrology.mercury.name);
    if (readings.astrology.jupiter?.name) chartSigns.push(readings.astrology.jupiter.name);
    if (readings.astrology.saturn?.name) chartSigns.push(readings.astrology.saturn.name);

    // Collect active houses
    const activeHouses = Object.values(planetHouses).filter(Boolean).map(Number);

    // Check each axis for tension
    for (const [axisKey, axis] of Object.entries(ENERGY_AXES)) {
        const [pole1Name, pole2Name] = axisKey.split('-');
        const pole1Signs = axis.signs[pole1Name] || [];
        const pole2Signs = axis.signs[pole2Name] || [];
        const pole1Houses = axis.houses[pole1Name] || [];
        const pole2Houses = axis.houses[pole2Name] || [];

        // Count how many chart placements fall on each side
        let pole1Score = 0;
        let pole2Score = 0;

        chartSigns.forEach(sign => {
            if (pole1Signs.includes(sign)) pole1Score++;
            if (pole2Signs.includes(sign)) pole2Score++;
        });

        activeHouses.forEach(h => {
            if (pole1Houses.includes(h)) pole1Score += 0.5;
            if (pole2Houses.includes(h)) pole2Score += 0.5;
        });

        // Only flag tension if BOTH sides have significant presence (2+)
        if (pole1Score >= 2 && pole2Score >= 2) {
            tensions.push({
                title: axis.title,
                pole1: { name: pole1Name, score: pole1Score },
                pole2: { name: pole2Name, score: pole2Score },
                resolution: axis.resolution,
                strength: Math.min(pole1Score, pole2Score) // higher = more intense tension
            });
        }
    }

    // Sort by tension strength (most intense first)
    tensions.sort((a, b) => b.strength - a.strength);

    return tensions.length > 0 ? tensions : null;
}