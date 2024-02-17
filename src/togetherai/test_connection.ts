const sdk = require('api')('@togetherdocs/v0.2#gdyr1qlrl2waw6');

sdk.auth('Bearer 0c8ec8dc3bef5da9caac0a8015afd179226c6fbe37b68a86b3f1df82f9b33fa0');
sdk.inference({
  model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
  prompt: '<s>[INST] What is the capital of France? [/INST]',
  max_tokens: 512,
  stop: ['</s>', '[/INST]'],
  temperature: 0.7,
  top_p: 0.7,
  top_k: 50,
  repetition_penalty: 1,
  n: 1
})
    .then(({ data }: { data: any }) => console.log(data))
    .catch((err: any) => console.error(err));
