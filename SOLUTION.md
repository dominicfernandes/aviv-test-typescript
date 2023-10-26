# AVIV technical test solution

You can use this file to write down your assumptions and list the missing features or technical revamp that should
be achieved with your implementation.

## Notes

Write here notes about your implementation choices and assumptions.

1. Read through the MD files to understand the requirement and the problem statement. (10mins)
2. Go through the code and understand the structure. Open every file and run through them to see what is available and what I need to implement. Upload OpenApi file to ReDoc and look through exising API. Run the serverless application on Docker. Import postmann collection and play around with the APIs. (35mins)
3. Thought: should I create a new table for prices or should i convert the existing price column to JSON object.
    Decided to create a new table since the size of the array can run into thousands and might add possible computational overhead like memory or performance. Also if the data is in a separate table, it would be easier to run future price analysis on the data.
4. Write migrations in db folder with seed data. (10mins).
5. Read through openAPI yamlfile. Create new Generated type ListingPrice to reuse available types and build.
6. Followed the current style of existing repository to maintain code consistency. Wrote listing price types, object mappers, function to get prices by listing id and to insert a new price record (15mins).
7. Update the handler method to remove the mocked data and call the repository method to get data from the db by listing id from url parameters.(10mins).
8. Update listing api POST and PUT methods to insert new record into listing_prices table(5mins)
9. Realized that ListingPrice Type is not required since the type Price already exists. Removed ListingPrice Type.
10. Test the funtionality using Postman to check if everything works as expected. (10mins)
11. Write Unit Test. Struggled a little since I never worked with serverless framework and vitest before (45mins).

## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**

  - input validations
  - pagination
  - authentication and CORS setup
  - possible use of caching mechanism
  - test coverage
  - linting for code consistency and maintain coding standards.
  - Github actions (optional but good to have)

- **How would you deploy your implementation?**

  - Since the project is using serverless framework, it can be deployed using the CLI which deploys it using to AWS API Gateway and Lambda.
  - I would also setup gihub actions to save time on accidental broken builds and catch error and bugs through unit tests
  - setup CI/CD for every merge into main branch

- **If you had to implement the same application from scratch, what would you do differently?**

  - If it was already decided that the application must be serverless with lambda, I would use cdk for Infrastructure as a Code.
  - implement input validation with joi library.
  - if we are expecting huge amounts of requests for not frequently updating data, then setup redis caching.
  - setup pagination for the listing and pricing data
  - setup authentication with lambda authorizers (custom / cognito)
  - possible rate limiting to avoid attacks

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

  - since the api is running mainly on Lamda functions. The limitations of Lambda needs to be kept in mind. For example setting up concurrency limits for the functions and provisioned concurrency to avoid cold start.
  - avoid long running functions since lambda is billed by the execution time and resources used network costs.
  - add pagination to the data to avoid sending huge amounts of data in one response.
  - Use of caching to avoid database calls whenever possible.

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/) 
