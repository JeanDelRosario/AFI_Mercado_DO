const apiDataDay = "/json";

let AFIData :[];

interface afiDbInfo {
  "AFI": string;
  "FONDO": string;
  "DIAS_30" : number;
  "DIAS_90" : number;
  "DIAS_180" : number;
  "DIAS_360" : number;
  [key: string] : string | number | undefined;
}
interface listOfColumns {
  "AFI": string;
  "Fondo": string;
  "Tasa-30-Dias" : string;
  "Tasa-90-Dias" : string;
  "Tasa-180-Dias" : string;
  "Tasa-360-Dias" : string;
  [key: string] : string;
}
const list : listOfColumns = {
  "AFI": "AFI",
  "Fondo": "FONDO",
  "Tasa-30-Dias" : "DIAS_30",
  "Tasa-90-Dias" : "DIAS_90",
  "Tasa-180-Dias" : "DIAS_180",
  "Tasa-360-Dias" : "DIAS_360"
 };

 const getDataAPI = (sort : string = 'DIAS_30') => {
  fetch(apiDataDay, {cache: "no-store"})
     .then((resp) => resp.json())
     .catch(function(error) {
        console.log(error);
      })
     .then((data: afiDbInfo[]) : void => {
        data = data.map((valueArray : afiDbInfo ) : afiDbInfo => {
          return {
            AFI: valueArray["AFI"],
            FONDO: valueArray["FONDO"],
            DIAS_30: valueArray["DIAS_30"],
            DIAS_90: valueArray["DIAS_90"],
            DIAS_180: valueArray["DIAS_180"],
            DIAS_360: valueArray["DIAS_360"]
          }
      })

      data.sort((a, b) => {
        const c = b[sort];
        const d = a[sort];
        if((typeof c === 'number') && ((typeof d === "number"))) {
          return c - d;
        }else {
          return -1;
        }
      });
      
      AFIData = JSON.parse(JSON.stringify(data));
      loadData(data);
    }
  )
}

const loadData = (data : afiDbInfo[]) => {
    data.map((item : afiDbInfo ) : void => {
      for(let key of Object.keys(item) ) {
        if(key === "_id" || key === "FECHA" || key === "APORTANTES" || key === "PATRIMONIO"){
          continue;
        }

        let interest = item[key];

        let node = document.createElement("p");
        node.className = "table-text";
        interest = typeof interest === "number" ? Math.floor(interest * 10000)/100 + '%' : interest;

        let textnode = document.createTextNode(interest ? interest : 'null');
        node.appendChild(textnode);

        document.getElementById("data")!.appendChild(node);
      }
    })
}

const removeElements = (elms : HTMLElement[]) : void => [...elms].forEach(el => el.remove());

const remove = () : void => {
  removeElements( Array.from(document.querySelectorAll(".table-text")) );
}

const sortDataHelper = (column : string) => {
  AFIData.sort((a, b) => b[column] - a[column]);
}

const sortData = (event : Event) : void => {
  remove();
  const target = event.target as HTMLElement;
  sortDataHelper(list[target.id]);
  loadData(JSON.parse(JSON.stringify(AFIData)));
}

getDataAPI();