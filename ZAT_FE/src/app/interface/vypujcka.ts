export interface Vypujcka {
    vypujcka_id: number
    nosic_id: number
    pujcujici_id: number
    stav_id: number
    datZapujceni: Date
    datVraceniPlan: Date
    datVraceni: Date | null
}

export interface VypujckaBasicInfo {
    vypujcka_id: number
    stav_id: number
    prezdivka: string
    dat_vraceni_plan: Date
}
