class OrderTrouderRequest {
    constructor(
        formQuan,
        kieuLung,
        kieuTuiTruoc,
        kieuTuiSau,
        soTui,
        kieuLai,
        price,
        amount,
        note,
        fabric

    ) {
        this.formQuan = formQuan;
        this.kieuLung = kieuLung;
        this.kieuTuiTruoc = kieuTuiTruoc;
        this.kieuTuiSau = kieuTuiSau;
        this.soTui = soTui;
        this.kieuLai = kieuLai;
        this.price = price;
        this.amount = amount;
        this.note = note;
        this.fabric = fabric;
    }
}