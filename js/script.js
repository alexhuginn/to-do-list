let addButton = document.getElementsByTagName('button')[0]; // button for adding new items
let itemsSection = document.getElementsByClassName('items')[0]; // section with items
let doneItemsSection = document.getElementsByClassName('done-items')[0];
let itemName = document.getElementsByTagName('input')[1]; // name of item
let doneTitle = document.getElementsByTagName('h2')[0]; //'Completed items'

// Create new todo item when press "+" button
addButton.addEventListener('click', addItem);
// Create new todo item when press "Enter key"
itemName.addEventListener('keypress', pressEnter);
// When press 'check' or 'delete' button
itemsSection.addEventListener('click', pressButton);
doneItemsSection.addEventListener('click', pressButton);

// ------------------FUNCTIONS

function pressEnter(e) {
  if (e.key === 'Enter') {
    addItem();
  }
}

function pressButton(e) {

  if (e.target.tagName !== "SPAN") return;

  let button = e.target.parentNode;
  let targetItem = button.parentNode;
  let targetSection = targetItem.parentNode;

  let checkButton = targetItem.getElementsByTagName('button')[0].firstElementChild;
  let delButton = targetItem.getElementsByTagName('button')[1].firstElementChild;

  switch (e.target) {
  // when press 'delete button'
  case delButton: {
    hideAnimation(targetItem, () => {
      targetItem.remove();
      showTitle();
    }, true);
  }
    break;

    // when press 'check or uncheck button'
  case checkButton: {
    let whereToMove;
    if (targetSection.nextElementSibling) {
      whereToMove = targetSection.nextElementSibling; //check items
    } else {
      whereToMove = targetSection.previousElementSibling; //uncheck items
    }
    //hide item before moving
    hideAnimation(targetItem, () => {
      whereToMove.appendChild(targetItem); // move item
      showTitle();
      // decorate check button
      button.classList.toggle('unchecked');

      if (button.classList.contains('unchecked')) {
        button.firstElementChild.textContent = 'check_box_outline_blank';
      } else {
        button.firstElementChild.textContent = 'check_box';
      }
      //show item after moving
      hideAnimation(targetItem, () => {}, false);
    }, true);
  }
    break;
  }
}

// Create new todo item
function addItem() {
  itemName = document.getElementsByTagName('input')[1];

  let divNode = document.createElement('DIV'); // create div for new item
  divNode.className = 'item';

  divNode.innerHTML = `<button class="btn unchecked">
      <span class="material-icons">check_box_outline_blank</span>
    </button>
    <input type="text" value="${itemName.value}">
    <button class="btn del">
      <span class="material-icons">clear</span>
    </button>`;

  divNode.style.opacity = 0;
  itemsSection.insertBefore(divNode, itemsSection.firstChild); // paste new item as a first child
  hideAnimation(divNode, () => {}, false);
  itemName.value = ""; //reset a field for adding item's name
}


// hide or unhide animation
// @target - DOM element which would be hidden or unhidden
// @func - function that would be called after hideAnimation
// boolean - 'true' - hide, 'false' - unhide

function hideAnimation(target, func, boolean) {

  let startTime = new Date().getTime();

  let animate = () => {
    let currTime = new Date().getTime();
    let newOpacity;
    let diffSpeed = ((currTime - startTime) / 1000) * 2;

    if (boolean) {
      newOpacity = 1 - diffSpeed;
    } else {
      newOpacity = diffSpeed;
    }

    if (newOpacity < 0 || newOpacity > 1) {
      func();
    } else {
      target.style.opacity = newOpacity;
      window.requestAnimationFrame(animate);
    }
  };
  animate();
}

// check if there are completed items so can show title for them
function showTitle() {
  let titleClass = doneTitle.classList;

  if (doneTitle.nextElementSibling &&
    titleClass.contains('hide')) {
    titleClass.remove('hide');
  } else if (!doneTitle.nextElementSibling &&
    !titleClass.contains('hide')) {
    titleClass.add('hide');
  }
}
