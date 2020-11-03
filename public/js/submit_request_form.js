$(() => {
    // Handles the submit button click
    $("#submit-request-form").on("click", (event) => {
        event.preventDefault();

        let reqInfo = {};
        reqInfo.fullName = $("#fullName").val().trim();
        reqInfo.email = $("#emailAddress").val().trim();
        reqInfo.phoneNumber = $("#phoneNumber").val().trim();
        reqInfo.studentFullName = $("#studentFullName").val().trim();
        reqInfo.school = $("#studentSchool").val().trim();
        reqInfo.issueDescription = $("#issueDescription").val().trim();

        fetch("/submit_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqInfo),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Success:", res);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
