import { PopulationService } from "./population-service.intf";
import { Country, DataPoint } from "../domain";
import { WorldBankApiV2 } from "./world-bank-api";

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

  async getAllCountries(): Promise<Country[]> {
    throw new Error("Not implemented yet");
  }

  async getCountry(countryCode: string): Promise<Country> {
    throw new Error("Not implemented yet");
  }

  async getTotalPopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Not implemented yet");
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
