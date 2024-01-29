function validateForm() {
    let email = document.forms["contact-form"]["email"].value;
    let phoneNumber = document.forms["contact-form"]["phone-number"].value;
    let textField = document.forms["contact-form"]["textfield"].value;
    if (email == "") {
      alert("Email nie może zostać pusty!");
      return false;
    }
    else if(phoneNumber == "") {
        alert("Numer telefonu nie może zostać pusty!");
        return false;
    }
    else if(textField == "") {
        alert("Wiadomość nie możę zostać pusta!");
        return false;
    }
    else {
        localStorage.setItem('email' , email);
        localStorage.setItem('phone_number' , phoneNumber);
        localStorage.setItem('text_field_message', textField);

        console.log(localStorage.getItem('email'));

        alert("Formularz został poprawnie przesłany! ");

    }
}

function openForm() {
    var formPopup = document.getElementById("topForm");
    formPopup.style.display = "block";
    setTimeout(function() {
        formPopup.style.opacity = 1;
    }, 200);
}
      
function closeForm() {
    var formPopup = document.getElementById("topForm");
    formPopup.style.opacity = 0;
    setTimeout(() => {
        formPopup.style.display = "none";
    }, 400);
}


