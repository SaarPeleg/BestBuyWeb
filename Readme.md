How to run the application:

1. the API:
Either deploy it onto IIS, or run it locally via Visual Studio 2019, the api is a .net framework 4.7.2 WebApi 
so you need to have that project type installed.
if you opt to upload the api to iis, you might need to re-adjust the api link in th client (in the file PaginationComponent.js) 
to match the new address.

1. the client:
you can run it via command line in the project folder via "npm install" followed by "npm start".
or if you want to deploy it you can put the build folder in any folder and run the commands

`npm install -g serve`

`serve -s build`
in commandline from the folder containing the build directory.
 
