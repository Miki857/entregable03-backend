require('../models');

const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let movieId;
let actor;
let director;
let genre;

const movie = {
  name: "Movie 1",
  image: "...",
  synopsis: "Lorem Ipsum",
  releaseYear: 2001
};

afterAll(async () => {
    await actor.destroy();
    await director.destroy();
    await genre.destroy();
})

const BASE_URL = '/api/v1/movies';

//CREATE TEST:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(movie);

  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
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
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === movie.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

//UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === movieUpdate.name ", async () => {
  const movieUpdate = {
    name: "Movie 2",
    releaseYear: 2015
  };

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdate.name);
});

//HYBRID TEST ACTORS:
test("POST -> 'BASE_URL/:id/actors', should return status code 200, and res.body.lenght = 1", async () => {
    actor = await Actor.create({
        firstname: "Susan",
        lastname: "Perez",
        nationality: "Colombiana",
        image: "...",
        birthday: "2000-01-01"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actor.id]);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//HYBRID TEST DIRECTORS:
test("POST -> 'BASE_URL/:id/directors', should return status code 200, and res.body.lenght = 1", async () => {
    director = await Director.create({
        firstname: "Pepe",
        lastname: "Sanchez",
        nationality: "Ecuatoriano",
        image: "...",
        birthday: "2000-01-01"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([director.id]);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//HYBRID TEST GENRE:
test("POST -> 'BASE_URL/:id/genres', should return status code 200, and res.body.lenght = 1", async () => {
    genre = await Genre.create({
        name: "Terror"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genre.id]);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});