let addButton = document.getElementsByTagName('button')[0]; // button for adding new items
let itemsSection = document.getElementsByClassName('items')[0]; // section with items

// Create new todo item
addButton.addEventListener('click', function() {
  let addName = document.getElementsByTagName('input')[1]; // name of item

  let divNode = document.createElement('DIV'); // create div for new item
  divNode.className = 'item';

  divNode.innerHTML = `<button class="btn">
      <span class="material-icons">check_box_outline_blank</span>
    </button>
    <input type="text" value=${addName.value}>
    <button class="btn">
      <span class="material-icons">clear</span>
    </button>`;

  itemsSection.insertBefore(divNode, itemsSection.firstChild); // paste new item as a first child
  addName.value = ""; //reset a field for adding item's name
});
