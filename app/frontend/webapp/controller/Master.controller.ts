import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import formatter from "../model/formatter";

/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
    public formatter = formatter;

   onSelectionChange(event:any): void {
    const oItem = event.getParameter("listItem");

    const oContext = oItem.getBindingContext();

    const oData = oContext.getObject();

    const galaxyId = oData.ID;

    // Define the default layout for the FlexibleColumnLayout
    const layout = "TwoColumnsMidExpanded";

    const oComponent = this.getOwnerComponent();
    if (oComponent instanceof UIComponent) {
        const oRouter = oComponent.getRouter();
        oRouter.navTo("Detail", { GalaxyId: galaxyId, layout: layout });
    }
}


    public onInit(): void {
        const oModel = this.getOwnerComponent()?.getModel();
        if (!oModel) {
            console.error("Model is not set on the Component.");
            return;
        }
        this._calculateDrakeValue("<GALAXY_ID>");
        this.getView().setModel(oModel);
    }
    
    private async _calculateDrakeValue(galaxyId: string): Promise<void> {
        try {
            const response = await fetch(`/drake-service/calculateDrakeValue?galaxyId=${galaxyId}`);
            const drakeValue = await response.json();

            console.log(`Drake Value for Galaxy ${galaxyId}:`, drakeValue);
            // Update model or UI based on result
        } catch (error) {
            console.error("Error calculating Drake Value:", error);
        }
    }
}