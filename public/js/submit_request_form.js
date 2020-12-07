$(() => {
    $("#info-modal").modal();

    // Handles the submit button click
    $("#submit-request-form").on("click", (event) => {
        event.preventDefault();

        let reqInfo = {};
        const fields = [
            "fullName",
            "emailAddress",
            "phoneNumber",
            "studentFullName",
            "school",
            "issueDescription",
        ];

        fields.forEach((field) => {
            let fieldData = $(`#${field}`).val().trim();
            console.log(fieldData);

            if (fieldData) {
                reqInfo[field] = fieldData;
            } else {
                reqInfo = false;
            }
        });

        if (reqInfo) {
            submitRequestForm(reqInfo);
        } else {
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
