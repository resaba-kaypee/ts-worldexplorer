import { Country } from "../domain";
import { WorldExplorerView } from "./world-explorer-view.intf";
import { ChartDetails } from "./chart-details.intf";

export class WorldExplorerHTMLView implements WorldExplorerView {
  private readonly _countrySelect: HTMLSelectElement;
  private readonly _indicatorSelect: HTMLSelectElement;
  private readonly _fromYearSelect: HTMLSelectElement;
  private readonly _toYearSelect: HTMLSelectElement;
  private readonly _chartTypeSelect: HTMLSelectElement;
  private readonly _chartConfigurationForm: HTMLFormElement;

  constructor() {
    this._countrySelect = document.getElementById(
      "countrySelect"
    ) as HTMLSelectElement;
    if (!this._countrySelect) {
      throw new Error(
        "Could not initialize the view. The 'countrySelect' element id was not found. Was the template changed?"
      );
    }

    this._indicatorSelect = document.getElementById(
      "indicatorSelect"
    ) as HTMLSelectElement;
    if (!this._indicatorSelect) {
      throw new Error(
        "Could not initialize the view. The 'indicatorSelect' element id was not found. Was the template changed?"
      );
    }

    this._fromYearSelect = document.getElementById(
      "fromYearSelect"
    ) as HTMLSelectElement;
    if (!this._fromYearSelect) {
      throw new Error(
        "Could not initialize the view. The 'fromYearSelect' element id was not found. Was the template changed?"
      );
    }

    this._toYearSelect = document.getElementById(
      "toYearSelect"
    ) as HTMLSelectElement;
    if (!this._toYearSelect) {
      throw new Error(
        "Could not initialize the view. The 'toYearSelect' element id was not found. Was the template changed?"
      );
    }

    this._chartTypeSelect = document.getElementById(
      "chartTypeSelect"
    ) as HTMLSelectElement;
    if (!this._chartTypeSelect) {
      throw new Error(
        "Could not initialize the view. The 'chartTypeSelect' element id was not found. Was the template changed?"
      );
    }

    this._chartConfigurationForm = document.getElementById(
      "chartConfigurationForm"
    ) as HTMLFormElement;
    if (!this._chartConfigurationForm) {
      throw new Error(
        "Could not initialize the view. The 'chartConfigurationForm' element id was not found. Was the template changed?"
      );
    }

    this._canvas = document.getElementById(
      "worldExplorerChart"
    ) as HTMLCanvasElement;
    if (!this._canvas) {
      throw new Error(
        "Could not initialize the view. The 'worldExplorerChart' element id was not found. Was the template changed?"
      );
    }
  }

  displayErrorMessage(errorMessage: string): void {
    if (!errorMessage) {
      throw new Error("An error message must be provided!");
    }
    alert(errorMessage);
    // bad user experience but ignore
    // this for now
  }

  displayCountries(countries: Country[]): void {
    // FIX ME implement
  }

  displayYears(years: number[]): void {
    // FIX ME implement
  }

  getChartFormDetails(): {
    error?: string;
    countryId?: string;
    indicator?: string;
    fromYear?: number;
    toYear?: number;
    chartType?: string;
  } {
    // FIX ME implement
    return {};
  }

  displayChart(chartDetails: ChartDetails): void {
    // FIX ME implement
  }
}
