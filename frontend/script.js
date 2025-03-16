document.getElementById('riskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form inputs
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const familyHistory = Array.from(document.querySelectorAll('input[name="familyHistory"]:checked')).map(el => el.value);

    // Validate inputs
    if (height < 60) {
        alert("Height must be at least 60 cm.");
        return;
    }
    if (weight <= 0) {
        alert("Weight must be greater than 0 kg.");
        return;
    }
    if (systolic < 50 || systolic > 300 || diastolic < 30 || diastolic > 200) {
        alert("Please enter valid blood pressure values.");
        return;
    }

    // Send data to backend
    try {
        const response = await fetch('https://proud-moss-014d74100.6.azurestaticapps.net', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ age, height, weight, systolic, diastolic, familyHistory }),
        });

        const result = await response.json();

        // Display results
        document.getElementById('bmiResult').textContent = result.bmi;
        document.getElementById('riskScore').textContent = result.totalScore;
        document.getElementById('riskCategory').textContent = result.riskCategory;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while calculating risk. Please try again.');
    }
});
