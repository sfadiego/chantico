export enum SubscriptionPlanEnum {
    Monthly  = "monthly",
    Biannual = "biannual",
    Annual   = "annual",
    Lifetime = "lifetime",
}

export const PLAN_LABELS: Record<SubscriptionPlanEnum, string> = {
    [SubscriptionPlanEnum.Monthly]:  "Mensual",
    [SubscriptionPlanEnum.Biannual]: "Semestral",
    [SubscriptionPlanEnum.Annual]:   "Anual",
    [SubscriptionPlanEnum.Lifetime]: "Membresía indefinida",
};
