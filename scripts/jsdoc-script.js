/**
 * @var {number} completedPriorityTasks - Number of completed tasks with priority.
 */
var completedPriorityTasks = 0;

/**
 * @var {number} completedNonPriorityTasks - Number of completed tasks without priority.
 */
var completedNonPriorityTasks = 0;

/**
 * @var {Element} completedTasks - DOM element representing the container for completed tasks count.
 */
var completedTasks = document.getElementById('tasks');

/**
 * Event listener for the task list to handle task deletion.
 * @listens click
 * @param {Event} event - The click event object.
 */
document.getElementById('task-list').addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('delete-btn')) {
        var taskItem = target.parentElement;
        var priorityIndicator = taskItem.querySelector('.priority-indicator');

        if (priorityIndicator) completedPriorityTasks++;
        else completedNonPriorityTasks++;

        taskItem.parentElement.removeChild(taskItem);
        completedTasks.textContent = `Zakończone zadania: ${completedNonPriorityTasks + completedPriorityTasks}`;
    }
});

/**
 * Function to add a new task to the task list.
 */
function addTask() {
    /**
     * @var {HTMLInputElement} taskInput - Input element for entering task description.
     */
    var taskInput = document.getElementById('task-input');

    /**
     * @var {HTMLUListElement} taskList - The unordered list element representing the task list.
     */
    var taskList = document.getElementById('task-list');

    /**
     * @var {HTMLInputElement} checkbox - Checkbox indicating task priority.
     */
    var checkbox = document.getElementById('chkbox');

    if (taskInput.value.trim() !== '') {
        var taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        if (checkbox.checked) {
            taskItem.classList.add('priority-task');
            taskList.insertBefore(taskItem, taskList.firstChild);
        } else {
            taskList.appendChild(taskItem);
        }

        var taskText = document.createTextNode(taskInput.value);
        taskItem.appendChild(taskText);

        var priorityIndicator = document.createElement('span');
        priorityIndicator.className = 'priority-indicator';
        priorityIndicator.textContent = '(Priorytet)';

        if (checkbox.checked) {
            taskItem.appendChild(priorityIndicator);
        }

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.appendChild(document.createTextNode('Zaznacz jako zrobione'));

        taskItem.appendChild(deleteBtn);
        taskInput.value = '';
    } else completeForm();
}

/**
 * Function to resolve a promise after 1 second.
 * @returns {Promise<string>} A promise that resolves after 1 second with a message.
 */
function resolveAfter1Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Uzupełnij zadanie!");
        }, 1000);
    });
}

/**
 * Async function to complete the form after a delay.
 */
async function completeForm() {
    const result = await resolveAfter1Seconds();
    alert(result);
}

/**
 * @const {string} weatherURL - The URL for fetching weather data.
 */
const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=50.0413&longitude=21.999&hourly=temperature_2m,cloud_cover&timezone=auto&past_days=7';

/**
 * Function to update weather data on the HTML page.
 * Function that updates designated HTML elements with the latest weather information.
 *
 * This function takes the weather data received from the API and updates designated
 * HTML elements with the current temperature and cloud cover information. It is typically
 * called after successfully fetching weather data.
 *
 * @function
 * @name updateWeatherData
 * 
 *
 * @param {Object} data - The weather data object received from the API.
 * @property {Object} data.hourly - The hourly forecast data.
 * @property {number[]} data.hourly.temperature_2m - Array containing hourly temperature values.
 * @property {number[]} data.hourly.cloud_cover - Array containing hourly cloud cover percentage values.
 * 
 */
function updateWeatherData(data) {
    const temperature = document.getElementById('temperature');
    temperature.textContent = 'Temperatura: ' + data.hourly.temperature_2m[0] + '°C';

    const cloud = document.getElementById('cloud-cover');
    cloud.textContent = 'Zachmurzenie: ' + data.hourly.cloud_cover[0] + '%';
}

