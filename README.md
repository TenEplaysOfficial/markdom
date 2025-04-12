# Markdom

[![npm](https://img.shields.io/npm/v/@tenedev/markdom?color=blue&label=NPM&logo=npm&style=flat-square)](https://www.npmjs.com/package/@tenedev/markdom)
[![downloads](https://img.shields.io/npm/dt/@tenedev/markdom?color=blue&label=Downloads&logo=archive&style=flat-square)](https://www.npmjs.com/package/@tenedev/markdom)
![size](https://img.shields.io/bundlephobia/minzip/@tenedev/markdom?style=flat-square&label=Size&logo=webpack&color=blue)
![maintenance](https://img.shields.io/maintenance/active/2025?style=flat-square&label=Maintained&logo=calendar&color=blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-blue?logo=node.js&style=flat-square)
[![contribute](https://img.shields.io/badge/Contribute-Open%20PRs-blue?style=flat-square&logo=git)](https://github.com/TenEplaysOfficial/markdom/pulls)
[![stars](https://img.shields.io/github/stars/TenEplaysOfficial/markdom?style=flat-square&label=Stars&logo=github)](https://github.com/TenEplaysOfficial/markdom)
![forks](https://img.shields.io/github/forks/TenEplaysOfficial/markdom?style=flat-square&label=Forks&logo=github)
[![issues](https://img.shields.io/github/issues/TenEplaysOfficial/markdom?style=flat-square&label=Issues&logo=github&color=blue)](https://github.com/TenEplaysOfficial/markdom/issues)
[![last commit](https://img.shields.io/github/last-commit/TenEplaysOfficial/markdom?style=flat-square&label=Last%20Commit&logo=github&color=blue)](https://github.com/TenEplaysOfficial/markdom)
![workflow](https://img.shields.io/github/actions/workflow/status/TenEplaysOfficial/markdom/publish.yml?style=flat-square&label=Build&logo=githubactions&color=blue)
![license](https://img.shields.io/github/license/TenEplaysOfficial/markdom?style=flat-square&label=License&logo=open-source-initiative&color=blue)

`@tenedev/markdom` is a **Markdown parser** for Node.js that effortlessly converts **Markdown** files into **HTML** with automatic **Table of Contents (TOC)** generation, heading anchors, and more. Whether you’re building docs, wikis, or simply rendering Markdown to HTML, Markdom makes it easy to transform your Markdown into a beautiful, navigable HTML structure.

## 🚀 Key Features

- **📄 Markdown to HTML Parsing**: Converts Markdown to clean HTML, maintaining the original structure and formatting.
- **📑 Table of Contents (TOC)**: Automatically generates a TOC based on your Markdown headings.
- **🔗 Anchor Links for Headings**: Creates clickable anchor links for each heading, making navigation seamless.
- **🎨 Customizable**: Tailor the HTML and TOC generation to fit your needs.
- **🖥️ CLI Support**: Use the built-in CLI to quickly parse Markdown files and output HTML to a file.

## 🗂️ Table of Contents

- [Markdom](#markdom)
  - [🚀 Key Features](#-key-features)
  - [🗂️ Table of Contents](#️-table-of-contents)
  - [🛠️ Installation](#️-installation)
    - [Using `npm`:](#using-npm)
    - [Using `yarn`:](#using-yarn)
  - [📋 Prerequisites](#-prerequisites)
  - [🧑‍💻 How to Use](#-how-to-use)
    - [Node.js API](#nodejs-api)
      - [`markdom.parse` function returns:](#markdomparse-function-returns)
    - [📡 Command-Line Interface (CLI)](#-command-line-interface-cli)
  - [🛠️ API Documentation](#️-api-documentation)
    - [`markdom.parse(md: string): { html: string, toc: TOC[] }`](#markdomparsemd-string--html-string-toc-toc-)
  - [🗂️ Table of Contents (TOC) Generation](#️-table-of-contents-toc-generation)
    - [Resulting TOC:](#resulting-toc)
    - [Rendering of Headings](#rendering-of-headings)
  - [💻 Example Output](#-example-output)
    - [Input (Markdown):](#input-markdown)
    - [Output (HTML):](#output-html)
  - [🤝 Contributing](#-contributing)
  - [📜 License](#-license)

## 🛠️ Installation

To get started with `@tenedev/markdom`, install it using your preferred package manager:

### Using `npm`:

```bash
npm install @tenedev/markdom
```

### Using `yarn`:

```bash
yarn add @tenedev/markdom
```

---

## 📋 Prerequisites

- **Node.js** version 16.x or higher
- Basic familiarity with **Markdown syntax**

---

## 🧑‍💻 How to Use

### Node.js API

Import `@tenedev/markdom` into your project and start converting Markdown to HTML:

```ts
import { markdom } from '@tenedev/markdom';

// Example usage
const markdown = `# Example Heading\n\nThis is a sample markdown document.`;
const { html, toc } = markdom.parse(markdown);

console.log(html);
console.log(toc);
```

#### `markdom.parse` function returns:

- `html`: The generated HTML content.
- `toc`: An array of Table of Contents items, each containing:
  - `id`: Slugified heading ID
  - `title`: The heading text
  - `level`: Heading level (e.g., 1 for H1, 2 for H2, etc.)

---

### 📡 Command-Line Interface (CLI)

You can also use the powerful CLI provided by `@tenedev/markdom` to convert Markdown files directly from the terminal.

1. **Basic Usage**:

```bash
npx @tenedev/markdom <input.md>
```

2. **With Output Option**:

```bash
npx @tenedev/markdom <input.md> -o output.html
```

> **Note**: The `-o` option supports only `.html` or `.htm` extensions. Other file types will trigger an error.

---

## 🛠️ API Documentation

### `markdom.parse(md: string): { html: string, toc: TOC[] }`

**Parameters**:

- `md` (string): The input Markdown string to be parsed.

**Returns**:

- `html` (string): The resulting HTML content after parsing.
- `toc` (array): An array representing the Table of Contents, with each item containing:
  - `id` (string): A slugified version of the heading.
  - `title` (string): The title of the heading.
  - `level` (number): The level of the heading (1 for H1, 2 for H2, etc.).

---

## 🗂️ Table of Contents (TOC) Generation

The Table of Contents (TOC) is automatically generated and inserted at the `<!-- TOC-HERE -->` comment in your Markdown. For example:

```markdown
<!-- TOC-HERE -->

# Heading 1

Some content.

## Heading 2

More content.
```

### Resulting TOC:

```html
<nav class="markdown-toc">
  <ul>
    <li class="toc-level-1"><a href="#heading-1">Heading 1</a></li>
    <li class="toc-level-2"><a href="#heading-2">Heading 2</a></li>
  </ul>
</nav>
```

### Rendering of Headings

Markdown headings automatically receive anchor links for easy navigation:

```markdown
# Heading 1
```

This is rendered as:

```html
<h1 id="heading-1">
  <a href="#heading-1" class="heading-anchor">🔗</a> Heading 1
</h1>
```

---

## 💻 Example Output

### Input (Markdown):

```markdown
<!-- TOC-HERE -->

# Introduction

This is a Markdown document.

## Subheading 1

Details about subheading 1.

## Subheading 2

Details about subheading 2.
```

### Output (HTML):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="description"
      content="Markdom is a Markdown and HTML parser for Node.js with TOC generation and anchor support."
    />
    <title>Markdown Output - @tenedev/markdom</title>
  </head>
  <body>
    <h1 id="introduction">
      <a href="#introduction" class="heading-anchor">🔗</a> Introduction
    </h1>
    <p>This is a Markdown document.</p>

    <h2 id="subheading-1">
      <a href="#subheading-1" class="heading-anchor">🔗</a> Subheading 1
    </h2>
    <p>Details about subheading 1.</p>

    <h2 id="subheading-2">
      <a href="#subheading-2" class="heading-anchor">🔗</a> Subheading 2
    </h2>
    <p>Details about subheading 2.</p>

    <nav class="markdown-toc">
      <ul>
        <li class="toc-level-1"><a href="#introduction">Introduction</a></li>
        <li class="toc-level-2"><a href="#subheading-1">Subheading 1</a></li>
        <li class="toc-level-2"><a href="#subheading-2">Subheading 2</a></li>
      </ul>
    </nav>
  </body>
</html>
```

## 🤝 Contributing

We welcome contributions from the community!

If you have ideas, suggestions, or bug reports, feel free to [open an issue](https://github.com/TenEplaysOfficial/markdom/issues) or [submit a pull request](https://github.com/TenEplaysOfficial/markdom/pulls) on GitHub.

Let's make `@tenedev/markdom` better together!

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
Copyright © [TenEplaysOfficial](https://github.com/TenEplaysOfficial)
