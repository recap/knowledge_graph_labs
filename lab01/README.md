## Questions and answers

- What is an advantage of using JSON-LD format? What is an advantage of using Turtle format? For both formats, provide a situation where it is best to use this format over the other.

Being JSON based, JSON-LD integrates better with we applications as it is lees prone to get currupted in transit and web tools have strong support for parsing JSON. Turtle is more human readable and can be easily edited by hand, making it a good choice for small datasets or when the data needs to be easily understood by humans.
When engineering a web API it is best to stick with JSON-LD in responses. While when requiring humans to read and edit data, Turtle is a better choice giving its readability and ease of use.

- Is the triple count output correct?

The triple count output is correct. The number of triples in the dataset is 11, which matches the expected count based on the data provided. Since Turtle and JSON-LD contained the same tripples, duplicates are ignored in an RDF store since it acts as a SET of triples.

## Installation and use

```
npm install
node app.js
```
