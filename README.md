# PalmDietaryCounter
This is a sample project using the Palm api with node.js using natural language to log your daily food intake.

# config

.env file is needed 


    NODE_ENV=development
    PORT=3000
    // Set your palm api key here
    API_KEY=[redacted]
    API_URL=http://localhost


# Run it

current runs on http://localhost:3000/


# Usage

Just type what you ate.

I ate one carrot

I had a carrot a potato and a pizza for lunch.


It will return the calorie count.

You can also ask it for things like carbs.


# prompt ideas for future.

Give it an idea of what the default size of things are.  A glass being eight ounces. 

It seems to grab very small sizes for things like a potato.

## Less accurate

I ate a potato

## more accurate 

I ate 200 grams of potatoes.