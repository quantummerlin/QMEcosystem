#!/usr/bin/env python3
"""
Translate all HTML pages and utility JS files in the esp/ directory to Spanish.
Also fixes all /soulblueprint/ links to /amomentintime/esp/.
"""
import os
import re

ESP_DIR = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# ABOUT.HTML - Full Spanish translation
# ============================================================
ABOUT_HTML = '''<!DOCTYPE html>
<html lang="es">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acerca de Un Momento en el Tiempo | Lectura Cósmica – Quantum Merlin</title>
    <meta name="description" content="Conoce las lecturas cósmicas de Un Momento en el Tiempo. Astrología de carta natal personalizada e información numerológica impulsada por Quantum Merlin.">
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VW4LGE7L1T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VW4LGE7L1T');
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #D8B5FF;
            --secondary: #B19CD9;
            --background: #F8F0FF;
            --card-bg: #ffffff;
            --text: #333333;
            --font-heading: 'Playfair Display', Georgia, serif;
            --font-body: 'Inter', 'Segoe UI', sans-serif;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: var(--font-body);
            background: var(--background);
            color: var(--text);
            line-height: 1.8;
            min-height: 100vh;
        }
        .header {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, #FF69B4 0%, #D8B5FF 50%, #6BA3D6 100%);
        }
        .header h1 {
            font-family: var(--font-heading);
            font-size: 2.5rem;
            color: #1a0a2e;
            margin-bottom: 10px;
        }
        .header p {
            color: #3d2b5e;
            font-size: 1.1rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .content-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            margin-bottom: 30px;
        }
        h2 {
            font-family: var(--font-heading);
            color: var(--primary);
            font-size: 1.6rem;
            margin: 30px 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(216,181,255,0.3);
        }
        h2:first-child {
            margin-top: 0;
        }
        p {
            margin-bottom: 15px;
        }
        a {
            color: var(--primary);
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 30px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        .back-link:hover {
            transform: translateY(-2px);
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 40px 20px;
            background: rgba(255,255,255,0.5);
            margin-top: 40px;
        }
        .footer p {
            color: #888;
            font-size: 0.9rem;
        }
        @media (max-width: 600px) {
            .header h1 {
                font-size: 1.8rem;
            }
            .content-card {
                padding: 25px;
            }
            h2 {
                font-size: 1.3rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Acerca de Un Momento en el Tiempo</h1>
        <p>Tu lectura cósmica completa</p>
    </header>

    <div class="container">
        <div class="content-card">
            <h2>Por Qué Existe Esto</h2>
            <p>Un Momento en el Tiempo es para cualquier persona que desee una imagen energética de quién podría ser, de lo que podría ser capaz y de cómo podría coincidir con su vida más adelante. No es un libro de reglas ni una predicción. Es una lectura reflexiva diseñada para ser revisitada con el tiempo.</p>

            <h2>Una Lectura a la Que Puedes Volver</h2>
            <p>Piensa en ella como un buen libro que puedes retomar cada pocos años y apreciar con ojos nuevos. O, si lo prefieres, como una película que vuelves a ver en un momento diferente de tu vida y notas nuevos detalles. La historia puede sentirse diferente cada vez porque tú has cambiado.</p>

            <h2>Lo Que Hagas Con Ella Es Tuyo</h2>
            <p>Si crees en la positividad de la lectura, podrías usarla como base para una gran vida. Si la ves como una metáfora o incluso como algo sin sentido, eso también es válido. Un Momento en el Tiempo está diseñado para ofrecer posibilidades, no certezas.</p>

            <h2>¿Por Qué Las Estrellas?</h2>
            <p>Ha habido una obsesión ancestral con las estrellas, las constelaciones y sus relaciones entre sí, y la idea de que estos patrones podrían influirnos energéticamente. Ya sea que lo veas como algo significativo o no, ha inspirado la narrativa humana durante miles de años. Un Momento en el Tiempo es parte de esa tradición.</p>

            <h2>Dónde Estamos</h2>
            <p>Estamos ubicados en Melbourne, Victoria, Australia y servimos a lectores en todas partes.</p>
        </div>

        <div style="text-align: center;">
            <a href="/amomentintime/esp/" class="back-link">Volver a Un Momento en el Tiempo</a>
        </div>
    </div>

    <footer class="footer">
        <p>&copy; 2026 Un Momento en el Tiempo por Quantum Merlin. Todos los derechos reservados.</p>
        <p style="margin-top: 10px;">
            <a href="/amomentintime/esp/about.html">Acerca de</a> &bull;
            <a href="/amomentintime/esp/privacy.html">Política de Privacidad</a> &bull;
            <a href="/amomentintime/esp/terms.html">Términos de Servicio</a> &bull;
            <a href="/amomentintime/esp/disclaimer.html">Descargo de Responsabilidad</a>
        </p>
    </footer>
</body>
</html>
'''

