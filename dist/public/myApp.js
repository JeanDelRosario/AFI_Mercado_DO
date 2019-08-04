"use strict";
var apiDataDay = "/json";
var AFIData;
var list = {
    "AFI": "AFI",
    "Fondo": "FONDO",
    "Tasa-30-Dias": "DIAS_30",
    "Tasa-90-Dias": "DIAS_90",
    "Tasa-180-Dias": "DIAS_180",
    "Tasa-360-Dias": "DIAS_360"
};
var getDataAPI = function (sort) {
    if (sort === void 0) { sort = 'DIAS_30'; }
    fetch(apiDataDay, { cache: "no-store" })
        .then(function (resp) { return resp.json(); })
        .catch(function (error) {
        console.log(error);
    })
        .then(function (data) {
        data = data.map(function (valueArray) {
            return {
                AFI: valueArray["AFI"],
                FONDO: valueArray["FONDO"],
                DIAS_30: valueArray["DIAS_30"],
                DIAS_90: valueArray["DIAS_90"],
                DIAS_180: valueArray["DIAS_180"],
                DIAS_360: valueArray["DIAS_360"]
            };
        });
        data.sort(function (a, b) {
            var c = b[sort];
            var d = a[sort];
            if ((typeof c === 'number') && ((typeof d === "number"))) {
                return c - d;
            }
            else {
                return -1;
            }
        });
        AFIData = JSON.parse(JSON.stringify(data));
        loadData(data);
    });
};
var loadData = function (data) {
    data.map(function (item) {
        for (var _i = 0, _a = Object.keys(item); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === "_id" || key === "FECHA" || key === "APORTANTES" || key === "PATRIMONIO") {
                continue;
            }
            var interest = item[key];
            var node = document.createElement("p");
            node.className = "table-text";
            interest = typeof interest === "number" ? Math.floor(interest * 10000) / 100 + '%' : interest;
            var textnode = document.createTextNode(interest ? interest : 'null');
            node.appendChild(textnode);
            document.getElementById("data").appendChild(node);
        }
    });
};
var removeElements = function (elms) { return elms.slice().forEach(function (el) { return el.remove(); }); };
var remove = function () {
    removeElements(Array.from(document.querySelectorAll(".table-text")));
};
var sortDataHelper = function (column) {
    AFIData.sort(function (a, b) { return b[column] - a[column]; });
};
var sortData = function (event) {
    remove();
    var target = event.target;
    sortDataHelper(list[target.id]);
    loadData(JSON.parse(JSON.stringify(AFIData)));
};
getDataAPI();
