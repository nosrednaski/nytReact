const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/NYT"
);

const articleSeed = [
  {
    id:"4fc04f2e45c1498b0d23f409",
    title: "NEWS OF NEWPORT.; William R. Hunter Entertains a Large Party at Clam Bake Club.",
    date: "1910-07-17T00:00:00Z",
    url: "https://query.nytimes.com/gst/abstract.html?res=9C07E2D91F3DEE32A25754C1A9619C946196D6CF"
  },
  {
    id:"4fc04f3045c1498b0d23f716",
    title: "THE TOGO TOURISTS TAKE A LOOK AT CONEY ISLAND; They Visit the 'Place Covered with Noise Machines, Whirly-Go-Rounds, Tin Whistles, Frankfurter Sausages, Clam Chowder, and Press Agents.'",
    date: "1910-08-21T00:00:00Z",
    url: "https://query.nytimes.com/gst/abstract.html?res=9503E4D81E39E333A25752C2A96E9C946196D6CF"
  },
  {
    id:"4fc04a1845c1498b0d229126",
    title: "Finds a Pearl in Clam Dinner.",
    date: "1908-07-23T00:00:00Z",
    url: "https://query.nytimes.com/gst/abstract.html?res=9505E4D9173EE033A25750C2A9619C946997D6CF"
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
