import {
  validatePostObject,
  validatePatchObject,
  ValidationResults,
} from "../validate";

const strFieldValueRequired: string = "field value required";

const strFieldMustBeBetween1And255CharactersLong: string =
  "must be between 1 and 255 characters long";

const strInvalidPostalCode: string = "invalid postal code";

describe("validatePostObject", () => {
  describe("with an empty request body", () => {
    const reqBody = {};

    it("should return validation results indicating that field values are required", () => {
      const expected = {
        name: strFieldValueRequired,
        address: {
          line1: strFieldValueRequired,
          city: strFieldValueRequired,
          state: strFieldValueRequired,
          postalCode: strFieldValueRequired,
          country: strFieldValueRequired,
        },
      };

      const actual = validatePostObject(reqBody);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe("with a populated request body", () => {
    describe("with only required fields included", () => {
      describe("lengths fall within allowed range", () => {
        const reqBody = {
          name: "1",
          address: {
            line1: "2",
            city: "3",
            state: "4",
            postalCode: "A1A1A1",
            country: "5",
          },
        };

        it("should return an empty object", () => {
          const expected = {};

          const actual = validatePostObject(reqBody);

          expect(actual).toStrictEqual(expected);
        });
      });

      describe("lengths fall outside allowed range", () => {
        const reqBody = {
          name: "1".repeat(300),
          address: {
            line1: "2".repeat(300),
            city: "3".repeat(300),
            state: "4".repeat(300),
            postalCode: "A".repeat(300),
            country: "5".repeat(300),
          },
        };

        it("should return validation results", () => {
          const expected = {
            name: strFieldMustBeBetween1And255CharactersLong,
            address: {
              line1: strFieldMustBeBetween1And255CharactersLong,
              city: strFieldMustBeBetween1And255CharactersLong,
              state: strFieldMustBeBetween1And255CharactersLong,
              postalCode: strInvalidPostalCode,
              country: strFieldMustBeBetween1And255CharactersLong,
            },
          };

          const actual = validatePostObject(reqBody);

          expect(actual).toStrictEqual(expected);
        });
      });
    });

    describe("with only optional fields included", () => {
      describe("lengths fall within allowed range", () => {
        const reqBody = {
          address: {
            line2: "1",
          },
          website: "2",
        };

        it("should return validation results containing messages for required fields and not optional fields", () => {
          const expected = {
            name: strFieldValueRequired,
            address: {
              line1: strFieldValueRequired,
              city: strFieldValueRequired,
              state: strFieldValueRequired,
              postalCode: strFieldValueRequired,
              country: strFieldValueRequired,
            },
          };

          const actual = validatePostObject(reqBody);

          expect(actual).toStrictEqual(expected);
        });
      });

      describe("lengths fall outside allowed range", () => {
        const reqBody = {
          address: {
            line2: "1".repeat(9001),
          },
          website: "2".repeat(9001),
        };

        it("should return validation results containing messages for all fields", () => {
          const expected = {
            name: strFieldValueRequired,
            address: {
              line1: strFieldValueRequired,
              line2: strFieldMustBeBetween1And255CharactersLong,
              city: strFieldValueRequired,
              state: strFieldValueRequired,
              postalCode: strFieldValueRequired,
              country: strFieldValueRequired,
            },
            website: strFieldMustBeBetween1And255CharactersLong,
          };

          const actual = validatePostObject(reqBody);

          expect(actual).toStrictEqual(expected);
        });
      });
    });

    describe("with both required and optional fields included", () => {
      describe("where some field lengths are outside the allowed range", () => {
        const reqBody = {
          name: "a".repeat(257),
          address: {
            line1: "Hello World",
            line2: "c".repeat(872),
            city: "d".repeat(578),
            state: "Hello World",
            postalCode: "A1A1A1",
            country: "Unknown Country",
          },
        };

        it("should return validation results", () => {
          const expected = {
            name: strFieldMustBeBetween1And255CharactersLong,
            address: {
              line2: strFieldMustBeBetween1And255CharactersLong,
              city: strFieldMustBeBetween1And255CharactersLong,
            },
          };

          const actual = validatePostObject(reqBody);

          expect(actual).toStrictEqual(expected);
        });
      });
    });
  });
});
