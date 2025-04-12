#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import ora from 'ora';
import { markdom } from './index';

const pkgPath = new URL('../package.json', import.meta.url);
const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

yargs(hideBin(process.argv))
  .scriptName('@tenedev/markdom')
  .usage('Usage: $0 <input> [options]')
  .command(
    '$0 <input>',
    'Parse a Markdown file and optionally output HTML',
    (yargs) => {
      return yargs
        .positional('input', {
          describe: 'Path to input Markdown file',
          type: 'string',
          demandOption: true,
        })
        .option('output', {
          alias: 'o',
          describe: 'Path to output HTML file',
          type: 'string',
        });
    },
    ({ input, output }) => {
      const spinner = ora('Loading... Parsing your Markdown file').start();

      if (!fs.existsSync(input)) {
        console.error(`❌ File not found: ${input}`);
        process.exit(1);
      }

      const markdown = fs.readFileSync(input, 'utf-8');
      spinner.text = 'Processing Markdown...';

      try {
        const parsed = markdom.parse(markdown);
        let html = parsed.html;

        html = `<!DOCTYPE html>
                <html lang="en">
                <head> 
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="description" content="Markdom is a Markdown and HTML parser for Node.js with TOC generation and anchor support.">
                <title>Markdown Output - @tenedev/markdom</title>
                </head>
                <body>
                  ${html}
                </body>
                </html>`;

        if (output) {
          const ext = path.extname(output).toLowerCase();
          if (ext !== '.html' && ext !== '.htm') {
            spinner.fail(
              '❌ Invalid output file extension. Please use .html or .htm.',
            );
            process.exit(1);
          }

          fs.writeFileSync(output, html);
        } else {
          console.log(html);
        }

        spinner.succeed('Markdown successfully parsed!');
      } catch (err) {
        spinner.fail('Failed to parse the Markdown file');
        console.error(err);
        process.exit(1);
      }
    },
  )
  .help()
  .version(version)
  .strict()
  .parse();
