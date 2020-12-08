$(() => {
    $("#submit-login").on("click", (event) => {
        event.preventDefault();

        userInfo = getUserInfo();

        if (userInfo === 0) {
            alert("please make sure to include your email.");
        } else if (userInfo === 1) {
            alert(
                "Please make sure your password is at least 8 characters long."
            );
        } else if (userInfo === 2) {
            alert("Please make sure yot include your full name.");
        } else if (userInfo === 3) {
            alert(
                "Your passwords do not match please double check your spelling."
            );
        } else {
            submitRegistrationForm(userInfo);
        }
    });
});

function getUserInfo() {
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();
    let confirmPassword = $("#confirmPassword").val().trim();
    let fullName = $("#fullName").val().trim();

    if (!email || email === "") {
        return 0;
    }

    if (!password || password.length < 8) {
        return 1;
    }

    if (!fullName || fullName === "") {
        return 2;
    }

    if (password !== confirmPassword) {
        return 3;
    }

    return {
        email,
        password,
        fullName,
    };
}

function submitRegistrationForm(userInfo) {
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.success) {
                alert(
                    "There was an issue with your registration please try again later."
                );
            } else {
                window.location.replace("/login");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
