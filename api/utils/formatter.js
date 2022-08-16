module.exports = {
    jsonToHTML(pkg_name, json){
        json_data = eval(json)
        keys = Object.keys(json_data[0])
        htmlBody = ""
        htmlBody += `<div><h4>${pkg_name} : </h4></div> <br>`
        htmlBody += `<table style="width:100%; border: 1px solid black; border-collapse: collapse;">`
        htmlBody += `<thead>`
        for(key of keys){
            htmlBody += `<th height='39' class='gmail-xl65' style='height: 29pt; font-size: 11pt; color: white; font-weight: 700; font-family: Calibri; border: 0.5pt solid rgb(217, 217, 217); background: rgb(39, 206, 215); text-align: center; vertical-align: middle; padding-top: 1px; padding-right: 1px; padding-left: 1px; white-space: nowrap;'> ${key}</th>`
        }
        htmlBody += `</tr>`
        htmlBody += `</thead>`
        htmlBody += `<tbody>`
        for(row of json_data){
            htmlBody += "<tr>"
            for(column in row){
                htmlBody += `<td style="text-align: center; border: 1px solid black;">${row[column]}</td>`
            }
            htmlBody += "</tr>"
        }
        htmlBody += `</tbody></table>`
        return htmlBody
    }
}
