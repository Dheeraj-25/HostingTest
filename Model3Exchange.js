document.addEventListener("DOMContentLoaded", async () => {
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const dateInput = document.getElementById("date");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
  
    // Set max date to today
    dateInput.max = new Date().toISOString().split("T")[0];
  
    // Load currencies into dropdown
    try {
      const response = await fetch("https://api.frankfurter.dev/v1/currencies");
      if (!response.ok) throw new Error("Currency API error");
  
      const currencies = await response.json();
  
      Object.entries(currencies).forEach(([code, name]) => {
        const optionFrom = new Option(`${code} - ${name}`, code);
        const optionTo = new Option(`${code} - ${name}`, code);
        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
      });
  
      fromSelect.value = "USD";
      toSelect.value = "INR";
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "Failed to load currency list.";
    }
  
    // Handle conversion on submit
    document.getElementById("currency-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const from = fromSelect.value;
      const to = toSelect.value;
      const amount = document.getElementById("amount").value;
      const selectedDate = dateInput.value;
      const date = selectedDate || "latest";
  
      resultDiv.textContent = "";
      errorDiv.textContent = "";
  
      if (!from || !to || !amount) {
        errorDiv.textContent = "Please fill in all fields.";
        return;
      }
  
      try {
        const res = await fetch(`https://api.frankfurter.dev/v1/${date}?amount=${amount}&from=${from}&to=${to}`);
        const data = await res.json();
  
        if (!data.rates[to]) {
          errorDiv.textContent = "Invalid conversion.";
          return;
        }
  
        const converted = data.rates[to].toFixed(4);
        resultDiv.innerHTML = `
          <strong>${amount} ${from} = ${converted} ${to}</strong><br>
          <small>Exchange rate as of ${data.date}</small>
        `;
      } catch (error) {
        errorDiv.textContent = "Error fetching conversion.";
        console.error(error);
      }
    });
  });
  