var open_url=function () {}
open_url.prototype.init=function (obj) {
    localStorage.srceach_details=JSON.stringify(uploadDate.list_Datas[obj])
    window.open('/api/ocr/val_tion_invoice/')
}
open_url.prototype.Cost_url=function () {
    window.open('/api/ocr/val_tion_pdf_PDFCost/');
}