# ============================================================
# PRIVACY.HTML - Full Spanish translation
# ============================================================
PRIVACY_HTML = '''<!DOCTYPE html>
<html lang="es">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidad | Un Momento en el Tiempo – Quantum Merlin</title>
    <meta name="description" content="Política de privacidad para las lecturas cósmicas de Un Momento en el Tiempo. Conoce cómo protegemos tus datos de nacimiento e información personal.">
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VW4LGE7L1T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VW4LGE7L1T');
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #D8B5FF;
            --secondary: #B19CD9;
            --background: #F8F0FF;
            --card-bg: #ffffff;
            --text: #333333;
            --font-heading: 'Playfair Display', Georgia, serif;
            --font-body: 'Inter', 'Segoe UI', sans-serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-body);
            background: var(--background);
            color: var(--text);
            line-height: 1.8;
            min-height: 100vh;
        }
        .header {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, #FF69B4 0%, #D8B5FF 50%, #6BA3D6 100%);
        }
        .header h1 {
            font-family: var(--font-heading);
            font-size: 2.5rem;
            color: #1a0a2e;
            margin-bottom: 10px;
        }
        .header p { color: #3d2b5e; font-size: 1.1rem; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .content-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            margin-bottom: 30px;
        }
        h2 {
            font-family: var(--font-heading);
            color: #4b2a6f;
            font-size: 1.6rem;
            margin: 30px 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(216,181,255,0.3);
        }
        h2:first-child { margin-top: 0; }
        h3 {
            font-family: var(--font-heading);
            color: #5b3a86;
            font-size: 1.2rem;
            margin: 25px 0 10px;
        }
        p { margin-bottom: 15px; }
        ul, ol { margin: 15px 0 15px 25px; }
        li { margin-bottom: 8px; }
        a { color: var(--primary); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .last-updated { text-align: center; color: #888; font-style: italic; margin-bottom: 30px; }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 30px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        .back-link:hover { transform: translateY(-2px); text-decoration: none; }
        .footer {
            text-align: center;
            padding: 40px 20px;
            background: rgba(255,255,255,0.5);
            margin-top: 40px;
        }
        .footer p { color: #888; font-size: 0.9rem; }
        @media (max-width: 600px) {
            .header h1 { font-size: 1.8rem; }
            .content-card { padding: 25px; }
            h2 { font-size: 1.3rem; }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Política de Privacidad</h1>
        <p>Un Momento en el Tiempo - Tus Datos, Tu Confianza</p>
    </header>
    
    <div class="container">
        <p class="last-updated">Última Actualización: 30 de enero de 2026</p>
        
        <div class="content-card">
            <h2>1. Introducción</h2>
            <p>Bienvenido a Un Momento en el Tiempo ("nosotros", "nuestro" o "nos"). Respetamos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tu información cuando utilizas nuestros servicios de lecturas astrológicas y numerológicas.</p>
            <p>Al utilizar nuestro sitio web, aceptas la recopilación y el uso de información de acuerdo con esta Política de Privacidad.</p>
            
            <h2>2. Información que Recopilamos</h2>
            
            <h3>2.1 Información Personal</h3>
            <p>Cuando utilizas nuestros servicios, podemos recopilar la siguiente información personal:</p>
            <ul>
                <li><strong>Nombre:</strong> El nombre que proporcionas para la lectura</li>
                <li><strong>Fecha de Nacimiento:</strong> Utilizada para cálculos astrológicos y numerológicos</li>
                <li><strong>Hora de Nacimiento (Opcional):</strong> Para cálculos más precisos del signo ascendente</li>
                <li><strong>Lugar de Nacimiento (Opcional):</strong> Para datos astrológicos basados en la ubicación</li>
            </ul>
            
            <h3>2.2 Información Técnica</h3>
            <p>Recopilamos automáticamente cierta información técnica cuando visitas nuestro sitio web:</p>
            <ul>
                <li>Dirección IP</li>
                <li>Tipo y versión del navegador</li>
                <li>Información del dispositivo</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Sitio web de referencia</li>
            </ul>
            
            <h3>2.3 Cookies y Tecnologías Similares</h3>
            <p>Utilizamos cookies y tecnologías de seguimiento similares para:</p>
            <ul>
                <li>Recordar tus preferencias y configuración</li>
                <li>Almacenar tu última información de lectura localmente</li>
                <li>Analizar el tráfico y los patrones de uso del sitio web</li>
                <li>Mostrar anuncios personalizados</li>
            </ul>
            
            <h2>3. Cómo Usamos Tu Información</h2>
            <p>Utilizamos tu información para los siguientes propósitos:</p>
            <ul>
                <li><strong>Para Generar Lecturas:</strong> Tus datos de nacimiento se utilizan únicamente para calcular y generar tus lecturas astrológicas y numerológicas personalizadas</li>
                <li><strong>Para Mejorar Nuestros Servicios:</strong> Analizamos los patrones de uso para mejorar la experiencia del usuario</li>
                <li><strong>Para Mostrar Anuncios:</strong> Utilizamos Google AdSense para mostrar anuncios relevantes</li>
                <li><strong>Para Comunicarnos:</strong> Si te pones en contacto con nosotros, usamos tu información para responder</li>
            </ul>
            
            <h2>4. Almacenamiento y Seguridad de Datos</h2>
            
            <h3>4.1 Almacenamiento Local</h3>
            <p>La información de tu lectura se almacena localmente en tu navegador usando localStorage. Esto significa:</p>
            <ul>
                <li>Tus datos permanecen en tu dispositivo</li>
                <li>No almacenamos tus datos de nacimiento en nuestros servidores</li>
                <li>Puedes borrar estos datos en cualquier momento limpiando los datos de tu navegador</li>
            </ul>
            
            <h3>4.2 Medidas de Seguridad</h3>
            <p>Implementamos medidas de seguridad apropiadas para proteger tu información:</p>
            <ul>
                <li>Encriptación HTTPS para toda la transmisión de datos</li>
                <li>Evaluaciones de seguridad regulares</li>
                <li>Acceso limitado a datos técnicos</li>
            </ul>
            
            <h2>5. Servicios de Terceros</h2>
            
            <h3>5.1 Google AdSense</h3>
            <p>Utilizamos Google AdSense para mostrar anuncios. Google puede usar cookies y balizas web para:</p>
            <ul>
                <li>Mostrar anuncios basados en tus visitas anteriores a nuestro sitio web y otros sitios</li>
                <li>Medir la eficacia de la publicidad</li>
            </ul>
            <p>Puedes desactivar la publicidad personalizada visitando <a href="https://www.google.com/settings/ads" target="_blank">Configuración de Anuncios de Google</a>.</p>
            
            <h3>5.2 Google Analytics</h3>
            <p>Podemos utilizar Google Analytics para comprender el tráfico y los patrones de uso del sitio web. Google Analytics recopila datos de uso anónimos.</p>
            
            <h3>5.3 Buy Me a Coffee</h3>
            <p>Proporcionamos un enlace a Buy Me a Coffee para apoyo voluntario. Su política de privacidad se aplica a cualquier interacción en su plataforma.</p>
            
            <h2>6. Tus Derechos</h2>
            <p>Dependiendo de tu ubicación, puedes tener los siguientes derechos sobre tus datos personales:</p>
            <ul>
                <li><strong>Derecho de Acceso:</strong> Solicitar una copia de tus datos personales</li>
                <li><strong>Derecho de Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
                <li><strong>Derecho de Supresión:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Derecho a Limitar el Procesamiento:</strong> Limitar cómo usamos tus datos</li>
                <li><strong>Derecho a la Portabilidad de Datos:</strong> Recibir tus datos en un formato portátil</li>
                <li><strong>Derecho de Oposición:</strong> Oponerse a ciertos usos de tus datos</li>
            </ul>
            <p>Para ejercer estos derechos, por favor contáctanos utilizando la información proporcionada a continuación.</p>

            <h2>6A. Australia (Ley de Privacidad de 1988)</h2>
            <p>Estamos ubicados en Melbourne, Victoria, Australia y manejamos la información personal de acuerdo con los Principios Australianos de Privacidad (APPs).</p>
            <ul>
                <li><strong>Acceso y Corrección:</strong> Puedes solicitar acceso o corrección de tu información personal</li>
                <li><strong>Quejas:</strong> Si tienes una preocupación sobre privacidad, contáctanos primero para que podamos resolverla</li>
            </ul>
            <p>Si no estás satisfecho con nuestra respuesta, puedes contactar a la Oficina del Comisionado de Información de Australia (OAIC) en <a href="https://www.oaic.gov.au" target="_blank">oaic.gov.au</a>.</p>

            <h2>6B. Esquema de Violaciones de Datos Notificables (NDB)</h2>
            <p>Si una violación de datos probablemente resulte en un daño grave, notificaremos a las personas afectadas y al OAIC de acuerdo con el esquema NDB.</p>
            
            <h2>7. Privacidad de Menores</h2>
            <p>Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos intencionalmente información personal de menores de 13 años. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, por favor contáctanos inmediatamente.</p>
            
            <h2>8. Retención de Datos</h2>
            <p>Dado que no almacenamos datos personales en nuestros servidores, la retención es controlada por ti:</p>
            <ul>
                <li>Los datos de almacenamiento local permanecen hasta que borres los datos de tu navegador</li>
                <li>Los datos técnicos (registros) se conservan durante 30 días por razones de seguridad</li>
                <li>Los datos analíticos se anonimizan después de 26 meses</li>
            </ul>
            
            <h2>9. Transferencias Internacionales de Datos</h2>
            <p>Nuestro sitio web está alojado en servidores que pueden estar ubicados fuera de tu país. Al utilizar nuestros servicios, aceptas la transferencia de información a países que pueden tener leyes de protección de datos diferentes a las de tu país de residencia.</p>
            
            <h2>10. Cambios en Esta Política de Privacidad</h2>
            <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos de cualquier cambio mediante:</p>
            <ul>
                <li>La publicación de la nueva Política de Privacidad en esta página</li>
                <li>La actualización de la fecha de "Última Actualización"</li>
                <li>La exhibición de un aviso destacado en nuestro sitio web</li>
            </ul>
            
            <h2>11. Contáctanos</h2>
            <p>Si tienes alguna pregunta sobre esta Política de Privacidad o nuestras prácticas de datos, por favor contáctanos:</p>
            <ul>
                <li><strong>Sitio Web:</strong> <a href="https://quantummerlin.com">quantummerlin.com</a></li>
                <li><strong>Contacto:</strong> <a href="https://quantummerlin.com/contact.html" target="_blank">Página de contacto</a></li>
                <li><strong>Ubicación:</strong> Melbourne, Victoria, Australia</li>
            </ul>
            
            <h2>12. Base Legal para el Procesamiento (RGPD)</h2>
            <p>Para usuarios en el Espacio Económico Europeo (EEE), nuestra base legal para recopilar y usar información personal depende de los datos que recopilamos y el contexto específico:</p>
            <ul>
                <li><strong>Consentimiento:</strong> Nos has dado permiso para procesar tus datos</li>
                <li><strong>Intereses Legítimos:</strong> El procesamiento es necesario para nuestros intereses legítimos (por ejemplo, mejorar nuestros servicios)</li>
                <li><strong>Obligación Legal:</strong> El procesamiento es necesario para cumplir con la ley</li>
            </ul>
            
            <h2>13. Derechos de Privacidad de California (CCPA)</h2>
            <p>Si eres residente de California, tienes derecho a:</p>
            <ul>
                <li>Saber qué información personal se está recopilando sobre ti</li>
                <li>Saber si tu información personal se vende o se divulga</li>
                <li>Negarte a la venta de información personal</li>
                <li>Acceder a tu información personal</li>
                <li>Solicitar la eliminación de tu información personal</li>
            </ul>
            <p>No vendemos tu información personal a terceros.</p>
        </div>
        
        <div style="text-align: center;">
            <a href="/amomentintime/esp/" class="back-link">&larr; Volver a Un Momento en el Tiempo</a>
        </div>
    </div>
    
    <footer class="footer">
        <p>&copy; 2026 Un Momento en el Tiempo por Quantum Merlin. Todos los derechos reservados.</p>
        <p style="margin-top: 10px;">
            <a href="/amomentintime/esp/about.html">Acerca de</a> &bull; 
            <a href="/amomentintime/esp/privacy.html">Política de Privacidad</a> &bull; 
            <a href="/amomentintime/esp/terms.html">Términos de Servicio</a> &bull; 
            <a href="/amomentintime/esp/disclaimer.html">Descargo de Responsabilidad</a>
        </p>
    </footer>
</body>
</html>
'''

