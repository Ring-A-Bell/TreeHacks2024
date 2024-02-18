import fs from "node:fs/promises";
import dotenv from "dotenv";

dotenv.config();

import {
  Document,
  IngestionPipeline,
  MetadataMode,
  OpenAIEmbedding,
  TitleExtractor,
  SimpleNodeParser,
} from "llamaindex";

async function main() {
  // Load essay from abramov.txt in Node
  const path = "C:\\Users\\Admin\\OneDrive\\GitHub\\kaun-paada\\output_chunk_1.csv";

  const essay = await fs.readFile(path, "utf-8");

  // Create Document object with essay
const document = new Document({ text: essay, id_: path });
const pipeline = new IngestionPipeline({
    transformations: [
        new SimpleNodeParser({ chunkSize: 1024, chunkOverlap: 20 }),
        new TitleExtractor(),
        new OpenAIEmbedding(), // Fix: Use 'maxTokens' instead of 'max_tokens'
    ],
});

// run the pipeline
const nodes = await pipeline.run({ documents: [document] });

  // print out the result of the pipeline run
  for (const node of nodes) {
    console.log(node.getContent(MetadataMode.NONE));
  }
}

main().catch(console.error);