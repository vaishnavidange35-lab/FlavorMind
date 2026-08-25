import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.GEMINI_API_KEY || '';

const prompt = `
You are an expert culinary AI and web designer. Below is a list of Indian dishes.
For each dish, provide a high quality, accurate Unsplash image photo URL (in format https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=900&q=80) or verified Wikimedia Commons direct image URL that visually matches that exact dish (not generic or recycled for different dishes).

Dishes:
1. vada pav
2. misal pav
3. pav bhaji
4. puran poli
5. modak
6. butter chicken
7. chole bhature
8. dal makhani
9. sarson da saag
10. amritsari kulcha
11. kerala fish curry
12. appam and stew
13. puttu and kadala curry
14. karimeen pollichathu
15. palada payasam
16. idli sambar
17. masala dosa
18. chettinad chicken
19. ven pongal
20. medu vada
21. dhokla
22. thepla
23. khandvi
24. undhiyu
25. fafda jalebi
26. dal bati churma
27. laal maas
28. gatte ki sabzi
29. pyaaz kachori
30. ghevar
31. kosha mangsho
32. macher jhol
33. rosogolla
34. shorshe ilish
35. sandesh
36. nihari
37. aloo tikki chaat
38. paranthas
39. seekh kebab
40. moth kachori
41. hyderabadi biryani
42. haleem
43. mirchi ka salan
44. double ka meetha
45. boti kebab
46. rogan josh
47. yakhni
48. dum aloo
49. gushtaba
50. kahwa
51. goan fish curry
52. pork vindaloo
53. bebinca
54. chicken xacuti
55. prawn balchao
56. masor tenga
57. khar
58. duck meat curry
59. aloo pitika
60. pitha
61. dalma
62. chhena poda
63. rasagola
64. macha ghanta
65. pakhala bhata
66. bisi bele bath
67. mysore pak
68. ragi mudde
69. gulab jamun
70. jalebi
71. samosa
72. tandoori chicken
73. paneer tikka

Return ONLY a JSON object mapping lowercased dish name to full image URL:
{
  "vada pav": "https://images.unsplash.com/...",
  ...
}
Ensure every dish has a unique, visually accurate image corresponding to that specific dish.
`;

const postData = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { responseMimeType: "application/json" }
});

const req = https.request('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const json = JSON.parse(body);
      const text = json.candidates[0].content.parts[0].text;
      fs.writeFileSync('./gemini_dishes.json', text);
      console.log('Saved response to gemini_dishes.json');
    } catch(e) {
      console.error('Error parsing response:', e, body);
    }
  });
});

req.on('error', (e) => console.error('Req error:', e));
req.write(postData);
req.end();