# ============================================================
# TERMS.HTML - Full Spanish translation
# ============================================================
TERMS_HTML = '''<!DOCTYPE html>
<html lang="es">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Términos de Servicio | Un Momento en el Tiempo – Quantum Merlin</title>
    <meta name="description" content="Términos de servicio para las lecturas cósmicas de Un Momento en el Tiempo. Entiende tus derechos y responsabilidades.">
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VW4LGE7L1T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VW4LGE7L1T');
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #D8B5FF;
            --secondary: #B19CD9;
            --background: #F8F0FF;
            --card-bg: #ffffff;
            --text: #333333;
            --font-heading: 'Playfair Display', Georgia, serif;
            --font-body: 'Inter', 'Segoe UI', sans-serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-body);
            background: var(--background);
            color: var(--text);
            line-height: 1.8;
            min-height: 100vh;
        }
        .header {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, #FF69B4 0%, #D8B5FF 50%, #6BA3D6 100%);
        }
        .header h1 {
            font-family: var(--font-heading);
            font-size: 2.5rem;
            color: #1a0a2e;
            margin-bottom: 10px;
        }
        .header p { color: #3d2b5e; font-size: 1.1rem; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .content-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            margin-bottom: 30px;
        }
        h2 {
            font-family: var(--font-heading);
            color: #4b2a6f;
            font-size: 1.6rem;
            margin: 30px 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(216,181,255,0.3);
        }
        h2:first-child { margin-top: 0; }
        h3 {
            font-family: var(--font-heading);
            color: #5b3a86;
            font-size: 1.2rem;
            margin: 25px 0 10px;
        }
        p { margin-bottom: 15px; }
        ul, ol { margin: 15px 0 15px 25px; }
        li { margin-bottom: 8px; }
        a { color: var(--primary); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .last-updated { text-align: center; color: #888; font-style: italic; margin-bottom: 30px; }
        .back-link {
            display: inline-block; margin-top: 30px; padding: 12px 30px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white; text-decoration: none; border-radius: 25px; font-weight: 600;
            transition: transform 0.3s ease;
        }
        .back-link:hover { transform: translateY(-2px); text-decoration: none; }
        .footer { text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.5); margin-top: 40px; }
        .footer p { color: #888; font-size: 0.9rem; }
        @media (max-width: 600px) {
            .header h1 { font-size: 1.8rem; }
            .content-card { padding: 25px; }
            h2 { font-size: 1.3rem; }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Términos de Servicio</h1>
        <p>Un Momento en el Tiempo - Pautas de Uso</p>
    </header>
    
    <div class="container">
        <p class="last-updated">Última Actualización: 30 de enero de 2026</p>
        
        <div class="content-card">
            <h2>1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar Un Momento en el Tiempo ("el Servicio"), aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, por favor no utilices nuestros servicios.</p>
            
            <h2>2. Descripción del Servicio</h2>
            <p>Un Momento en el Tiempo proporciona lecturas cósmicas generadas por computadora basadas en datos de nacimiento, incluyendo:</p>
            <ul>
                <li>Interpretaciones de cartas natales astrológicas</li>
                <li>Lecturas numerológicas</li>
                <li>Perspectivas del zodiaco chino</li>
                <li>Lecturas personalizadas de la carta natal</li>
            </ul>
            <p><strong>Estas lecturas son solo para fines de entretenimiento y no deben ser consideradas como asesoramiento profesional de ningún tipo.</strong></p>
            
            <h2>3. Elegibilidad</h2>
            <p>Debes tener al menos 13 años para usar nuestros servicios. Si eres menor de 18 años, necesitas el consentimiento de un padre o tutor para usar nuestros servicios.</p>
            
            <h2>4. Cuentas de Usuario</h2>
            <p>Actualmente, nuestro servicio no requiere la creación de una cuenta. Los datos de tu lectura se almacenan localmente en tu navegador. Eres responsable de:</p>
            <ul>
                <li>Mantener la privacidad de los datos almacenados en tu navegador</li>
                <li>Asegurar que la información proporcionada sea precisa</li>
                <li>Cualquier actividad que ocurra bajo tu sesión de navegador</li>
            </ul>
            
            <h2>5. Uso Aceptable</h2>
            <p>Aceptas no usar nuestros servicios para ningún propósito que sea ilegal o esté prohibido por estos Términos. No puedes usar nuestros servicios de ninguna manera que pueda ser:</p>
            <ul>
                <li>Dañina, amenazante, abusiva, acosadora o difamatoria</li>
                <li>Discriminatoria por motivos de raza, género, religión, nacionalidad, discapacidad u orientación sexual</li>
                <li>Spam, publicidad no solicitada o materiales promocionales</li>
                <li>Con la intención de interferir con o interrumpir nuestros servicios</li>
                <li>Diseñada para suplantar la identidad de cualquier persona o entidad</li>
            </ul>
            
            <h2>6. Propiedad Intelectual</h2>
            
            <h3>6.1 Nuestro Contenido</h3>
            <p>Todo el contenido de Un Momento en el Tiempo, incluyendo pero no limitado a:</p>
            <ul>
                <li>Texto, gráficos, logotipos e imágenes</li>
                <li>Interpretaciones y descripciones de lecturas</li>
                <li>Software y código</li>
                <li>Diseño y maquetación</li>
            </ul>
            <p>es propiedad de Un Momento en el Tiempo y está protegido por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.</p>
            
            <h3>6.2 Tu Licencia</h3>
            <p>Te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para:</p>
            <ul>
                <li>Usar nuestros servicios para fines personales y no comerciales</li>
                <li>Descargar e imprimir tu lectura personal para uso personal</li>
                <li>Compartir tu lectura con amigos y familiares</li>
            </ul>
            
            <h3>6.3 Restricciones</h3>
            <p>No puedes:</p>
            <ul>
                <li>Reproducir, distribuir o exhibir públicamente nuestro contenido sin permiso</li>
                <li>Crear obras derivadas de nuestro contenido</li>
                <li>Usar nuestro contenido con fines comerciales sin autorización</li>
                <li>Eliminar o alterar avisos de derechos de autor</li>
                <li>Rastrear, indexar o usar medios automatizados para acceder a nuestros servicios</li>
            </ul>
            
            <h2>7. Publicidad</h2>
            <p>Nuestros servicios son respaldados por publicidad. Al usar nuestros servicios, reconoces y aceptas que:</p>
            <ul>
                <li>Mostramos anuncios en nuestro sitio web</li>
                <li>Utilizamos Google AdSense para mostrar anuncios</li>
                <li>Los anuncios pueden ser personalizados según tu historial de navegación</li>
                <li>Puedes ver anuncios antes de acceder a tu lectura</li>
            </ul>
            
            <h2>8. Descargos y Limitaciones</h2>
            
            <h3>8.1 Propósito de Entretenimiento</h3>
            <p>LAS LECTURAS DE UN MOMENTO EN EL TIEMPO SE PROPORCIONAN SOLO CON FINES DE ENTRETENIMIENTO. LA ASTROLOGÍA Y LA NUMEROLOGÍA NO SON MÉTODOS CIENTÍFICAMENTE PROBADOS PARA PREDECIR EL FUTURO O DESCRIBIR RASGOS DE PERSONALIDAD.</p>
            
            <h3>8.2 Sin Asesoramiento Profesional</h3>
            <p>Nuestras lecturas no constituyen:</p>
            <ul>
                <li>Asesoramiento médico, psicológico o psiquiátrico</li>
                <li>Asesoramiento legal o financiero</li>
                <li>Orientación profesional o de relaciones</li>
                <li>Ninguna forma de consulta profesional</li>
            </ul>
            <p>Siempre consulta a profesionales calificados para asesoramiento sobre decisiones importantes de la vida.</p>
            
            <h3>8.3 Precisión No Garantizada</h3>
            <p>Aunque nos esforzamos por la precisión en nuestros cálculos e interpretaciones:</p>
            <ul>
                <li>No garantizamos la precisión de ninguna lectura</li>
                <li>Las lecturas se basan en principios generales astrológicos y numerológicos</li>
                <li>Las experiencias individuales pueden variar</li>
            </ul>
            
            <h3>8.4 Disponibilidad del Servicio</h3>
            <p>No garantizamos que nuestros servicios:</p>
            <ul>
                <li>Estén disponibles en todo momento</li>
                <li>Estén libres de errores o interrupciones</li>
                <li>Cumplan con tus requisitos específicos</li>
            </ul>
            
            <h2>9. Limitación de Responsabilidad</h2>
            <p>En la máxima medida permitida por la ley:</p>
            <ul>
                <li>No seremos responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo</li>
                <li>Nuestra responsabilidad total no excederá la cantidad que nos hayas pagado (que es $0 para nuestros servicios gratuitos)</li>
                <li>No somos responsables de las decisiones que tomes basándote en nuestras lecturas</li>
                <li>No somos responsables de ninguna pérdida o daño derivado de tu uso de nuestros servicios</li>
            </ul>
            
            <h2>10. Indemnización</h2>
            <p>Aceptas indemnizar y mantener indemne a Un Momento en el Tiempo, sus propietarios y afiliados de cualquier reclamación, daños, pérdidas o gastos (incluyendo honorarios legales) derivados de:</p>
            <ul>
                <li>Tu uso de nuestros servicios</li>
                <li>Tu violación de estos Términos</li>
                <li>Tu violación de los derechos de terceros</li>
                <li>Cualquier contenido que envíes o compartas</li>
            </ul>
            
            <h2>11. Modificaciones de los Términos</h2>
            <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Tu uso continuado de nuestros servicios después de los cambios constituye la aceptación de los Términos modificados.</p>
            
            <h2>12. Terminación</h2>
            <p>Podemos terminar o suspender tu acceso a nuestros servicios en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo:</p>
            <ul>
                <li>Violación de estos Términos</li>
                <li>Comportamiento fraudulento o abusivo</li>
                <li>Preocupaciones técnicas o de seguridad</li>
            </ul>
            <p>Tras la terminación, todas las licencias otorgadas cesarán inmediatamente.</p>
            
            <h2>13. Ley Aplicable</h2>
            <p>Estos Términos se rigen por las leyes de Victoria, Australia, y las partes se someten a la jurisdicción exclusiva de los tribunales de Victoria y la Mancomunidad de Australia.</p>

            <h2>13A. Ley del Consumidor Australiano</h2>
            <p>Nada en estos Términos excluye, restringe o modifica cualquier garantía, derecho o recurso del consumidor que puedas tener bajo la Ley del Consumidor Australiano u otras leyes aplicables que no puedan ser excluidas.</p>
            
            <h2>14. Resolución de Disputas</h2>
            <p>Te animamos a contactarnos primero para intentar resolver cualquier disputa de manera informal. Si una disputa no puede resolverse, puede ser presentada ante los tribunales descritos en la sección de Ley Aplicable.</p>
            
            <h2>15. Divisibilidad</h2>
            <p>Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha disposición se limitará o eliminará en la medida mínima necesaria, y las disposiciones restantes permanecerán en pleno vigor y efecto.</p>
            
            <h2>16. Acuerdo Completo</h2>
            <p>Estos Términos constituyen el acuerdo completo entre tú y Un Momento en el Tiempo con respecto a tu uso de nuestros servicios, reemplazando cualquier acuerdo o entendimiento previo.</p>
            
            <h2>17. Información de Contacto</h2>
            <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos:</p>
            <ul>
                <li><strong>Sitio Web:</strong> <a href="https://quantummerlin.com">quantummerlin.com</a></li>
                <li><strong>Contacto:</strong> <a href="https://quantummerlin.com/contact.html" target="_blank">Página de contacto</a></li>
                <li><strong>Ubicación:</strong> Melbourne, Victoria, Australia</li>
            </ul>
            
            <h2>18. Reconocimiento</h2>
            <p>AL UTILIZAR UN MOMENTO EN EL TIEMPO, RECONOCES QUE HAS LEÍDO, COMPRENDIDO Y ACEPTAS ESTAR SUJETO A ESTOS TÉRMINOS DE SERVICIO.</p>
        </div>
        
        <div style="text-align: center;">
            <a href="/amomentintime/esp/" class="back-link">&larr; Volver a Un Momento en el Tiempo</a>
        </div>
    </div>
    
    <footer class="footer">
        <p>&copy; 2026 Un Momento en el Tiempo por Quantum Merlin. Todos los derechos reservados.</p>
        <p style="margin-top: 10px;">
            <a href="/amomentintime/esp/about.html">Acerca de</a> &bull; 
            <a href="/amomentintime/esp/privacy.html">Política de Privacidad</a> &bull; 
            <a href="/amomentintime/esp/terms.html">Términos de Servicio</a> &bull; 
            <a href="/amomentintime/esp/disclaimer.html">Descargo de Responsabilidad</a>
        </p>
    </footer>
</body>
</html>
'''

