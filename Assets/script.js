// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // Function to display the current date in the header of the page once the page is opened.
  $(function () {
    function displayCurrentDay() {
      var currentDay = dayjs().format('dddd, MMMM D, YYYY');
      $('#currentDay').text(currentDay);
    }
    // Callback for the function to display the current day
    displayCurrentDay();
  });

 // Function to create time blocks
  $(function () {
    function createTimeBlocks() {
      //Variables defining the work hours during which things can be scheudled 
      var workHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
      
      workHours.forEach(function(hour, index) {
        // Create elements for each part of the time block
        var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + (index + 9));
        var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour);
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
        var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
        saveBtn.append($('<i>').addClass('fas fa-save'));
  
        // Append the elements to the time block
        timeBlock.append(hourCol, textArea, saveBtn);
  
        // Appending the time block to the container
        $('.container-lg').append(timeBlock);
      });
    }
    // Callback to create time blocks
    createTimeBlocks();
  });
//Updating time blocks to grey in the past, red for the current hour, and green for the future 
  $(function () {
    function updateTimeBlockClasses() {
      // Setting variable for the current time from the day.js file
      var currentHour = dayjs().hour();
  
      // Cycle through each time block seperately so they can all be updated individually 
      $('.time-block').each(function () {
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
        // Remove any old classes to update new ones based on changed time
        $(this).removeClass('past present future');
  
        // Apply new class based on current time
        if (blockHour < currentHour) {
          $(this).addClass('past');
        } else if (blockHour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }
      });
    }
    // Call the function to update classes
    updateTimeBlockClasses();
  });
  
});


