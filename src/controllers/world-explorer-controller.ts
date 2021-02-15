import { WorldExplorerController } from "./world-explorer-controller.intf";
import { PopulationService } from "../services";
import { WorldExplorerView } from "../views";

export class WorldExplorerControllerImpl implements WorldExplorerController {
  private readonly _view: WorldExplorerView;
  private readonly _populationService: PopulationService;

  constructor(populationService: PopulationService, view: WorldExplorerView) {
    if (!populationService) {
      throw new Error("The population service is mandatory!");
    }

    if (!view) {
      throw new Error("The view is mandatory!");
    }

    this._populationService = populationService;
    this._view = view;

    // TODO complete
  }

  async loadCountries(): Promise<void> {
    // FIX ME implement
  }

  loadYears(): void {
    // FIX ME implement
  }

  async renderChart(): Promise<void> {
    // FIX ME implement
  }
}
