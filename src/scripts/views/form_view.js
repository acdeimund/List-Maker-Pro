/**
 * @fileoverview This class populates the input form
 * with the correct models and options for the line.
 */

class FormView {

  constructor() {
    this.lineModel = new LineModel();
    this.modelSelectionBox = document.getElementById('model');
  }

  /**
   * Adds any models defined in line_model.js to the input form.
   * Other selection boxes are model dependant and also defined
   * in line_model.js.
   */
  addModels() {
    const options = this.lineModel.getModels();
        
    options.forEach(option => {
      const html = `<option value="${option}">${option}</option>`;
      this.modelSelectionBox.insertAdjacentHTML('beforeend', html);
    });
  }

  /**
   * Selectins are dependant on the model of the unit. These options
   * are defined in line_model.js
   * @param {string} selectionBoxName - The id of the parent selection box.
   */
  updateSelections(selectionBoxName){
    const selectionBox = document.getElementById(selectionBoxName);
    const model = document.getElementById('model').value;
    const options = this.lineModel.getOptions(model, selectionBoxName);

    // Clear the previous selections.
    selectionBox.innerHTML = '';

    options.forEach((value, key) =>{
      const html = `<option value="${key}">${value}</option>`;
      selectionBox.insertAdjacentHTML('beforeend', html);
      
    });

  }

  /**
   * Reads in and updates selections based on the lineModel.
   * Relies on "Model" as the control name.
   */
  updateAllSelections(){
    let sels = Array.from(document.getElementsByClassName('unitAttribute'));
    sels.forEach(element =>{

      if(element.nodeName === 'SELECT')
        if(element.id !== 'model' && element.id !== 'day'){
        this.updateSelections(element.id);
      }
    });
  }
}