document.getElementById("borderDemo").addEventListener("click", showTextInput);
document.getElementById("removeButton").addEventListener("click", enableRemoveMode);
document.getElementById("doneButton").addEventListener("click", disableRemoveMode);
document.getElementById("pushToArchive").addEventListener("click", pushToArchive);
document.getElementById("removeArchiveButton").addEventListener("click", enableArchiveRemoveMode);
document.getElementById("doneArchiveButton").addEventListener("click", disableArchiveRemoveMode);
document.getElementById("clearArchiveButton").addEventListener("click", clearArchive);
window.addEventListener("DOMContentLoaded", loadItems);

var addButton = document.getElementById("borderDemo");
var originalAddButtonDisplay = addButton.style.display;
var removeMode = false;

function showTextInput() {
  // ...
}

function addItem(listItem, input) {
  // ...
}

function saveItem(value) {
  // ...
}

function loadItems() {
  // ...
}

function loadCompletedItems() {
  var items = JSON.parse(localStorage.getItem("completedItems")) || [];

  items.forEach(function (item) {
    var listItem = document.createElement("li");
    var textElement = document.createElement("span");
    textElement.textContent = item;
    listItem.appendChild(textElement);
    document.getElementById("archiveList").appendChild(listItem);
  });

  updateEmptyMessage();
  updateArchiveEmptyMessage();
}

function removeTextInput(listItem) {
  // ...
}

function updateEmptyMessage() {
  // ...
}

function enableRemoveMode() {
  // ...
}

function disableRemoveMode() {
  // ...
}

function removeItem(event) {
  // ...
}

function removeItemFromStorage(value) {
  // ...
}

function clearArchive() {
  archiveList.innerHTML = "";

  localStorage.removeItem("completedItems");

  updateArchiveEmptyMessage();
}

function pushToArchive() {
  completedItems.forEach(function (item) {
    item.parentNode.removeChild(item);
    document.getElementById("archiveList").appendChild(item);

    var items = JSON.parse(localStorage.getItem("items")) || [];
    var index = items.indexOf(item.textContent);
    if (index !== -1) {
      items.splice(index, 1);
    }
    localStorage.setItem("items", JSON.stringify(items));

    var completedItems = JSON.parse(localStorage.getItem("completedItems")) || [];
    completedItems.push(item.textContent);
    localStorage.setItem("completedItems", JSON.stringify(completedItems));
  });

  updateEmptyMessage();
  updateArchiveEmptyMessage();
}

function enableArchiveRemoveMode() {
  // ...
}

function disableArchiveRemoveMode() {
  // ...
}

function removeArchiveItem(event) {
  // ...
}

function removeItemFromArchive(value) {
  // ...
}

function updateArchiveEmptyMessage() {
  var archiveList = document.getElementById("archiveList");
  var archiveEmptyMessage = document.getElementById("archiveEmptyMessage");

  if (archiveList.children.length === 0) {
    archiveEmptyMessage.style.display = "block";
  } else {
    archiveEmptyMessage.style.display = "none";
  }
}
