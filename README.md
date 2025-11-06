Author: Vardaan kapoor, President, AI@UW

UW-Madison Artificial Intelligence Club website

To run this repository:

1) clone repository using https route

2) go to the dev branch(not master branch)-because the dev branch is deployed

3) install npm and node package manager for your own Operating System

4) check that both node and npm are installed separately on your operating system

5) run npm install

6) run these commands-

export NODE_OPTIONS=--openssl-legacy-provider
npm start 

to actually start the application on your own localhost(own computer)

NOTES: i have currently used deployment from the dev branch and used an action from github-> we can either deploy the website from dev branch or the master branch-> branch master can be deployed directly but for deploying from dev branch, I used github actions file in the /github/workflows folder
