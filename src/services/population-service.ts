import { PopulationService } from "./population-service.intf";
import { Country, DataPoint } from "../domain";
import {
  WorldBankApiV2,
  WorldBankApiV2CountryResponse,
  worldBankApiV2CountryResponseValidator,
  WorldBankApiV2Formats,
  WorldBankApiV2IndicatorResponse,
  worldBankApiV2IndicatorResponseValidator,
  WorldBankApiV2Indicators,
  WorldBankApiV2Params,
} from "./world-bank-api";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";

export class PopulationServiceImpl implements PopulationService {
  private readonly countriesApiBaseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl || baseUrl.trim().length === 0) {
      throw new Error("The base URL must be provided!");
    } else if (
      !baseUrl.toLocaleLowerCase().startsWith("https://") &&
      !baseUrl.toLocaleLowerCase().startsWith("http://")
    ) {
      throw new Error(
        "The URL looks invalid. It should start with 'http://' or https://'"
      );
    }

    let cleanBaseUrl = baseUrl.trim();

    if (cleanBaseUrl.endsWith("/")) {
      cleanBaseUrl = cleanBaseUrl.substr(0, cleanBaseUrl.lastIndexOf("/"));
    }

    this.countriesApiBaseUrl = `${cleanBaseUrl}/${WorldBankApiV2.VERSION}/${WorldBankApiV2.COUNTRIES_API_PREFIX}`;

    console.log(
      `Population service initialized.\nCountries API URL: [${this.countriesApiBaseUrl}]`
    );
  }

  // :> UTILITIES
  // status check
  async checkResponseStatus(response: Response): Promise<Response> {
    if (!response) {
      throw new Error("A response must be provided!");
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  // convert response to json
  async getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error("A response must be provided!");
    }

    let jsonContent: unknown = undefined;

    try {
      jsonContent = await response.json();
    } catch (error) {
      console.error("Failed to parse the response as JSON: ", error);

      throw new Error(
        `Could not parse the body as JSON. Error: ${error.message}`
      );
    }

    return jsonContent;
  }

  // population indicator
  getBaseIndicatorApiUrlFor(
    indicator: WorldBankApiV2Indicators,
    country?: Country
  ) {
    let countryCode = "all";
    if (country) {
      countryCode = country.id;
    }
    return `${this.countriesApiBaseUrl}/${countryCode}${WorldBankApiV2.INDICATORS_API_PREFIX}/${indicator}`;
  }

  // :> END UTILITIES

  async getAllCountries(): Promise<Country[]> {
    const response: Response = await fetch(
      `${this.countriesApiBaseUrl}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}&${WorldBankApiV2Params.PER_PAGE}=320`
    ); // at this point there are less countries in the world so we can get them all in one shot.. :)

    const checkedResponse: Response = await this.checkResponseStatus(response);

    let jsonContent: unknown = await this.getJsonContent(checkedResponse);

    const validationResult = worldBankApiV2CountryResponseValidator.decode(
      jsonContent
    );

    // throw an error if validation fails
    ThrowReporter.report(validationResult);

    console.log("Response received and validated");

    // from here on, we know that the validation has passed
    const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1];

    console.log(`Found ${countries.length} countries`);

    let retVal: Country[] = countries.map(
      (country) =>
        new Country(
          country.name,
          country.id,
          country.iso2Code,
          country.capitalCity,
          country.longitude,
          country.latitude
        )
    );

    return retVal;
  }

  async getCountry(countryCode: string): Promise<Country> {
    if (!countryCode || "" === countryCode.trim()) {
      throw new Error("The country code must be provided!");
    }

    const response: Response = await fetch(
      `${this.countriesApiBaseUrl}/${countryCode}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}`
    );

    const checkedResponse: Response = await this.checkResponseStatus(response);

    let jsonContent: unknown = await this.getJsonContent(checkedResponse);

    const validationResult = worldBankApiV2CountryResponseValidator.decode(
      jsonContent
    );

    ThrowReporter.report(validationResult); // add the second part here

    // from here on, we know that the validation has passed
    const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1];
    if (countries.length > 1) {
      return Promise.reject(
        "More than one country was returned. This should not happen"
      );
    }

    const country = countries[0];

    return new Country(
      country.name,
      country.id,
      country.iso2Code,
      country.capitalCity,
      country.longitude,
      country.latitude
    );
  }

  async getTotalPopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    const response: Response = await fetch(
      `${this.getBaseIndicatorApiUrlFor(
        WorldBankApiV2Indicators.TOTAL_POPULATION,
        country
      )}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}&${
        WorldBankApiV2Params.PER_PAGE
      }=1000&${WorldBankApiV2Params.DATE}=${dateRange}`
    );

    const checkedResponse: Response = await this.checkResponseStatus(response);

    let jsonContent: unknown = await this.getJsonContent(checkedResponse);

    const validationResult = worldBankApiV2IndicatorResponseValidator.decode(
      jsonContent
    );

    ThrowReporter.report(validationResult);

    // from here on, we know that the validation has passed
    const dataPoints = (validationResult.value as WorldBankApiV2IndicatorResponse)[1];

    let retVal: DataPoint[] = [];
    if (dataPoints) {
      // we might not get anything back
      retVal = dataPoints
        .filter((dataPoint) => dataPoint.value !== null) // we only include data points for which we have a value
        .map(
          (dataPoint) =>
            new DataPoint(dataPoint.date, dataPoint.value as number)
        );
    }
    return retVal;
  }

  async getFemalePopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getMalePopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getAdultFemaleLiteracy(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getAdultMaleLiteracy(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getFemaleSurvivalToAge65(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getLifeExpectancy(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }

  async getMaleSurvivalToAge65(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
  }
}
