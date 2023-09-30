const openAI = require('openai');
require('dotenv').config();
const sdk = require('api')('@metaphorapi/v1.0#22sl31gln0t5di1');

const metaphorKey = process.env.METAPHOR_KEY;
const openaiKey = process.env.OPENAI_KEY;

console.log(openaiKey);
sdk.auth(metaphorKey); // api key

const openai = new openAI({ apiKey: openaiKey });

async function callAPI(city) {
  try {
    const { data } = await sdk.search({
      query: `what is happening in ${city} this weekend`,
      numResults: 1,
    });
    
    const website_id = data.results[0].id;

    const { data: contentData } = await sdk.getContents({ ids: website_id });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `based on this data plan me a weekend itinerary ${contentData.contents[0].extract}`,
        },
      ],
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    return error;
  }
}

module.exports = {
    callAPI
};