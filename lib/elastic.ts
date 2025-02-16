import { Client } from "@elastic/elasticsearch";

const client = new Client({
node: 'https://my-elasticsearch-project-c8085e.es.us-east-1.aws.elastic.cloud:443',
auth: {
  apiKey: "eGlpTkRKVUJUdGxWc0NPdmdUeno6eE5OOWlFTmh6RE1wbDlacWtWZTlHUQ=="
}
});

const index = "treehacks";
const mapping = {
  "text": {
    "type": "semantic_text"
  }
};
const updateMappingResponse = await client.indices.putMapping({
  index,
  properties: mapping,
});
console.log(updateMappingResponse);