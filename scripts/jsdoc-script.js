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
 * @param {Object} data - Weather data received from the API.
 */
function updateWeatherData(data) {
    const temperature = document.getElementById('temperature');
    temperature.textContent = 'Temperatura: ' + data.hourly.temperature_2m[0] + '°C';

    const cloud = document.getElementById('cloud-cover');
    cloud.textContent = 'Zachmurzenie: ' + data.hourly.cloud_cover[0] + '%';
}

fetch(weatherURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych pogodowych. Kod błędu: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        updateWeatherData(data);
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });

/**
 * Function to validate the contact form.
 * @returns {boolean} - Returns true if the form is valid, otherwise returns false.
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
