
$(document).ready(function () {



  $('#performance-page').addClass('active');


  function makePostCall(url, data) {
    return $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: data,
    });
  }

  function makeGetCall(url) {
    return $.ajax({
      url: url,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
    })
  }


  
  // Function to show feedbacks of the employees when performance review is clicked
  function showFeedbacks(response, reviewContainer) {
    const existingFeedbackContainer = reviewContainer.find('> div#feedback-container');
    if (existingFeedbackContainer.length > 0) {
      existingFeedbackContainer.remove();
      return; // Return early if the feedback container exists and is removed
    }


    const divContainer = $('<div>').attr('id', 'feedback-container');
    if (response.length === 0) {

      const h2Element = $('<h2>').text("No Feedback Yet");
      divContainer.append(h2Element);
      reviewContainer.append(divContainer);
    } else {
      const ulElement = $('<ul>');
console.log('aman nitin')
        response.forEach((feedback) => {
          const liElement = `<li>
                              <span class="inline">
                              <h2>Reviewer:</h2>
                              <h4 class="reviewer">${feedback.reviewer.name}</h4>
                              </span>
                              <span class="inline">
                              <h2>Feedback:</h2>
                              <h4 class="feedback-text">${feedback.feedbackText}</h4>
                              </span>
                          <li> `
          ulElement.append(liElement);
          divContainer.append(ulElement);
        });
      

      // Add the unordered list to the review container without replacing existing content
      reviewContainer.append(divContainer);
    }
  }


  // Delegating the click event to the parent element
  $('#review-list').on('click', '.update-btn', function () {
    const reviewContainer = $(this).closest('.review-container');
    const review = $(this).closest('.review');
    const titleElement = reviewContainer.find('.title');
    const descriptionElement = review.find('.description');
    const updateButton = reviewContainer.find('.update-btn');

    // Get the current title and description
    const currentTitle = titleElement.text();
    const currentDescription = descriptionElement.text();
    // Replace with input fields for editing
    titleElement.html(`<input type="text" name="title" class="form-control title" value="${currentTitle}">`);
    // Convert the textarea to an editable textarea
    descriptionElement.html(`<textarea class="form-control description">${currentDescription}</textarea>`);

    // Change the update button text to Submit
    updateButton.text('Submit');
    updateButton.removeClass('update-btn').addClass('submit-btn');
  });



  // Delegating the submit event to the parent element
  $('#review-list').on('click', '.submit-btn', async function (event) {
    event.preventDefault(); // Prevent form submission
    const reviewContainer = $(this).closest('.review-container');
    const review = $(this).closest('.review');
    const titleElement = reviewContainer.find('.title input');
    const descriptionElement = review.find('.description textarea');
    const submitButton = reviewContainer.find('.submit-btn');

    // Get the current title and description from input fields
    const currentTitle = titleElement.val();
    const currentDescription = descriptionElement.val();

    const performanceId = review.attr('id');

    const url = '/admin/performance-edit';
    await makePostCall(url, { currentTitle, currentDescription, performanceId })


    // Replace input fields with h4 elements for display
    titleElement.replaceWith(`<h4 class="title">${currentTitle}</h4>`);
    descriptionElement.replaceWith(`<h4 class="description">${currentDescription}</h4>`);

    submitButton.text('Update');
    submitButton.removeClass('submit-btn').addClass('update-btn');
  });



  $('#review-list').on('click', '.container', async function (event) {
    if (!$(event.target).is('input, button')) {
      const reviewContainer = $(this).closest('.review');
      const reviewId = reviewContainer.attr('id'); // Get the ID attribute of the review container

      const url = `/admin/feedback?id=${reviewId}`; // Append the reviewId as a query parameter to the URL
      const response = await makeGetCall(url);
      console.log(response);
      showFeedbacks(response, reviewContainer);
    }
  });




});

