$(() => {
    $("#submit-login").on("click", (event) => {
        event.preventDefault();

        let loginInfo = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
        };

        submitLoginForm(loginInfo);
    });
});

function submitLoginForm(loginInfo) {
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.success) {
                alert(`${res.msg}`);
            } else {
                window.location.replace("/tickets");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
