require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = `

    Example 1
    Room list: ['0.0', '0.1', '0.2', '0.3'] // These are x,y coordinates, y is the North/South axis, x is East/West
    Room traits: Room 0.3 is locked. 
    Room location: Forest Temple
    

    Output: 
    {
        "0.0": {"description": "You find yourself in an empty room, with no recollection of how you got there. Around you are mossy stone pillars that stretch up to the canopies above. There is a light. To your north there is a door.", "isOpen": 1},
        "0.1": {"description": "You enter a narrow passage with vines along the walls. The hall exits to your north and to your south.", "isOpen": 1},
        "0.2": {"description": "You enter a room with a large tree in the center. There is a ring of flowers around its base, with a bench to the west of the tree. There are doors to the North and South of the room.", "isOpen": 1},
        "0.3": {"description": "You enter a room much like an over-grown cathedral. The only exit is to the south. Ahead of you is a large stained-glass window, and you get the feeling that everything is going to be okay.", "isOpen": 0}
    }

    Example 2
    Room list: ['0.0', '0.1', '0.2', '1.1', '-1.1']  // These are x,y coordinates, y is the North/South axis, x is East/West
    Room traits: Room 1.1 is locked.
    Room location: Old house
    

    Output: 
    {
        "0.0": {"description": "You are in the entry room of an old house. There only seems to be a door to your north. There is a dusty welcome mat, and the blinds are drawn.", "isOpen": 1},
        "0.1": {"description": "You enter the dining room. The dining room table is covered in a layer of dust, and in its center is an old candle. There there are doors to the North, South, East, and West.", "isOpen": 1},
        "1.1": {"description": "You enter a small reading room. There is an old chair with the caning ruined, and a tall bookshelf. A drawing table has a golden chest on it.", "isOpen": 0},
        "1.-1": {"description": "You enter the laundry room. There is a strange, fowl smell coming from the closed washer. To the North is a barred window.", "isOpen": 1},
        "0.2": {"description": "This is the kitchen. The door to the fridge has been torn off, and the sink is full of broken glass. Raccoons have clearly been here.", "isOpen": 1},
    }

    I am designing a choose your own adventure game, so the rooms have to be somewhat coherent in the response. The response represents all the rooms the player is able to navigate to. Pay attention to how the rooms are laid out in the coordinate grid, so that the NSEW information about doors is accurate. 
    In Example 2 above, door 1.1, so the description in room 0.1 can say that there is a locked door to the East. 

    Example 3
    Room list: ['0.0', '0.1', '0.2', '1.2']  // These are x,y coordinates, y is the North/South axis, x is East/West
    Room traits: Room 1.2 is locked.
    Room location: Desert Temple

    1. First, determine the cardinal relationships between rooms. 1.1 is south of 1.2, and 1.2 east of 0.2. 
    2. Determine which rooms are rooms are locked. If room 1.1 is locked, room 1.0 will contain a locked door on the North wall. 
    3. Generate a creative (note Room Location) description of the room with information from 1 and 2. 
    4. Return the JSON object.

    Output:
    `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    console.table(JSON.parse(text))
  }
  
  run();