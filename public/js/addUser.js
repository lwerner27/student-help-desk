$(() => {
    $("#submit-add-user").on("click", (event) => {
        event.preventDefault();

        let spinnerShade = $("#spinner-shade");
        spinnerShade.removeClass("invisible");

        let userInfo = getUserInfo();

        if (typeof userInfo === "string") {
            spinnerShade.addClass("invisible");
            alert(userInfo);
        } else {
            submitNewUser(userInfo);
            spinnerShade.addClass("invisible");
        }
    });
});

// Fucntion for getting and formatting the new user info.
function getUserInfo() {
    let status = true;
    let userInfo = {
        fullName: $("#fullName").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        confirmPassword: $("#confirmPassword").val(),
        role: $("#role").val(),
    };

    for (const [key, value] of Object.entries(userInfo)) {
        if (value) {
            userInfo[key] = value.trim();
        } else {
            status = false;
            userInfo = "Please check that you filled in all the fields.";
            break;
        }
    }

    if (!status) {
        return userInfo;
    }

    if (userInfo.password.length < 8) {
        status = false;
        userInfo = "Please make sure the password is at least 8 characters.";
        return userInfo;
    }

    if (userInfo.password !== userInfo.confirmPassword) {
        status = false;
        userInfo = "Passwords do not match.";
        return userInfo;
    }

    return userInfo;
}

// Function for submitting the new user info.
function submitNewUser(userInfo) {
    fetch("/add/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.success) {
                console.log(res.msg);
                alert("Error adding user check logs.");
            } else {
                clearFields();
                alert("User has been added.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    return;
}

function clearFields() {
    $("#fullName").val("");
    $("#email").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $("#role").val("Choose One...");
}
