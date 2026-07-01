export enum BusinessTypeEnum {
    Restaurante = "restaurante",
    Carniceria  = "carniceria",
    Polleria    = "polleria",
}

export const BUSINESS_TYPE_LABELS: Record<BusinessTypeEnum, string> = {
    [BusinessTypeEnum.Restaurante]: "Restaurante / Cafetería",
    [BusinessTypeEnum.Carniceria]:  "Carnicería",
    [BusinessTypeEnum.Polleria]:    "Pollería",
};

export interface IBusinessFeatures {
    kitchen_view:   boolean;
    ready_to_serve: boolean;
    sell_by_weight: boolean;
}
