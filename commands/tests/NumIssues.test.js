const NumIssues = require("../NumIssues");
const {rest} = require("msw");
const {setupServer} = require("msw/node");
const { default: axios } = require("axios");
const API = 'https://robinrestapi.herokuapp.com/';
const owner = "John"
const repo = "TestRepo"

const server = setupServer(
    rest.get(`${API}issue/${owner}/${repo}/1/1`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({
          total_count: 4,
      }))}),
    rest.patch(`${API}issue/${owner}/${repo}/1/1`, (req, res, ctx) => {
      return res(ctx.status(200))
    }));

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("adds label to issue", async() => {
    const content = await NumIssues([],  repo, owner);

    expect(content).toBe(`The number of open issues in ${repo} is 4`);
});

test("handles failure", async() => {
  server.use(
    rest.get(`${API}issue/${owner}/${repo}/1/1`, (req, res, ctx) => {
      return res(ctx.status(404))})
  );

  await expect(NumIssues([],  repo, owner)).rejects.toThrow("404");
});
