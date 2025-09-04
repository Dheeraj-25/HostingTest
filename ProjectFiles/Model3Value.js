document.addEventListener("DOMContentLoaded", async () => {
    const baseSelect = document.getElementById("base");
    const dateInput = document.getElementById("date");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
  
    dateInput.max = new Date().toISOString().split("T")[0];
  
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      Object.entries(data).forEach(([code, name]) => {
        baseSelect.appendChild(new Option(`${code} - ${name}`, code));
      });
      baseSelect.value = "USD";
    } catch (err) {
      errorDiv.textContent = "Failed to load currencies.";
    }
  
    document.getElementById("value-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const base = baseSelect.value;
      const date = dateInput.value;
  
      resultDiv.innerHTML = '';
      errorDiv.textContent = '';
  
      try {
        const res = await fetch(`https://api.frankfurter.app/${date}?from=${base}`);
        const data = await res.json();
  
        let html = `<h3>Rates for ${base} on ${data.date}</h3><ul>`;
        for (const [code, rate] of Object.entries(data.rates)) {
          html += `<li>1 ${base} = ${rate} ${code}</li>`;
        }
        html += "</ul>";
        resultDiv.innerHTML = html;
      } catch (err) {
        errorDiv.textContent = "Could not fetch conversion rates.";
      }
    });
  });
  