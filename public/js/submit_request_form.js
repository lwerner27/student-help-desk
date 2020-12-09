$(() => {
    $("#info-modal").modal();

    // Handles the submit button click
    $("#submit-request-form").on("click", (event) => {
        event.preventDefault();

        $("#spinner-shade").removeClass("invisible");

        let reqInfo = {};
        const fields = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "studentFullName",
            "school",
            "issueDescription",
        ];

        for (let i = 0; i < fields.length; i++) {
            if ($(`#${fields[i]}`).val()) {
                reqInfo[fields[i]] = $(`#${fields[i]}`).val().trim();
            } else {
                reqInfo = false;
                break;
            }
        }

        if (reqInfo) {
            submitRequestForm(reqInfo);
        } else {
            $("#spinner-shade").addClass("invisible");
            alert("Please make sure you filled in all the fields.");
        }
    });
});

function submitRequestForm(reqInfo) {
    fetch("/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqInfo),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.success) {
                window.location.replace("/sorry");
            } else {
                window.location.replace("/success");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
