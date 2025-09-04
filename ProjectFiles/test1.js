// WEATHER
async function fetchWeather() {
    try {
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=2df48980d60143dab2a153439252704&q=Tirupati');
      const data = await response.json();
      document.getElementById('weatherData').innerText = `Temp: ${data.current.temp_c}°C, ${data.current.condition.text}`;
    } catch (error) {
      console.error('Weather API error:', error);
      document.getElementById('weatherData').innerText = 'Failed to load weather.';
    }
  }
  
  // QUOTES (replacing Advice API)
  function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        alert(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
    }
  
  convert("EUR", "USD", 10);
  
  // NEWS
  async function fetchNews() {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=f7d0fe7b63d74dae8adb9ba19017deb5');
      const data = await response.json();
      const newsList = document.getElementById('newsData');
      newsList.innerHTML = ''; // Clear previous news
      if (data.articles.length > 0) {
        data.articles.slice(0, 5).forEach(article => { // Show top 5 headlines
          const li = document.createElement('li');
          li.innerText = article.title;
          newsList.appendChild(li);
        });
      } else {
        newsList.innerHTML = '<li>No news available.</li>';
      }
    } catch (error) {
      console.error('News API error:', error);
      document.getElementById('newsData').innerHTML = '<li>Failed to load news.</li>';
    }
  }
  
  // IPL SCORE
  async function fetchIpl() {
    try {
      const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=2cdaaa4b-553a-4cc1-a6cd-a05e4866dcc2&offset=0');
      const data = await response.json();
      const iplMatch = data.data.find(match => match.name.includes("IPL"));
      if (iplMatch) {
        document.getElementById('iplData').innerText = `${iplMatch.teams[0]} vs ${iplMatch.teams[1]} - ${iplMatch.status}`;
      } else {
        document.getElementById('iplData').innerText = 'No live IPL match.';
      }
    } catch (error) {
      console.error('IPL Score API error:', error);
      document.getElementById('iplData').innerText = 'Failed to load IPL score.';
    }
  }
  
  