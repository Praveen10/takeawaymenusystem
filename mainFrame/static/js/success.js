var orderStatus = $("#progressbar-2").data("orderstatus");
var orderMode = $("#progressbar-2").data("ordermode");

// var orderCheck = $("#progressbar-2").data("orderstatus");
// alert(orderCheck);
function updateProgressBar() {
    var progressBar = document.getElementById("progressbar-2");
    var steps = progressBar.getElementsByTagName("li");

    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var stepId = step.id;

        step.className = "step0";
        if (orderMode === "delivery") {
            if (orderStatus === "ready_for_collection") {
                orderStatus = "in_kitchen"
            }
            if (stepId === "step1" && (orderStatus === "placed" || orderStatus === "accepted" || orderStatus === "in_kitchen" || orderStatus === "en_route" || orderStatus === "delivered")) {
                step.classList.add("active");
                document.getElementById("step1").style.content = '\f111';
            } else if (stepId === "step2" && (orderStatus === "accepted" || orderStatus === "in_kitchen" || orderStatus === "en_route" || orderStatus === "delivered")) {
                step.classList.add("active");
                document.getElementById("step2").style.content = '\f111';
            } else if (stepId === "step3" && (orderStatus === "in_kitchen" || orderStatus === "en_route" || orderStatus === "delivered")) {
                step.classList.add("active");
                document.getElementById("step3").style.content = '\f111';
            } else if (stepId === "step4" && (orderStatus === "en_route" || orderStatus === "delivered")) {
                step.classList.add("active");
                document.getElementById("step4").style.content = '\f111';
            } else if (stepId === "step5" && orderStatus === "delivered") {
                step.classList.add("active");
                document.getElementById("step5").style.content = '\f111';
                rating();
            }
        } else if (orderMode === "pickup") {
            if (orderStatus === "ready_for_collection") {
                orderStatus = "ready"
            }
            if (stepId === "step1" && (orderStatus === "placed" || orderStatus === "accepted" || orderStatus === "in_kitchen" || orderStatus === "ready" || orderStatus === "collected")) {
                step.classList.add("active");
                document.getElementById("step1").style.content = '\f111';
            } else if (stepId === "step2" && (orderStatus === "accepted" || orderStatus === "in_kitchen" || orderStatus === "ready" || orderStatus === "collected")) {
                step.classList.add("active");
                document.getElementById("step2").style.content = '\f111';
            } else if (stepId === "step3" && (orderStatus === "in_kitchen" || orderStatus === "ready" || orderStatus === "collected")) {
                step.classList.add("active");
                document.getElementById("step3").style.content = '\f111';
            } else if (stepId === "step4" && (orderStatus === "ready" || orderStatus === "collected")) {
                step.classList.add("active");
                document.getElementById("step4").style.content = '\f111';
            } else if (stepId === "step5" && orderStatus === "collected") {
                step.classList.add("active");
                document.getElementById("step5").style.content = '\f111';
                rating();
            } else {
                step.classList.remove("active");
            }
        }
    }
}

updateProgressBar();

function rating() {

    var customerID = $("#ratingCard").data("customerid");
    var restaurantID = $("#ratingCard").data("restaurantid");
   
    const ratingCard = document.getElementById("ratingCard");
    const emojiRating = document.querySelectorAll(".emoji");
    const feedbackSection = document.getElementById("feedbackSection");
    const feedbackTextarea = document.getElementById("feedbackTextarea");
    const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");

    let selectedEmoji = 0;

    ratingCard.classList.remove("d-none");

    emojiRating.forEach(emoji => {
        emoji.addEventListener("click", () => {
            selectedEmoji = parseInt(emoji.getAttribute("data-rating"));
            emojiRating.forEach(e => {
                e.classList.remove("selected");
            });
            emoji.classList.add("selected");

            if (selectedEmoji <= 3) {
                feedbackSection.style.display = "block"; 
            } else {
                feedbackSection.style.display = "none"; 
                $.ajax({
                    type: "POST",
                    url: "/ratings",
                    data: {
                        rating: selectedEmoji,
                        feedback: '',
                        customerId: customerID,
                        restaurantId: restaurantID,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
            }
        });
    });



    submitFeedbackBtn.addEventListener("click", () => {
        const feedback = feedbackTextarea.value;
        if (selectedEmoji <= 3) {
            // Send the rating and feedback after clicking the submit button
            $.ajax({
                type: "POST",
                url: "/ratings",
                data: {
                    rating: selectedEmoji,
                    feedback: feedback,
                    customerId: customerID,
                    restaurantId: restaurantID,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(response) {
                    console.log(response);
                    feedbackSection.style.display = "none";
                }
            });
        } 
    });
}


$(document).ready(function() {
    // Handle form submission
    $("#sendMailButton").click(function() {
        // Reset previous validation errors
        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").hide();

        // Get input values
        var toAddress = $("#toAddress").val();
        var subject = $("#mailSubject").val();
        var body = $("#mailBody").val();
        var valid = true;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(toAddress)) {
            $("#toAddress").addClass("is-invalid");
            $("#fromAddressError").text("Please enter a valid email address").show();
            valid = false;
        }

        // Validate form fields
        

        if (toAddress.trim() === "") {
            $("#toAddress").addClass("is-invalid");
            $("#fromAddressError").show();
            valid = false;
        }

        if (subject.trim() === "") {
            $("#mailSubject").addClass("is-invalid");
            $("#mailSubjectError").show();
            valid = false;
        }

        if (body.trim() === "") {
            $("#mailBody").addClass("is-invalid");
            $("#postcodeError").show();
            valid = false;
        }

        if (!valid) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "/enquiry",
            data: {
                toAddress: toAddress,
                subject: subject,
                body: body,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response) {
                console.log(response);
                $("#mailModal").modal("hide");
            }
        });
    });
});