class OrderSuitRequest {
    constructor(
        kieuAo,
        formAo,
        kieuVeAo,
        lotAo,
        kieuNut,
        kieuTui,
        price,
        amount,
        note,
        fabric
    ) {
        this.kieuAo = kieuAo;
        this.formAo = formAo;
        this.kieuVeAo = kieuVeAo;
        this.lotAo = lotAo;
        this.kieuNut = kieuNut;
        this.kieuTui = kieuTui;
        this.price = price;
        this.amount = amount;
        this.note = note;
        this.fabric = fabric;
    }
}