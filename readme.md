## What is this for?

This script is made in order to facilitate /web and /native's requirement which is to allow users to login via Github as oAuth. The script fetches the user's credentials from the Github's API from the code generated from a pop-up.

## Do you need to run this for the checking?

No. I have provided a live backend and I've deployed this in my server which is used to fetch data from Github's API.

### Github Basic OAuth Code-to-user Converter Script

This repository is running NodeJS (preferrably 8+), you can build it using docker and it will install dependencies on its own and run a working instance of express.

What this script is written for is to convert the code from Github's login button, extract access-token out of it by sending a request to github, and fetch the user's credentials from that access-token.

To illustrate the flow:
React Login with Github Button -> Window -> Code -> React Page -> Running Instance of this Script -> User Details

## Requirements:

You need to create a .env file containing the following properties:
PORT=4000
GITHUB_APPID=<YOURAPPID>
GITHUB_APPSECRET=<YOURAPPSECRET>

PORT refers to the port where express should listen to. Note that this port is recommended to be 4000, in case you are going to change that, edit the Docker file accordingly as it _exposes_ PORT 4000 by default.

## Running the script

If you wish to run this script without containerizing it with Docker, you can simply run:
`npm install` or `yarn install`
`npm start` or `yarn start`
