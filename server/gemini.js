require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const theme = 'Old haunted house.'
    const prompt = `
    Generate a description of each room in the array.
    
    Example:
    Room array: ['0.0', '0.1', '0.2', '0.3'] 
    Theme: Forest Temple
    Output: 
    {
        "0.0": {"description": "You find yourself in an empty room, with no recollection of how you got there. Around you are mossy stone pillars that stretch up to the canopies above. There is a light."},
        "0.1": {"description": "You enter a narrow passage with vines along the walls."},
        "0.2": {"description": "You enter a room with a large tree in the center. There is a ring of flowers around its base, with a bench to the west of the tree."},
        "0.3": {"description": "You enter a room much like an over-grown cathedral. Ahead of you is a large stained-glass window, and you get the feeling that everything is going to be okay."}
    }

    Example
    Room array: ['0.0', '0.1', '0.2', '1.2']
    Theme: Desert Temple
    Output:
    {
        "0.0": {"description": "The sand pools around your feet as you enter the first room of the temple. There is a strange light coming from the ceiling."},
        "0.1": {"description": "You enter a room covered in hieroglyphs."},
        "0.2": {"description": "The air in this room is hot, and the walls are covered in sand."},
        "1.2": {"description": "This room looks like it was a sleeping chamber. Some long-gone person's bedding is strewn about the room."}
    }

    Now generate for:
    Room array: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6']
    Theme: ${theme}
    Output: 
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    console.table(JSON.parse(text))
  }
  
  run();