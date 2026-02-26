const fs = require("fs");
const { Parser } = require("n3");
const jsonld = require("jsonld");
const { RdfStore } = require("rdf-stores");
const { DataFactory } = require("rdf-data-factory");
const DF = new DataFactory();
const store = RdfStore.createDefault();

const ttlfilePath = "data.ttl";
const jsonldfilePath = "data.json";

function readTurtle(path) {
  const ttl = fs.readFileSync(path, "utf8");
  const parser = new Parser({ format: "text/turtle" });
  return parser.parse(ttl);
}

async function readJsonLd(path) {
  const doc = JSON.parse(fs.readFileSync(path, "utf8"));
  const nquads = await jsonld.toRDF(doc, { format: "application/n-quads" });
  const parser = new Parser({ format: "N-Quads" });
  return parser.parse(nquads);
}

function printQuads(quads) {
  for (const q of quads) {
    console.log({
      subject: q.subject.value,
      predicate: q.predicate.value,
      object: q.object.value,
      graph: q.graph.value || "default",
    });
  }
}

function addQuads(quads) {
  for (const q of quads) {
    store.addQuad(
      DF.quad(
        DF.namedNode(q.subject.value),
        DF.namedNode(q.predicate.value),
        q.object.termType === "Literal"
          ? DF.literal(q.object.value)
          : DF.namedNode(q.object.value),
        q.graph.value ? DF.namedNode(q.graph.value) : undefined,
      ),
    );
  }
}

(async () => {
  const ttlQuads = readTurtle(ttlfilePath);
  console.log("TURTLE:");
  printQuads(ttlQuads);
  addQuads(ttlQuads);
  console.log("-----------------------------");

  const jsonldQuads = await readJsonLd(jsonldfilePath);
  console.log("JSON-LD:");
  printQuads(jsonldQuads);
  addQuads(jsonldQuads);
  console.log("-----------------------------");

  const array = store.getQuads();
  console.log("All quads in the store:");
  console.log(array);
  console.log("-----------------------------");
  console.log("Number of quads in the store:", array.length);
})();
