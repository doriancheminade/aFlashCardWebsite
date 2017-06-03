export class Example {
    en: string;
    ru: string;
}

export class Translation {
    info: string;
    translation: string;
    example: Example;
}

export class Card {
    name: string;
    type: string;
    word: string;
    translation: Translation[];
}
