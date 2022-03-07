type IdType = 'numeric' | 'alphanumeric';

interface ICreateIdOptions {
  prefix?: string;
  idLength?: number;
}

if (require.main === module) {
  const Readline = require('readline');

  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question1: () => Promise<string> = () => {
    return new Promise((resolve, reject) => {
      const msg =
        "What kind of ID-Generator do you want? (Type: 'numeric' or 'alphanumeric'): ";

      readline.question(msg, (answer: string) => {
        if (answer.trim() === '') {
          return reject(Error('Cannot enter an empty string'));
        }
        if (answer.trim() !== 'numeric' && answer.trim() !== 'alphanumeric') {
          return reject(Error("Must enter either 'numeric' or 'alphanumeric'"));
        }
        resolve(answer.trim());
      });
    });
  };

  const question2: () => Promise<number> = () => {
    return new Promise((resolve, reject) => {
      const msg = 'How long do you want the ID to be? (default chars: 9) ';

      readline.question(msg, (answer: string) => {
        const parsedAnswer = parseInt(answer, 10);

        if (answer === '') {
          resolve(9);
          return;
        }
        if (Number.isNaN(parsedAnswer)) {
          return reject(TypeError('Must enter a valid number'));
        }
        resolve(parsedAnswer);
      });
    });
  };

  const question3: () => Promise<string> = () => {
    return new Promise((resolve, reject) => {
      const msg = 'Enter id prefix: ';

      readline.question(msg, (answer: string) => {
        resolve(answer.trim());
      });
    });
  };

  async function run() {
    const numericOrAlphaNumeric = (await question1()) as IdType;
    const idLength = await question2();
    const idPrefix = await question3();
    const idGenerator = new IdGenerator(numericOrAlphaNumeric);
    const generatedId = idGenerator.createId({ prefix: idPrefix, idLength });
    console.log('');
    console.log(`OUTPUT: ${generatedId}`);
    readline.close();
  }

  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export default class IdGenerator {
  private _type: IdType;

  public constructor(type: IdType) {
    this._type = type;
  }

  public createId(options?: ICreateIdOptions): string {
    const DEFAULT_ID_PREFIX = '';
    const DEFAULT_ID_LENGTH = 9;

    const idChars = this._getCharsList();

    if (!options) return this._buildRandomString(idChars, DEFAULT_ID_LENGTH);

    let idPrefix = options.prefix || DEFAULT_ID_PREFIX;
    let idLength = options.idLength || DEFAULT_ID_LENGTH;

    const randomString = this._buildRandomString(idChars, idLength);

    return idPrefix + randomString;
  }

  private _getCharsList(): string[] {
    const alphaCharsCaps = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const alphaCharsLower = [...'abcdefghijklmnopqrstuvwxyz'];
    const numericChars = [...'0123456789'];

    const idCharsDictionary: Record<IdType, string[]> = {
      numeric: numericChars,
      alphanumeric: [...alphaCharsCaps, ...numericChars, ...alphaCharsLower]
    };

    return idCharsDictionary[this._type] || numericChars;
  }

  private _buildRandomString(
    charsList: string[],
    stringLength: number
  ): string {
    const stringPlaceholder = [...Array(stringLength)];

    return stringPlaceholder
      .map((el) => charsList[(Math.random() * charsList.length) | 0])
      .join('');
  }
}
