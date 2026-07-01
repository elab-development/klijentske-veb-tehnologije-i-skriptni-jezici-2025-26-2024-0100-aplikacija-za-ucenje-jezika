import {
  Language,
  LanguageCatalog,
  type LanguageData,
  type LessonData,
  type LessonQuestion,
  type QuestionOption,
} from '../types/Language';

const option = (id: string, text: string): QuestionOption => ({ id, text });

const multipleChoice = (
  id: string,
  question: string,
  options: QuestionOption[],
  correctOptionId: string,
  hint?: string,
): LessonQuestion => ({
  id,
  type: 'multipleChoice',
  question,
  options,
  correctOptionId,
  hint,
});

const fillBlank = (
  id: string,
  question: string,
  sentence: string,
  correctAnswer: string,
  hint?: string,
): LessonQuestion => ({
  id,
  type: 'fillBlank',
  question,
  sentence,
  correctAnswer,
  hint,
});

const wordTranslation = (
  id: string,
  question: string,
  sourceWord: string,
  correctAnswer: string,
  hint?: string,
): LessonQuestion => ({
  id,
  type: 'wordTranslation',
  question,
  sourceWord,
  correctAnswer,
  hint,
});

const createLesson = (
  id: string,
  order: number,
  title: string,
  description: string,
  questions: LessonQuestion[],
): LessonData => ({
  id,
  order,
  title,
  description,
  questions,
});