# ============================================================
# DISCLAIMER.HTML - Full Spanish translation
# ============================================================
DISCLAIMER_HTML = '''<!DOCTYPE html>
<html lang="es">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descargo de Responsabilidad | Un Momento en el Tiempo – Quantum Merlin</title>
    <meta name="description" content="Descargo de responsabilidad para las lecturas cósmicas de Un Momento en el Tiempo. Entendiendo la naturaleza del entretenimiento de las lecturas astrológicas y numerológicas.">
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VW4LGE7L1T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VW4LGE7L1T');
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #D8B5FF;
            --secondary: #B19CD9;
            --background: #F8F0FF;
            --card-bg: #ffffff;
            --text: #333333;
            --font-heading: 'Playfair Display', Georgia, serif;
            --font-body: 'Inter', 'Segoe UI', sans-serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-body);
            background: var(--background);
            color: var(--text);
            line-height: 1.8;
            min-height: 100vh;
        }
        .header {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, #FF69B4 0%, #D8B5FF 50%, #6BA3D6 100%);
        }
        .header h1 {
            font-family: var(--font-heading);
            font-size: 2.5rem;
            color: #1a0a2e;
            margin-bottom: 10px;
        }
        .header p { color: #3d2b5e; font-size: 1.1rem; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .content-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            margin-bottom: 30px;
        }
        h2 {
            font-family: var(--font-heading);
            color: #4b2a6f;
            font-size: 1.6rem;
            margin: 30px 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(216,181,255,0.3);
        }
        h2:first-child { margin-top: 0; }
        h3 {
            font-family: var(--font-heading);
            color: #5b3a86;
            font-size: 1.2rem;
            margin: 25px 0 10px;
        }
        p { margin-bottom: 15px; }
        ul, ol { margin: 15px 0 15px 25px; }
        li { margin-bottom: 8px; }
        a { color: var(--primary); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .last-updated { text-align: center; color: #888; font-style: italic; margin-bottom: 30px; }
        .notice-box {
            background: linear-gradient(135deg, rgba(255,105,180,0.1), rgba(107,163,214,0.1));
            border: 2px solid rgba(216,181,255,0.4);
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
        }
        .notice-box h3 {
            color: #FF69B4;
            margin-top: 0;
        }
        .back-link {
            display: inline-block; margin-top: 30px; padding: 12px 30px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white; text-decoration: none; border-radius: 25px; font-weight: 600;
            transition: transform 0.3s ease;
        }
        .back-link:hover { transform: translateY(-2px); text-decoration: none; }
        .footer { text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.5); margin-top: 40px; }
        .footer p { color: #888; font-size: 0.9rem; }
        @media (max-width: 600px) {
            .header h1 { font-size: 1.8rem; }
            .content-card { padding: 25px; }
            h2 { font-size: 1.3rem; }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Descargo de Responsabilidad</h1>
        <p>Un Momento en el Tiempo - Información Importante</p>
    </header>
    
    <div class="container">
        <p class="last-updated">Última Actualización: 30 de enero de 2026</p>
        
        <div class="content-card">
            <div class="notice-box">
                <h3>⚠️ Aviso Importante</h3>
                <p>Un Momento en el Tiempo es un servicio de entretenimiento. Nuestras lecturas astrológicas y numerológicas son solo para fines de entretenimiento y reflexión personal. No deben ser consideradas como asesoramiento profesional de ningún tipo.</p>
            </div>
            
            <h2>1. Naturaleza de Nuestros Servicios</h2>
            
            <h3>1.1 Lo Que Son</h3>
            <p>Un Momento en el Tiempo proporciona lecturas cósmicas generadas por computadora basadas en:</p>
            <ul>
                <li>Cálculos y posiciones astrológicas</li>
                <li>Principios numerológicos</li>
                <li>Astrología del zodiaco chino</li>
                <li>Correspondencias con casas astrológicas</li>
            </ul>
            
            <h3>1.2 Lo Que No Son</h3>
            <p>Nuestras lecturas NO son:</p>
            <ul>
                <li>Predicciones científicamente validadas</li>
                <li>Diagnósticos médicos, psicológicos o psiquiátricos</li>
                <li>Asesoramiento financiero, legal o profesional</li>
                <li>Substituto de orientación profesional</li>
                <li>Declaraciones de hechos o verdades absolutas</li>
            </ul>
            
            <h2>2. Sin Garantías</h2>
            <p>No hacemos garantías, representaciones ni declaraciones de ningún tipo con respecto a:</p>
            <ul>
                <li>La precisión de cualquier lectura o interpretación</li>
                <li>La aplicabilidad de cualquier lectura a tu situación específica</li>
                <li>Los resultados de decisiones tomadas basándose en nuestras lecturas</li>
                <li>La integridad o corrección de los cálculos astrológicos</li>
                <li>Cualquier resultado o beneficio específico del uso de nuestros servicios</li>
            </ul>
            
            <h2>3. Astrología y Numerología: Entendiendo el Contexto</h2>
            
            <h3>3.1 Contexto Histórico y Cultural</h3>
            <p>La astrología y la numerología son prácticas antiguas con ricas historias que abarcan múltiples culturas:</p>
            <ul>
                <li>La astrología se ha practicado durante más de 4,000 años en civilizaciones babilónicas, egipcias, griegas, chinas e indias</li>
                <li>La numerología tiene raíces en el antiguo Egipto, Grecia, China y tradiciones hebreas</li>
                <li>Estas prácticas son parte del patrimonio cultural y la tradición narrativa de la humanidad</li>
                <li>Reflejan la fascinación perdurable de la humanidad con el cosmos y la búsqueda de significado</li>
            </ul>
            
            <h3>3.2 Perspectiva Científica</h3>
            <p>Reconocemos la perspectiva científica:</p>
            <ul>
                <li>La ciencia moderna no reconoce la astrología ni la numerología como métodos empíricamente válidos</li>
                <li>No existe evidencia científica que respalde la influencia de las posiciones celestiales en la personalidad o el destino humano</li>
                <li>El efecto Barnum (tendencia a aceptar descripciones vagas de personalidad como precisas) puede explicar por qué las lecturas pueden sentirse personalmente relevantes</li>
                <li>El sesgo de confirmación puede llevar a las personas a recordar predicciones que parecen precisas mientras olvidan las inexactas</li>
            </ul>
            
            <h3>3.3 Valor Psicológico</h3>
            <p>A pesar de la falta de validación científica, muchas personas encuentran valor en estas prácticas:</p>
            <ul>
                <li>Pueden proporcionar marcos para la autorreflexión</li>
                <li>Pueden ayudar a las personas a considerar diferentes perspectivas sobre sus vidas</li>
                <li>Pueden servir como punto de partida para conversaciones significativas</li>
                <li>El lenguaje simbólico puede resonar con experiencias personales</li>
            </ul>
            
            <h2>4. Descargo de Asesoramiento Profesional</h2>
            
            <h3>4.1 Salud Médica y Mental</h3>
            <p>Nuestras lecturas NO son:</p>
            <ul>
                <li>Un diagnóstico de ninguna condición de salud física o mental</li>
                <li>Un plan de tratamiento para ningún problema médico o psicológico</li>
                <li>Un sustituto de la consulta con un proveedor de atención médica licenciado</li>
                <li>Un reemplazo de terapia, consejería o atención psiquiátrica</li>
            </ul>
            <p><strong>Si estás experimentando una emergencia médica o de salud mental, por favor contacta a los servicios de emergencia o ve a la sala de emergencias más cercana inmediatamente.</strong></p>
            
            <h3>4.2 Asuntos Legales</h3>
            <p>Nuestras lecturas NO son:</p>
            <ul>
                <li>Asesoramiento legal de ningún tipo</li>
                <li>Un sustituto de la consulta con un abogado calificado</li>
                <li>Orientación sobre contratos, disputas o decisiones legales</li>
            </ul>
            <p><strong>Para asuntos legales, siempre consulta con un abogado licenciado en tu jurisdicción.</strong></p>
            
            <h3>4.3 Decisiones Financieras</h3>
            <p>Nuestras lecturas NO son:</p>
            <ul>
                <li>Asesoramiento de inversión</li>
                <li>Orientación de planificación financiera</li>
                <li>Asesoramiento fiscal</li>
                <li>Un sustituto de la consulta con un asesor financiero calificado</li>
            </ul>
            <p><strong>Para decisiones financieras, consulta con un planificador o asesor financiero certificado.</strong></p>
            
            <h3>4.4 Decisiones Importantes de la Vida</h3>
            <p>Recomendamos encarecidamente consultar a profesionales apropiados antes de tomar decisiones importantes de la vida, incluyendo pero no limitado a:</p>
            <ul>
                <li>Matrimonio o divorcio</li>
                <li>Cambios de carrera</li>
                <li>Reubicación o mudanza</li>
                <li>Compras o inversiones importantes</li>
                <li>Elecciones educativas</li>
                <li>Decisiones relacionadas con la salud</li>
            </ul>
            
            <h2>5. Responsabilidad del Usuario</h2>
            <p>Al usar Un Momento en el Tiempo, reconoces y aceptas que:</p>
            <ul>
                <li>Estás usando nuestros servicios voluntariamente y a tu propia discreción</li>
                <li>Entiendes que las lecturas son para fines de entretenimiento</li>
                <li>No tomarás decisiones importantes de la vida basándote únicamente en nuestras lecturas</li>
                <li>Buscarás asesoramiento profesional apropiado para asuntos que requieran experiencia</li>
                <li>Aceptas toda la responsabilidad por cualquier acción que tomes basándote en nuestras lecturas</li>
            </ul>
            
            <h2>6. Precisión de la Información</h2>
            
            <h3>6.1 Precisión de los Datos de Nacimiento</h3>
            <p>La precisión de tu lectura depende de la precisión de la información que proporcionas:</p>
            <ul>
                <li>La fecha de nacimiento debe ser precisa para cálculos correctos del signo solar y la numerología</li>
                <li>La hora de nacimiento afecta la precisión del signo ascendente</li>
                <li>El lugar de nacimiento puede influir en ciertos cálculos astrológicos</li>
            </ul>
            <p>No somos responsables de lecturas inexactas que resulten de información incorrecta proporcionada por los usuarios.</p>
            
            <h3>6.2 Sistemas Astrológicos</h3>
            <p>Diferentes sistemas astrológicos pueden producir resultados diferentes:</p>
            <ul>
                <li>La astrología occidental usa el zodíaco tropical</li>
                <li>La astrología sideral usa diferentes límites de signos</li>
                <li>La astrología china usa un sistema completamente diferente</li>
                <li>Usamos principalmente la astrología tropical occidental con algunos elementos del zodíaco chino</li>
            </ul>
            
            <h2>7. Enlaces Externos y Terceros</h2>
            <p>Nuestro sitio web puede contener enlaces a sitios web de terceros, incluyendo:</p>
            <ul>
                <li>Buy Me a Coffee (para apoyo voluntario)</li>
                <li>Anuncios de Google AdSense</li>
                <li>Opciones de compartir en redes sociales</li>
            </ul>
            <p>No somos responsables del contenido, las prácticas de privacidad ni los términos de servicio de sitios web de terceros. Tus interacciones con terceros son únicamente entre tú y el tercero.</p>
            
            <h2>8. Cambios en Este Descargo</h2>
            <p>Podemos actualizar este Descargo de Responsabilidad de vez en cuando para reflejar cambios en nuestros servicios o requisitos legales. Los cambios serán efectivos inmediatamente después de su publicación. Te animamos a revisar este Descargo periódicamente.</p>
            
            <h2>9. Contáctanos</h2>
            <p>Si tienes alguna pregunta sobre este Descargo de Responsabilidad o nuestros servicios, por favor contáctanos:</p>
            <ul>
                <li><strong>Sitio Web:</strong> <a href="https://quantummerlin.com">quantummerlin.com</a></li>
                <li><strong>Contacto:</strong> <a href="https://quantummerlin.com/contact.html" target="_blank">Página de contacto</a></li>
                <li><strong>Ubicación:</strong> Melbourne, Victoria, Australia</li>
            </ul>
            
            <h2>10. Aceptación</h2>
            <p>AL UTILIZAR UN MOMENTO EN EL TIEMPO, RECONOCES QUE HAS LEÍDO, COMPRENDIDO Y ACEPTAS ESTE DESCARGO DE RESPONSABILIDAD EN SU TOTALIDAD. SI NO ESTÁS DE ACUERDO CON ALGUNA PARTE DE ESTE DESCARGO, POR FAVOR NO UTILICES NUESTROS SERVICIOS.</p>
            
            <div class="notice-box" style="margin-top: 30px;">
                <h3>Recuerda</h3>
                <p>El poder de dar forma a tu vida reside dentro de ti. Nuestras lecturas son simplemente una de muchas herramientas para la reflexión y el autodescubrimiento. Confía en tu propio juicio, busca orientación profesional cuando sea necesario y siempre toma decisiones que se sientan correctas para ti.</p>
            </div>
        </div>
        
        <div style="text-align: center;">
            <a href="/amomentintime/esp/" class="back-link">&larr; Volver a Un Momento en el Tiempo</a>
        </div>
    </div>
    
    <footer class="footer">
        <p>&copy; 2026 Un Momento en el Tiempo por Quantum Merlin. Todos los derechos reservados.</p>
        <p style="margin-top: 10px;">
            <a href="/amomentintime/esp/about.html">Acerca de</a> &bull; 
            <a href="/amomentintime/esp/privacy.html">Política de Privacidad</a> &bull; 
            <a href="/amomentintime/esp/terms.html">Términos de Servicio</a> &bull; 
            <a href="/amomentintime/esp/disclaimer.html">Descargo de Responsabilidad</a>
        </p>
    </footer>
</body>
</html>
'''

