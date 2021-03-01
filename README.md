# Gambit Challenge

## About
The solution consists of a backend and a frontend, which are written in JavaScript. The backend uses NodeJS with Express and the frontend uses React.    
The Modbus data is parsed on the backend and then made available for the frontend in an API endpoint, /api/data. On the frontend the data is then presented in a mobile friendly way.  
The backend has definitions for what data corresponds to what registers and how to parse the data, e.g.    
`{
    name: 'Velocity',
    register: 5,
    len: 2,
    format: 'REAL4',
    note: '',
  }`  
The data is read from disk on server startup and never updates in the current implementation, but could easily be made to fetch live data from some source.  
The frontend consists of a simple React application that fetches the data from the backend  using Axios and then presents the data in a simple table.  

Live demo available at https://rk-gambit-challenge.herokuapp.com/  

## Building and running
```
# Clone repo
git clone https://github.com/robinkar/gambit-challenge.git

# Navigate to repo
cd gambit-challenge

# Install deps
yarn

# Build production build
yarn run build

# Run the application
yarn start
```  
By default the server starts on port 3001, but that can be changed by setting the environment variable PORT, either in an .env file or for example by starting using the command `PORT=4000 yarn start`(Linux) or `set PORT=4000 && yarn start`(Windows).