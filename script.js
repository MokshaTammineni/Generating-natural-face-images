const token = "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"; // Your Hugging Face token
const inputTxt = document.getElementById("input"); // Input field for text prompt
const image = document.getElementById("image"); // Image element to display the result
const button = document.getElementById("btn"); // Button to trigger API call
const loading = document.getElementById("loading"); // Loading animation element
const backBtn = document.getElementById("back-btn"); // Back button element

// Function to query the Hugging Face API and get an image
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
        {
            headers: {
                Authorization: Bearer ${token}, // Authorization token
                "Content-Type": "application/json", // Setting content type
            },
            method: "POST",
            body: JSON.stringify({ inputs: data }), // Sending the prompt as JSON
        }
    );

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
        throw new Error(HTTP error! Status: ${response.status});
    }

    // Return the result as a blob (image)
    return response.blob();
}

// Event listener for the button click
button.addEventListener("click", async function () {
    try {
        const textInput = inputTxt.value; // Get the input from the user

        // Show loading animation and hide image
        loading.style.display = "block";
        image.style.display = "none";

        const response = await query(textInput); // Call API with user input
        const objectURL = URL.createObjectURL(response); // Create URL from response

        image.src = objectURL; // Set image source
        image.style.display = "block"; // Display the image

    } catch (error) {
        console.error("Error during API call:", error); // Handle errors
    } finally {
        // Hide loading animation after image loads
        loading.style.display = "none";
    }
});

// Event listener for the back button to redirect to homepage
backBtn.addEventListener("click", function () {
    window.location.href = "index.html"; // Change to your home page
});