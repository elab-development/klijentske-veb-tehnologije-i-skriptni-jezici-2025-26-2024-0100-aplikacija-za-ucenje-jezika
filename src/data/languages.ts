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
          'Šta znači "Hello"?',
          [option('a', 'Doviđenja'), option('b', 'Zdravo'), option('c', 'Hvala'), option('d', 'Molim')],
          'b',
        ),
        fillBlank('english-greetings-2', 'Dopuni pozdrav.', 'Good ____!', 'morning'),
        wordTranslation('english-greetings-3', 'Napiši reč na engleskom.', 'Hvala', 'thank you'),
      ]),
      createLesson('english-family', 2, 'Porodica', 'Reči za članove porodice.', [
        multipleChoice(
          'english-family-1',
          'Šta znači "father"?',
          [option('a', 'majka'), option('b', 'otac'), option('c', 'brat'), option('d', 'sestra')],
          'b',
        ),
        fillBlank('english-family-2', 'Dopuni rečenicu.', 'This is my ____.', 'mother'),
        wordTranslation('english-family-3', 'Napiši reč na engleskom.', 'brat', 'brother'),
      ]),
      createLesson('english-numbers', 3, 'Brojevi', 'Brojanje i osnovni brojevi.', [
        multipleChoice(
          'english-numbers-1',
          'Šta znači "seven"?',
          [option('a', 'pet'), option('b', 'šest'), option('c', 'sedam'), option('d', 'osam')],
          'c',
        ),
        fillBlank('english-numbers-2', 'Dopuni niz.', 'One, two, ____.', 'three'),
        wordTranslation('english-numbers-3', 'Napiši reč na engleskom.', 'deset', 'ten'),
      ]),
      createLesson('english-colors', 4, 'Boje', 'Najčešće boje u svakodnevnom govoru.', [
        multipleChoice(
          'english-colors-1',
          'Šta znači "blue"?',
          [option('a', 'plava'), option('b', 'crvena'), option('c', 'zelena'), option('d', 'žuta')],
          'a',
        ),
        fillBlank('english-colors-2', 'Dopuni opis.', 'The sun is ____.', 'yellow'),
        wordTranslation('english-colors-3', 'Napiši reč na engleskom.', 'crvena', 'red'),
      ]),
      createLesson('english-food', 5, 'Hrana', 'Osnovne reči za hranu.', [
        multipleChoice(
          'english-food-1',
          'Šta znači "bread"?',
          [option('a', 'mleko'), option('b', 'hleb'), option('c', 'sir'), option('d', 'jaje')],
          'b',
        ),
        fillBlank('english-food-2', 'Dopuni rečenicu.', 'I drink ____.', 'water'),
        wordTranslation('english-food-3', 'Napiši reč na engleskom.', 'jabuka', 'apple'),
      ]),
      createLesson('english-animals', 6, 'Životinje', 'Nazivi poznatih životinja.', [
        multipleChoice(
          'english-animals-1',
          'Šta znači "dog"?',
          [option('a', 'mačka'), option('b', 'pas'), option('c', 'ptica'), option('d', 'konj')],
          'b',
        ),
        fillBlank('english-animals-2', 'Dopuni rečenicu.', 'A ____ says meow.', 'cat'),
        wordTranslation('english-animals-3', 'Napiši reč na engleskom.', 'riba', 'fish'),
      ]),
      createLesson('english-home', 7, 'Kuća', 'Prostorije i predmeti u kući.', [
        multipleChoice(
          'english-home-1',
          'Šta znači "kitchen"?',
          [option('a', 'kupatilo'), option('b', 'kuhinja'), option('c', 'soba'), option('d', 'vrata')],
          'b',
        ),
        fillBlank('english-home-2', 'Dopuni rečenicu.', 'I sleep in the ____.', 'bedroom'),
        wordTranslation('english-home-3', 'Napiši reč na engleskom.', 'sto', 'table'),
      ]),
      createLesson('english-school', 8, 'Škola', 'Predmeti i školski pribor.', [
        multipleChoice(
          'english-school-1',
          'Šta znači "book"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('english-school-2', 'Dopuni rečenicu.', 'I write with a ____.', 'pencil'),
        wordTranslation('english-school-3', 'Napiši reč na engleskom.', 'učitelj', 'teacher'),
      ]),
      createLesson('english-travel', 9, 'Putovanje', 'Reči za putovanja i prevoz.', [
        multipleChoice(
          'english-travel-1',
          'Šta znači "train"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('english-travel-2', 'Dopuni rečenicu.', 'I go by ____.', 'bus'),
        wordTranslation('english-travel-3', 'Napiši reč na engleskom.', 'karta', 'ticket'),
      ]),
      createLesson('english-time', 10, 'Vreme', 'Dani, sati i osnovni izrazi za vreme.', [
        multipleChoice(
          'english-time-1',
          'Šta znači "today"?',
          [option('a', 'juče'), option('b', 'danas'), option('c', 'sutra'), option('d', 'noćas')],
          'b',
        ),
        fillBlank('english-time-2', 'Dopuni rečenicu.', 'See you ____.', 'tomorrow'),
        wordTranslation('english-time-3', 'Napiši reč na engleskom.', 'ponedeljak', 'monday'),
      ]),
    ],
  },
  {
    id: 'german',
    name: 'Nemački',
    shortCode: 'de',
    nativeName: 'Deutsch',
    lessons: [
      createLesson('german-greetings', 1, 'Pozdravi', 'Osnovni nemački pozdravi.', [
        multipleChoice(
          'german-greetings-1',
          'Šta znači "Hallo"?',
          [option('a', 'Zdravo'), option('b', 'Hvala'), option('c', 'Molim'), option('d', 'Doviđenja')],
          'a',
        ),
        fillBlank('german-greetings-2', 'Dopuni pozdrav.', 'Guten ____!', 'Morgen'),
        wordTranslation('german-greetings-3', 'Napiši reč na nemačkom.', 'hvala', 'danke'),
      ]),
      createLesson('german-family', 2, 'Porodica', 'Članovi porodice na nemačkom.', [
        multipleChoice(
          'german-family-1',
          'Šta znači "Mutter"?',
          [option('a', 'otac'), option('b', 'majka'), option('c', 'brat'), option('d', 'dete')],
          'b',
        ),
        fillBlank('german-family-2', 'Dopuni rečenicu.', 'Das ist mein ____.', 'Vater'),
        wordTranslation('german-family-3', 'Napiši reč na nemačkom.', 'sestra', 'Schwester'),
      ]),
      createLesson('german-numbers', 3, 'Brojevi', 'Brojanje na nemačkom.', [
        multipleChoice(
          'german-numbers-1',
          'Šta znači "vier"?',
          [option('a', 'dva'), option('b', 'tri'), option('c', 'četiri'), option('d', 'pet')],
          'c',
        ),
        fillBlank('german-numbers-2', 'Dopuni niz.', 'Eins, zwei, ____.', 'drei'),
        wordTranslation('german-numbers-3', 'Napiši reč na nemačkom.', 'deset', 'zehn'),
      ]),
      createLesson('german-colors', 4, 'Boje', 'Osnovne boje na nemačkom.', [
        multipleChoice(
          'german-colors-1',
          'Šta znači "rot"?',
          [option('a', 'plava'), option('b', 'crvena'), option('c', 'zelena'), option('d', 'bela')],
          'b',
        ),
        fillBlank('german-colors-2', 'Dopuni opis.', 'Die Sonne ist ____.', 'gelb'),
        wordTranslation('german-colors-3', 'Napiši reč na nemačkom.', 'plava', 'blau'),
      ]),
      createLesson('german-food', 5, 'Hrana', 'Namirnice i jednostavni izrazi.', [
        multipleChoice(
          'german-food-1',
          'Šta znači "Brot"?',
          [option('a', 'hleb'), option('b', 'mleko'), option('c', 'jaje'), option('d', 'sir')],
          'a',
        ),
        fillBlank('german-food-2', 'Dopuni rečenicu.', 'Ich trinke ____.', 'Wasser'),
        wordTranslation('german-food-3', 'Napiši reč na nemačkom.', 'jabuka', 'Apfel'),
      ]),
      createLesson('german-animals', 6, 'Životinje', 'Česte životinje na nemačkom.', [
        multipleChoice(
          'german-animals-1',
          'Šta znači "Hund"?',
          [option('a', 'mačka'), option('b', 'pas'), option('c', 'konj'), option('d', 'riba')],
          'b',
        ),
        fillBlank('german-animals-2', 'Dopuni rečenicu.', 'Eine ____ sagt miau.', 'Katze'),
        wordTranslation('german-animals-3', 'Napiši reč na nemačkom.', 'ptica', 'Vogel'),
      ]),
      createLesson('german-home', 7, 'Kuća', 'Prostorije i predmeti u kući.', [
        multipleChoice(
          'german-home-1',
          'Šta znači "Küche"?',
          [option('a', 'soba'), option('b', 'kuhinja'), option('c', 'vrata'), option('d', 'kupatilo')],
          'b',
        ),
        fillBlank('german-home-2', 'Dopuni rečenicu.', 'Ich schlafe im ____.', 'Schlafzimmer'),
        wordTranslation('german-home-3', 'Napiši reč na nemačkom.', 'sto', 'Tisch'),
      ]),
      createLesson('german-school', 8, 'Škola', 'Školski pojmovi na nemačkom.', [
        multipleChoice(
          'german-school-1',
          'Šta znači "Buch"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('german-school-2', 'Dopuni rečenicu.', 'Ich schreibe mit einem ____.', 'Bleistift'),
        wordTranslation('german-school-3', 'Napiši reč na nemačkom.', 'učitelj', 'Lehrer'),
      ]),
      createLesson('german-travel', 9, 'Putovanje', 'Prevoz i putovanja na nemačkom.', [
        multipleChoice(
          'german-travel-1',
          'Šta znači "Zug"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('german-travel-2', 'Dopuni rečenicu.', 'Ich fahre mit dem ____.', 'Bus'),
        wordTranslation('german-travel-3', 'Napiši reč na nemačkom.', 'karta', 'Fahrkarte'),
      ]),
      createLesson('german-time', 10, 'Vreme', 'Dani i osnovni izrazi za vreme.', [
        multipleChoice(
          'german-time-1',
          'Šta znači "heute"?',
          [option('a', 'juče'), option('b', 'danas'), option('c', 'sutra'), option('d', 'noćas')],
          'b',
        ),
        fillBlank('german-time-2', 'Dopuni rečenicu.', 'Bis ____.', 'morgen'),
        wordTranslation('german-time-3', 'Napiši reč na nemačkom.', 'ponedeljak', 'Montag'),
      ]),
    ],
  },
  {
    id: 'spanish',
    name: 'Španski',
    shortCode: 'es',
    nativeName: 'Español',
    lessons: [
      createLesson('spanish-greetings', 1, 'Pozdravi', 'Osnovni španski pozdravi.', [
        multipleChoice(
          'spanish-greetings-1',
          'Šta znači "Hola"?',
          [option('a', 'Zdravo'), option('b', 'Hvala'), option('c', 'Molim'), option('d', 'Doviđenja')],
          'a',
        ),
        fillBlank('spanish-greetings-2', 'Dopuni pozdrav.', 'Buenos ____!', 'días'),
        wordTranslation('spanish-greetings-3', 'Napiši reč na španskom.', 'hvala', 'gracias'),
      ]),
      createLesson('spanish-family', 2, 'Porodica', 'Članovi porodice na španskom.', [
        multipleChoice(
          'spanish-family-1',
          'Šta znači "madre"?',
          [option('a', 'otac'), option('b', 'majka'), option('c', 'brat'), option('d', 'dete')],
          'b',
        ),
        fillBlank('spanish-family-2', 'Dopuni rečenicu.', 'Este es mi ____.', 'padre'),
        wordTranslation('spanish-family-3', 'Napiši reč na španskom.', 'sestra', 'hermana'),
      ]),
      createLesson('spanish-numbers', 3, 'Brojevi', 'Brojanje na španskom.', [
        multipleChoice(
          'spanish-numbers-1',
          'Šta znači "cinco"?',
          [option('a', 'tri'), option('b', 'četiri'), option('c', 'pet'), option('d', 'šest')],
          'c',
        ),
        fillBlank('spanish-numbers-2', 'Dopuni niz.', 'Uno, dos, ____.', 'tres'),
        wordTranslation('spanish-numbers-3', 'Napiši reč na španskom.', 'deset', 'diez'),
      ]),
      createLesson('spanish-colors', 4, 'Boje', 'Osnovne boje na španskom.', [
        multipleChoice(
          'spanish-colors-1',
          'Šta znači "verde"?',
          [option('a', 'plava'), option('b', 'zelena'), option('c', 'crvena'), option('d', 'žuta')],
          'b',
        ),
        fillBlank('spanish-colors-2', 'Dopuni opis.', 'El sol es ____.', 'amarillo'),
        wordTranslation('spanish-colors-3', 'Napiši reč na španskom.', 'plava', 'azul'),
      ]),
      createLesson('spanish-food', 5, 'Hrana', 'Namirnice i jednostavni izrazi.', [
        multipleChoice(
          'spanish-food-1',
          'Šta znači "pan"?',
          [option('a', 'hleb'), option('b', 'mleko'), option('c', 'sir'), option('d', 'jaje')],
          'a',
        ),
        fillBlank('spanish-food-2', 'Dopuni rečenicu.', 'Yo bebo ____.', 'agua'),
        wordTranslation('spanish-food-3', 'Napiši reč na španskom.', 'jabuka', 'manzana'),
      ]),
      createLesson('spanish-animals', 6, 'Životinje', 'Česte životinje na španskom.', [
        multipleChoice(
          'spanish-animals-1',
          'Šta znači "perro"?',
          [option('a', 'mačka'), option('b', 'pas'), option('c', 'konj'), option('d', 'riba')],
          'b',
        ),
        fillBlank('spanish-animals-2', 'Dopuni rečenicu.', 'Un ____ dice miau.', 'gato'),
        wordTranslation('spanish-animals-3', 'Napiši reč na španskom.', 'ptica', 'pájaro'),
      ]),
      createLesson('spanish-home', 7, 'Kuća', 'Prostorije i predmeti u kući.', [
        multipleChoice(
          'spanish-home-1',
          'Šta znači "cocina"?',
          [option('a', 'kupatilo'), option('b', 'kuhinja'), option('c', 'soba'), option('d', 'vrata')],
          'b',
        ),
        fillBlank('spanish-home-2', 'Dopuni rečenicu.', 'Duermo en el ____.', 'dormitorio'),
        wordTranslation('spanish-home-3', 'Napiši reč na španskom.', 'sto', 'mesa'),
      ]),
      createLesson('spanish-school', 8, 'Škola', 'Školski pojmovi na španskom.', [
        multipleChoice(
          'spanish-school-1',
          'Šta znači "libro"?',
          [option('a', 'knjiga'), option('b', 'olovka'), option('c', 'tabla'), option('d', 'torba')],
          'a',
        ),
        fillBlank('spanish-school-2', 'Dopuni rečenicu.', 'Escribo con un ____.', 'lápiz'),
        wordTranslation('spanish-school-3', 'Napiši reč na španskom.', 'učitelj', 'profesor'),
      ]),
      createLesson('spanish-travel', 9, 'Putovanje', 'Prevoz i putovanja na španskom.', [
        multipleChoice(
          'spanish-travel-1',
          'Šta znači "tren"?',
          [option('a', 'avion'), option('b', 'voz'), option('c', 'auto'), option('d', 'brod')],
          'b',
        ),
        fillBlank('spanish-travel-2', 'Dopuni rečenicu.', 'Voy en ____.', 'autobús'),
        wordTranslation('spanish-travel-3', 'Napiši reč na španskom.', 'karta', 'billete'),
      ]),
      createLesson('spanish-time', 10, 'Vreme', 'Dani i osnovni izrazi za vreme.', [
        multipleChoice(
          'spanish-time-1',
          'Šta znači "hoy"?',
          [option('a', 'juče'), option('b', 'danas'), option('c', 'sutra'), option('d', 'noćas')],
          'b',
        ),
        fillBlank('spanish-time-2', 'Dopuni rečenicu.', 'Hasta ____.', 'mañana'),
        wordTranslation('spanish-time-3', 'Napiši reč na španskom.', 'ponedeljak', 'lunes'),
      ]),
    ],
  },
];

export const languageCatalog = new LanguageCatalog(
  languageData.map((language) => new Language(language)),
);

export const languages = languageCatalog.getAllLanguages();
