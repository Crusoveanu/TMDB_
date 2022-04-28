## Project Name & Pitch

The movie database (TMDB) 

A simple project created using React to show the use of Core Data and a REST Api in an .NET application.
All movies information came from this API: https://developers.themoviedb.org/3/getting-started/introduction.

## Project Status

This project is currently in development. 

Openning the app you'll see a list of most recent movies.
   1. As a visitor I should be able to view latest movies / top movies
   2. As a visitor I should be able to search movies by name and/or genre.
   3. As a visitor I should be able to view movie details (image gallery, actors, description)
   4. As a locally registered user I should be able to leave a comment on a movie in a local comments database.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  
Change connection string in appsettings.json to your SQL server.

Installation:
`npm install`  
This command will install the packages inside the package.json

To Start Server:
`npm start`  
This command will start the application.

To Visit App:
`https://localhost:44393/`  

## Reflection

This was a 3 days long project built. 
Project goals included using technologies learned up until this point.  

One of the main challenges I ran into was Authentication.
I could do it in three ways (Identity, API fech, LocalDB), I oscillated between them, but in the end I chose local db using JWT because the requirement also included a local db.
I also hesitated whether to use or not use Redux for movies state, but I chose not to use it, as adding to favorites was not in requirements.

At the end of the day, the technologies implemented in this project are React, React-Router, JSX, CSS and .NET. 
As UI libraries, I used a lot MUI, antd, swal.