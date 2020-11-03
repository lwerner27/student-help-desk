$(() => {

    // Handles the submit button click
    $("#submit-request-form").on("click", (event) => {
        event.preventDefault()

        // Object for holding info from the form 
        let reqInfo ={};
        reqInfo.fullName = $("#fullName").val()
        reqInfo.email = $("#emailAddress").val()
        reqInfo.phoneNumber = $("#phoneNumber").val()
        reqInfo.studentFullName = $("#studentFullName").val()
        reqInfo.school = $("#studentSchool").val()
        reqInfo.issueDescription = $("#issueDescription").val()

    })
})