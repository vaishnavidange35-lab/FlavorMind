import google from 'googlethis';

async function test() {
  const options = {
    page: 0,
    safe: false,
    parse_ads: false,
    additional_params: {
      hl: 'en'
    }
  };

  try {
    const response = await google.search('restaurants in Dhule', options);
    console.log("Keys available in response:", Object.keys(response));
    if (response.places) {
      console.log("Places:", response.places);
    }
    if (response.knowledge_panel) {
      console.log("Knowledge Panel:", response.knowledge_panel);
    }
    if (response.local_results) {
      console.log("Local Results:", response.local_results);
    }
    console.log("Top organic results:", response.results.slice(0, 3));
  } catch(e) {
    console.error(e);
  }
}
test();