const languageData: LanguageData[] = [
  {
    id: 'english',
    name: 'Engleski',
    shortCode: 'en',
    nativeName: 'English',
    lessons: [
      createLesson('english-greetings', 1, 'Pozdravi', 'Osnovni pozdravi i predstavljanje.', [
        multipleChoice(
          'english-greetings-1',
          'Sta znaci "Hello"?',
          [option('a', 'Dovidjenja'), option('b', 'Zdravo'), option('c', 'Hvala'), option('d', 'Molim')],
          'b',
        ),
        fillBlank('english-greetings-2', 'Dopuni pozdrav.', 'Good ____!', 'morning'),
        wordTranslation('english-greetings-3', 'Napisi rec na engleskom.', 'Hvala', 'thank you'),
      ]),
      createLesson('english-family', 2, 'Porodica', 'Reci za clanove porodice.', [
        multipleChoice(
          'english-family-1',
          'Sta znaci "father"?',
          [option('a', 'majka'), option('b', 'otac'), option('c', 'brat'), option('d', 'sestra')],
          'b',
        ),
        fillBlank('english-family-2', 'Dopuni recenicu.', 'This is my ____.', 'mother'),
        wordTranslation('english-family-3', 'Napisi rec na engleskom.', 'brat', 'brother'),
      ]),
      createLesson('english-numbers', 3, 'Brojevi', 'Brojanje i osnovni brojevi.', [
        multipleChoice(
          'english-numbers-1',
          'Sta znaci "seven"?',
          [option('a', 'pet'), option('b', 'sest'), option('c', 'sedam'), option('d', 'osam')],
          'c',
        ),
        fillBlank('english-numbers-2', 'Dopuni niz.', 'One, two, ____.', 'three'),
        wordTranslation('english-numbers-3', 'Napisi rec na engleskom.', 'deset', 'ten'),
      ]),
      createLesson('english-colors', 4, 'Boje', 'Najcesce boje u svakodnevnom govoru.', [
        multipleChoice(
          'english-colors-1',
          'Sta znaci "blue"?',
          [option('a', 'plava'), option('b', 'crvena'), option('c', 'zelena'), option('d', 'zuta')],
          'a',
        ),
        fillBlank('english-colors-2', 'Dopuni opis.', 'The sun is ____.', 'yellow'),
        wordTranslation('english-colors-3', 'Napisi rec na engleskom.', 'crvena', 'red'),
      ]),
      createLesson('english-food', 5, 'Hrana', 'Osnovne reci za hranu.', [
        multipleChoice(
          'english-food-1',
          'Sta znaci "bread"?',
          [option('a', 'mleko'), option('b', 'hleb'), option('c', 'sir'), option('d', 'jaje')],
          'b',
        ),
        fillBlank('english-food-2', 'Dopuni recenicu.', 'I drink ____.', 'water'),
        wordTranslation('english-food-3', 'Napisi rec na engleskom.', 'jabuka', 'apple'),
      ]),
      createLesson('english-animals', 6, 'Zivotinje', 'Nazivi poznatih zivotinja.', [
        multipleChoice(
          'english-animals-1',
          'Sta znaci "dog"?',
          [option('a', 'macka'), option('b', 'pas'), option('c', 'ptica'), option('d', 'konj')],
          'b',
        ),
        fillBlank('english-animals-2', 'Dopuni recenicu.', 'A ____ says meow.', 'cat'),
        wordTranslation('english-animals-3', 'Napisi rec na engleskom.', 'riba', 'fish'),
      ]),
      createLesson('english-home', 7, 'Kuca', 'Prostorije i predmeti u kuci.', [
        multipleChoice(
          'english-home-1',
          'Sta znaci "kitchen"?',
          [option('a', 'kupatilo'), option('b', 'kuhinja'), option('c', 'soba'), option('d', 'vrata')],
          'b',
        ),
        fillBlank('english-home-2', 'Dopuni recenicu.', 'I sleep in the ____.', 'bedroom'),
        wordTranslation('english-home-3', 'Napisi rec na engleskom.', 'sto', 'table'),
      ]),
      createLesson('english-school', 8, 'Skola', 'Predmeti i skolski pribor.', [
        multipleChoice(
          'english-school-1',
          'Sta znaci "book"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('english-school-2', 'Dopuni recenicu.', 'I write with a ____.', 'pencil'),
        wordTranslation('english-school-3', 'Napisi rec na engleskom.', 'ucitelj', 'teacher'),
      ]),
      createLesson('english-travel', 9, 'Putovanje', 'Reci za putovanja i prevoz.', [
        multipleChoice(
          'english-travel-1',
          'Sta znaci "train"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('english-travel-2', 'Dopuni recenicu.', 'I go by ____.', 'bus'),
        wordTranslation('english-travel-3', 'Napisi rec na engleskom.', 'karta', 'ticket'),
      ]),
      createLesson('english-time', 10, 'Vreme', 'Dani, sati i osnovni izrazi za vreme.', [
        multipleChoice(
          'english-time-1',
          'Sta znaci "today"?',
          [option('a', 'juce'), option('b', 'danas'), option('c', 'sutra'), option('d', 'nocas')],
          'b',
        ),
        fillBlank('english-time-2', 'Dopuni recenicu.', 'See you ____.', 'tomorrow'),
        wordTranslation('english-time-3', 'Napisi rec na engleskom.', 'ponedeljak', 'monday'),
      ]),
    ],
  },
  {
    id: 'german',
    name: 'Nemacki',
    shortCode: 'de',
    nativeName: 'Deutsch',
    lessons: [
      createLesson('german-greetings', 1, 'Pozdravi', 'Osnovni nemacki pozdravi.', [
        multipleChoice(
          'german-greetings-1',
          'Sta znaci "Hallo"?',
          [option('a', 'Zdravo'), option('b', 'Hvala'), option('c', 'Molim'), option('d', 'Dovidjenja')],
          'a',
        ),
        fillBlank('german-greetings-2', 'Dopuni pozdrav.', 'Guten ____!', 'Morgen'),
        wordTranslation('german-greetings-3', 'Napisi rec na nemackom.', 'hvala', 'danke'),
      ]),
      createLesson('german-family', 2, 'Porodica', 'Clanovi porodice na nemackom.', [
        multipleChoice(
          'german-family-1',
          'Sta znaci "Mutter"?',
          [option('a', 'otac'), option('b', 'majka'), option('c', 'brat'), option('d', 'dete')],
          'b',
        ),
        fillBlank('german-family-2', 'Dopuni recenicu.', 'Das ist mein ____.', 'Vater'),
        wordTranslation('german-family-3', 'Napisi rec na nemackom.', 'sestra', 'Schwester'),
      ]),
      createLesson('german-numbers', 3, 'Brojevi', 'Brojanje na nemackom.', [
        multipleChoice(
          'german-numbers-1',
          'Sta znaci "vier"?',
          [option('a', 'dva'), option('b', 'tri'), option('c', 'cetiri'), option('d', 'pet')],
          'c',
        ),
        fillBlank('german-numbers-2', 'Dopuni niz.', 'Eins, zwei, ____.', 'drei'),
        wordTranslation('german-numbers-3', 'Napisi rec na nemackom.', 'deset', 'zehn'),
      ]),
      createLesson('german-colors', 4, 'Boje', 'Osnovne boje na nemackom.', [
        multipleChoice(
          'german-colors-1',
          'Sta znaci "rot"?',
          [option('a', 'plava'), option('b', 'crvena'), option('c', 'zelena'), option('d', 'bela')],
          'b',
        ),
        fillBlank('german-colors-2', 'Dopuni opis.', 'Die Sonne ist ____.', 'gelb'),
        wordTranslation('german-colors-3', 'Napisi rec na nemackom.', 'plava', 'blau'),
      ]),
      createLesson('german-food', 5, 'Hrana', 'Namirnice i jednostavni izrazi.', [
        multipleChoice(
          'german-food-1',
          'Sta znaci "Brot"?',
          [option('a', 'hleb'), option('b', 'mleko'), option('c', 'jaje'), option('d', 'sir')],
          'a',
        ),
        fillBlank('german-food-2', 'Dopuni recenicu.', 'Ich trinke ____.', 'Wasser'),
        wordTranslation('german-food-3', 'Napisi rec na nemackom.', 'jabuka', 'Apfel'),
      ]),
      createLesson('german-animals', 6, 'Zivotinje', 'Ceste zivotinje na nemackom.', [
        multipleChoice(
          'german-animals-1',
          'Sta znaci "Hund"?',
          [option('a', 'macka'), option('b', 'pas'), option('c', 'konj'), option('d', 'riba')],
          'b',
        ),
        fillBlank('german-animals-2', 'Dopuni recenicu.', 'Eine ____ sagt miau.', 'Katze'),
        wordTranslation('german-animals-3', 'Napisi rec na nemackom.', 'ptica', 'Vogel'),
      ]),
      createLesson('german-home', 7, 'Kuca', 'Prostorije i predmeti u kuci.', [
        multipleChoice(
          'german-home-1',
          'Sta znaci "Kuche"?',
          [option('a', 'soba'), option('b', 'kuhinja'), option('c', 'vrata'), option('d', 'kupatilo')],
          'b',
        ),
        fillBlank('german-home-2', 'Dopuni recenicu.', 'Ich schlafe im ____.', 'Schlafzimmer'),
        wordTranslation('german-home-3', 'Napisi rec na nemackom.', 'sto', 'Tisch'),
      ]),
      createLesson('german-school', 8, 'Skola', 'Skolski pojmovi na nemackom.', [
        multipleChoice(
          'german-school-1',
          'Sta znaci "Buch"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('german-school-2', 'Dopuni recenicu.', 'Ich schreibe mit einem ____.', 'Bleistift'),
        wordTranslation('german-school-3', 'Napisi rec na nemackom.', 'ucitelj', 'Lehrer'),
      ]),
      createLesson('german-travel', 9, 'Putovanje', 'Prevoz i putovanja na nemackom.', [
        multipleChoice(
          'german-travel-1',
          'Sta znaci "Zug"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('german-travel-2', 'Dopuni recenicu.', 'Ich fahre mit dem ____.', 'Bus'),
        wordTranslation('german-travel-3', 'Napisi rec na nemackom.', 'karta', 'Fahrkarte'),
      ]),
      createLesson('german-time', 10, 'Vreme', 'Dani i osnovni izrazi za vreme.', [
        multipleChoice(
          'german-time-1',
          'Sta znaci "heute"?',
          [option('a', 'juce'), option('b', 'danas'), option('c', 'sutra'), option('d', 'nocas')],
          'b',
        ),
        fillBlank('german-time-2', 'Dopuni recenicu.', 'Bis ____.', 'morgen'),
        wordTranslation('german-time-3', 'Napisi rec na nemackom.', 'ponedeljak', 'Montag'),
      ]),
    ],
  },
  {
    id: 'spanish',
    name: 'Spanski',
    shortCode: 'es',
    nativeName: 'Espanol',
    lessons: [
      createLesson('spanish-greetings', 1, 'Pozdravi', 'Osnovni spanski pozdravi.', [
        multipleChoice(
          'spanish-greetings-1',
          'Sta znaci "Hola"?',
          [option('a', 'Zdravo'), option('b', 'Hvala'), option('c', 'Molim'), option('d', 'Dovidjenja')],
          'a',
        ),
        fillBlank('spanish-greetings-2', 'Dopuni pozdrav.', 'Buenos ____!', 'dias'),
        wordTranslation('spanish-greetings-3', 'Napisi rec na spanskom.', 'hvala', 'gracias'),
      ]),
      createLesson('spanish-family', 2, 'Porodica', 'Clanovi porodice na spanskom.', [
        multipleChoice(
          'spanish-family-1',
          'Sta znaci "madre"?',
          [option('a', 'otac'), option('b', 'majka'), option('c', 'brat'), option('d', 'dete')],
          'b',
        ),
        fillBlank('spanish-family-2', 'Dopuni recenicu.', 'Este es mi ____.', 'padre'),
        wordTranslation('spanish-family-3', 'Napisi rec na spanskom.', 'sestra', 'hermana'),
      ]),
      createLesson('spanish-numbers', 3, 'Brojevi', 'Brojanje na spanskom.', [
        multipleChoice(
          'spanish-numbers-1',
          'Sta znaci "cinco"?',
          [option('a', 'tri'), option('b', 'cetiri'), option('c', 'pet'), option('d', 'sest')],
          'c',
        ),
        fillBlank('spanish-numbers-2', 'Dopuni niz.', 'Uno, dos, ____.', 'tres'),
        wordTranslation('spanish-numbers-3', 'Napisi rec na spanskom.', 'deset', 'diez'),
      ]),
      createLesson('spanish-colors', 4, 'Boje', 'Osnovne boje na spanskom.', [
        multipleChoice(
          'spanish-colors-1',
          'Sta znaci "verde"?',
          [option('a', 'plava'), option('b', 'zelena'), option('c', 'crvena'), option('d', 'zuta')],
          'b',
        ),
        fillBlank('spanish-colors-2', 'Dopuni opis.', 'El sol es ____.', 'amarillo'),
        wordTranslation('spanish-colors-3', 'Napisi rec na spanskom.', 'plava', 'azul'),
      ]),
      createLesson('spanish-food', 5, 'Hrana', 'Namirnice i jednostavni izrazi.', [
        multipleChoice(
          'spanish-food-1',
          'Sta znaci "pan"?',
          [option('a', 'hleb'), option('b', 'mleko'), option('c', 'sir'), option('d', 'jaje')],
          'a',
        ),
        fillBlank('spanish-food-2', 'Dopuni recenicu.', 'Yo bebo ____.', 'agua'),
        wordTranslation('spanish-food-3', 'Napisi rec na spanskom.', 'jabuka', 'manzana'),
      ]),
      createLesson('spanish-animals', 6, 'Zivotinje', 'Ceste zivotinje na spanskom.', [
        multipleChoice(
          'spanish-animals-1',
          'Sta znaci "perro"?',
          [option('a', 'macka'), option('b', 'pas'), option('c', 'konj'), option('d', 'riba')],
          'b',
        ),
        fillBlank('spanish-animals-2', 'Dopuni recenicu.', 'Un ____ dice miau.', 'gato'),
        wordTranslation('spanish-animals-3', 'Napisi rec na spanskom.', 'ptica', 'pajaro'),
      ]),
      createLesson('spanish-home', 7, 'Kuca', 'Prostorije i predmeti u kuci.', [
        multipleChoice(
          'spanish-home-1',
          'Sta znaci "cocina"?',
          [option('a', 'kupatilo'), option('b', 'kuhinja'), option('c', 'soba'), option('d', 'vrata')],
          'b',
        ),
        fillBlank('spanish-home-2', 'Dopuni recenicu.', 'Duermo en el ____.', 'dormitorio'),
        wordTranslation('spanish-home-3', 'Napisi rec na spanskom.', 'sto', 'mesa'),
      ]),
      createLesson('spanish-school', 8, 'Skola', 'Skolski pojmovi na spanskom.', [
        multipleChoice(
          'spanish-school-1',
          'Sta znaci "libro"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('spanish-school-2', 'Dopuni recenicu.', 'Escribo con un ____.', 'lapiz'),
        wordTranslation('spanish-school-3', 'Napisi rec na spanskom.', 'ucitelj', 'profesor'),
      ]),
      createLesson('spanish-travel', 9, 'Putovanje', 'Prevoz i putovanja na spanskom.', [
        multipleChoice(
          'spanish-travel-1',
          'Sta znaci "tren"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('spanish-travel-2', 'Dopuni recenicu.', 'Voy en ____.', 'autobus'),
        wordTranslation('spanish-travel-3', 'Napisi rec na spanskom.', 'karta', 'billete'),
      ]),
      createLesson('spanish-time', 10, 'Vreme', 'Dani i osnovni izrazi za vreme.', [
        multipleChoice(
          'spanish-time-1',
          'Sta znaci "hoy"?',
          [option('a', 'juce'), option('b', 'danas'), option('c', 'sutra'), option('d', 'nocas')],
          'b',
        ),
        fillBlank('spanish-time-2', 'Dopuni recenicu.', 'Hasta ____.', 'manana'),
        wordTranslation('spanish-time-3', 'Napisi rec na spanskom.', 'ponedeljak', 'lunes'),
      ]),
    ],
  },
];

export const languageCatalog = new LanguageCatalog(
  languageData.map((language) => new Language(language)),
);

export const languages = languageCatalog.getAllLanguages();
