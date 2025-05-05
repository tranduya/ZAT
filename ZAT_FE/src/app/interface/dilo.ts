export interface Dilo {
    dilo_id: number
    nosic_id: number
    stav_id: number
    nazev: string
    autor: string
    dat_porizeni: Date
    delka: string
    popis: string
    prezdivka: string | null
    dat_vraceni_plan: Date | null
}
