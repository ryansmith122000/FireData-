# FireData
FireData is an innovative solution that empowers fire departments with advanced incident data enrichment and geospatial visualization capabilities.
  - This allows fire departments to input a report in the accepted format, and the enriched data will display on the map.

# Steps to install and run this application

## Step 1: Clone the repository:
  1. Here is the Git Bash Download [Link](https://git-scm.com/downloads)
  2. Through a Git Bash window execute the command "git clone https://github.com/ryansmith122000/FireData-.git"
  3. You should have a folder named "FireData-" saved on your computer.

### Step 2: Open Code Editor
  1. Open the "FireData-" folder
  2. Inside of the folder, you can open your code editor right clicking an empty space of the folder ->  pressing "Git Bash Here" -> type "code ."
  3. If you do not want to do it that way, you can navigate to your favorite code editor -> File -> Open Folder -> DirectoryWhereYouSaved -> FireData-

### Step 3: Install Needed Dependencies
  1. In your favorite code editor, navigate to the toolbar at the top of the screen
  2. Click on Terminal
  3. New Terminal
  4. Type the command "npm install". This will install vite + react (Vite is the optimized version of the React Library).
    - If you see the message:
     
      ➜ "2 moderate severity vulnerabilities" it means semver (react package) is in need of an update.
     
  5. The line after you typed "NPM install" you should see "added x packages, and audited x packages in x seconds."
  6. In the same terminal window, type "npm run dev" and the message below should pop up:
     
    ➜  VITE v4.3.9  ready in X ms
    
    ➜  Local:   http://localhost:XXXX/
    
    ➜  Network: use --host to expose
    
    ➜  press h to show help
    
  7. To view the application, you can CTRL + LClick the link, or you can type the link in your browser.
     
    ➜ Vite does not open the application like [normal] React does. You will have to open this by CTRL + LClick or typing it in your browser.
  8. You should see the application open in your browser now.
    - To view the incident data: Click on one of the two markers -> View Enriched Incident Data.
    - The incident data has been enriched to include weather data. I did not display all the data, just the parts I felt were most important.
     
    - You do not need an API key to view anything. The API key has been set for the fields needed.
       - If you want to include your own API keys for further use of this project, please do the following:
       - Navigate to the <LoadScript> component at the beginning of the return statement in src/components/GoogleMap/Map.jsx
        
          - In the "googleMapsApiKey" attribute, paste your own inside of it. (ASSUMING YOU ARE NOT USING A .ENV FOR SECURITY!)
          
       - RapidAPI: Navigate to src/05-services/weatherService.js

         - In the "headers" object toward the bottom of the config object, change "X-RapidAPI-Key"'s value to your own. (ASSUMING YOU ARE NOT USING A .ENV FOR SECURITY!)

# Improvements and Best Practices

## Best Practices
  1. Using ENV: I would have included all sensitive data (including API keys, potential PII(if this were to be a public repository)

    - For ease of access purposes for any viewers, I made an alternative Google Account / RapidAPI account. These accounts will be disposed of by the end of the week.
     
  2. Organizing Imports: Imports would have been all made into a single file, then I would have taken specific imports from that file in A-Z order.
   
     - I did not see the need for that as this is a small project that does not have many files.
       
  3. Utility Functions: Utility functions are a staple to me, as reusing code is best practice in Software Engineering.
   
     - I would have made more utility functions for the cases where they could have been used.
       
     - They did not save me time now. They took me longer to make than if I would have taken a shortcut, but I implemented them for reusable code in the future.
       
  4. Error Handling: The most error handling I did throughout this application were null checks.

     - In an environment where this application would be deployed, various null checks would be implemeneted and displayed to the user
     - The way I would have done this is through testing my code based on various factors:
         - API calls erroring, invalid data type(s), modifying reports to ensure small and large errors will be caught, checking map load, etc.
         - User notification primarily would be through a custom error I create that is displayed via toastr/sweetalert.
      
  5. Optimizing API requests: I would have made one call for the API to fetch weather data.

     - Looking at it now, since the two incidents given are in the same area (same weather) only one API call needed to be made.
     - I did this so if the incident location were to be in Washington, DC at a different date and time, the API would call for that location as well.
     - This could be managed by setting a condition where if the two incidents were within a reasonable range (Ex: 15 miles apart) the API wouldn't have been called.

  6. Seperating Code: I would have seperated code to be more reuasble throughout the application.
     
     - If I'm displaying data (Ex: card format), there is a big chance that I can make that it's own component and render it into the parent.
       
     - Seperating code not only increases code reusability, but also readability.
       
         - You can even make your own library (unintentionally) if you reuse code enough.
      
  7. Naming Conventions: For certain files where camelCase was optimal, I used PascalCase. I did this for familiarity and comfort.
     
     - In a production environment, before every commit I would push, I would ensure naming conventions are appropriate.
    
  8. Folder Organization: Folder organization is huge for me. If folders aren't organized, I will not be able to code appropriately.
     
     - I organized my folders in a reasonable manner, however, in a production environment everything would be organized starting with it's number, then it's name.


## Improvements : I will be working on this continuously, and below is a running list of changes I will make.
  1. Application Performance: The application does not run slow, however, performance can always be improved.

  2. More data being displayed: I would have displayed each enriched incident on the side of the map (left side for best UI experience)
     
     - This lets people access the data without any clicks at all, increasing user attention spans.
     - An actual application: The actual application would have not included just a map. It will have included a navbar, additional pages, smooth animations, etc.

  3. Secure User Registration/Login: This will allow people to view incidents they have published, edit incidents they have published, and view incidents published by others.

  4. Adding additional reports: This would require a database to save the reports which would mean a full stack application, but allowing users to add/edit reports gives the application a purpose.

  5. Adding TypeScript: I will convert all the JavaScript/JSX in this file to TypeScript for improved code readability and less potential for errors.


# Time Spent On Project : 8 hours
  1. In total, I spent about 8 hours on this project. This includes taking breaks, eating, coding, and reviewing resources for help.
  2. A lot of the time wasn't necessarily needed but I wanted to see if I could include any additional resources that would make my life easier in the future.

## Time Allocation
  1. I received this project around 2:03 AM PST and currently it is 12:40 AM PST.

  2. For the first ~3 hours, I attempted to implement the OpenStreetMaps library through SyncFusion. [Link](https://ej2.syncfusion.com/react/documentation/introduction)
     - I ended up not implementing this library and instead used Google Maps' API due to a various amount of errors and flaws in their documentation/my code.
         - I realized this took up much of my time and I hadn't made that much progreess. I figured starting over would be more productive than continuining with that library.
         - The library would have cost money after the first seven days. While I will be disabling my Google account made for this by June 8th, Google offers a month long trial instead.
         - The documentation for this library does not have the best readability, while Google's React documentation is better for short-term projects.
           
  3. After the frustration of setting up a new repository and library, I took an hour break to be able to focus better.

  4. From 6pm PST to to 11pm PST, I setup the Google Map, implemented the incident and weather data.
     
     - I did take a small break during this time to eat, but am unsure about the amount of time.
     - Trouble I had with this project was:
    
       - Google Maps' markers not appearing: This was due to the developers not updating the library to match React 18+.
         - To remedy this, I found a solution which allowed me to use the <MarkerF/> tag instead of the <Marker/> tag
      
       - Weather data not appearing in the InfoWindow after an API call.
           - To fix this, I realized the only two things possible was that I was not properly assigning the value of the response, or attempting to render it incorrectly.
           - The API's response that container weather information was not ```response.data``` instead it was ```response.data.data[0]``` (Only array from the call)
        
       - "Google Is Not Defined"
           - This drove me up a wall for about 20 minutes, then I realized my method to intialize the map randomly stopped working.
           - To fix this, I switched from using a function to load the map to using the <LoadScript/> tag.
        
       -  Git errors
           - I attempted to switch branches and stashed my changes. Unknowingly, a file disappeared as I had not commited it yet, which reminded me I needed to do another commit.
           -  This solution was simple by switching back to the branch I was previously working on and retrieving the stash through:
               - git stash list
               - git stash apply stash@[0] until the (2) stashes were back in my files.

5. From 11pm PST to ~1am PST, I have been writing this README. I plan on pushing further changes and reviewing my code for improved readability.


# Closing Comments

  1. Overall I would say this project was very enjoyable and has the potential to solve real world problems.

  2. While I spent 8 hours on the project, I did not do it out of need, I did it because I like to go through my code, view shortfalls, and come up with solutions.

  3. For an additional challenge, I will redo this project throughout the weekend but in TypeScript using Angular.
     - I am familiar with TypeScript, but Angular will be a new challenge to use instead of React.
    
  4. Overall, I would say this project tested my skills as a developer of two main things: Receiving and Displaying Data.

  5. Improvements as an Engineer from this project:
     - While not every improvement is noticable, I noticed my agbility to find/create helper functions drastically improved.
     - My ability to track data through JSON objects / code has improved.
     - My ability to work with unfamiliar projects/technologies has improved (Using the Google library, not relying on a CSS library.)
     - My attention to detail slightly improved as I instantly noticed small errors before I would push changes.


# Thank you for the opportunity to work on this project! It was a lot of fun and look forward to doing more! :)
