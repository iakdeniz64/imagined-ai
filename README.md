## Project Imagined
A project where the use of OpenAI to create new images was the core objective.

- A user can register and login.
- A user can choose from a selection of 9 items (3 Movies, 3 TV Shows, 3 Anime).
- The user can generate an image generated by Dall-E from OpenAI, based on the chosen selection.
- The user can either copy the url from Dall-E (valid for 2 hours), or add it to the collection.
- From the collection, the user can copy a permanent URL, download the picture to their device, or delete it from their collection.

The project is created as a Vite-React project, using TypeScript. For CSS Styling, TailwindCSS is used. As a database, Neon is used as an online Database, on the free tier. The images are uploaded to ImgBB.com, after being obtained from Dall-E (making the link permanent).

## Prerequisites
- Node.js 22.13.0, or higher
- React 18.3.1, or higher

## Installation
1. Clone the repository
2. Run 'npm install' command, from within the IDE or from a command terminal within the root folder
3. Create an .env folder in the root folder (next to this README file)
- Your desired Node Server Port (5000 is preferred, if you use another, change it in index.js. PORT=YOUR_PORT_NUMBER)
- Your Database Connection String (Database Scheme is in usedScheme.txt, next to this README file. DB_CONNECTION_STRING=YOUR_DB_STRING)
- Your OpenAI API Key (OPENAI_API_KEY=YOUR_OPENAI_API_KEY)
- Your JWT Secret (a generator from e.g. LastPass is recommended. JWT_SECRET=YOUR_SECRET)
- Your ImgBB API Key (IMG_BB_API_KEY=YOUR_IMGBB_API_KEY)
4. Run 'node index.js' command, from a command terminal within the root folder
5. Run 'npm run dev' command, from within the IDE or from a command terminal within the root folder