# ============================================================
# TONE-VARIATIONS.JS - Full Spanish translation
# ============================================================
TONE_VARIATIONS_JS = '''// ============================================
// SISTEMA DE VARIACIONES DE TONO
// ============================================
// Aplica variaciones sutiles de lenguaje según el modo de color:
// - Rosa: Tono ligeramente femenino/acogedor
// - Azul: Tono ligeramente masculino/orientado a la acción
// - Púrpura (predeterminado): Tono neutro/equilibrado
// ============================================

/**
 * Sustituciones de palabras según el tono
 * Formato: { neutro: { femenino: "palabra", masculino: "palabra", neutro: "palabra" } }
 */
var TONE_SUBSTITUTIONS = {
    // Pronombres y referencias
    "Este individuo": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "este individuo": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Esta alma": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "esta alma": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Tienen": { feminine: "Ella tiene", masculine: "Él tiene", neutral: "Tienen" },
    "tienen": { feminine: "ella tiene", masculine: "él tiene", neutral: "tienen" },
    "Son": { feminine: "Ella es", masculine: "Él es", neutral: "Son" },
    "son": { feminine: "ella es", masculine: "él es", neutral: "son" },
    "Su ": { feminine: "Su ", masculine: "Su ", neutral: "Su " },
    "su ": { feminine: "su ", masculine: "su ", neutral: "su " },
    "sí mismos": { feminine: "sí misma", masculine: "sí mismo", neutral: "sí mismos" },
    
    // Ajustes descriptivos
    "fuerza": { feminine: "fuerza interior", masculine: "fuerza", neutral: "fuerza" },
    "poderoso": { feminine: "profundamente poderosa", masculine: "poderoso", neutral: "poderoso" },
    "poderosa": { feminine: "profundamente poderosa", masculine: "poderoso", neutral: "poderosa" },
    "valentía": { feminine: "valentía silenciosa", masculine: "valentía audaz", neutral: "valentía" },
    "guerrero": { feminine: "espíritu guerrero", masculine: "guerrero", neutral: "guerrero" },
    "guerrera": { feminine: "espíritu guerrero", masculine: "guerrero", neutral: "guerrera" },
    "gentil": { feminine: "gentil", masculine: "silenciosamente fuerte", neutral: "gentil" },
    "sensible": { feminine: "sensible", masculine: "perceptivo", neutral: "sensible" },
    "protector": { feminine: "protectora", masculine: "protector", neutral: "protector" },
    "protectora": { feminine: "protectora", masculine: "protector", neutral: "protectora" },
    "ambicioso": { feminine: "silenciosamente ambiciosa", masculine: "ambicioso", neutral: "ambicioso" },
    "ambiciosa": { feminine: "silenciosamente ambiciosa", masculine: "ambicioso", neutral: "ambiciosa" },
    "determinado": { feminine: "con propósito determinado", masculine: "determinado", neutral: "determinado" },
    "determinada": { feminine: "con propósito determinado", masculine: "determinado", neutral: "determinada" },
    "líder": { feminine: "líder y guía", masculine: "líder", neutral: "líder" },
    "luchador": { feminine: "defensora", masculine: "luchador", neutral: "campeón" },
    "luchadora": { feminine: "defensora", masculine: "luchador", neutral: "campeona" },
    "conquistar": { feminine: "superar", masculine: "conquistar", neutral: "superar" },
    "dominar": { feminine: "sobresalir en", masculine: "dominar", neutral: "dominar" },
    "agresivo": { feminine: "asertiva", masculine: "agresivo", neutral: "asertivo" },
    "agresiva": { feminine: "asertiva", masculine: "agresivo", neutral: "asertiva" },
    "tierno": { feminine: "tierna", masculine: "reflexivo", neutral: "cariñoso" },
    "tierna": { feminine: "tierna", masculine: "reflexivo", neutral: "cariñosa" },
    "intuición": { feminine: "intuición", masculine: "instinto", neutral: "intuición" },
    "emocional": { feminine: "emocionalmente sintonizada", masculine: "emocionalmente inteligente", neutral: "emocionalmente consciente" },
    "sentimientos": { feminine: "sentimientos", masculine: "mundo interior", neutral: "emociones" },
    "corazón": { feminine: "corazón", masculine: "esencia", neutral: "corazón" }
};

/**
 * Sustituciones a nivel de frase para una lectura más natural
 */
var PHRASE_SUBSTITUTIONS = {
    "destinado a liderar": { feminine: "destinada a inspirar y liderar", masculine: "destinado a liderar", neutral: "destinado a guiar" },
    "destinada a liderar": { feminine: "destinada a inspirar y liderar", masculine: "destinado a liderar", neutral: "destinada a guiar" },
    "nacido para luchar": { feminine: "nacida para defender", masculine: "nacido para luchar", neutral: "nacido para ser campeón" },
    "nacida para luchar": { feminine: "nacida para defender", masculine: "nacido para luchar", neutral: "nacida para ser campeona" },
    "líder nato": { feminine: "líder y protectora nata", masculine: "líder nato", neutral: "guía natural" },
    "líder nata": { feminine: "líder y protectora nata", masculine: "líder nato", neutral: "guía natural" },
    "conquistando desafíos": { feminine: "transformando desafíos", masculine: "conquistando desafíos", neutral: "superando desafíos" },
    "determinación feroz": { feminine: "determinación elegante", masculine: "determinación feroz", neutral: "determinación silenciosa" },
    "abrirse camino a la fuerza": { feminine: "navegar su camino", masculine: "abrirse camino a la fuerza", neutral: "encontrar su camino" },
    "presencia dominante": { feminine: "presencia imponente", masculine: "presencia dominante", neutral: "presencia notable" },
    "enfoque agresivo": { feminine: "enfoque asertivo", masculine: "enfoque agresivo", neutral: "enfoque directo" }
};

/**
 * Obtener el tono actual según el modo de color
 * @returns {string} 'feminine', 'masculine', o 'neutral'
 */
function getCurrentTone() {
    if (document.body.classList.contains('color-mode-pink')) {
        return 'feminine';
    } else if (document.body.classList.contains('color-mode-blue')) {
        return 'masculine';
    }
    return 'neutral'; // Púrpura/predeterminado
}

/**
 * Aplicar variaciones de tono al texto de la lectura
 * @param {string} text - El texto original de la lectura
 * @returns {string} - Texto con variaciones de tono aplicadas
 */
function applyToneVariations(text) {
    if (!text) return text;
    
    const tone = getCurrentTone();
    let result = text;
    
    // Aplicar sustituciones de frases primero (patrones más largos primero)
    for (const [original, replacements] of Object.entries(PHRASE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        const regex = new RegExp(original, 'gi');
        result = result.replace(regex, (match) => {
            // Preservar mayúsculas originales
            if (match[0] === match[0].toUpperCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
        });
    }
    
    // Aplicar sustituciones de palabras
    for (const [original, replacements] of Object.entries(TONE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        // Usar coincidencia de límites de palabra para palabras individuales
        const regex = new RegExp(`\\\\b${original}\\\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    
    return result;
}

/**
 * Conectar a la visualización de lecturas para aplicar variaciones de tono
 * Esto envuelve la función original createReadingCard si existe
 */
function initToneVariations() {
    // Verificar si existe la función original
    if (typeof window.originalCreateReadingCard === 'undefined' && typeof createReadingCard !== 'undefined') {
        window.originalCreateReadingCard = createReadingCard;
        
        // Sobrescribir con versión consciente del tono
        window.createReadingCard = function(title, subtitle, keywords, content, strengths, challenges) {
            // Aplicar variaciones de tono al contenido
            const tonedContent = applyToneVariations(content);
            const tonedStrengths = Array.isArray(strengths) ? strengths.map(applyToneVariations) : strengths;
            const tonedChallenges = Array.isArray(challenges) ? challenges.map(applyToneVariations) : challenges;
            
            // Llamar a la función original con contenido modificado
            return window.originalCreateReadingCard(title, subtitle, keywords, tonedContent, tonedStrengths, tonedChallenges);
        };
    }
}

/**
 * Re-aplicar tono cuando cambia el modo de color
 */
function onColorModeChange() {
    // Si las lecturas ya se muestran, podríamos actualizarlas
    // Por ahora, el tono se aplica en el momento de la generación
    // Futuro: Podría agregar re-renderizado en vivo de las lecturas
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToneVariations);
} else {
    initToneVariations();
}

// Exportar para uso
window.applyToneVariations = applyToneVariations;
window.getCurrentTone = getCurrentTone;
'''

