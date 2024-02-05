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
 * Function that updates designated HTML elements with the latest weather information.
 *
 * This function takes the weather data received from the API and updates designated
 * HTML elements with the current temperature and cloud cover information. It is typically
 * called after successfully fetching weather data.
 *
 * @function
 * @name updateWeatherData
 * @memberof global
 *
 * @param {Object} data - The weather data object received from the API.
 * @property {Object} data.hourly - The hourly forecast data.
 * @property {number[]} data.hourly.temperature_2m - Array containing hourly temperature values.
 * @property {number[]} data.hourly.cloud_cover - Array containing hourly cloud cover percentage values.
 * @returns {void}
 */
function updateWeatherData(data) {
    // Get the temperature element from the DOM
    const temperatureElement = document.getElementById('temperature');
    // Update the temperature content with the latest value from the API
    temperatureElement.textContent = 'Temperature: ' + data.hourly.temperature_2m[0] + '°C';

    // Get the cloud cover element from the DOM
    const cloudCoverElement = document.getElementById('cloud-cover');
    // Update the cloud cover content with the latest value from the API
    cloudCoverElement.textContent = 'Cloud Cover: ' + data.hourly.cloud_cover[0] + '%';
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
    // Get values from form fields
    let email = document.forms["contact-form"]["email"].value;
    let phoneNumber = document.forms["contact-form"]["phone-number"].value;
    let textField = document.forms["contact-form"]["textfield"].value;

    // Check if the email field is empty
    if (email == "") {
        alert("Email cannot be empty!");
        return false;
    } 
    // Check if the phone number field is empty
    else if (phoneNumber == "") {
        alert("Phone number cannot be empty!");
        return false;
    } 
    // Check if the message field is empty
    else if (textField == "") {
        alert("Message cannot be empty!");
        return false;
    } else {
        // Store form data in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('phone_number', phoneNumber);
        localStorage.setItem('text_field_message', textField);

        // Log the stored email in the console
        console.log(localStorage.getItem('email'));

        // Display a success alert
        alert("Form has been successfully submitted!");
        return true;
    }
}
