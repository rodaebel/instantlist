/*
 * instantlist.js
 *
 * Copyright 2011 Tobias Rodaebel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var LIST_KIND = "List";

// The storage
var Storage;

// Helper function to escape HTML
function escapeHTML(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Draw updated list
function updateList(entity) {

  var list, items, html, i;

  list = $("#list");

  items = (entity.items) ? entity.items : [];

  html = "";

  for (i in items)
    html += "<li id=\"" + i + "\">" + escapeHTML(items[i])
          + "<a href=\"javascript:removeItem('"
          + entity.key().value() + "'," + i + ");\">"
          + "<img class=\"delete\" src=\"/images/delete.png\">"
          + "</a></li>";

  if (items.length == 0)
    html += "<li>Add an item below ...</li>";

  list.html(html);
}

// Remove an item from the list
function removeItem(key, index) {

  var entity, items;
  var new_items = new Array;

  entity = Storage.get(key);

  $("#"+index).fadeOut(500, function() {

    items = (entity.items) ? entity.items : [];

    for (var i in items)
      if (i != index) new_items.push(items[i]);

    if (new_items.length == 0)
      entity.update({"items": 0});
    else
      entity.update({"items": new_items});

    key = Storage.put(entity);

    updateList(entity);
  });

}

$(document).ready(function() {

  // The text field for adding new list items
  var input = $("#addnew");

  // Automatically set focus to input box
  input.focus();

  // Return here if the gaesynkit library is missing
  if (!("gaesynkit" in window)) return;

  // Otherwise, initilaze the storage
  var key, entity, items;

  Storage = new gaesynkit.db.Storage;

  key = new gaesynkit.db.Key.from_path("List", user);

  try {
    entity = Storage.get(key);
  }
  catch (e) {
    entity = new gaesynkit.db.Entity("List", user);
    key = Storage.put(entity);
    entity = Storage.sync(key);
  }

  updateList(entity);

  // Handler for adding new list items
  input.change(function () {

    var value, items, key, entity;

    value = input.val();

    if (value == "") return;

    // Update entity with the new list of items
    key = new gaesynkit.db.Key.from_path("List", user);

    entity = Storage.get(key);

    items = (entity.items) ? entity.items : [];

    items.push(value);

    entity.update({"items": items});
    key = Storage.put(entity);

    input.val("");

    updateList(entity);

  });

  // Synchronize list
  $("#sync").click(function() {

    if (user == "") return;

    $("#syncstatus").fadeIn(500, function() {
      entity = Storage.sync(key);
      updateList(entity);
    });

    $("#syncstatus").fadeOut(500, function() {});

  });

});