# ============================================================
# SW.JS - Service Worker with corrected paths
# ============================================================
SW_JS = '''// Un Momento en el Tiempo - Service Worker
const CACHE_NAME = 'momento-en-el-tiempo-v35';
const ASSETS_TO_CACHE = [
    '/amomentintime/esp/',
    '/amomentintime/esp/index.html',
    '/amomentintime/esp/view.html',
    '/amomentintime/esp/config.js',
    '/amomentintime/esp/calculations.js',
    '/amomentintime/esp/readings.js',
    '/amomentintime/esp/house-readings.js',
    '/amomentintime/esp/aspect-readings.js',
    '/amomentintime/esp/advanced-readings.js',
    '/amomentintime/esp/love-blueprint.js',
    '/amomentintime/esp/tone-variations.js',
    '/amomentintime/esp/save-share.js',
    '/amomentintime/esp/manifest.json',
    '/amomentintime/esp/Amomentintime.jpg'
];

// Caché para lecturas compartidas (almacenadas por separado para acceso sin conexión)
const READINGS_CACHE = 'momento-lecturas-v1';

// Evento de instalación - almacenar activos en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Almacenando activos de Un Momento en el Tiempo en caché');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Evento de activación - limpiar TODAS las cachés antiguas agresivamente
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== READINGS_CACHE)
                    .map((name) => {
                        console.log('Eliminando caché antigua:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('Service worker activado, reclamando clientes');
            return self.clients.claim();
        })
    );
});

// Evento de fetch - servir desde caché, recurrir a la red
self.addEventListener('fetch', (event) => {
    // Omitir solicitudes que no sean GET
    if (event.request.method !== 'GET') return;
    
    // Omitir solicitudes externas
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    const url = new URL(event.request.url);
    
    // Manejo especial para llamadas API de datos de lectura
    if (url.pathname.includes('/api/get-reading')) {
        event.respondWith(handleReadingApiRequest(event.request));
        return;
    }
    
    // Manejo especial para páginas de lecturas compartidas /amomentintime/esp/r/*
    if (url.pathname.match(/\\/amomentintime\\/esp\\/r\\//)) {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match('/amomentintime/esp/view.html'))
        );
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Devolver versión en caché
                    return cachedResponse;
                }
                
                // Obtener de la red
                return fetch(event.request)
                    .then((response) => {
                        // No almacenar en caché respuestas no exitosas
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        // Clonar y almacenar la respuesta en caché
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Respaldo sin conexión para páginas HTML
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/amomentintime/esp/index.html');
                        }
                    });
            })
    );
});

// Manejar solicitudes API de lectura con caché para soporte sin conexión
async function handleReadingApiRequest(request) {
    const cache = await caches.open(READINGS_CACHE);
    
    try {
        // Intentar obtener de la red primero
        const response = await fetch(request);
        
        if (response.ok) {
            // Clonar y almacenar la respuesta exitosa en caché
            const responseToCache = response.clone();
            await cache.put(request, responseToCache);
        }
        
        return response;
    } catch (error) {
        // Red fallida, intentar caché
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // No hay caché disponible
        return new Response(JSON.stringify({
            error: 'Sin conexión',
            message: 'Esta lectura no está disponible sin conexión. Por favor conecta a internet.'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
'''

