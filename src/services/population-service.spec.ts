import { PopulationServiceImpl } from "./population-service";

describe("population service", () => {
  let sut: PopulationServiceImpl;

  beforeEach(() => {
    sut = new PopulationServiceImpl("https/foo"); // valid URL
  });

  describe("checkResponseStatus", () => {
    // :> testing negative case
    it("should fail if no response object is passed", async () => {
      await expect(
        sut.checkResponseStatus((null as unknown) as Response)
      ).rejects.toThrow();
    });

    it("should fail if the status is below 200", async () => {
      await expect(
        sut.checkResponseStatus(new Response(null, { status: 199 }))
      ).rejects.toThrow();
    });

    it("should fail if the status is above 299", async () => {
      await expect(
        sut.checkResponseStatus(new Response(null, { status: 300 }))
      ).rejects.toThrow();
    });

    // :> testing positive case
    it("should succeed if the response has a 2xx status code", async () => {
      let fakeResponse: Response = new Response(null, { status: 200 });
      await expect(sut.checkResponseStatus(fakeResponse)).resolves.toBe(
        fakeResponse
      );
      fakeResponse = new Response(null, { status: 204 });
      await expect(sut.checkResponseStatus(fakeResponse)).resolves.toBe(
        fakeResponse
      );
      fakeResponse = new Response(null, { status: 299 });
      await expect(sut.checkResponseStatus(fakeResponse)).resolves.toBe(
        fakeResponse
      );
    });
  });
});
