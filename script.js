// Function to display the current date in the header of the page once the page is opened. (Looked up the formatting of the Date pull from the day.js file on how to display current day)
$(function () {
  function displayCurrentDay() {
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDay);
  }
  // Callback for the function to display the current day
  displayCurrentDay();
});
// Function to create time blocks with each hour on the calendar as a variable
function createTimeBlocks() {
  var workHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

  workHours.forEach(function(hour, index) {
    // variables for each hour to add a time row, an column with the hour listed, a spot to write events, and a save button
    var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + (index + 9));
    var hourCol = $('<div>').addClass('col-1 hour text-center py-3').text(hour);
    var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    saveBtn.append($('<i>').addClass('fas fa-save'));

      // Attaching the hours, text, and save buttons to the time block from line 11
      timeBlock.append(hourCol, textArea, saveBtn);
      $('.container-lg').append(timeBlock);
    });
  }

//createTimeBlocks and displaySavedEvents when page is loaded
$(document).ready(function() {
  createTimeBlocks();
  displaySavedEvents(); 
});

//Updating time blocks to different classes: grey for the past, red for the current hour, and green for the future 
function updateTimeBlockClasses() {
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    $(this).removeClass('past present future');
    
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
}
    // Callback to update classes and colors every minute 
$(document).ready(function() {
  updateTimeBlockClasses();
  setInterval(updateTimeBlockClasses, 60000); 
  }); 

//event listener for saving events 
$(document).on('click', '.saveBtn', function () {
  var hour = $(this).closest('.time-block').attr('id').split('-')[1];
  var eventText = $(this).siblings('.description').val();
  
  saveEvent(hour, eventText);
});
  
//Function for when you come back to the page after closing, the events will be pulled from local storage and still show on the calendar
function saveEvent(hour, eventText) {
  localStorage.setItem('event-' + hour, eventText);
}

function displaySavedEvents() {
  $('.time-block').each(function() {
    var hour = $(this).attr('id').split('-')[1];
    var savedEvent = localStorage.getItem('event-' + hour);
    if (savedEvent) {
      $(this).find('.description').val(savedEvent);
    }
  });
}