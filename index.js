const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(myRecipe)
    .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
    .catch(error => console.log('An error happened while saving a new recipe:', error));
}).then(()=>{Recipe.insertMany(data)
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .then(()=>Recipe.findOneAndUpdate({ "title":"Rigatoni alla Genovese" }, { "duration": 100 }))
  .then(recipe => console.log('The recipe is updated and its value is: ', recipe))
  .then(()=>Recipe.deleteOne({"title":"Carrot Cake"}))
  .then(recipe => console.log('The recipe was deleted and its value is: ', recipe))
  
  .catch(error => console.log('An error happened while saving a new recipe:', error))
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const myRecipe = [{
  "title": "Caesar Salad",
  "level": "Amateur Chef",
  "ingredients": [
  "1 large or 2 small heads of romaine lettuce",
  "Parmesan cheese, shredded or shaved",
  "Crisp croutons - homemade can be made several days ahead",
  "Caesar salad dressing",
 ],
"cuisine": "Mexico",
"dishType": "other",
"image": "https://img.chefkoch-cdn.de/rezepte/956701201250684/bilder/1512860/crop-960x540/caesar-salad.jpg",
"duration": 40,
"creator": "Caesar Cardini"}]




