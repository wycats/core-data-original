# ember-state

A reactive library for managing your application state.

# How it relates to services

|                   | Service                                                | Model                        |
| ----------------- | ------------------------------------------------------ | ---------------------------- |
| How many          | One per application instance                           | As many as you like          |
| Memory Management | Created as needed, destroyed when the app is destroyed | Loaded and unloaded manually |
| Analogy           | Reactive global variable                               | Spreadsheet                  |

**TL;DR** A service is basically a global variable that follows the rules of reactivity, and that your components can access. A model is like a database table: each table has many identifiable rows, and those rows can be loaded and unloaded as needed.

# Basic Data Types

Ember State has two basic kinds of data: column data and row references.

Column data is **atomic**, which means that the entire piece of data must be replaced at once. You must not mutate the inside of column data. If you do mutate the inside of column data, the changes will not be reflected in your application. JavaScript primitives (strings, booleans, numbers and the more recent symbols and big integers) are perfect for column data. You can use other kinds of JavaScript values (like objects, instances of classes or even functions) as long as you're careful not to mutate those values.

Row references are a special kind of column data that refers to another row. A row reference can refer to a row that already exists locally, or a row that has not yet been loaded. When a row reference refers to data that has not been loaded, we call it a _lazy row reference_. Lazy row references make it possible to implement lazy loading.

# The Local Database

Ember State presents a local database for you to interact with. The database contains:

- a subset of the data that is stored on your server
- data that exists locally and has not yet been saved to the server

# Local vs. Remote IDs

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-state
```

## Usage

[Longer description of how to use the addon in apps.]

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
