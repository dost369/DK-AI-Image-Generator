document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('prompt');
    const negativePromptInput = document.getElementById('negative-prompt');
    const loadingDiv = document.getElementById('loading');
    const imageOutputDiv = document.getElementById('image-output');
    const generatedImage = document.getElementById('generatedImage');
    const downloadLink = document.getElementById('downloadLink');
    const errorMessageDiv = document.getElementById('error-message');

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        const negativePrompt = negativePromptInput.value.trim();

        if (!prompt) {
            displayError("Please enter a prompt to generate an image.");
            return;
        }

        // Show loading spinner, hide previous results/errors
        loadingDiv.classList.remove('hidden');
        imageOutputDiv.classList.add('hidden');
        errorMessageDiv.classList.add('hidden');
        generatedImage.src = ''; // Clear previous image
        downloadLink.classList.add('hidden');

        try {
            // In a real application, you'd send this to your Python backend,
            // which then calls the Hugging Face API.
            // For this example, we'll simulate the call directly for simplicity,
            // but remember this is for demonstration.
            // YOU WOULD REPLACE THIS WITH AN ACTUAL FETCH TO YOUR BACKEND API.
            // Example: const response = await fetch('/generate-image', { ... });
            // For now, we'll call the Python script as if it were a direct API.
            // THIS REQUIRES A SERVER TO RUN YOUR PYTHON SCRIPT AS AN ENDPOINT.
            // See "Connecting Frontend to Backend" section below.

            // Simulate API call (replace with actual fetch to your backend)
            // This is a placeholder, you'll need a backend server (Flask/FastAPI)
            // to expose your Python image generation function as an API endpoint.
            const response = await simulateBackendCall(prompt, negativePrompt);

            if (response.success) {
                generatedImage.src = response.imageUrl; // Base64 image data
                downloadLink.href = response.imageUrl;
                imageOutputDiv.classList.remove('hidden');
                downloadLink.classList.remove('hidden');
            } else {
                displayError(response.error || "An unknown error occurred during image generation.");
            }

        } catch (error) {
            console.error('Error:', error);
            displayError("Failed to connect to the image generation service. Please try again.");
        } finally {
            loadingDiv.classList.add('hidden');
        }
    });

    function displayError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('hidden');
    }

    // --- Placeholder for Backend Interaction ---
    // In a real setup, your Python script would be exposed via a web framework
    // like Flask or FastAPI, and this JavaScript would make an AJAX request to it.
    async function simulateBackendCall(prompt, negativePrompt) {
        // This is a dummy function. In reality, you'd have a server
        // (e.g., Flask/FastAPI running your app.py)
        // that receives this POST request and calls the Hugging Face API.

        // Example of what your actual fetch might look like:
        // const response = await fetch('/generate', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ prompt, negative_prompt }),
        // });
        // const data = await response.json();
        // return data;

        // For now, we'll just simulate a delay and success/failure.
        // You would integrate your actual Python backend here.
        console.log("Simulating backend call with prompt:", prompt);
        return new Promise(resolve => {
            setTimeout(async () => {
                // Here, you would ideally call your Python backend
                // which then uses the Hugging Face API.
                // Since JavaScript cannot directly execute Python,
                // we'll just use a placeholder image for now.
                // To make this functional, you MUST set up a web server.
                // For a quick local test, you can use a base64 encoded dummy image.
                const dummyImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; // A tiny transparent PNG

                // To truly integrate:
                // 1. Run your Python script with a web framework (Flask, FastAPI).
                // 2. The Flask/FastAPI route will call `generate_image` from app.py.
                // 3. It will then return the base64 encoded image or raw bytes to the frontend.
                // This 'simulateBackendCall' would be replaced by a real `fetch` call to that Flask/FastAPI endpoint.

                // For example, if your Flask backend returns JSON like:
                // { "imageUrl": "data:image/png;base64,..." } on success
                // { "error": "Some error message" } on failure

                // For demonstration, let's just resolve with a success and a dummy image
                // After setting up your backend, replace this:
                try {
                    // This part is the crucial missing link that needs a backend server to function.
                    // If you were running a Flask/FastAPI server, you'd make a fetch request to it.
                    // For now, let's pretend it worked and give a placeholder.
                    // This will NOT call the Hugging Face API unless you set up a server.
                    resolve({
                        success: true,
                        imageUrl: "https://via.placeholder.com/600x400?text=Image+Generated+Here" // Replace with actual generated image data
                    });
                } catch (e) {
                    resolve({
                        success: false,
                        error: "Backend simulation failed. Remember to set up a server!"
                    });
                }
            }, 1500); // Simulate network delay
        });
    }
});
