# -*- coding: utf-8 -*-
#
# Copyright 2011 Tobias Rodäbel
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Simple GAE ToDo app to demonstrate the usage of gaesynkit."""

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util


def get_login_or_logout(user):
    """Returns login/logout link."""

    link = '<a href="%(href)s">%(label)s</a>'

    if user:
        return link % dict(href=users.create_logout_url('/'), label='Logout')
    else:
        return link % dict(href=users.create_login_url('/'), label='Login')


class MainHandler(webapp.RequestHandler):
    """The main handler."""

    def get(self):
        """Renders the main template."""

        # Get the appropriate login or logout link
        login_or_logout = get_login_or_logout(users.get_current_user())

        # Get the current user
        user = users.get_current_user() or u''

        # Render the index.html template
        self.response.out.write(template.render('index.html', locals()))


app = webapp.WSGIApplication([
    ('/', MainHandler),
], debug=True)


def main():
    """The main function."""

    webapp.util.run_wsgi_app(app)


if __name__ == '__main__':
    main()
