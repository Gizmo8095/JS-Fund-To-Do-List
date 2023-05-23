var addButton = document.getElementById("borderDemo");
var originalAddButtonDisplay = addButton.style.display;
var removeMode = false;
var completedItems = getCompletedItems();

function getCompletedItems() {
  return JSON.parse(localStorage.getItem("completedItems")) || [];
}

function getArchivedItemsFromStorage() {
  return JSON.parse(localStorage.getItem("archivedItems")) || [];
}

function showTextInput() {
  var listItem = document.createElement("li");
  var input = createInput(listItem);
  var confirmButton = createConfirmButton(listItem, input);

  var textElement = document.createElement("span");
  listItem.appendChild(textElement); 
  listItem.appendChild(input);
  listItem.appendChild(confirmButton);
  
  appendListItem(listItem);
  updateEmptyMessage();
}

function createInput(listItem) {
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter text...";
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addItem(listItem, input);
    }
  });

  return input;
}

function createConfirmButton(listItem, input) {
  var confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.classList.add("confirm");
  confirmButton.addEventListener("click", function () {
    addItem(listItem, input);
  });

  return confirmButton;
}

function appendListItem(listItem) {
  document.getElementById("myList").appendChild(listItem);
  document.getElementById("emptyMessage").style.display = "none";
  
  var inputElement = listItem.querySelector("input");
  if (inputElement) {
    inputElement.focus();
  }
}


function addItem(listItem, input) {
  if (input.value.trim() === "") return;

  var textElement = listItem.querySelector("span");
  textElement.textContent = input.value;
  listItem.classList.add("item");
  
  textElement.addEventListener("click", function () {
    this.parentNode.classList.toggle("completed");
    updateCompletedItems();
  });
  
  removeTextInput(listItem);
  checkIfItemIsCompleted(listItem, input);
  saveItem(input.value);
  updateEmptyMessage();
}

function checkIfItemIsCompleted(listItem, input) {
  if (!listItem.classList.contains("completed")) return;

  completedItems.push(input.value);
  localStorage.setItem("completedItems", JSON.stringify(completedItems));
}

function removeTextInput(listItem) {
  listItem.removeChild(listItem.querySelector("input"));
  listItem.removeChild(listItem.querySelector("button"));
}

