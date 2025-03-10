const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Property = require("../models/propertyModel");

const properties = [
    {
        title: "Lorem",
        type: "ipsum",
        description: "dolor",
        price: 42,
        location: {
            address: "sit",
            city: "amet",
            state: ", conceptetur",
            zipCode: "adipiscing"
        },
        squareFeet: 64,
        yearBuilt: 1928
    },
    {
        title: "gwrerh",
        type: "sehseht",
        description: "dsjrjsrfolor",
        price: 3241,
        location: {
            address: "azsdvvc",
            city: "dxcn g",
            state: ", nmhghm",
            zipCode: "liu"
        },
        squareFeet: 896,
        yearBuilt: 4578
    },
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/properties
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // Test POST /api/properties
  it("should create a new property when POST /api/properties is called", async () => {
    const newProperty = {
        title: "meroL",
        type: "muspi",
        description: "rolod",
        price: 24,
        location: {
            address: "tis",
            city: "tema",
            state: "rutetpecnoc ,",
            zipCode: "gnicsipida"
        },
        squareFeet: 46,
        yearBuilt: 8291
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyNames = propertiesAfterPost.map((property) => property.name);
    expect(propertyNames).toContain(newProperty.name);
  });

  // Test GET /api/properties/:id
  it("should return one property by ID when GET /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing property ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/properties/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/properties/:id
  it("should update one property with partial data when PUT /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    const updatedProperty = {
      description: "Updated description",
      price: 1829,
    };

    await api
      .put(`/api/properties/${property._id}`)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedPropertyCheck = await Property.findById(property._id);
    expect(updatedPropertyCheck.description).toBe(updatedProperty.description);
    expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
  });

  it("should return 400 for invalid property ID when PUT /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/properties/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/properties/:id
  it("should delete one property by ID when DELETE /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api.delete(`/api/properties/${property._id}`).expect(204);

    const deletedPropertyCheck = await Property.findById(property._id);
    expect(deletedPropertyCheck).toBeNull();
  });

  it("should return 400 for invalid property ID when DELETE /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/properties/${invalidId}`).expect(400);
    //expect(res.body.error).toBe("Invalid property ID");
  });
});
