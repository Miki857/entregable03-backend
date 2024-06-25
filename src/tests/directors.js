const request = require('supertest');
const app = require('../app');

let directorId;

const director = {
    firstname: "Pepito",   
    lastname: "Pepin",
    nationality: "Peruvian",
    image: "",
    birthday: "2000-01-01"
};

const BASE_URL = '/api/v1/directors';

//CREATE TEST:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === director.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
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
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === director.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

//UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === directorUpdate.name ", async () => {
  const directorUpdate = {
    firstname: "Tintin",
    nationality: "Brazilian"
  };

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstname).toBe(directorUpdate.firstname);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});