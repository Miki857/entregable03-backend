const request = require('supertest');
const app = require('../app');

let genresId;

const genres = {
  name: "Drama"
};

const BASE_URL = '/api/v1/genres';

//CREATE TEST:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === genres.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(genres);

  genresId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

//GET TEST:
test("Get -> 'BASE_URL', should return status code 200 and res.body to have length = 1", async () => {
    const res = await request(app)
    .get(BASE_URL);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
})

//GET ONE TEST:
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === genres.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${genresId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

//UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === genresUpdate.name ", async () => {
  const genresUpdate = {
    name: "Triller"
  };

  const res = await request(app)
    .put(`${BASE_URL}/${genresId}`)
    .send(genresUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genresUpdate.name);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${genresId}`);

  expect(res.status).toBe(204);
});