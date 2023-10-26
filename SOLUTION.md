# AVIV technical test solution

You can use this file to write down your assumptions and list the missing features or technical revamp that should
be achieved with your implementation.

## Notes

Write here notes about your implementation choices and assumptions.

1. Read through the MD files to understand the requirement and the problem statement. (10mins)
2. Go through the code and understand the structure. Open every file and run through them to see what is available and what I need to implement. (30mins)
3. Thought: should I create a new table for prices or should i convert the existing price column to JSON object.
    Decided to create a new table since the size of the array can run into thousands and might add possible computational overhead like memory or performance. Also if the data is in a separate table, it would be easier to run future price analysis on the data.
4. Write migrations in db folder with seed data. (10mins).


## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**

- **How would you deploy your implementation?**

- **If you had to implement the same application from scratch, what would you do differently?**

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/) 
