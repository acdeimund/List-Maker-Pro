/**
 * This class handles changes on the UI for days, offsets, and overtime.
 */

class DayView {

  constructor() {
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
  }

  /**
   * Sets the day at the top of the page.
   */
  setDay(day = 1) {
    let date = new Date();
    const overtime = document.getElementById('overtime');
    const finalWorkday = parseInt(overtime.value) + 4;

    // Test if current day falls before the end of the work-week.
    if (date.getDay() <= finalWorkday){

      // No work on Sunday (aka 0)
      if(date.getDay() !== 0) day = date.getDay();
    }

    document.getElementById(day).selected = 'selected';
    this.changeAllDays(day);
  }

  /**
   * Changes the day at the top of the individual lists.
   * @param {int} day - A 0 based int. for the day.
   * @param {string} list - The name of the list we want to change the day for.
   */
  changeDay(day, list) {
    const overtime = document.getElementById('overtime');
    const dayLabel = document.getElementById(list + '-day');
    let offset = 0; // Default to 0

    // If offset is defined in the html, use it.
    if(document.getElementById(list + '-offset')){
      offset = parseInt(document.getElementById(list + '-offset').value);
    }

    const offsetDay = offset + day;
    const finalWorkday = parseInt(overtime.value) + 4;


    if (offsetDay <= finalWorkday) {
      dayLabel.innerText = this.days[offsetDay];
    } else {
      dayLabel.innerText = this.days[1];
    }
  }

  /**
   * Changes all the days based on the .station__days class. Uses changeDay().
   * @param {int} day - A 0 based int. for the day.
   */
  changeAllDays(day) {
    Array.from(document.getElementsByClassName('station__day'))
        .forEach(list =>{
          this.changeDay(day, list.id.replace('-day', ''));
    });
  }
}