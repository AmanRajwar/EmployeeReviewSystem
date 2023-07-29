$(document).ready(() => {

$('#employee').addClass('active');


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


  // Creates a performance review for the employee
  function createPerformance(employeeId) {
    $(`#button-${employeeId}`).on('click', async function (event) {
      event.preventDefault(); // Prevent form submission
      const title = $('#title').val();
      const description = $('#description').val();
      await makePostCall('/admin/performance-review', { title, description, employeeId });
    });
  }


  async function createPerformanceForm(employeeId) {
    try {
      
      const liElement = document.querySelector(`li.employee[id="${employeeId}"]`);
      if (liElement) {
        const existingList = liElement.querySelector('div.review-form');
        if (existingList) {
          liElement.removeChild(existingList);
        } else {


          const divElement = document.createElement('div');
          divElement.classList.add('review-form');
          divElement.innerHTML = `<form id="performanceForm" action="/interview/add" method="post">
          <div class="row">
              <h2>Create Review :</h2>
              <div class="col">
                  <input type="text" name="title"  id="title" class="form-control" placeholder="Title">
              </div>
              <div class="col">
                  <input type="text" name="description" class="form-control" id="description" placeholder="Description">
              </div>
              <input type="submit" id="button-${employeeId}" class="btn btn-primary" value="Create">
          </div>
      </form>`;

          liElement.appendChild(divElement);
          createPerformance(employeeId)
        }
      } else {
        console.log('Matching <li> element not found.');
      }
    } catch (error) {
      console.log('Error fetching student data:', error);
    }
  }


  // On click --->when any interview is clicked  elements
  $('.employee-container').on('click', async (event) => {
    const targetElement = event.target;
  
    if (targetElement.classList.contains('create-admin')) {
      return;
    }
    const employeeId = $(event.currentTarget).data('employee-id');
    createPerformanceForm(employeeId);
  });



  $('.create-admin').on('click', async function () {
    const employeeId = $(this).data('employee-id');
    console.log(employeeId);
  
    const url = `/admin/make-admin`;
    try {
      const response = await makePostCall(url, { employeeId });
      if (!response.error || !response.message) {
        const h2Element = $('<h2>').text('Already Admin');
        $(this).replaceWith(h2Element);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
  



})