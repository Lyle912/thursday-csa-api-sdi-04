const app = require("../app");
const request = require("supertest")(app);

const connection = require("../db/knexConfig");
beforeAll(async () => {
  await connection.migrate.rollback();
  await connection.migrate.latest();
});

afterAll(() => {
  connection.destroy();
});

describe("the /basket endpoint", () => {
  it("should respond with an empty array when there are no baskets", (done) => {
    //SEAT
    //setup
    //exercise/execute
    request
      .get("/baskets")
      .expect(200)
      .end((err, res) => {
        //assert
        expect(res.body.length).toEqual(0);
        done();
      });
    //teardown
  });

  it("should add a basket to the table when it receives a basket payload", (done) => {
    const fakeBasket = {
      name: "Gucielery Mane",
      price: 200,
      weight: 10,
      description: "Hand picked celery by Gucci Mane",
      is_branded: true,
    };
    request
      .post("/baskets")
      .send(fakeBasket)
      .expect(200)
      .end((err, res) => {
        delete res.body.id;
        expect(res.body).toEqual(fakeBasket);
        done();
      });
  });
});
