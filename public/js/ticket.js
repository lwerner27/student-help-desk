$(() => {
    let spinnerShade = $("#spinner-shade");

    $("#open-close-btn").on("click", (event) => {
        event.preventDefault();
        spinnerShade.removeClass("invisible");

        sendUpdate(
            $("#open-close-btn").attr("data-id"),
            spinnerShade,
            updateStatusButtons
        );
    });
});

function sendUpdate(id, spinnerShade, updateStatusButtons) {
    fetch("/ticket/status", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.success) {
                alert(res.msg);
            } else {
                updateStatusButtons();
                spinnerShade.addClass("invisible");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function updateStatusButtons() {
    let openCloseBtn = $("#open-close-btn");
    let statusBtn = $("#status-btn");

    if (statusBtn.attr("data-status") === "true") {
        statusBtn
            .attr("data-status", "false")
            .removeClass("btn-success")
            .addClass("btn-danger")
            .text("OPEN");

        openCloseBtn
            .removeClass("btn-danger")
            .addClass("btn-success")
            .text("CLOSE TICKET");
    } else {
        statusBtn
            .attr("data-status", "true")
            .removeClass("btn-danger")
            .addClass("btn-success")
            .text("CLOSED");

        openCloseBtn
            .removeClass("btn-success")
            .addClass("btn-danger")
            .text("RE-OPEN TICKET");
    }
}