/**
 * Asynchronous function that retrieves weather data from the specified API endpoint
 * and updates the HTML page with the latest information.
 *
 * This function fetches weather data from the provided API endpoint and updates
 * designated HTML elements with the temperature and cloud cover information. It utilizes
 * the 'updateWeatherData' function to accomplish this task.
 *
 * @function
 * @name fetchAndUpdateWeatherData
 *
 * @throws {Error} Throws an error if the API response is not successful (HTTP status other than 200).
 *
 * @example
 * // Usage example:
 * fetchAndUpdateWeatherData('https://api.open-meteo.com/v1/forecast?latitude=50.0413&longitude=21.999&hourly=temperature_2m,cloud_cover&timezone=auto&past_days=7');
 *
 * @param {string} weatherURL - The URL of the weather API endpoint to fetch data from.
 * @returns {Promise<void>} A Promise that resolves after updating the weather data on the HTML page.
 */

async function fetchAndUpdateWeatherData(weatherURL) {
    try {
        // Fetch weather data from the specified API endpoint
        const response = await fetch(weatherURL);

        // Check if the API response is successful
        if (!response.ok) {
            throw new Error('Failed to retrieve weather data. Error code: ' + response.status);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Update weather data on the HTML page
        updateWeatherData(data);
    } catch (error) {
        // Log any errors that occur during the process
        console.error('An error occurred:', error);
    }
}

/**
 * Function that validates the input fields in a contact form and performs the following actions:
 * - Checks if the email field is empty; if yes, displays an alert and returns false.
 * - Checks if the phone number field is empty; if yes, displays an alert and returns false.
 * - Checks if the message field is empty; if yes, displays an alert and returns false.
 * - If all fields are filled, stores the email, phone number, and message in the local storage.
 * - Logs the stored email in the console.
 * - Displays a success alert indicating that the form has been successfully submitted.
 *
 * @function
 * @name validateForm
 * 
 * @returns {boolean} Returns true if the form is successfully validated and submitted; otherwise, returns false.
 *
 * @example
 *  HTML example:
 *  <form action="#" name="contact-form" class="formContainer" onsubmit="return validateForm()">
 *           <label for="email">Podaj swój email: </label>
 *           <input type="email" class="form-inputs" id="email" name="email">
 *           <label for="phone-number">Podaj swój nr telefonu: </label>
 *           <input inputmode="numeric" pattern="[0-9]*" class="form-inputs" id="phone-number" name="phone-number">
 *           <label for="textarea">Treść wiadomości: </label>
 *          <textarea name="textarea" id="textfield"></textarea>
 *           <br>
 *           <button id="wyslij">Wyślij</button>
 *          <button type="button" id="cancel" onclick="closeForm()">Wstecz</button>
 *       </form>
 * 
 *  JavaScript example:
 *  validateForm();
 */

function validateForm() {
    let email = document.forms["contact-form"]["email"].value;
    let phoneNumber = document.forms["contact-form"]["phone-number"].value;
    let textField = document.forms["contact-form"]["textfield"].value;

    if (email == "") {
        alert("Email nie może zostać pusty!");
        return false;
    } else if (phoneNumber == "") {
        alert("Numer telefonu nie może zostać pusty!");
        return false;
    } else if (textField == "") {
        alert("Wiadomość nie możę zostać pusta!");
        return false;
    } else {
        localStorage.setItem('email', email);
        localStorage.setItem('phone_number', phoneNumber);
        localStorage.setItem('text_field_message', textField);

        console.log(localStorage.getItem('email'));

        alert("Formularz został poprawnie przesłany! ");
        return true;
    }
}

/**
 * Function to open the contact form.
 */
function openForm() {
    var formPopup = document.getElementById("topForm");
    formPopup.style.display = "block";
    setTimeout(function () {
        formPopup.style.opacity = 1;
    }, 200);
}

/**
 * Function to close the contact form.
 */
function closeForm() {
    var formPopup = document.getElementById("topForm");
    formPopup.style.opacity = 0;
    setTimeout(() => {
        formPopup.style.display = "none";
    }, 400);
}

/**
 * Function to handle carousel button clicks and update active slides.
 */
const buttons = document.querySelectorAll("[data-carousel-button]");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});
