Readme
------

Framework example using phaser.io as a basis for HTML 5 games with console integration

Pre Installation Requirements
-------------------------

Please install node.js and grunt
Useful steps located here: http://www.ghosthorses.co.uk/production-diary/installing-grunt-on-os-x-and-windows-7/
Make your Development PC point local.games.iwin.com to your WebServer instance by editing your hosts file.

Creating a build
----------------

1) Open a terminal/Command Prompt in the sdk/game folder.
2) If you haven't already run "npm install" first.
3) Run "grunt"
4) Run "grunt run" to launch a webserver
5) Open a browser to 'localhost:{port}'  where port is listed in the grunt run window.

For more information
--------------------
Refer to the included JS Api Html documentation. Live examples of the console integrated with games can be found here.
http://m.iwin.com/game/match3/puzzle-match3-jewelquest
http://m.iwin.com/game/puzzle/smorewords

Known Issues
------------

* Windows and 'npm install' shows Failures
On certain systems Microsoft Security Essentials will cause a failure to build (speculated virus), if this is the case temporarily disable it via the Security Essentials 
window (Taskbar icon), option is under 'settings/Real Time Protection' then run 'npm install' and finally renable the option.

