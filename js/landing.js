// ============================================================================
// MPN — Freestyle landing page: languages (EN default, DE, FR, ES, IT) and packages
// Language is chosen in this order: ?lang=xx  >  the visitor's saved choice  >
// the browser/device language  >  English. The selector in the header always overrides it.
// ============================================================================
(function () {
  'use strict';

  const LANGS = ['en', 'de', 'fr', 'es', 'it'];
  const STORE = 'mpnLang';

  /* ------------------------------------------------------------------ text */
  const T = {
    en: {
      'meta.title': 'Spanish or Italian? Online lessons with native tutors | MPN',
      'meta.desc': 'Live online Spanish and Italian lessons with native tutors, one-to-one or in small groups. Choose a Freestyle package and start learning.',
      'nav.cta': 'Discover packages', 'nav.lang': 'Language',
      'hero.l1': 'Spanish', 'hero.l2': 'or Italian?',
      'hero.p': 'Spanish and Italian lessons with native tutors, shaped around your goals and your pace. Learn the language the way it’s actually spoken.',
      'hero.cta': 'Discover packages',
      'intro.badge': 'Freestyle lessons',
      'intro.h': 'Lessons built around <em>you</em>',
      'intro.p': 'MPN — Making People Native is an online tutoring service for Italian and Spanish. In Freestyle lessons, your native tutor shapes every session around your goal: conversation, travel, work, study, moving abroad or simply the pleasure of learning.',
      'intro.f1t': 'Native tutors', 'intro.f1p': 'Every tutor is a native speaker of the language they teach.',
      'intro.f2t': 'Live online lessons', 'intro.f2p': '60-minute lessons by video, from wherever you are.',
      'intro.f3t': 'One-to-one or small groups', 'intro.f3p': 'Learn on your own, or in groups of 3–5 students matched by level and goals.',
      'lang.it': 'Italian', 'lang.es': 'Spanish',
      'pk.badge': 'Freestyle packages',
      'pk.h': 'Choose the package <em>that fits you</em>',
      'pk.sub': 'One token equals one 60-minute lesson. Pick a package, then choose 2 or 3 lessons a week.',
      'pk.format': 'Lesson format', 'pk.one': 'One-to-one', 'pk.group': 'Group',
      'pk.onenote': 'One lesson at a time, just you and your tutor.',
      'pk.groupnote': 'Groups of 3–5 students, matched by level, goals and availability. Prices are per student.',
      'pk.weeks': '{n} weeks', 'pk.perlesson': '/ lesson', 'pk.perstudent': 'per student',
      'pk.lessons': '{n} lessons', 'pk.perweek': '{n} a week', 'pk.total': 'total',
      'pk.popular': 'Most popular', 'pk.choose': 'Choose this plan',
      'pk.tag.start': 'A first structured learning path',
      'pk.tag.progress': 'For consistency and measurable progress',
      'pk.tag.mastery': 'For long-term goals and maximum continuity',
      'pk.trialT': 'First trial lesson',
      'pk.trialP': '40 minutes, one-to-one, with a quick assessment of your level and a short note on your recommended path.',
      'pk.singleT': 'Single lesson', 'pk.singleP': '60 minutes, one-to-one, no package needed.',
      'pk.note': 'Prices in British pounds (GBP). Total = number of lessons × price per lesson. Group lessons are only available in packages. Unused tokens stay valid for 30 days after your plan ends.',
      'disc.h': 'See every plan <em>in detail</em>',
      'disc.p': 'Compare weekly frequency, what each package includes and how tokens work.',
      'next.h': 'Where to <em class="italic">next?</em>',
      'next.c1t': 'Explore lessons', 'next.c1p': 'See how every lesson works and what is included.',
      'next.c2t': 'How it works', 'next.c2p': 'From sign-up to your first lesson in four steps.',
      'next.c3t': 'Contact us', 'next.c3p': 'Questions? Write to our team and we will get back to you.',
      'next.go': 'Go',
      'faq.badge': 'FAQ', 'faq.h': 'Not sure <em>yet?</em>',
      'faq.q1': 'What is Freestyle?',
      'faq.a1': 'Freestyle is our personalised language service built around your own goal: conversation, travel, work, study, moving abroad or personal interest. It is available one-to-one or in groups of 3–5 students.',
      'faq.q2': 'How do tokens work?',
      'faq.a2': 'One token equals one lesson, whether you book a one-to-one lesson or a group session. Unused tokens stay valid for 30 days after your plan ends.',
      'faq.q3': 'Can I join a group on my own?',
      'faq.a3': 'Yes. You can sign up on your own and our team will help you find a suitable group, matched by level, goals and availability. Groups need at least 3 students to start and have a maximum of 5.',
      'faq.q4': 'How do you choose your tutors?',
      'faq.a4': 'We select tutors for their qualifications, experience, teaching skills and motivation, and for their passion for sharing their language and culture. All our language tutors are native speakers of the language they teach.',
      'faq.q5': 'Can I cancel or reschedule a lesson?',
      'faq.a5': 'Yes. You can cancel or reschedule a lesson free of charge with at least 24 hours’ notice, and the token is returned to you. With less notice, or if you miss a lesson, the token is used.',
      'faq.q6': 'How do payments work?',
      'faq.a6': 'You pay securely online in British pounds (GBP) through Stripe, so MPN never sees or stores your full card details. The available payment methods and the total you pay are shown at checkout before you confirm.',
      'faq.cta': 'For other questions',
      'ft.privacy': 'Privacy Policy', 'ft.terms': 'Terms of Use', 'ft.cookies': 'Cookie Policy',
      'ft.refund': 'Sales and Refund Policy', 'ft.legal': 'Legal Information', 'ft.access': 'Accessibility',
      'ft.rights': 'All rights reserved.', 'ft.note': ''
    },

    de: {
      'meta.title': 'Spanisch oder Italienisch? Online-Unterricht mit Muttersprachlern | MPN',
      'meta.desc': 'Live-Online-Unterricht in Spanisch und Italienisch mit muttersprachlichen Tutoren – einzeln oder in kleinen Gruppen. Wähle ein Freestyle-Paket und leg los.',
      'nav.cta': 'Pakete entdecken', 'nav.lang': 'Sprache',
      'hero.l1': 'Spanisch', 'hero.l2': 'oder Italienisch?',
      'hero.p': 'Spanisch- und Italienischunterricht mit muttersprachlichen Tutoren, zugeschnitten auf deine Ziele und dein Tempo. Lerne die Sprache so, wie sie wirklich gesprochen wird.',
      'hero.cta': 'Pakete entdecken',
      'intro.badge': 'Freestyle-Unterricht',
      'intro.h': 'Unterricht, der sich <em>nach dir</em> richtet',
      'intro.p': 'MPN — Making People Native bietet Online-Sprachunterricht für Italienisch und Spanisch. In den Freestyle-Stunden richtet dein muttersprachlicher Tutor jede Stunde nach deinem Ziel aus: Konversation, Reisen, Beruf, Studium, Umzug ins Ausland oder einfach Freude am Lernen.',
      'intro.f1t': 'Muttersprachliche Tutoren', 'intro.f1p': 'Jeder Tutor ist Muttersprachler der Sprache, die er unterrichtet.',
      'intro.f2t': 'Live-Unterricht online', 'intro.f2p': '60-minütige Stunden per Video – von überall aus.',
      'intro.f3t': 'Einzel- oder Kleingruppen', 'intro.f3p': 'Lerne allein oder in Gruppen mit 3–5 Lernenden, die nach Niveau und Zielen zusammengestellt werden.',
      'lang.it': 'Italienisch', 'lang.es': 'Spanisch',
      'pk.badge': 'Freestyle-Pakete',
      'pk.h': 'Wähle das Paket, <em>das zu dir passt</em>',
      'pk.sub': 'Ein Token entspricht einer 60-minütigen Stunde. Wähle ein Paket und dann 2 oder 3 Stunden pro Woche.',
      'pk.format': 'Unterrichtsform', 'pk.one': 'Einzelunterricht', 'pk.group': 'Gruppe',
      'pk.onenote': 'Eine Stunde nach der anderen – nur du und dein Tutor.',
      'pk.groupnote': 'Gruppen mit 3–5 Lernenden, zusammengestellt nach Niveau, Zielen und Verfügbarkeit. Preise gelten pro Person.',
      'pk.weeks': '{n} Wochen', 'pk.perlesson': '/ Stunde', 'pk.perstudent': 'pro Person',
      'pk.lessons': '{n} Stunden', 'pk.perweek': '{n} pro Woche', 'pk.total': 'gesamt',
      'pk.popular': 'Am beliebtesten', 'pk.choose': 'Dieses Paket wählen',
      'pk.tag.start': 'Ein erster strukturierter Lernweg',
      'pk.tag.progress': 'Für Kontinuität und messbare Fortschritte',
      'pk.tag.mastery': 'Für langfristige Ziele und maximale Kontinuität',
      'pk.trialT': 'Erste Probestunde',
      'pk.trialP': '40 Minuten, einzeln, mit kurzer Einstufung deines Niveaus und einer kurzen Notiz zum empfohlenen Lernweg.',
      'pk.singleT': 'Einzelstunde', 'pk.singleP': '60 Minuten, einzeln, ohne Paket.',
      'pk.note': 'Preise in britischen Pfund (GBP). Gesamtpreis = Anzahl der Stunden × Preis pro Stunde. Gruppenunterricht gibt es nur in Paketen. Nicht genutzte Token bleiben 30 Tage nach Ende deines Pakets gültig.',
      'disc.h': 'Alle Pakete <em>im Detail</em>',
      'disc.p': 'Vergleiche die Wochenfrequenz, die Inhalte der Pakete und die Funktionsweise der Token.',
      'next.h': 'Wie geht es <em class="italic">weiter?</em>',
      'next.c1t': 'Unterricht entdecken', 'next.c1p': 'So läuft jede Stunde ab und das ist enthalten.',
      'next.c2t': 'So funktioniert’s', 'next.c2p': 'Von der Anmeldung bis zur ersten Stunde in vier Schritten.',
      'next.c3t': 'Kontakt aufnehmen', 'next.c3p': 'Fragen? Schreib unserem Team – wir melden uns bei dir.',
      'next.go': 'Los',
      'faq.badge': 'FAQ', 'faq.h': 'Noch <em>unsicher?</em>',
      'faq.q1': 'Was ist Freestyle?',
      'faq.a1': 'Freestyle ist unser individuelles Sprachangebot, das sich nach deinem Ziel richtet: Konversation, Reisen, Beruf, Studium, Umzug ins Ausland oder persönliches Interesse. Es gibt es als Einzelunterricht oder in Gruppen mit 3–5 Lernenden.',
      'faq.q2': 'Wie funktionieren Token?',
      'faq.a2': 'Ein Token entspricht einer Stunde – egal ob Einzelstunde oder Gruppenstunde. Nicht genutzte Token bleiben 30 Tage nach Ende deines Pakets gültig.',
      'faq.q3': 'Kann ich allein einer Gruppe beitreten?',
      'faq.a3': 'Ja. Du kannst dich allein anmelden, und unser Team hilft dir, eine passende Gruppe zu finden – nach Niveau, Zielen und Verfügbarkeit. Eine Gruppe braucht mindestens 3 Teilnehmende, um zu starten, und hat höchstens 5.',
      'faq.q4': 'Wie wählt ihr eure Tutoren aus?',
      'faq.a4': 'Wir wählen Tutoren nach Qualifikation, Erfahrung, Lehrkompetenz und Motivation aus – und nach ihrer Leidenschaft, Sprache und Kultur weiterzugeben. Alle unsere Sprachtutoren sind Muttersprachler der Sprache, die sie unterrichten.',
      'faq.q5': 'Kann ich eine Stunde absagen oder verschieben?',
      'faq.a5': 'Ja. Mit mindestens 24 Stunden Vorlauf kannst du eine Stunde kostenlos absagen oder verschieben, und der Token wird dir gutgeschrieben. Bei kürzerer Frist oder wenn du nicht erscheinst, wird der Token verbraucht.',
      'faq.q6': 'Wie funktioniert die Zahlung?',
      'faq.a6': 'Du zahlst sicher online in britischen Pfund (GBP) über Stripe – MPN sieht oder speichert deine vollständigen Kartendaten nie. Die verfügbaren Zahlungsmethoden und der Gesamtbetrag werden vor der Bestätigung im Checkout angezeigt.',
      'faq.cta': 'Für weitere Fragen',
      'ft.privacy': 'Datenschutzerklärung', 'ft.terms': 'Nutzungsbedingungen', 'ft.cookies': 'Cookie-Richtlinie',
      'ft.refund': 'Verkaufs- und Rückerstattungsbedingungen', 'ft.legal': 'Rechtliche Hinweise', 'ft.access': 'Barrierefreiheit',
      'ft.rights': 'Alle Rechte vorbehalten.',
      'ft.note': 'Die verlinkten Seiten und die Plattform sind derzeit nur auf Englisch verfügbar.'
    },

    fr: {
      'meta.title': 'Espagnol ou italien ? Cours en ligne avec des tuteurs natifs | MPN',
      'meta.desc': 'Cours d’espagnol et d’italien en direct avec des tuteurs natifs, en individuel ou en petit groupe. Choisissez un forfait Freestyle et commencez.',
      'nav.cta': 'Découvrir les forfaits', 'nav.lang': 'Langue',
      'hero.l1': 'Espagnol', 'hero.l2': 'ou italien ?',
      'hero.p': 'Des cours d’espagnol et d’italien avec des tuteurs natifs, adaptés à vos objectifs et à votre rythme. Apprenez la langue telle qu’elle est vraiment parlée.',
      'hero.cta': 'Découvrir les forfaits',
      'intro.badge': 'Cours Freestyle',
      'intro.h': 'Des cours construits <em>autour de vous</em>',
      'intro.p': 'MPN — Making People Native propose des cours de langue en ligne en italien et en espagnol. Dans les cours Freestyle, votre tuteur natif construit chaque séance autour de votre objectif : conversation, voyage, travail, études, installation à l’étranger ou simple plaisir d’apprendre.',
      'intro.f1t': 'Tuteurs natifs', 'intro.f1p': 'Chaque tuteur est locuteur natif de la langue qu’il enseigne.',
      'intro.f2t': 'Cours en direct, en ligne', 'intro.f2p': 'Des cours de 60 minutes en visio, où que vous soyez.',
      'intro.f3t': 'Individuel ou petits groupes', 'intro.f3p': 'Apprenez seul ou en groupe de 3 à 5 élèves réunis selon leur niveau et leurs objectifs.',
      'lang.it': 'Italien', 'lang.es': 'Espagnol',
      'pk.badge': 'Forfaits Freestyle',
      'pk.h': 'Choisissez le forfait <em>qui vous convient</em>',
      'pk.sub': 'Un token équivaut à un cours de 60 minutes. Choisissez un forfait, puis 2 ou 3 cours par semaine.',
      'pk.format': 'Format des cours', 'pk.one': 'Individuel', 'pk.group': 'Groupe',
      'pk.onenote': 'Un cours après l’autre, rien que vous et votre tuteur.',
      'pk.groupnote': 'Groupes de 3 à 5 élèves, réunis selon leur niveau, leurs objectifs et leurs disponibilités. Les prix sont par élève.',
      'pk.weeks': '{n} semaines', 'pk.perlesson': '/ cours', 'pk.perstudent': 'par élève',
      'pk.lessons': '{n} cours', 'pk.perweek': '{n} par semaine', 'pk.total': 'au total',
      'pk.popular': 'Le plus populaire', 'pk.choose': 'Choisir ce forfait',
      'pk.tag.start': 'Un premier parcours structuré',
      'pk.tag.progress': 'Pour la régularité et des progrès mesurables',
      'pk.tag.mastery': 'Pour les objectifs à long terme et une continuité maximale',
      'pk.trialT': 'Premier cours d’essai',
      'pk.trialP': '40 minutes, en individuel, avec une première évaluation de votre niveau et une courte note sur le parcours conseillé.',
      'pk.singleT': 'Cours à l’unité', 'pk.singleP': '60 minutes, en individuel, sans forfait.',
      'pk.note': 'Prix en livres sterling (GBP). Total = nombre de cours × prix par cours. Les cours en groupe ne sont disponibles qu’en forfait. Les tokens non utilisés restent valables 30 jours après la fin de votre forfait.',
      'disc.h': 'Tous les forfaits <em>en détail</em>',
      'disc.p': 'Comparez la fréquence hebdomadaire, le contenu de chaque forfait et le fonctionnement des tokens.',
      'next.h': 'Où aller <em class="italic">ensuite ?</em>',
      'next.c1t': 'Découvrir les cours', 'next.c1p': 'Voyez comment se déroule chaque cours et ce qu’il comprend.',
      'next.c2t': 'Comment ça marche', 'next.c2p': 'De l’inscription au premier cours en quatre étapes.',
      'next.c3t': 'Nous contacter', 'next.c3p': 'Une question ? Écrivez à notre équipe, nous vous répondrons.',
      'next.go': 'Voir',
      'faq.badge': 'FAQ', 'faq.h': 'Un <em>doute ?</em>',
      'faq.q1': 'Qu’est-ce que Freestyle ?',
      'faq.a1': 'Freestyle est notre service de langue personnalisé, construit autour de votre objectif : conversation, voyage, travail, études, installation à l’étranger ou intérêt personnel. Il est disponible en individuel ou en groupe de 3 à 5 élèves.',
      'faq.q2': 'Comment fonctionnent les tokens ?',
      'faq.a2': 'Un token équivaut à un cours, qu’il s’agisse d’un cours individuel ou d’une séance de groupe. Les tokens non utilisés restent valables 30 jours après la fin de votre forfait.',
      'faq.q3': 'Puis-je rejoindre un groupe seul(e) ?',
      'faq.a3': 'Oui. Vous pouvez vous inscrire seul(e) : notre équipe vous aide à trouver un groupe adapté, selon votre niveau, vos objectifs et vos disponibilités. Un groupe démarre à partir de 3 élèves et en compte 5 au maximum.',
      'faq.q4': 'Comment choisissez-vous vos tuteurs ?',
      'faq.a4': 'Nous sélectionnons nos tuteurs selon leurs qualifications, leur expérience, leurs compétences pédagogiques et leur motivation, ainsi que leur envie de partager leur langue et leur culture. Tous nos tuteurs sont locuteurs natifs de la langue qu’ils enseignent.',
      'faq.q5': 'Puis-je annuler ou déplacer un cours ?',
      'faq.a5': 'Oui. Vous pouvez annuler ou déplacer un cours gratuitement avec un préavis d’au moins 24 heures, et le token vous est rendu. Avec un préavis plus court, ou en cas d’absence, le token est utilisé.',
      'faq.q6': 'Comment fonctionne le paiement ?',
      'faq.a6': 'Vous payez en ligne, en toute sécurité, en livres sterling (GBP) via Stripe : MPN ne voit ni ne conserve jamais vos données de carte complètes. Les moyens de paiement disponibles et le total à payer s’affichent au moment du paiement, avant que vous ne confirmiez.',
      'faq.cta': 'Pour toute autre question',
      'ft.privacy': 'Politique de confidentialité', 'ft.terms': 'Conditions d’utilisation', 'ft.cookies': 'Politique relative aux cookies',
      'ft.refund': 'Conditions de vente et de remboursement', 'ft.legal': 'Informations légales', 'ft.access': 'Accessibilité',
      'ft.rights': 'Tous droits réservés.',
      'ft.note': 'Les pages liées et la plateforme sont actuellement disponibles en anglais uniquement.'
    },

    es: {
      'meta.title': '¿Español o italiano? Clases online con tutores nativos | MPN',
      'meta.desc': 'Clases online en directo de español e italiano con tutores nativos, individuales o en grupos reducidos. Elige un paquete Freestyle y empieza.',
      'nav.cta': 'Descubrir los paquetes', 'nav.lang': 'Idioma',
      'hero.l1': '¿Español', 'hero.l2': 'o italiano?',
      'hero.p': 'Clases de español e italiano con tutores nativos, pensadas para tus objetivos y a tu ritmo. Aprende el idioma tal y como se habla de verdad.',
      'hero.cta': 'Descubrir los paquetes',
      'intro.badge': 'Clases Freestyle',
      'intro.h': 'Clases pensadas <em>para ti</em>',
      'intro.p': 'MPN — Making People Native ofrece clases de idiomas online de italiano y español. En las clases Freestyle, tu tutor nativo adapta cada sesión a tu objetivo: conversación, viajes, trabajo, estudios, mudarte al extranjero o, simplemente, el placer de aprender.',
      'intro.f1t': 'Tutores nativos', 'intro.f1p': 'Todos los tutores son hablantes nativos del idioma que enseñan.',
      'intro.f2t': 'Clases online en directo', 'intro.f2p': 'Clases de 60 minutos por vídeo, estés donde estés.',
      'intro.f3t': 'Individual o en grupos reducidos', 'intro.f3p': 'Aprende solo o en grupos de 3 a 5 estudiantes según nivel y objetivos.',
      'lang.it': 'Italiano', 'lang.es': 'Español',
      'pk.badge': 'Paquetes Freestyle',
      'pk.h': 'Elige el paquete <em>que mejor te encaja</em>',
      'pk.sub': 'Un token equivale a una clase de 60 minutos. Elige un paquete y después 2 o 3 clases por semana.',
      'pk.format': 'Formato de las clases', 'pk.one': 'Individual', 'pk.group': 'Grupo',
      'pk.onenote': 'Una clase tras otra, solo tú y tu tutor.',
      'pk.groupnote': 'Grupos de 3 a 5 estudiantes según nivel, objetivos y disponibilidad. Los precios son por estudiante.',
      'pk.weeks': '{n} semanas', 'pk.perlesson': '/ clase', 'pk.perstudent': 'por estudiante',
      'pk.lessons': '{n} clases', 'pk.perweek': '{n} por semana', 'pk.total': 'en total',
      'pk.popular': 'El más popular', 'pk.choose': 'Elegir este paquete',
      'pk.tag.start': 'Un primer camino de aprendizaje estructurado',
      'pk.tag.progress': 'Para constancia y progreso medible',
      'pk.tag.mastery': 'Para objetivos a largo plazo y máxima continuidad',
      'pk.trialT': 'Primera clase de prueba',
      'pk.trialP': '40 minutos, individual, con una primera evaluación de tu nivel y una breve nota sobre el recorrido recomendado.',
      'pk.singleT': 'Clase suelta', 'pk.singleP': '60 minutos, individual, sin necesidad de paquete.',
      'pk.note': 'Precios en libras esterlinas (GBP). Total = número de clases × precio por clase. Las clases en grupo solo están disponibles en paquetes. Los tokens no utilizados siguen siendo válidos durante 30 días tras finalizar tu paquete.',
      'disc.h': 'Todos los paquetes <em>al detalle</em>',
      'disc.p': 'Compara la frecuencia semanal, qué incluye cada paquete y cómo funcionan los tokens.',
      'next.h': '¿Qué <em class="italic">sigue?</em>',
      'next.c1t': 'Explorar las clases', 'next.c1p': 'Descubre cómo funciona cada clase y qué incluye.',
      'next.c2t': 'Cómo funciona', 'next.c2p': 'Del registro a tu primera clase en cuatro pasos.',
      'next.c3t': 'Contactar con nosotros', 'next.c3p': '¿Preguntas? Escribe a nuestro equipo y te responderemos.',
      'next.go': 'Ir',
      'faq.badge': 'FAQ', 'faq.h': '¿Todavía <em>dudas?</em>',
      'faq.q1': '¿Qué es Freestyle?',
      'faq.a1': 'Freestyle es nuestro servicio de idiomas personalizado, construido en torno a tu objetivo: conversación, viajes, trabajo, estudios, mudanza al extranjero o interés personal. Está disponible en formato individual o en grupos de 3 a 5 estudiantes.',
      'faq.q2': '¿Cómo funcionan los tokens?',
      'faq.a2': 'Un token equivale a una clase, ya sea individual o en grupo. Los tokens no utilizados siguen siendo válidos durante 30 días tras finalizar tu paquete.',
      'faq.q3': '¿Puedo unirme a un grupo sin conocer a nadie?',
      'faq.a3': 'Sí. Puedes apuntarte por tu cuenta y nuestro equipo te ayudará a encontrar un grupo adecuado según nivel, objetivos y disponibilidad. Los grupos necesitan al menos 3 estudiantes para empezar y tienen un máximo de 5.',
      'faq.q4': '¿Cómo seleccionáis a vuestros tutores?',
      'faq.a4': 'Seleccionamos a los tutores por su formación, experiencia, habilidades docentes y motivación, así como por su pasión por compartir su idioma y su cultura. Todos nuestros tutores son hablantes nativos del idioma que enseñan.',
      'faq.q5': '¿Puedo cancelar o cambiar una clase?',
      'faq.a5': 'Sí. Puedes cancelar o cambiar una clase sin coste con al menos 24 horas de antelación y el token se te devuelve. Con menos antelación, o si no te presentas, el token se consume.',
      'faq.q6': '¿Cómo funcionan los pagos?',
      'faq.a6': 'Pagas online de forma segura, en libras esterlinas (GBP), a través de Stripe, por lo que MPN nunca ve ni guarda los datos completos de tu tarjeta. Los métodos de pago disponibles y el total se muestran al finalizar la compra, antes de confirmar.',
      'faq.cta': 'Para otras preguntas',
      'ft.privacy': 'Política de privacidad', 'ft.terms': 'Condiciones de uso', 'ft.cookies': 'Política de cookies',
      'ft.refund': 'Política de ventas y reembolsos', 'ft.legal': 'Información legal', 'ft.access': 'Accesibilidad',
      'ft.rights': 'Todos los derechos reservados.',
      'ft.note': 'Las páginas enlazadas y la plataforma están disponibles por ahora solo en inglés.'
    },

    it: {
      'meta.title': 'Spagnolo o italiano? Lezioni online con tutor madrelingua | MPN',
      'meta.desc': 'Lezioni online dal vivo di spagnolo e italiano con tutor madrelingua, individuali o in piccoli gruppi. Scegli un pacchetto Freestyle e inizia.',
      'nav.cta': 'Scopri i pacchetti', 'nav.lang': 'Lingua',
      'hero.l1': 'Spagnolo', 'hero.l2': 'o italiano?',
      'hero.p': 'Lezioni di spagnolo e italiano con tutor madrelingua, costruite attorno ai tuoi obiettivi e al tuo ritmo. Impara la lingua come si parla davvero.',
      'hero.cta': 'Scopri i pacchetti',
      'intro.badge': 'Lezioni Freestyle',
      'intro.h': 'Lezioni costruite <em>attorno a te</em>',
      'intro.p': 'MPN — Making People Native offre lezioni di lingua online di italiano e spagnolo. Nelle lezioni Freestyle il tuo tutor madrelingua costruisce ogni sessione attorno al tuo obiettivo: conversazione, viaggi, lavoro, studio, trasferimento all’estero o semplicemente il piacere di imparare.',
      'intro.f1t': 'Tutor madrelingua', 'intro.f1p': 'Ogni tutor è madrelingua della lingua che insegna.',
      'intro.f2t': 'Lezioni online dal vivo', 'intro.f2p': 'Lezioni di 60 minuti in video, da ovunque tu sia.',
      'intro.f3t': 'Individuali o in piccoli gruppi', 'intro.f3p': 'Impara da solo o in gruppi di 3–5 studenti scelti per livello e obiettivi.',
      'lang.it': 'Italiano', 'lang.es': 'Spagnolo',
      'pk.badge': 'Pacchetti Freestyle',
      'pk.h': 'Scegli il pacchetto <em>più adatto a te</em>',
      'pk.sub': 'Un token equivale a una lezione di 60 minuti. Scegli un pacchetto, poi 2 o 3 lezioni a settimana.',
      'pk.format': 'Formato delle lezioni', 'pk.one': 'Individuale', 'pk.group': 'Gruppo',
      'pk.onenote': 'Una lezione alla volta, solo tu e il tuo tutor.',
      'pk.groupnote': 'Gruppi di 3–5 studenti, scelti per livello, obiettivi e disponibilità. I prezzi sono per studente.',
      'pk.weeks': '{n} settimane', 'pk.perlesson': '/ lezione', 'pk.perstudent': 'per studente',
      'pk.lessons': '{n} lezioni', 'pk.perweek': '{n} a settimana', 'pk.total': 'totale',
      'pk.popular': 'Il più scelto', 'pk.choose': 'Scegli questo pacchetto',
      'pk.tag.start': 'Un primo percorso strutturato',
      'pk.tag.progress': 'Per costanza e progressi misurabili',
      'pk.tag.mastery': 'Per obiettivi a lungo termine e massima continuità',
      'pk.trialT': 'Prima lezione di prova',
      'pk.trialP': '40 minuti, individuale, con una valutazione iniziale del tuo livello e brevi note sul percorso consigliato.',
      'pk.singleT': 'Lezione singola', 'pk.singleP': '60 minuti, individuale, senza bisogno di un pacchetto.',
      'pk.note': 'Prezzi in sterline (GBP). Totale = numero di lezioni × prezzo per lezione. Le lezioni di gruppo sono disponibili solo nei pacchetti. I token non utilizzati restano validi per 30 giorni dopo la fine del pacchetto.',
      'disc.h': 'Tutti i pacchetti <em>nel dettaglio</em>',
      'disc.p': 'Confronta la frequenza settimanale, cosa include ogni pacchetto e come funzionano i token.',
      'next.h': 'Dove <em class="italic">andare ora?</em>',
      'next.c1t': 'Scopri le lezioni', 'next.c1p': 'Scopri come funziona ogni lezione e cosa include.',
      'next.c2t': 'Come funziona', 'next.c2p': 'Dall’iscrizione alla prima lezione in quattro passi.',
      'next.c3t': 'Contattaci', 'next.c3p': 'Domande? Scrivi al nostro team e ti risponderemo.',
      'next.go': 'Vai',
      'faq.badge': 'FAQ', 'faq.h': 'Hai ancora <em>dubbi?</em>',
      'faq.q1': 'Cos’è Freestyle?',
      'faq.a1': 'Freestyle è il nostro servizio di lingua personalizzato, costruito attorno al tuo obiettivo: conversazione, viaggi, lavoro, studio, trasferimento all’estero o interesse personale. È disponibile in formato individuale o in gruppi di 3–5 studenti.',
      'faq.q2': 'Come funzionano i token?',
      'faq.a2': 'Un token equivale a una lezione, individuale o di gruppo. I token non utilizzati restano validi per 30 giorni dopo la fine del pacchetto.',
      'faq.q3': 'Posso entrare in un gruppo anche da solo?',
      'faq.a3': 'Sì. Puoi iscriverti da solo e il nostro team ti aiuta a trovare un gruppo adatto, in base a livello, obiettivi e disponibilità. I gruppi partono con almeno 3 studenti e arrivano a un massimo di 5.',
      'faq.q4': 'Come scegliete i vostri tutor?',
      'faq.a4': 'Selezioniamo i tutor in base a qualifiche, esperienza, capacità didattiche e motivazione, oltre alla passione per condividere la propria lingua e cultura. Tutti i nostri tutor sono madrelingua della lingua che insegnano.',
      'faq.q5': 'Posso annullare o spostare una lezione?',
      'faq.a5': 'Sì. Puoi annullare o spostare una lezione gratuitamente con almeno 24 ore di preavviso e il token ti viene restituito. Con meno preavviso, o se non ti presenti, il token viene utilizzato.',
      'faq.q6': 'Come funzionano i pagamenti?',
      'faq.a6': 'Paghi online in modo sicuro, in sterline (GBP), tramite Stripe: MPN non vede né conserva mai i dati completi della tua carta. I metodi di pagamento disponibili e il totale sono mostrati al checkout prima di confermare.',
      'faq.cta': 'Per altre domande',
      'ft.privacy': 'Informativa sulla privacy', 'ft.terms': 'Termini di utilizzo', 'ft.cookies': 'Cookie policy',
      'ft.refund': 'Vendite e rimborsi', 'ft.legal': 'Informazioni legali', 'ft.access': 'Accessibilità',
      'ft.rights': 'Tutti i diritti riservati.',
      'ft.note': 'Le pagine collegate e la piattaforma sono al momento disponibili solo in inglese.'
    }
  };

  /* --------------------------------------------------------------- packages */
  // Freestyle prices per lesson, in pence (price list: Freestyle, section 15.1).
  const PLANS = [
    { key: 'start',    weeks: 4,  lessons: [8, 12],  perWeek: [2, 3], one: 2999, group: 2499 },
    { key: 'progress', weeks: 12, lessons: [24, 36], perWeek: [2, 3], one: 2799, group: 2299, featured: true },
    { key: 'mastery',  weeks: 24, lessons: [48, 72], perWeek: [2, 3], one: 2499, group: 1999 }
  ];
  const TRIAL = 1999, SINGLE = 3499;

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  // landing.html opens on one-to-one, landing-group.html on group (data-format on <body>)
  const state = { lang: 'en', format: document.body.dataset.format === 'group' ? 'group' : 'one' };

  const t = (key, vars) => {
    let s = (T[state.lang] && T[state.lang][key]);
    if (s === undefined) s = T.en[key] || '';
    return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k]) : s;
  };

  // £1,799.28 (en) · £1.799,28 (de, it) · £1799,28 (es, four digits) · £1 799,28 (fr)
  const money = (pence) => {
    const [int, dec] = (pence / 100).toFixed(2).split('.');
    const l = state.lang;
    const group = l === 'en' ? ',' : l === 'fr' ? ' ' : '.';
    const sep = l === 'en' ? '.' : ',';
    const spaced = (l === 'es' && int.length <= 4) ? int : int.replace(/\B(?=(\d{3})+(?!\d))/g, group);
    return '£' + spaced + sep + dec;
  };

  /* ------------------------------------------------------------ language IO */
  const detect = () => {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q && LANGS.includes(q.toLowerCase())) return q.toLowerCase();
    } catch (e) { /* ignore */ }
    try {
      const saved = localStorage.getItem(STORE);
      if (saved && LANGS.includes(saved)) return saved;
    } catch (e) { /* storage blocked: fine */ }
    const prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (const p of prefs) {
      const code = String(p).slice(0, 2).toLowerCase();
      if (LANGS.includes(code)) return code;
    }
    return 'en';
  };
  const remember = (l) => { try { localStorage.setItem(STORE, l); } catch (e) { /* ignore */ } };

  /* ----------------------------------------------------------------- render */
  const applyText = () => {
    document.documentElement.lang = state.lang;
    document.title = t('meta.title');
    const md = $('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    const note = $('#lpEnNote');
    if (note) note.hidden = !t('ft.note');
    const sel = $('#lpLang');
    if (sel) sel.value = state.lang;
  };

  const planHref = (key) => `choose-plan.html?plan=${key}&format=${state.format}`;

  const renderPlans = () => {
    const box = $('#lpPlans');
    if (!box) return;
    const langName = `${t('lang.it')} / ${t('lang.es')}`;
    box.innerHTML = PLANS.map(p => {
      const rate = p[state.format];
      const opts = p.lessons.map((n, i) => `
          <li><b>${t('pk.lessons', { n })}</b><span>${t('pk.perweek', { n: p.perWeek[i] })}</span><em>${money(rate * n)} ${t('pk.total')}</em></li>`).join('');
      return `
      <article class="lp-plan${p.featured ? ' featured' : ''}">
        ${p.featured ? `<span class="lp-badge">${t('pk.popular')}</span>` : ''}
        <p class="lp-plan-lang">Freestyle · ${langName}</p>
        <h3 class="lp-plan-name">${p.key.toUpperCase()} <small>${t('pk.weeks', { n: p.weeks })}</small></h3>
        <p class="lp-plan-price"><strong>${money(rate)}</strong><span>${t('pk.perlesson')}${state.format === 'group' ? ' · ' + t('pk.perstudent') : ''}</span></p>
        <p class="lp-plan-tag">${t('pk.tag.' + p.key)}</p>
        <ul class="lp-opts">${opts}
        </ul>
        <a class="btn btn-primary" href="${planHref(p.key)}">${t('pk.choose')}</a>
      </article>`;
    }).join('');
    $('#lpFormatNote').textContent = t(state.format === 'group' ? 'pk.groupnote' : 'pk.onenote');
    $('#lpTrialPrice').textContent = money(TRIAL);
    $('#lpSinglePrice').textContent = money(SINGLE);
    updateDots();
  };

  const syncChoices = () => {
    $$('#lpFormat button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.format === state.format)));
  };

  const render = () => { applyText(); syncChoices(); renderPlans(); };

  /* ------------------------------------------------------------------ events */
  const sel = $('#lpLang');
  if (sel) sel.addEventListener('change', () => {
    state.lang = LANGS.includes(sel.value) ? sel.value : 'en';
    remember(state.lang);
    render();
  });

  $$('#lpFormat button').forEach(b => b.addEventListener('click', () => {
    state.format = b.dataset.format; syncChoices(); renderPlans();
  }));

  // radio-style arrow keys inside the two groups
  const arrowNav = (groupSel, itemSel) => {
    const g = $(groupSel);
    if (!g) return;
    g.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      const items = $$(itemSel, g);
      const i = items.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      const next = items[(i + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length];
      next.focus(); next.click();
    });
  };
  arrowNav('#lpFormat', 'button');

  /* ------------------------------------------- phones: dots + sticky CTA bar */
  const plansBox = $('#lpPlans');
  const dots = $$('#lpDots i');
  function updateDots() {
    if (!plansBox || !dots.length) return;
    const cards = $$('.lp-plan', plansBox);
    if (!cards.length) return;
    const mid = plansBox.scrollLeft + plansBox.clientWidth / 2;
    let best = 0, bestD = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === best));
  }
  if (plansBox) plansBox.addEventListener('scroll', () => window.requestAnimationFrame(updateDots), { passive: true });

  const sticky = $('#lpSticky');
  if (sticky && 'IntersectionObserver' in window) {
    const hero = $('#top'), packs = $('#packages');
    let heroOut = false, packsIn = false;
    const apply = () => sticky.classList.toggle('show', heroOut && !packsIn);
    new IntersectionObserver(es => { heroOut = !es[0].isIntersecting; apply(); }, { threshold: 0.05 }).observe(hero);
    new IntersectionObserver(es => { packsIn = es[0].isIntersecting; apply(); }, { threshold: 0.25 }).observe(packs);
  }

  // start: pick the language and draw the page
  state.lang = detect();
  render();
})();
