// The storage
var storage;

// Draw updated list
function updateList(entity) {

  var list = $("#list");
  var itemsHTML = "";

  items = (entity.items) ? entity.items : [];

  for (i in items)
    itemsHTML += "<li id=\"" + i + "\">" + items[i]
               + "<a href=\"javascript:removeItem('"
               + entity.key().value() + "'," + i + ");\">"
               + "<img class=\"delete\" src=\"/images/delete.gif\">"
               + "</a></li>";

  if (items.length == 0)
    itemsHTML += "<li>No items</li>";

  list.html(itemsHTML);
}


// Remove an item from the TODOs
function removeItem(key, index) {

  var entity, items, key;
  var new_items = new Array;

  entity = storage.get(key);

  $("#"+index).fadeOut(500, function() {

    items = (entity.items) ? entity.items : [];

    for (var i in items)
      if (i != index) new_items.push(items[i]);

    if (new_items.length == 0)
      entity.update({"items": 0});
    else
      entity.update({"items": new_items});

    key = storage.put(entity);

    updateList(entity);
  });

}


$(document).ready(function() {

  // The text field for adding new TODOs
  var input = $("#addnew");

  if ("gaesynkit" in window) {

    var key, entity, items;

    storage = new gaesynkit.db.Storage;

    key = new gaesynkit.db.Key.from_path("ToDoList", user);

    try {
      entity = storage.get(key);
    }
    catch (e) {
      entity = new gaesynkit.db.Entity("ToDoList", user);
      key = storage.put(entity);
      entity = storage.sync(key);
    }

    items = (entity.items) ? entity.items : [];

    updateList(entity);
  }  

  // Handler for adding new TODOs
  input.change(function () {

    var value, items, key, entity;

    value = input.val();

    if (value == "") return;

    // Update entity with the new list of items
    key = new gaesynkit.db.Key.from_path("ToDoList", user);

    entity = storage.get(key);

    if (!(items = entity.items)) items = [];

    items.push(value);

    entity.update({"items": items});
    key = storage.put(entity);

    input.val("");

    updateList(entity);

  });

  // Synchronize TODOs
  $("#sync").click(function() {

    entity = storage.sync(key);

    updateList(entity);
  });

});
