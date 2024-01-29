var completedPriorityTasks = 0;
var completedNonPriorityTasks = 0;
var completedTasks = document.getElementById('tasks');

// Dodaj nasłuchiwanie zdarzeń na całą listę zadań (delegacja zdarzeń)
document.getElementById('task-list').addEventListener('click', function (event) {
    var target = event.target;
    
    // Sprawdź, czy kliknięty element to przycisk
    if (target && target.classList.contains('delete-btn')) {
        var taskItem = target.parentElement;
        var priorityIndicator = taskItem.querySelector('.priority-indicator');
        
        // Sprawdź, czy zadanie miało priorytet
        if (priorityIndicator) completedPriorityTasks++;
        
        else completedNonPriorityTasks++;

        // Usuń zadanie z listy
        taskItem.parentElement.removeChild(taskItem);
        completedTasks.textContent = `Zakończone zadania: ${completedNonPriorityTasks + completedPriorityTasks}`;

    }
});

function addTask() {
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');
    var checkbox = document.getElementById('chkbox');
    

    if (taskInput.value.trim() !== '') {
        var taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        if (checkbox.checked) {
            taskItem.classList.add('priority-task'); // Dodaj klasę dla stylizacji
            // Jeśli checkbox jest zaznaczony, dodaj na górę listy
            taskList.insertBefore(taskItem, taskList.firstChild);
        } else {
            // W przeciwnym razie, dodaj na koniec listy
            taskList.appendChild(taskItem);
        }

        var taskText = document.createTextNode(taskInput.value);
        taskItem.appendChild(taskText);

        var priorityIndicator = document.createElement('span');
        priorityIndicator.className = 'priority-indicator';
        priorityIndicator.textContent = '(Priorytet)';
        
        if (checkbox.checked) {
            // Jeśli checkbox jest zaznaczony, dodaj również wskaźnik priorytetu
            taskItem.appendChild(priorityIndicator);
        }

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.appendChild(document.createTextNode('Zaznacz jako zrobione'));

        taskItem.appendChild(deleteBtn);
        taskInput.value = '';

        
    } else completeForm();

    
}


function resolveAfter1Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Uzupełnij zadanie!");
        }, 1000);
    });
}

async function completeForm() {
    const result = await resolveAfter1Seconds();
    alert(result);
}


const weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=50.0413&longitude=21.999&hourly=temperature_2m,cloud_cover&timezone=auto&past_days=7';

// Funkcja do aktualizacji treści elementów HTML na stronie
function updateWeatherData(data) {
    // Przykład: Aktualizacja temperatury
    const temperature = document.getElementById('temperature');
    temperature.textContent = 'Temperatura: ' + data.hourly.temperature_2m[0] + '°C';

    // Przykład: Aktualizacja zachmurzenia
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




    


  