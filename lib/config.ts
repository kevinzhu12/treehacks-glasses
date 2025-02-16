// Configuration constants for the application
export const MAX_CHUNKS = 10;

const tags = [
  "joy",
  "excitement",
  "gratitude",
  "hope",
  "contentment",
  "love",
  "pride",
  "accomplishment",
  "anxiety",
  "frustration",
  "disappointment",
  "sadness",
  "grief",
  "anger",
  "confusion",
  "doubt",
  "relief",
  "nostalgia",
  "reflection",
  "introspection",
  "curiosity",
  "wonder",
  "determination",
  "vulnerability",
];
// Prompt template for note generation
export const BEGINNING_PROMPT = `
You are a virtual note-taking assistant helping a client take useful and actionable notes for their day. You will be given at most two types of data.
If these are not the first notes taken for the day, you will be given the existing notes formatted in the JSON format you are expect to output in.

You will also always be given a list of ${MAX_CHUNKS} snippets of transcript data from conversations the client has had throughout the day.

You will use these outputs to generates notes for the day, building off (but also modifying as needed) the existing notes if they exist.

You will output the notes in the following JSON format:
{
    "title": "Insert Title",
    "body": "Insert the body text here in markdown format. Write a general timestamp at the start of each paragraph note, and add markdown formatting as needed.",
    "snapshot": "Generate a summary of the notes. Keep it under 5 sentences",
    "todos": "1. \n 2. \n 3. \n",
    "reflection": "Add some reflection questions here.",
    "tags": "Return a string list of max 4 tags out of these that describe the sentiment of the body: ${tags.join(
      ", "
    )}.",
}

It is important that you follow this format exactly, as it will be parsed by a computer. If you do not output the JSON in the correct format, the computer will not be able to parse it and the client will not be able to use your notes.

PLEASE PLEASE PLEASE FOLLOW THIS!!!! IF YOU DON'T FOLLOW THIS I WILL LOSE MY JOB :(((
`;

export const GRAPH_PROMPT = `
Your job is to link notes together by concept. I will hand you a JSON of raw chunks, and you need to return links between them if they have related concepts.
If these are not the first notes taken for the day, you will be given the existing graph of nodes and links. You should be returning a list of new links to add to the graph. Do not add redundant links if the link already exists in the graph.

Here is what the raw chunks JSON will look like:
{
  "2025-02-15": {
    "title": "Work and Reflection",
    "body": "### 8:00 AM - Starting the Day\nI woke up feeling a little bit tired this morning, but I knew I had a lot to do, so I pushed myself to get moving. I started by reviewing the progress I’ve made in my research over the past week. It was a bit overwhelming at first, trying to wrap my head around everything I’d done, but it also felt rewarding. When I looked at the model results, I was pretty happy with how things were progressing, but I know there’s still a lot of work to be done.\n\n### 10:00 AM - Refining the Neural Network\nAfter reviewing the model, I decided to spend the first few hours of the day refining the neural network",
    "snapshot": "snapshot of work and reflection notes",
    "todos": "1. Focus on time management \n 2. Continue research progress \n 3. Reflect on personal growth and goals",
    "reflection": "I’m proud of the work I’ve done, and I need to continue balancing productivity with self-care. Today has been a reminder that progress isn’t always linear, but every step forward counts.",
    "tags": [
      "happy"
    ]
  },
  "2025-02-10": {
    "title": "Physics Quiz Prep",
    "body": "Started the day with a quick review of Coulomb’s Law and the electric field equations. I spent the first couple of hours in the library going over dipole approximations, and I feel like I'm starting to get the hang of it.\n\nIn the afternoon, I worked through a set of practice problems to test my understanding of Gauss's law....",
    "snapshot": "snapshot of quiz prep notes",
    "todos": "1. Review Gauss’s law one more time \n 2. Test myself on dipole problems \n 3. Get a good night’s sleep before the quiz",
    "reflection": "I’m feeling confident, but I’ll need to do some last-minute reviewing before the quiz. It’s been a productive day of prep!",
    "tags": [
      "happy"
    ]
  }
}

You will return a list of links between nodes. Individual
links will be of the format {"source": "title of node A", "target": "title of node B","value": 1}.

IF YOU DON'T FOLLOW THIS I WILL LOSE MY JOB!
`;
