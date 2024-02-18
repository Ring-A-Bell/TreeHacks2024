import {
    TogetherLLM,
    Document,
    VectorStoreIndex,
    serviceContextFromDefaults,
  } from "llamaindex";
    import fs from "fs/promises";
  
  async function main() {
    // Create an instance of the LLM
    const togetherLLM = new TogetherLLM({
      apiKey: "0c8ec8dc3bef5da9caac0a8015afd179226c6fbe37b68a86b3f1df82f9b33fa0",
    });

    const essay = await fs.readFile(
        "node_modules/llamaindex/examples/abramov.txt",
        "utf-8",
      );
    // Create a service context
    const serviceContext = serviceContextFromDefaults({ llm: togetherLLM });
  
    const document = new Document({ text: essay, id_: "essay" });
    console.log(document);
  
    // Load and index documents
    const index = await VectorStoreIndex.fromDocuments([document], {
      serviceContext,
    });
  
    // get retriever
    const retriever = index.asRetriever();
  
    // Create a query engine
    const queryEngine = index.asQueryEngine({
      retriever,
    });
  
    const query = "What is the meaning of life?";
  
    // Query
    const response = await queryEngine.query({
      query,
    });
  
    // Log the response
    console.log(response);
  }