#!/usr/bin/env node

const fs = require("fs");

/**
 * Not storing the D&C JSON file on the drive since that's a lot of data but if you ever want to work with other scriptures
 * simply copy that to this directory. Here's where I pulled D&C JSON from:
 * https://raw.githubusercontent.com/bcbooks/scriptures-json/master/doctrine-and-covenants.json
 *
 * @type {any}
 */
let doctrineAndCovenants = JSON.parse(
  fs.readFileSync("doctrine-and-covenants.json", "utf8")
);

let resultSet = {};

let sections = doctrineAndCovenants.sections.map(section => {
  return { section: section.section, verses: section.verses };
});

let versesWithSection = [];

sections.map(obj => {
  let verses = obj.verses;
  verses.map(verse => {
    // A random date is appended for test purposes (data type management):
    let randomDate = new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    );
    versesWithSection.push({
      section: obj.section,
      ...verse,
      date: randomDate
    });
  });
  resultSet = versesWithSection;
});

// Just grab a bunch of data not the entire contents as that would be a lot of data
let slicedResultSet = resultSet.slice(0, 500);

const fileToWrite = "doctrine_and_covenants.min.js";

// Simply take the resulting JSON and replace it with the inner contents of story_test_data.js
fs.writeFile(fileToWrite, JSON.stringify(slicedResultSet), err => {
  if (err) {
    return console.log(err);
  }
  console.log(`${fileToWrite} saved`);
});
