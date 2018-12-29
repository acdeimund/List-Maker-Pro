/**
 * @fileoverview This class handles all the events in the program and
 * initializes any fields on startup.
 * Right now this is the only controller, so it handles everything.
 * It may be necessary to break this up later if the program becomes
 * more complex.
 */

class EventController {

  constructor() {
    this.formView = new FormView();
    this.orderedListCount = 0;
    this.units = new Map();
    this.lists = [];
    this.lineModel = new LineModel();
    this.dayView = new DayView();
    this.edit = false;

    // Populate the lists array.
    Array.from(document.getElementsByClassName('list')).forEach(element => {
      this.lists.push(new ListView(element.id));
    });
  }

  // document.getElementById('model').addEventListener('change', event => {
  //   let model = event.target.value;

  /**
   * Initialize the application when the window is loaded.
   */
  init() {
    window.addEventListener('load', () => {
      this.formView.addModels();
      this.formView.updateAllSelections();
      this.dayView.setDay();
    });
  }

  /**
   * Changes the secondary selection boxes when the model changes.
   */
  addModelChangeEvent() {
    document.getElementById('model').addEventListener('change', () => {
      this.formView.updateAllSelections();
    });
  }

  addButtonEvent() {
    document.getElementById('add-button').addEventListener('click', event => {
      event.preventDefault();
      let unit;

      // If there is nothing to edit, create and add the unit.
      if (!this.edit) {
        // Create a new Unit from the UI.
        unit = new UnitModel(

          // Get all the attributes of the unit from the form.
          Array.from(document.getElementsByClassName('unitAttribute')),

          // Add any ids we'll need in the future.
          new Map([['orderedId', [this.orderedListCount]]]),
        );

        // Clear lock check-box.
        document.getElementById('lock').checked = false;

        // Store a copy in the unit map in case it needs to be deleted later.
        this.units.set(this.orderedListCount, unit);

        // Update all the lists with the current unit.
        this.lists.forEach(element => element.add(unit, this.lineModel));

        // this.ordered list is used in multiple places. To avoid confusion
        // and possible bugs, increment it at the end.
        this.orderedListCount++
      } else {

        // Get next sibling id so we know where to insert the new element.
        let nextOrderedId = false;
        const editNode = document.getElementById(this.edit.ids.get('control'));
        if (editNode.nextElementSibling) {
          const nextSibling = editNode.nextElementSibling;
          nextOrderedId = nextSibling.dataset.orderedId;
        }

        this.lists.forEach(list => {
          list.remove(this.edit);
        });

        this.edit.update(
          Array.from(document.getElementsByClassName('unitAttribute'))
        );

        this.lists.forEach(element => element.add(this.edit, this.lineModel,
          nextOrderedId));

      }
    });
  }

  addDayChangeEvents() {
    document.getElementById("day").addEventListener('change', event => {
      let day = parseInt(event.target.value);
      this.dayView.changeAllDays(day);
    });

    document.getElementById("overtime").addEventListener('change', () => {
      let day = parseInt(document.getElementById('day').value);
      this.dayView.changeAllDays(day);
    });

    let offsets = Array.from(
      document.getElementsByClassName('station__offset-container--input'));
    offsets.forEach(element => {
      element.addEventListener('change', event => {
        let splitId = event.target.id.split('-');
        let day = document.getElementById('day');
        this.dayView.changeDay(parseInt(day.value), splitId[0]);
        event.target.blur();
      });
    });
  }

  /**
   * Adds the event for switching the contents of the .content section
   * when a tab at the top is clicked.
   */
  addTabEvents() {

    // Get an array of elements that are considered 'tabs'.
    const tabs = Array.from(
      document.getElementsByClassName('station__heading')
    );

    tabs.forEach(tab => {
      tab.addEventListener('click', event => {

        /** Handle the tabs at the top. **/

        // Get an array of tabs with the class selected.
        // There should only be one, but just in case we will get them all.
        let selected = Array.from(
          document.getElementsByClassName('station__heading--selected')
        );
        let target = event.target;

        selected.forEach(element => {
          element.classList.remove('station__heading--selected');
        });
        target.classList.add('station__heading--selected');

        /** Handle the content at the bottom **/

        // Same as above. Remove any content that may be selected
        selected = Array.from(
          document.getElementsByClassName('station__body--displayed')
        );
        //target = event.target;

        selected.forEach(element => {
          element.classList.remove('station__body--displayed');
        });
        let name = target.id.split('-')[0];

        target = document.getElementById(name + '-body');
        target.classList.add('station__body--displayed');


      });
    });
  }

