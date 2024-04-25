export class PlayerInfo {
    showCitizenSlots: boolean;
    showBuildingSlots: boolean;

    constructor(id: string) {
        this._id = id;
        this.showBuildingSlots = false;
        this.showCitizenSlots = false;
    }

    _id: string;

    public get id() {
        return this._id;
    }

    shouldShowCitizenSlot() {
        return this.showCitizenSlots;
    }

    shouldShowBuildingSlot() {
        return this.showBuildingSlots;
    }

    showCitizenSlot() {
        this.showCitizenSlots = true;
    }

    showBuildingSlot() {
        this.showBuildingSlots = true;
    }

    hideCitizenSlot() {
        this.showCitizenSlots = false;
    }

    hideBuildingSlot() {
        this.showBuildingSlots = false;
    }
}
