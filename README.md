# gulp-start

project structure:
src:
blocks - for html partials files
files - for other files, like example - pdf files for download
fonts - for fonts
images - for grafic images
scss - for styles
js - for javascript files

For creating new page with own js files:
add pageName.html
add pageName.js in js folder
add entry settings - pageName: './src/js/pageName.js in webpack.config.js
add path to the html file - src='./js/[name].bundle.js'
