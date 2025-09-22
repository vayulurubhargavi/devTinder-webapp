#devtinder

--created a react+vite application command npm create vite@latest devTinder-webapp -- --template react
--remove unneccassary code and run the "helloworld" application
--install tailwind css
--install daisy ui
--add Navbar to app.jsx
--create a NavBar.jsx into a differernt component file
--install react-router-dom
--create BrowserRouter >Routes>Route="/" element=Body >RouteChildren
--create an Outlet in the Body component
--Create footer.jsx file
--create a Login form
--install axios
--CORS error in api call-install cors in backend and add the cors middleware to app and pass origin=FE local host url, credentials:true(to pass the cookie to browser from BE )
--now on FE side in axios call include {withCrederntials:true} to store the cookies in Application tab of browser>storage

--Install react-redux and @reduxjs/toolkit
--create appstore and wrap the app with provider and pass the store
--create a slice and add the reducer to the appstore
--add the redux devtoold to chrome
--navbar should update as soon as user logs in
--refactor the code by adding a constansts file
--you should not be able to access other routes without login

--logout feature
---feedpage-get the feed api result and add it to the Slice and
--build the user card on feed page
--profile page
--show toastt message on saving the profile
--see all my connections
--see the requests received from other users
--feature--accept/reject other users
--send/ignore the user card from feed

--send/ignore user card from feed
--signup new user
--e2e testing

---deployment using AWS--
1.signup in AWS and create an account
2.launch the instance
3.change the permission for chmod 400 devTinder-secret.pem
4.connect to the machine using ssh -i "devTinder-secret.pem" ubuntu@ec2-56-228-21-252.eu-north-1.compute.amazonaws.com
5.install the node version v22.16.0
6.clone the FE/BE projects 7. do ls to get the projects list -> go to devtinder app
8.install the dependancies by npm install -> then do npm run build
9.update the system using sudo apt update
10 .install the nginx using-- sudo apt install nginx 11. start the nginx sudo systemctl start nginx 12. copy code from dist(build) files to /var/www/html/
13.sudo scp -r dist/\* to /var/www/html
14.enable port 80 on the instance

--backend deployment

1.allowed the ec2 instance public ip on mongodb atlas server
2.npm install pm2 -g --install the pm2 package to run the server the 24/7 3. run the command pm2 start npm -- start
4. to stop the process pm2 stop npm
5.modify the base url in FE project to /api

frontend is running on : http://13.60.35.6/
backlend is running on : http://13.60.35.6:7777/

domain name : devtinder.com =>13.60.35.6

fe: devtinder.com
be: devtinder.com:7777 = devtinder.com/api

nginx proxy pass config---
server_name 13.60.35.6;
location /api/ {
proxy_pass http://127.0.0.1:7777/; # Node app
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
