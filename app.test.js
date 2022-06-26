const request = require('supertest');
const {app} = require('./app');


describe("POST /event", () => {
  describe("given firstname, lastname, email and date[all data correct]", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/event").send({
        firstName: "testing",
        lastName: "testing",
        email: "test@test.pl",
        date: "2022-06-20"
      });
      expect(response.statusCode).toBe(200);
    })
    test("response has status and message value", async () => {
        const response = await request(app).post("/event").send({
            firstName: "testing",
            lastName: "testing",
            email: "test@test.pl",
            date: "2022-06-20"
        });
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBeDefined();
    })
  })

  describe("when firstname, lastname, email or date is missing", () => {
    test("should respond with a status code of 400. Sholud send status 'error' and message ", async () => {
      const bodyData = [
        {
            lastName: "testing",
            email: "test@test.pl",
            date: "2022-06-20"
        },
        {
            firstName: "testing",
            email: "test@test.pl",
            date: "2022-06-20"
        },
        {
            firstName: "testing",
            lastName: "testing",
            date: "2022-06-20"
        },
        {
            firstName: "testing",
            lastName: "testing",
            email: "test@test.pl",
        }
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/event").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBeDefined();
      }
    })
  })

  describe("when email is invalid", () => {
    test("should respond with a status code of 400. Sholud send status 'error' and message ", async () => {
        const response = await request(app).post("/event").send({
            firstName: "testing",
            lastName: "testing",
            email: "test.pl",
            date: "2022-06-20"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBeDefined();
    })
  })

  describe("when date is invalid", () => {
    test("should respond with a status code of 400. Sholud send status 'error' and message ", async () => {
        const response = await request(app).post("/event").send({
            firstName: "testing",
            lastName: "testing",
            email: "test@test.pl",
            date: "20220620"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBeDefined();
    })
  })

})