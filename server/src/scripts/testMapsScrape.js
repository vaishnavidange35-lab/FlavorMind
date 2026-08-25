import axios from 'axios';

async function test() {
  try {
    const url = 'https://www.google.com/maps/search/restaurants+in+dhule';
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = response.data;
    const match = html.match(/window\.APP_INITIALIZATION_STATE=\[\[\[(.*?)\]\]\];/);
    if (match) {
      console.log("Found APP_INITIALIZATION_STATE!");
      // The JSON is very complex, let's just see if we can find restaurant names
      const names = html.match(/\\"[^\\"]+\\"/g).filter(n => n.toLowerCase().includes('hotel') || n.toLowerCase().includes('restaurant')).slice(0, 10);
      console.log("Possible names:", names);
    } else {
      console.log("Could not find APP_INITIALIZATION_STATE");
    }
  } catch (e) {
    console.error(e.message);
  }
}
test();
