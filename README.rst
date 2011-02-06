=============================
instantlist - Simple ToDo App
=============================

This Google App Engine application demonstrates the usage of gaesynkit and the
Client Storage API.


Copyright and License
---------------------

Copyright 2011 Tobias Rodaebel

This software is released under the Apache License, Version 2.0. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Google App Engine is a trademark of Google Inc.


Online Demo
-----------

In order to try an online demo, access the following URL with a HTML5 Web
Storage capable browser like Google Chrome or Safari:

  http://instantlist.appspot.com


Requirements
------------

The GAE SDK will be installed by zc.buildout. See the buildout.cfg file.

Buildout needs Python and the tools contained in /bin and /usr/bin of a
standard installation of the Linux operating environment. You should ensure
that these directories are on your PATH and following programs can be found:

* Python 2.5.2+ (3.x is not supported!)


Building and Running the Application
------------------------------------

Get the sources::

  $ git clone http://github.com/rodaebel/instantlist.git

Build and run the application::

  $ cd instantlist
  $ ../bin/python bootstrap.py --distribute
  $ ./bin/buildout
  $ ./bin/dev_appserver parts/instantlist

Then access the application using a web browser with the following URL::

  http://localhost:8080/


Uploading and Managing
----------------------

To upload application files, run::

  $ ./bin/appcfg update parts/instantlist

For a more detailed documentation follow this url::

  http://code.google.com/appengine/docs/python/tools/uploadinganapp.html
