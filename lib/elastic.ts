import { Client } from "@elastic/elasticsearch";

const client = new Client({
    node: 'https://my-elasticsearch-project-c8085e.es.us-east-1.aws.elastic.cloud:443',
    auth: {
        apiKey: process.env.ELASTIC_API_KEY || "",
    },
});

const index = "treehacks";
// const docs = [
//     {
//         "text": "Yellowstone National Park is one of the largest national parks in the United States. It ranges from the Wyoming to Montana and Idaho, and contains an area of 2,219,791 acress across three different states. Its most famous for hosting the geyser Old Faithful and is centered on the Yellowstone Caldera, the largest super volcano on the American continent. Yellowstone is host to hundreds of species of animal, many of which are endangered or threatened. Most notably, it contains free-ranging herds of bison and elk, alongside bears, cougars and wolves. The national park receives over 4.5 million visitors annually and is a UNESCO World Heritage Site."
//     },
//     {
//         "text": "Yosemite National Park is a United States National Park, covering over 750,000 acres of land in California. A UNESCO World Heritage Site, the park is best known for its granite cliffs, waterfalls and giant sequoia trees. Yosemite hosts over four million visitors in most years, with a peak of five million visitors in 2016. The park is home to a diverse range of wildlife, including mule deer, black bears, and the endangered Sierra Nevada bighorn sheep. The park has 1,200 square miles of wilderness, and is a popular destination for rock climbers, with over 3,000 feet of vertical granite to climb. Its most famous and cliff is the El Capitan, a 3,000 feet monolith along its tallest face."
//     },
//     {
//         "text": "Rocky Mountain National Park  is one of the most popular national parks in the United States. It receives over 4.5 million visitors annually, and is known for its mountainous terrain, including Longs Peak, which is the highest peak in the park. The park is home to a variety of wildlife, including elk, mule deer, moose, and bighorn sheep. The park is also home to a variety of ecosystems, including montane, subalpine, and alpine tundra. The park is a popular destination for hiking, camping, and wildlife viewing, and is a UNESCO World Heritage Site."
//     }
// ];

// // First ensure index exists with proper mapping
// const initializeIndex = async () => {
//     try {
//         const exists = await client.indices.exists({ index });
//         if (!exists) {
//             await client.indices.create({ index });
//         }
        
//         // Update mapping to use semantic search
//         await client.indices.putMapping({
//             index,
//             properties: {
//                 text: {
//                     type: "text",
//                     fields: {
//                         semantic: {
//                             type: "dense_vector",
//                             dims: 384,
//                             model_id: ".elser_model_1",
//                             similarity: "cosine"
//                         }
//                     }
//                 }
//             }
//         });
//     } catch (error) {
//         console.error("Error initializing index:", error);
//     }
// };

// // Initialize on module load
// initializeIndex();

const ingestData = async (data: any) => {
    const bulkIngestResponse = await client.helpers.bulk({
        index,
        datasource: data,
        onDocument() {
            return {
                index: {}
            };
        }
    });

    console.log(bulkIngestResponse);
}

const searchFor = async (q: string) => {
    try {
        // First check if index exists and get its mappings
        const indexExists = await client.indices.exists({
            index: "treehacks"
        });
        
        if (!indexExists) {
            console.error("Index 'treehacks' does not exist!");
            return;
        }

        const mappings = await client.indices.getMapping({
            index: "treehacks"
        });
        console.log("Index mappings:", JSON.stringify(mappings, null, 2));

        // Try a more general search query
        console.log("Searching for:", q);
        const searchResponse = await client.search({
            index: "treehacks",
            query: {
                fuzzy: {
                    body: q
                }
            },
        });

        console.log("Total hits:", searchResponse.hits.total);
        console.log("Search response:", JSON.stringify(searchResponse.hits, null, 2));
        
        return searchResponse.hits;
    } catch (error) {
        console.error("Error during search:", error);
        throw error;
    }
}
export { ingestData, searchFor };