function saveItem(value) {
    var items = getItemsFromStorage();
  
    items.push(value);
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  function getItemsFromStorage() {
    return JSON.parse(localStorage.getItem("items")) || [];
  }
  
  function loadItems() {
    var items = getItemsFromStorage();
  
    items.forEach(function (item) {
      var listItem = createListItem(item);
      appendListItem(listItem);
      updateEmptyMessage();
      updateArchiveEmptyMessage();
    });
  
    document.getElementById("myList").classList.remove("hidden");
    loadArchivedItems();
  }
  
  function loadArchivedItems() {
    var archivedItems = getArchivedItemsFromStorage();
  
    archivedItems.forEach(function (item) {
      var listItem = createListItem(item);
      if (document.getElementById("archiveList")) {
        document.getElementById("archiveList").appendChild(listItem);
      }
    });
  
    updateArchiveEmptyMessage();
  }
  
  function createListItem(item) {
    var listItem = document.createElement("li");
    var textElement = document.createElement("span");
    textElement.textContent = item;
    listItem.appendChild(textElement);
  
    // Add event listener to mark item as completed
    textElement.addEventListener("click", function () {
      this.parentNode.classList.toggle("completed");
      updateCompletedItems();
    });
  
    return listItem;
  }
  
  
  function loadCompletedItems() {
    var items = getCompletedItems();
  
    items.forEach(function (item) {
      var listItem = createListItem(item);
      if (document.getElementById("archiveList")) {
        document.getElementById("archiveList").appendChild(listItem);
      }
    });

    function getArchivedItemsFromStorage() {
      return JSON.parse(localStorage.getItem("archivedItems")) || [];
    }
    
  
    updateEmptyMessage();
    updateArchiveEmptyMessage();
  }
  
  function removeItem(event) {
    if (!removeMode) return;
  
    event.currentTarget.remove();
    updateEmptyMessage();
    removeItemFromStorage(event.currentTarget.textContent);
    removeCompletedItem(event.currentTarget.textContent);
  }
  
  function removeItemFromStorage(value) {
    var items = getItemsFromStorage();
    var index = items.indexOf(value);
  
    if (index !== -1) {
      items.splice(index, 1);
    }
  
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  function removeCompletedItem(value) {
    var completedIndex = completedItems.indexOf(value);
    if (completedIndex !== -1) {
      completedItems.splice(completedIndex, 1);
      localStorage.setItem("completedItems", JSON.stringify(completedItems));
    }
  }
  
  function updateEmptyMessage() {
    var list = document.getElementById("myList");
    var emptyMessage = document.getElementById("emptyMessage");
    var removeButton = document.getElementById("removeButton");
  
    if (list.children.length === 0) {
      emptyMessage.style.display = "block";
      if (!removeMode) {
        removeButton.style.display = "none"; // Hide the remove button only if removeMode is not enabled
      }
    } else {
      emptyMessage.style.display = "none";
      if (!removeMode) {
        removeButton.style.display = "inline-block"; // Show the remove button only if removeMode is not enabled
      }
    }
  }

  function updateArchiveEmptyMessage() {
    if (!document.getElementById("archiveList")) return;
    
    var archiveList = document.getElementById("archiveList");
    var archiveEmptyMessage = document.getElementById("archiveEmptyMessage");
  
    archiveEmptyMessage.style.display = (archiveList.children.length === 0) ? "block" : "none";
  }

  function enableRemoveMode() {
    var listItems = document.querySelectorAll("#myList li");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener("click", removeItem);
      listItems[i].classList.add("remove-mode");
      addButton.style.display = "none";
    }
    
    var removeButton = document.getElementById("removeButton");
    var doneButton = document.getElementById("doneButton");
    removeButton.style.display = "none";
    doneButton.style.display = "inline-block";
    originalAddButtonDisplay = addButton.style.display;
    addButton.style.display = "none";
    
    removeMode = true;
  }
  
  function disableRemoveMode() {
      var listItems = document.querySelectorAll("#myList li");
      for (var i = 0; i < listItems.length; i++) {
        listItems[i].removeEventListener("click", removeItem);
        listItems[i].classList.remove("remove-mode");
      }
    
      var removeButton = document.getElementById("removeButton");
      var doneButton = document.getElementById("doneButton");
      removeButton.style.display = "inline-block";
      doneButton.style.display = "none"; // Hide the done button
      addButton.style.display = originalAddButtonDisplay;
    
      addButton.style.display = "inline-block"; // Show the "Add item" button
    
      removeMode = false;
  
      updateEmptyMessage();
    }
  
    function pushToArchive() {
      var completedItems = document.querySelectorAll("#myList li.completed");
      var archivedItems = getArchivedItemsFromStorage();
    
      completedItems.forEach(function (item) {
        item.parentNode.removeChild(item);
        if (document.getElementById("archiveList")) {
          document.getElementById("archiveList").appendChild(item);
        }
    
        var items = JSON.parse(localStorage.getItem("items")) || [];
        var index = items.indexOf(item.textContent);
        if (index !== -1) {
          items.splice(index, 1);
        }
        localStorage.setItem("items", JSON.stringify(items));
    
        var completedItems = JSON.parse(localStorage.getItem("completedItems")) || [];
        completedItems.push(item.textContent);
        localStorage.setItem("completedItems", JSON.stringify(completedItems));
    
        // Add the item to the archived items array and store it in localStorage
        archivedItems.push(item.textContent);
        localStorage.setItem("archivedItems", JSON.stringify(archivedItems));
      });
    
      updateEmptyMessage();
      updateArchiveEmptyMessage();
    }  
    
   
    function clearArchive() {
      if (document.getElementById("archiveList")) {
        document.getElementById("archiveList").innerHTML = "";
      }
    
      localStorage.removeItem("completedItems");
    
      updateArchiveEmptyMessage();
    }

document.getElementById("borderDemo").addEventListener("click", showTextInput);
document.getElementById("removeButton").addEventListener("click", enableRemoveMode);
document.getElementById("doneButton").addEventListener("click", disableRemoveMode);
document.getElementById("pushToArchive").addEventListener("click", pushToArchive);
document.getElementById("clearArchiveButton").addEventListener("click", clearArchive);
window.addEventListener("DOMContentLoaded", loadItems);

document.getElementById("clearArchiveButton").addEventListener("mouseover", highlightArchive);
document.getElementById("clearArchiveButton").addEventListener("mouseout", removeHighlightArchive);

function highlightArchive() {
  var archiveContainer = document.getElementById("archiveContainer");
  archiveContainer.classList.add("highlight-archive");

  var archiveList = document.getElementById("archiveList");
  archiveList.classList.add("highlight-text");
}

function removeHighlightArchive() {
  var archiveContainer = document.getElementById("archiveContainer");
  archiveContainer.classList.remove("highlight-archive");

  var archiveList = document.getElementById("archiveList");
  archiveList.classList.remove("highlight-text");
}
