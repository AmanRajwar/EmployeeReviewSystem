
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
        const reviewId = reviewContainer.attr('id');
        if (response.message) {
            // Create the form element
            const formElement = $('<form>').addClass('feedback-form').attr('action', `/employee/create-feedback?id=${reviewId}`).attr('method', 'post');
            const inner = `<div class="row">
                                <h2>Feedback :</h2>
                                <div class="col">
                                <textarea type="text" id="feedback" name="feedbackText" class="form-control" placeholder="Enter Feedback"></textarea>
                                </div>
                                </div>
                                <input type="submit" class="btn btn-primary" value="Submit Feedback">`;
            formElement.append(inner);
            reviewContainer.append(formElement);
        } else {

            // Check if feedback text element already exists and remove it
            const feedbackTextElement = $('<div>').addClass('feedback-text');
            const inner = `<span class="inline">
                                <h2>Your Feedback:</h2>
                                <h4>${response.feedbackText}</h4>
                            </span>`
            feedbackTextElement.append(inner);
            reviewContainer.append(feedbackTextElement);
        }
    }



    // Delegating the click event to the parent element
    $('.review').on('click', '.container', async function () {
        const review = $(this).closest('.review');
        const existingFeedbackTextElement = review.find('div.feedback-text');
        if (existingFeedbackTextElement.length > 0) {
            existingFeedbackTextElement.remove();
            return;
        }
        const existingForm = review.find('form.feedback-form');
        if (existingForm.length > 0) {
            existingForm.remove();
            return;
        }

        const reviewId = review.attr('id');
        const url = `/employee/feedback?id=${reviewId}`
        const response = await makeGetCall(url);
        showFeedbacks(response, review);
    })








})