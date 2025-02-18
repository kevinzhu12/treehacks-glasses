## Mirror 

> Reflecting on your past work, relationships, and learning has never been easier. Mirror turns your minute-to-minute into a comprehensive and indexable knowledge base in the form of a journal.

Mirror is an AI-powered app compatible on all AugmentOS-enabled smart glasses which transcribes your conversations and generates actionable insights and summaries tuned for reflection in real time. Our processing agents will automatically update on the Mirror web interface as you speak, intelligently picking out the most appropriate points to give a well-rounded overview of your day, extracting todos, a general snapshot of your day, and important reflection questions.

*by: Sarah Su, Claire Wang, Kevin Zhu, Sanjith Udupa*

![Cover photo](https://github.com/kevinzhu12/treehacks-glasses/blob/main/public/readme/mirror_cover.png)

Mirror is built in 3 parts:

The AugmentOS Smart Glasses Client is an Android application written in Java which handles the interface with the smart glasses – handling both the voice transcription and relaying text back to the user via the display. Shoutout to the [Mentra](https://mentra.glass/) team for providing mentorship and lending us the [Even Realities G1](https://www.evenrealities.com/g1) Glasses that we built Mirror to work with.

The backend is written in TypeScript via NextJS and handles interactions with both the smart glasses client and the web interface. Using ElasticSearch, Mistral AI, Vercel’s NextJS, and Codeium’s Windsurf, we created an intuitive interface to interact with your thoughts throughout the day.

![Cover photo](https://github.com/kevinzhu12/treehacks-glasses/blob/main/public/readme/notes_sc.png)

**Watch our video:**

[![Video](https://img.youtube.com/vi/3FzmbTFD_9I/maxresdefault.jpg)](https://www.youtube.com/watch?v=3FzmbTFD_9I)


Link to [Android app repo](https://github.com/sarahjsu/tree_augmentos).

You can run the app yourself by using Android Studio (and combining the AugmentOS/Core app on an android phone with any smart glasses that has a mic) and sending a Pinggy tunnel to our web server. 
