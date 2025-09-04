document.addEventListener("DOMContentLoaded", () => {
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
  
    // Set max date to today
    const today = new Date().toISOString().split("T")[0];
    startInput.max = endInput.max = today;
  
    // Load currency list
    fetch("https://api.frankfurter.dev/v1/currencies")
      .then((res) => res.json())
      .then((currencies) => {
        Object.entries(currencies).forEach(([code, name]) => {
          const optionFrom = new Option(`${code} - ${name}`, code);
          const optionTo = new Option(`${code} - ${name}`, code);
          fromSelect.appendChild(optionFrom);
          toSelect.appendChild(optionTo);
        });
  
        // Optional defaults
        fromSelect.value = "INR";
        toSelect.value = "USD";
      })
      .catch((err) => {
        console.error("Currency list fetch error:", err);
        errorDiv.textContent = "Failed to load currencies.";
      });
  
    // Handle form submission
    document.getElementById("history-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const from = fromSelect.value;
      const to = toSelect.value;
      const start = startInput.value;
      const end = endInput.value;
  
      resultDiv.innerHTML = '';
      errorDiv.textContent = '';
  
      if (new Date(start) > new Date(end)) {
        errorDiv.textContent = "Start date must be before end date.";
        return;
      }
  
      try {
        const url = `https://api.frankfurter.dev/v1/${start}..${end}??base=${from}&symbols=${to}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("API request failed");
  
        const data = await res.json();
  
        if (!data.rates || Object.keys(data.rates).length === 0) {
          errorDiv.textContent = "No data available for the selected range.";
          return;
        }
  
        let html = `<h3>Exchange Rates from ${start} to ${end}</h3><ul>`;
        for (const [date, rateObj] of Object.entries(data.rates)) {
          html += `<li>${date}: 1 ${from} = ${rateObj[to]} ${to}</li>`;
        }
        html += "</ul>";
  
        resultDiv.innerHTML = html;
      } catch (error) {
        console.error("Fetch error:", error);
        errorDiv.textContent = "Could not fetch historical data.";
      }
    });
  });
  