# ============================================================
# REBRAND.JS - Spanish translation
# ============================================================
REBRAND_JS = '''// ============================================
// SCRIPT DE CAMBIO DE MARCA RÁPIDO
// ============================================
// Ejecuta esto en Node.js para cambiar de marca:
// node rebrand.js baby
// node rebrand.js kpop
// node rebrand.js stranger
// ============================================

const fs = require('fs');
const path = require('path');

const brands = {
    baby: 'config-baby.js',
    kpop: 'config-kpop.js',
    stranger: 'config-stranger.js'
};

const selectedBrand = process.argv[2];

if (!selectedBrand || !brands[selectedBrand]) {
    console.log('');
    console.log('🎨 SISTEMA DE LECTURA DEFINITIVO - HERRAMIENTA DE CAMBIO DE MARCA');
    console.log('==================================================================');
    console.log('');
    console.log('Uso: node rebrand.js [marca]');
    console.log('');
    console.log('Marcas disponibles:');
    console.log('  baby     - Plano Cósmico del Bebé (lecturas de recién nacidos)');
    console.log('  kpop     - K-pop Kósmico (lecturas del destino de ídolos)');
    console.log('  stranger - Patrones Extraños (tema de Stranger Things)');
    console.log('');
    console.log('Ejemplo: node rebrand.js baby');
    console.log('');
    process.exit(1);
}

const sourceFile = path.join(__dirname, brands[selectedBrand]);
const targetFile = path.join(__dirname, 'config.js');

try {
    const content = fs.readFileSync(sourceFile, 'utf8');
    fs.writeFileSync(targetFile, content);
    
    console.log('');
    console.log('✅ ¡CAMBIO DE MARCA EXITOSO!');
    console.log('============================');
    console.log(`Marca: ${selectedBrand.toUpperCase()}`);
    console.log(`Configuración: ${brands[selectedBrand]} → config.js`);
    console.log('');
    console.log('Abre index.html en tu navegador para ver los cambios.');
    console.log('');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
'''

# ============================================================
# Write all files
# ============================================================
def write_file(filename, content):
    filepath = os.path.join(ESP_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✅ {filename} traducido")

def main():
    print("\n🌐 TRADUCCIÓN AL ESPAÑOL - Archivos HTML y Utilidades")
    print("=" * 55)
    
    # Write HTML files
    write_file('about.html', ABOUT_HTML)
    write_file('privacy.html', PRIVACY_HTML)
    write_file('terms.html', TERMS_HTML)
    write_file('disclaimer.html', DISCLAIMER_HTML)
    
    # Write utility JS files
    write_file('tone-variations.js', TONE_VARIATIONS_JS)
    write_file('sw.js', SW_JS)
    write_file('rebrand.js', REBRAND_JS)
    
    print(f"\n✅ ¡7 archivos traducidos exitosamente!")

if __name__ == '__main__':
    main()