  addEditEvents() {

    // The entire menu.
    const contextMenu = document.getElementById('context-menu');

    // The button container.
    const buttonContainer =
      document.querySelector('.context-menu__button-container');

    // The LI element to be edited.
    let liTarget = '';


    /**** LI click event ****/
    // Delegate the LI click event to the control-list.
    document.getElementById('control-list').addEventListener(
      'click', event => {

        // We need to add the width of the side-bar to the final x pos.
        const sidebar = document.querySelector('.side-bar').offsetWidth;

        // Get the final position of the even's target.
        const box = event.target.getBoundingClientRect();
        const x = box.left;
        const y = box.top;

        // Only fire when the click happens on a list item
        if (event.target.nodeName === 'LI') {

          // Set the liTarget to the LI clicked.
          liTarget = event.target;

          buttonContainer.style.visibility = 'visible';

          // Opacity is required to trigger the transition.
          buttonContainer.style.opacity = '1';

          //Set the width. Height is set in css.
          contextMenu.style.width = box.width + 'px';

          // Set the position.
          contextMenu.style.left = (x - sidebar) + 'px';
          contextMenu.style.top = y + 'px';
        }
      });

    /**** context-menu click events ****/
    document.getElementById('delete').addEventListener('click', () => {
      const index = parseInt(liTarget.dataset.orderedId);
      const unit = this.units.get(index);
      this.lists.forEach(list => {
        list.remove(unit);
      });

      // Hide the menu once item is deleted. No delay for this one.
      buttonContainer.style.visibility = 'hidden';
      contextMenu.style.left = '-999px';
      contextMenu.style.top = '-999px';

    });

    document.getElementById('edit').addEventListener('click', () => {
      const index = parseInt(liTarget.dataset.orderedId);
      const unit = this.units.get(index);

      liTarget.classList.add('highlight');
      this.edit = unit;

      // Hide the menu once item is edited. No delay for this one.
      buttonContainer.style.visibility = 'hidden';
      contextMenu.style.left = '-999px';
      contextMenu.style.top = '-999px';

    });

    document.getElementById('up').addEventListener('click', () => {
      const index = parseInt(liTarget.dataset.orderedId);
      const unit = this.units.get(index);

      // Only fire if the element is not already at the top.
      if (liTarget.previousElementSibling) {

        // Get elements from all ordered lists.
        let selector = `[data-ordered-id = "${unit.ids.get('orderedId')}"]`;
        Array.from(document.querySelectorAll(selector)).forEach(element => {

          const prevLi = element.previousElementSibling;
          const parent = element.parentNode;
          parent.insertBefore(element, prevLi);
        });

        // Hide the menu once item is moved. No delay for this one.
        buttonContainer.style.visibility = 'hidden';
        contextMenu.style.left = '-999px';
        contextMenu.style.top = '-999px';
      }
    });

    document.getElementById('down').addEventListener('click', () => {
      const index = parseInt(liTarget.dataset.orderedId);
      const unit = this.units.get(index);

      // Get elements from all ordered lists.
      let selector = `[data-ordered-id = "${unit.ids.get('orderedId')}"]`;
      Array.from(document.querySelectorAll(selector)).forEach(element => {
        const nextLi = element.nextElementSibling.nextElementSibling;
        const parent = element.parentNode;
        parent.insertBefore(element, nextLi);
      });

      // Hide the menu once item is moved. No delay for this one.
      buttonContainer.style.visibility = 'hidden';
      contextMenu.style.left = '-999px';
      contextMenu.style.top = '-999px';

    });



    /**** context-menu mouseleave event ****/
    document.getElementById('context-menu').addEventListener(
      'mouseleave', () => {
        buttonContainer.style.opacity = '0';

        // Delay these actions to allow the css transition in _context-menu.scss
        setTimeout(() => {
          buttonContainer.style.visibility = 'hidden';
          contextMenu.style.left = '-999px';
          contextMenu.style.top = '-999px';
        }, 200);
      });
  }


  run() {
    this.init();
    this.addTabEvents();
    this.addModelChangeEvent();
    this.addButtonEvent();
    this.addDayChangeEvents();
    this.addEditEvents();
  }
}