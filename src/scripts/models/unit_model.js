/**
 *  @fileoverview Object to represent a unit on a line. It also describes
 * how it should be displayed on each list.
 */
class UnitModel {

  /**
   * Creates an individual Unit.
   * @param {Array} attributes - Array of the attributes read in from the form. 
   * @param {Map} ids - Map of ids for later removal of the unit.
   */
  constructor(attributes = [], ids = new Map()) {
    this.attr = this.parseAttributes(attributes);
    this.ids = ids;
  }

  /**
   * This DOES NOT handel all the possible form elements. Only the ones
   * currently used on the front-end. So far, they are:
   * 
   * <select>, <input type = 'checkbox>
   * 
   * @param {Array} attributes - The attributes read in from the form. 
   */
  parseAttributes(attributes) {
    let returnAttr = new Map();
    attributes.forEach(attr => {
      switch (attr.nodeName) {
        case 'SELECT':
          returnAttr.set(attr.id, attr.value);
        case 'INPUT':
          switch (attr.type) {
            case 'checkbox':
              returnAttr.set(attr.id, attr.checked);
          }


      }
    });

    return returnAttr;
  }

  get(attr) {
    return this.attr.get(attr);
  }

  addId(listName, value) {

    const values = this.ids.get(listName)
    values ? values.push(value) : this.ids.set(listName, [value]);
  }

  update(attributes){
    this.attr = this.parseAttributes(attributes);
    this.ids = new Map([['orderedId', this.ids.get('orderedId')]]);
  }
}