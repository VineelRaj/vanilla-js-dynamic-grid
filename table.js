async function getData(pageCount){
    const data = await fetch(" https://restcountries.com/v3.1/all ").then((res)=>res.json()).then((jsonRes)=> jsonRes)
    // const tableInfo = []
    const table = document.getElementById("countryTable");
    let start = 0
    if(pageCount > 0){
        start = pageCount+4
    }
    for(let i=start; i<start+5;i++){
        // console.log(data[i])
        const item = data[i]
        const itemInfo = {name: item.name.common, region: item.region, startOfWeek: item.startOfWeek, area:item.area, population: item.population};
        const row = table.insertRow()
        const name = row.insertCell(0)
        const area = row.insertCell(1)
        const population = row.insertCell(2)
        const startOfWeek = row.insertCell(3)
        const region = row.insertCell(4)
        name.innerHTML = itemInfo.name;
        population.innerHTML = itemInfo.population;
        area.innerHTML = itemInfo.area;
        region.innerHTML = itemInfo.region;
        startOfWeek.innerHTML = itemInfo.startOfWeek;
    }

}
function main(){
    let pageCount = 0;
    getData(pageCount);
    const prev = document.getElementById('prev')
    console.log(prev)
    prev.addEventListener('click', getData(pageCount++));
    const next = document.getElementById('next')
    next.addEventListener('click', getData(pageCount--));
    // const search = document.getElementById('search')
    // search.addEventListener('change', (e)=>filterData(e.targetValue))
    // const columns = document.getElementsByTagName("th")
    // // console.log(colums)
    // columns.forEach((ele)=>{
    //     ele.addEventListener('click', ()=>{
    //         console.log('sort')
    //     })
    // })
}
main()