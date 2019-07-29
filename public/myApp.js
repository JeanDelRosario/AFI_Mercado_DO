const URL = "/json";
let AFIData;

const loadData = (data) => {
    data.map(item => {
      for(let key of Object.keys(item) ) {
        if(key === "_id" || key === "FECHA" || key === "APORTANTES" || key === "PATRIMONIO"){
          continue;
        } 
        let node = document.createElement("p");
        node.className = "table-text";
        item[key] = typeof item[key] == "number" ? Math.floor(item[key] * 10000)/100 + '%' : item[key];

        let textnode = document.createTextNode(item[key]);
        node.appendChild(textnode);
        document.getElementById("data").appendChild(node);
      }
    })
}

const getDataAPI = (sort = 'DIAS_30') => {
  fetch(URL, {cache: "no-store"})
     .then((resp) => resp.json())
     .catch(function(error) {
        console.log(error);
      })
     .then((data) => {
        console.log(data)
        data = data.map((valueArray) => {
          return {
            AFI: valueArray["AFI"],
            FONDO: valueArray["FONDO"],
            DIAS_30: valueArray["DIAS_30"],
            DIAS_90: valueArray["DIAS_90"],
            DIAS_180: valueArray["DIAS_180"],
            DIAS_360: valueArray["DIAS_360"]
          }
      })
      console.log(data)
      data.sort((a,b) => b[sort] - a[sort]);
      AFIData = data;
      loadData(data);
    }
  )
}

getDataAPI();

const list = {
 AFI: "AFI",
 Fondo: "FONDO",
 "Tasa-30-Dias" : "DIAS_30",
 "Tasa-90-Dias" : "DIAS_90",
 "Tasa-180-Dias" : "DIAS_180",
 "Tasa-360-Dias" : "DIAS_360"
}

const removeElements = (elms) => [...elms].forEach(el => el.remove());
const remove = () => {
  // Use like:
  removeElements( document.querySelectorAll(".table-text") );
}
const sortDataHelper = (column) => {
  AFIData.sort((a,b) => b[column] - a[column]);
}

const sortData = (event) => {
  remove();
  sortDataHelper(list[event.target.id]);
  loadData(AFIData);
}