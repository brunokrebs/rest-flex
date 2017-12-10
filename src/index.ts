import * as parseArgs from 'command-line-args';

export {
  howdy, hello
}

function howdy(name: string): string {
  return `Hi, ${name}`;
}

function hello(): string {
  return 'Hello!';
}

// running if called directly (i.e. through `node rest-flex`)
if (require.main === module) {
  const argsDefinitions = [
    { name: 'name', type: String }
  ];

  const args = parseArgs(argsDefinitions, { partial: true });

  console.log(howdy(args.name));
}
