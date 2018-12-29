/**
 * @fileoverview This file creates an unordered list.
 * It handles adding and removing items from the list.
 */

class ListView {
  constructor(name) {

    // Remove '-list' from name. We don't want it for the parts lists and ids.
    this.name = name.replace('-list', '');

    // Retreive the acctual node associated with this list.
    this.list = document.getElementById(name);

    // Determine the type of list based on the Html. Html returns uppercase!
    this.listType = this.list.nodeName;
  }


  add(unit, lineModel, nextOrderedId = false) {
    const display = lineModel.getUnitDisplay(unit, this.name);
    
    // Only continue if this unit has something to display.
    if (display) {

      switch (this.listType) {

        // Display an unordered list.
        case 'UL':
          display.forEach(element => {

            // Create the id used for this element.
            const id = element.trim().replace(/ /g, '-');
            unit.addId(this.name, `${id}-${this.name}`);

            // Check if the element has already been added. If so, increment it.
            const qty = document.getElementById(`${id}-${this.name}-qty`);
            if (qty) {
              const count = (parseInt(qty.innerText)) + 1;
              if (count) {
                qty.innerText = count;
              } else {
                qty.innerText = 1;
              }

              // Otherwise, add the element;
            } else {

              const html =

                `<li id="${id}-${this.name}" class="station__list-item">
            ${element} (<span id="${id}-${this.name}-qty">1</span>)
          </li>`;

              this.list.insertAdjacentHTML('beforeend', html);
            }
          });
          break;

        // Display an ordered list
        case 'OL':

          // Create the id used for this element.
          const id = unit.ids.get('orderedId')
          unit.addId(this.name, `${id}-${this.name}`);

          const html =

            `<li id="${id}-${this.name}"
                data-ordered-id="${id}"
                class="station__list-item">
              ${lineModel.getUnitDisplay(unit, this.name)}
              <span id="${id}-${this.name}-qty" class = "hide">1</span>
            </li>`;

          if(!nextOrderedId){
            this.list.insertAdjacentHTML('beforeend', html);
          }else{
            const nextSibling =
                document.getElementById(`${nextOrderedId}-${this.name}`);
            nextSibling.insertAdjacentHTML('beforebegin', html);
          }

          break;

        // List inside a tabel.
        case 'TBODY':
          display.forEach(element => {
            // Create the id used for this element.
            const id = element.trim().replace(/ /g, '-');
            unit.addId(this.name, `${id}-${this.name}`);

            // Get the qty (must already exist) and increment it.
            const qty = document.getElementById(`${id}-${this.name}-qty`);

            // If the quantity has been set, increment it. Otherwise set to 1.
            if (qty) {
              const count = (parseInt(qty.innerText)) + 1;
              if (count) {
                qty.innerText = count;
              } else {
                qty.innerText = 1;
              }
            }

          });
          break;
      }
    }
  }
  remove(unit) {

    const listValues = unit.ids.get(this.name);

    if (listValues) {
      // Each map entry has an array of values that need to be removed.
      // Some items have multiple list entries.

      listValues.forEach(value => {
        let qty = document.getElementById(value + '-qty');

        // Test if qty exists. Some lists don't have quantities.
        if (qty) {
          const intQty = parseInt(qty.innerText);

          // If the quantity is greater than 1, decrement it.
          if (intQty > 1) {
            qty.innerText = intQty - 1;
            // Otherwise remove it if it's not persistant.
          } else if (!qty.dataset.persistent) {
            qty.parentElement.parentElement.removeChild(qty.parentElement);
          } else {
            qty.innerText = '';
          }
        }
      });
    }
  }
}