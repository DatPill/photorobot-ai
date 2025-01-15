document.getElementById('propmtForm').addEventListener('submit', async (event) => {
    event.preventDefault;

    const promptText = document.getElementById('promptInput').value;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<div class="loader"></div>';

    try {
        const response = await fetch('https://example.com/api/v1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promptText })
        });

        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            imageContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Сгенерированный фоторобот';
            imageContainer.appendChild(img);
        } else {
            console.error('Ошибка:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
