const request = require('supertest');
const app = require('../app');

let actorId;

const actor = {
    firstname: "Pepito",
    lastname: "Pepin",
    nationality: "Peruvian",
    image: "",
    birthday: "2000-01-01"
};

const BASE_URL = '/api/v1/actors';

//CREATE TEST:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === actor.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actor.name);
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
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === actor.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

//UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === actorUpdate.name ", async () => {
  const actorUpdate = {
    firstname: "TinTin"
  };

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actorUpdate.name);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});