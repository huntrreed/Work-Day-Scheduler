
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
        // variables for each part of the time blocks
        var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + (index + 9));
        var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour);
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
        var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
        saveBtn.append($('<i>').addClass('fas fa-save'));
  
        // Appending the elements to the time block
        timeBlock.append(hourCol, textArea, saveBtn);
  
        // Appending the time block to the container
        $('.container-lg').append(timeBlock);
      });
    }
    // Callback to create time blocks
    createTimeBlocks();
  });
//Updating time blocks to different classes: grey for the past, red for the current hour, and green for the future 
  $(function () {
    function updateTimeBlockClasses() {
      // Setting variable for the current time from the day.js file
      var currentHour = dayjs().hour();
  
      // Cycle through each time block seperately so they can all be updated individually 
      $('.time-block').each(function () {
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
        // Remove the previous class from the time block so that it can be updated with new class based on current time (not sure if this is needed but it was not updating on refresh without)
        $(this).removeClass('past present future');
        $(this).find('.current-hour-text').remove();
  
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
    // Callback to update classes
    updateTimeBlockClasses();
  });
  //Updating time blocks with events and saving those events to local storage so they can be reloaded later
  $(function () {
    function saveEvent(hour, eventText) {
      localStorage.setItem('event-' + hour, eventText);
    }
  
    // Click event on the save button will save the event info entered into the box
    $('.saveBtn').click(function () {
      var hour = $(this).closest('.time-block').attr('id').split('-')[1];
      var eventText = $(this).siblings('.description').val();
  
      // Callback to save the event
      saveEvent(hour, eventText);
    });
  
//Function for when you come back to the page after closing, the events will be pulled from local storage and still show on the calendar
    function loadSavedEvents() {
      $('.time-block').each(function () {
        var hour = $(this).attr('id').split('-')[1];
        var savedEvent = localStorage.getItem('event-' + hour);
        if (savedEvent) {
          $(this).find('.description').val(savedEvent);
        }
      });
    }
    // Callback to load any saved events
        loadSavedEvents();
  });
  

