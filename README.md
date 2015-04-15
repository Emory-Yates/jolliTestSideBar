# Jolli

A design prototype for the OLLI at Auburn folks. Shows what their site could/will look like.

This document intends to highlight how to develop and maintain this site beyond its existing state.


## Prerequisites

You will need the following things properly installed on your computer.
We assume you'll be using either a Posix or a Mac development environment. If neither of these is available (i.e. you're on Windows), you may have more difficulty. Check out [Cmder](http://bliker.github.io/cmder/) and MSYSGIT.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

Sparse description of each: Git is a version control solution. Node.js is a JavaScript runtime. Bower is a front-end package manager. Also -- you need all of these installed globally. The way I would install Bower would be to install Node.js first, then run `npm install -g bower`. That will get the Bower package and install it globally.


## Setup

To download the code and set up the environment:
````
git clone https://github.com/donlink1/jolliTest.git
cd jolliTest
npm install
bower install
````

It's okay if this takes a minute. There are a lot of dependencies.


## Ember Quirks

This is an Ember.js application. It uses Express (a very common, quick-deploy, and well-documented Node web server) as its server, which handles requests most immediately, and then hands those requests off to Ember to be sent through its routing hoops.

Because it is an Ember application, that means page requests aren't really new page loads (fancy AJAX magic). The whole app is one page that Ember makes *look* like several pages.


## Brief Directory Structure Breakdown

* `/app/index.html` is the master page for this project. It has our default head tag, etc. built in.

* `/app/templates/application.hbs` also contains some of our master page details, but has more content in it. It contains our nav header, and our avatar.

* `/app/templates/*.hbs` are the pages we have created. Each `.hbs` file is a separate page (except `application.hbs`. That file extension is specific to Handlebars, an HTML templating engine that Ember uses. If you want to make an edit to a particular page like courses, edit `/app/templates/courses.hbs`. Handlebars code can be entirely standard HTML5, and it can also contain Handlebars templates and expressions. If this confuses you off the bat or is beyond your immediate scope of knowledge, then you can probably get away with writing as though it were just HTML *unless* you need a page whose content is dynamic based on data pulled from the server. As soon as the content on the page depends on what is stored in JSON/a database, consider learning/using Handlebars.

* `/app/styles/*.scss` are our stylesheets. If you're not familiar with Sass, it works to CSS as Handlebars does to HTML -- you can write in plain CSS if you'd like, but then you're not really taking advantage of the language. Sass is nice because it lets a stylesheet wizard code up a sheet more semantically/logically, and with more English, while not losing anything that CSS provides. You should certainly learn this before beginning, or at least become familiar with some of the tricks we use in the project.


* `/vendor/*.js` are our global scripts. These are Javascript files that will all be concatenated, in order, into a file called `vendor.js`, which will then be served to the client.

* `/public/` is where any extraneous files (pdfs, docs, etc.) are hosted. Throw them in there, and you can access them by navigating to `server/filename.ext`. If you're running on localhost, that might look like `localhost:4200/fall-calendar.pdf`.


## Run

To run the site locally:
````
ember serve
````


## Pre-Deploy

To prepare to deploy the site to Heroku, do this once:

1. Get [collaborator access](https://dashboard.heroku.com/apps/olliatauburn/access)
to the app on Heroku.

2. Download the [Heroku Toolbelt](https://toolbelt.heroku.com) command-line utility.

2. Connect to Heroku's git repo:
````
heroku git:remote -a olliatauburn
````


## Deploy

To deploy the site to [Heroku](olliatauburn.herokuapp.com):

1. Commit and push your latest changes to the master branch:
````
git add .
git commit -m "Describe your updates."
git push
````

2. Push the latest changes to Heroku:
````
git push heroku master
````


## Moving Forward
We tried to provide reasonable designs that anyone coming forward could see our intent. Not every page is visually complete, but it should give a good sense of what we thought we were doing with each page. Don't make changes to those designs unless you have a justifiable reason that either the client or the users support.

There are lists of things we didn't have time for, or that were just outside the scope of our project for the semester. Primary focii for the next team should be a CMS for static pages, and an events calendar that is editable in some way by Linda and Barbara, as well as an auth system (may need to integrate with Auburn auth, which will be a political hurdle).

The avatar could use some love. It has a few words that it can use to help navigate around the site, but honestly we had hoped for something a bit more fully featured. More words, more navigation endpoints, and integration with the events system. ("Where is X event?" might have taken you to `/events/X`.)

Don't forget that this will eventually need to be deployed. That was one of our major mistakes. We forgot to account for the time deployment would take, thinking it would be simple when it actuality it was a very politically-involved process, amongst other restraints.


## Design Needs

1. A calendar of events, that pulls data from a Google Calendar and displays that data
in a list view and a calendar/month view. There is an Ember package for this.

2. Maps to the event locations, hooked into Tiger Transit and Auburn's campus map. These
would appear on event pages.

3. A WYSIWYG editor for the site content, that would enable people to edit page copy
without needing software authoring or deploy tools. This should hook into some kind of
authentication.


## Integration Issues

Here is why we created a [design prototype](ollliatauburn.herokuapp.com) instead of replacing
the [existing OLLI at Auburn site](olliatauburn.org):

1. Our site is written in Javascript, running via a Node.js server called Express.
We don't know what language the current OLLI site is written in, nor which server
it's running on. So the files could literally not be copied as-is.

2. We don't have any authentication right now. We'd need authentication of some
sort to secure the WYSIWYG web content editor. Ideally this would hook into
Auburn's authentication/role management. We don't have permission to hook in.

3. Due to #1, it's likely impossible to copy pages into the existing site. An
alternative would be to replace the existing site. There are two ways we could
do that--the first would be to edit the DNS settings for the olliatauburn.org domain
to point at our Heroku dyno, where our design is currently live. We don't have
permission to modify the DNS settings, and pointing to an off-site hosted site
may violate university tech policy.

3b. The second way would be to host our design on an on-site server. But we don't
have access to Auburn's internal servers to set up a Node.js environment, nor do
we have time to get permission for someone at OLLI to do it, nor do we know whether
anyone at OIT is capable of setting up a Node.js environment.

Basically we can't merge or replace the existing site, and even if we could we
wouldn't be able to secure it, and even if we could we haven't even started talking
with anyone who could maintain the server side of everything.
