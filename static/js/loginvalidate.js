var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



var mail = document.getelementbyid("email").value;

function valemail() {

    if (mail.match(mailformat)) {

        return true;
    } else {
        alert("You have entered an invalid email address!");
        email.focus();
        return false;

    }
}