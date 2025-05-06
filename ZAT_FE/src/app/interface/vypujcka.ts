export interface Vypujcka {
    vypujcka_id: number
    dilo_id: number
    nosic_id: number
    pujcujici_id: number
    stav_id: number
    dat_zapujceni: Date
    dat_vraceni_plan: Date
    dat_vraceni: Date | undefined
    nazev: string | undefined
    prezdivka: string | undefined
}

export interface VypujckaBasicInfo {
    vypujcka_id: number
    stav_id: number
    prezdivka: string
    dat_vraceni_plan: Date
}
