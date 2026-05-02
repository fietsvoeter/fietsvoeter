export type Category = 'wielrennen' | 'mtb' | 'gravel' | 'e-bike' | 'training' | 'kleding' | 'voeding'
export type ContentType = 'listicle' | 'comparison' | 'guide' | 'review'

export const PARTNER_ID = '1361557'
export const SITE_URL   = 'https://www.fietsvoeter.nl'
export const SITE_NAME  = 'Fietsvoeter.nl'
export const YEAR       = new Date().getFullYear()

export function bolLink(search: string, partnerId = PARTNER_ID, subid?: string): string {
  const productUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(search)}`
  const su1 = subid ? `&su1=${encodeURIComponent(subid.slice(0, 50))}` : ''
  const su2 = search ? `&su2=${encodeURIComponent(search.slice(0, 50))}` : ''
  return `https://partner.bol.com/click/click?p=2&t=url&s=${partnerId}&f=TXL&url=${encodeURIComponent(productUrl)}${su1}${su2}`
}

export interface CategoryData {
  label:       string
  color:       string
  description: string
  metaDesc:    string
  intro:       string
  footer:      string
  pillars:     string[]
}

export const CATEGORIES: Record<Category, CategoryData> = {
  wielrennen: {
    label: 'Wielrennen',
    color: '#E2001A',
    description: 'Reviews en koopgidsen voor wielrenners in Nederland',
    metaDesc: 'Wielrennen gidsen, uitrusting en trainingstips voor Nederlandse rijders. Onafhankelijk getest op echte ritten.',
    intro: 'Of je net begint met wielrennen of al jaren rijdt voor je plezier: in deze categorie vind je alles om slimmer te trainen, beter uitgerust op pad te gaan en je fiets goed te onderhouden. De artikelen zijn verdeeld over uitrusting (racefiets, fietscomputer, accessoires), training (schema, methoden, periodisering) en techniek (onderhoud, afstelling). Gebruik de aankoopgids als startpunt en verdiep je daarna via de specifieke gidsen.',
    footer: 'Wielrennen in Nederland heeft zijn eigen karakter: vlak terrein, wisselvallig weer en een rijke clubcultuur. De artikelen in deze categorie houden rekening met die Nederlandse context — van de juiste banden voor natte kasseistroken tot kleding voor typisch Hollands herfstrijden.',
    pillars: ['racefiets-kopen-gids', 'beste-racefiets', 'trainingschema-wielrennen-beginners'],
  },
  mtb: {
    label: 'MTB',
    color: '#2D6A2D',
    description: 'Mountainbike uitrusting, routes en techniek voor Nederlandse trails',
    metaDesc: 'Mountainbike gidsen voor Nederland. Aankoopadvies, trailgidsen en onderhoudstips voor de Veluwe, Posbank en Achterhoek.',
    intro: 'Mountainbiken in Nederland is anders dan in de bergen — maar zeker niet minder uitdagend. De Veluwe, Posbank en Montferland bieden technisch terrein voor alle niveaus. In deze categorie vind je alles over het kiezen van de juiste MTB, het rijden van Nederlandse trails en het onderhouden van je fiets. De artikelen zijn verdeeld over aankoopadvies (hardtail of fully, welk budget), rijden en techniek, en onderhoud.',
    footer: 'Nederlandse MTB-routes zijn overwegend zandgebaseerd, wat specifieke eisen stelt aan banden en bandendruk. De meeste rijders combineren trail en XC, waardoor een allround hardtail of trail-fully de meest populaire keuze is. De artikelen in deze categorie zijn geschreven vanuit die Nederlandse context.',
    pillars: ['beste-mountainbike', 'mtb-voor-beginners', 'mtb-onderhoud-gids'],
  },
  gravel: {
    label: 'Gravel',
    color: '#8B4513',
    description: 'Gravel fietsen in Nederland: routes, uitrusting en gidsen',
    metaDesc: 'Gravel fietsen in Nederland: routes per regio, aankoopadvies en technische gidsen. Van Veluwe tot Zeeland, van beginner tot gevorderd.',
    intro: 'Gravel fietsen is de snelst groeiende fietsdiscipline in Nederland. De combinatie van asfaltwegen, dijkpaden en onverharde boswegen maakt Nederland uitstekend gravel-land. In deze categorie vind je routeoverzichten per regio, aankoopadvies voor je gravel fiets en technische gidsen over banden, onderhoud en bikepacking. Nieuw in gravel? Begin bij de aankoopgids.',
    footer: 'Gravel fietsen in Nederland betekent veel wisselen tussen ondergronden: asfalt, zandpad en grasland. Een 40mm tubeless band op 1.5 bar is voor de meeste Nederlandse routes de beste allround keuze. De artikelen in deze categorie helpen je die keuzes te maken op basis van jouw routes en rijstijl.',
    pillars: ['beste-gravel-fiets', 'gravel-fiets-kopen-gids', 'gravel-voor-beginners'],
  },
  'e-bike': {
    label: 'E-bike',
    color: '#0055A5',
    description: 'E-bike kopen en gebruiken: complete gidsen voor Nederland',
    metaDesc: 'E-bike kopen in Nederland: aankoopadvies per type, motor- en accuvergelijkingen en wetgeving. Onafhankelijk getest.',
    intro: 'Nederland is wereldkampioen e-bike rijden. Een e-bike maakt woon-werkverkeer toegankelijker, vergroot je actieradius en opent fietsen voor mensen die anders niet zouden rijden. In deze categorie vind je koopadvies voor elk type e-bike (stads, sport, cargo, speed pedelec), uitleg over motoren en accus, en praktische gidsen over onderhoud en wetgeving.',
    footer: 'E-bike wetgeving in Nederland verandert regelmatig, met name rond speed pedelecs en het gebruik van fietspaden. De artikelen in deze categorie worden bijgehouden op actuele regelgeving. Controleer altijd de publicatiedatum voor wetgeving-gerelateerde content.',
    pillars: ['e-bike-kopen-gids', 'beste-e-bike-pendelaar', 'e-bike-wetgeving-nederland'],
  },
  training: {
    label: 'Training',
    color: '#E67E22',
    description: 'Wielrennen training: schema, methoden en herstel',
    metaDesc: 'Wielrennen trainingsschemas, intervaltraining en hersteltips. Van beginner tot gevorderd, inclusief periodisering en voorbereiding.',
    intro: 'Trainen voor wielrennen is meer dan veel kilometers maken. Structuur, herstel en de juiste intensiteitsverdeling bepalen of je vooruitgaat of op een plateau blijft. In deze categorie vind je trainingsschemas voor alle niveaus, uitleg over trainingsmethoden (intervals, zone 2, periodisering) en gidsen over herstel en blessurepreventie. Nieuw met gestructureerd trainen? Begin bij het beginners trainingsschema.',
    footer: 'Wielrennen training in Nederland heeft seizoensinvloed: de wintermaanden zijn ideaal voor basisopbouw en indoor training, terwijl voorjaar en zomer de piekperiode zijn. De artikelen in deze categorie houden rekening met die seizoensstructuur en de Nederlandse trainingsomgeving.',
    pillars: ['trainingschema-wielrennen-beginners', 'intervaltraining-wielrennen', 'wielrennen-periodisering'],
  },
  kleding: {
    label: 'Kleding',
    color: '#8E44AD',
    description: 'Fietskleding kopen: helmen, broeken, schoenen en meer',
    metaDesc: 'Fietskleding kopen: onafhankelijke tests van helmen, broeken, schoenen en regenpakken. Voor wielrennen, MTB en gravel in Nederland.',
    intro: 'Goede fietskleding maakt het verschil tussen een prettige rit en een vervelende. Een helm die comfortabel zit, een broek met het juiste zitblok en schoenen met goede krachtoverbrenging zijn investeringen die direct invloed hebben op je rijplezier. In deze categorie vind je eerlijke tests voor alle fietskleding, van helm tot schoenen, voor wielrennen, MTB en gravel.',
    footer: 'Fietskleding is persoonlijk — pasvorm en comfort zijn subjectief. De tests in deze categorie zijn uitgevoerd op echte ritten in Nederlandse weersomstandigheden. Gebruik de reviews als richtlijn maar houd rekening met je eigen lichaamsbouw en rijstijl bij de uiteindelijke keuze.',
    pillars: ['beste-fietshelm', 'beste-fietsbroek-heren', 'beste-wielrenschoenen'],
  },
  voeding: {
    label: 'Voeding',
    color: '#27AE60',
    description: 'Sportvoeding voor wielrenners: wat, wanneer en hoeveel',
    metaDesc: 'Sportvoeding voor wielrenners: praktische gidsen over ritvoeding, herstelvoeding en supplementen. Wetenschappelijk onderbouwd.',
    intro: 'Voeding is de meest onderschatte prestatievariabele in wielrennen. Wat je eet voor, tijdens en na een rit bepaalt hoe lang je vol kunt houden en hoe snel je herstelt. In deze categorie vind je praktische gidsen over voeding voor elke ritlengte, uitleg over supplementen die werken en adviezen over hydratatie. Begin bij de sportvoeding pillar voor een compleet overzicht.',
    footer: 'Voedingsadvies in deze categorie is gebaseerd op beschikbaar wetenschappelijk onderzoek. Individuele behoeften verschillen — gebruik de artikelen als richtlijn en pas aan op basis van eigen ervaring. Raadpleeg bij specifieke medische vragen een diëtist of sportarts.',
    pillars: ['sportvoeding-wielrennen', 'voeding-voor-lange-rit', 'hydratatie-wielrennen'],
  },
}
