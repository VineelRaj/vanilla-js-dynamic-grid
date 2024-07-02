function viewData(data){
    console.log('data:',data)
    const table = document.getElementById("countryTable");
    const rows = table.getElementsByTagName('tr');
    for(let i=0; i<data.length;i++){
        let row;
        let name;
        let area;
        let population;
        let startOfWeek;
        let region;
        if(rows.length > 5){
            row = rows[i+1];
            name = row.cells[0];
            area = row.cells[1];
            population = row.cells[2];
            startOfWeek = row.cells[3];
            region = row.cells[4];
        }
        else{
            row = table.insertRow(i+1);
            name = row.insertCell(0);
            area = row.insertCell(1);
            population = row.insertCell(2);
            startOfWeek = row.insertCell(3);
            region = row.insertCell(4);
        }
        if(row){   
            name.innerHTML = data[i].name;
            population.innerHTML = data[i].population;
            area.innerHTML = data[i].area;
            region.innerHTML = data[i].region;
            startOfWeek.innerHTML = data[i].startOfWeek;
        }
       
    }

}
async function getData(){
    const data = await fetch(" https://restcountries.com/v3.1/all ").then((res)=>res.json()).then((jsonRes)=> jsonRes)
    return data;
}

function subSet(start, end, data){
    const subset = [];
    for(let i=start; i<end;i++){
        const item = data[i];
        const itemInfo = {name: item.name.common, region: item.region, startOfWeek: item.startOfWeek, area:item.area, population: item.population};
        subset.push(itemInfo)
    }
    return subset
}

function filterData(target, data){
    const filteredData = data.filter((item)=>{
        Object.values(item).forEach((value)=>{
            console.log(target)
            if(value.split(target).length > 1){
                return true
            }
        })
        return false
    })
    viewData(subSet(0,filteredData.length, filteredData));
}

function debounce(func, delay){
    let id;
    return function(...args){
        clearTimeout(id);
        id = setTimeout(()=> func(...args), delay);
    }
}
async function main(){
    var pageCount = 0;
    let pageLength = 5;
    const data = await getData();
    const pagedData = subSet(0,pageLength,data) ;
    viewData(pagedData);
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const pager = document.getElementById('pager')
    if(pageCount<=0){
        prev.disabled = true;
    }
    if(pageCount>= data.length/pageLength){
        next.disabled = true;
    }
    prev.addEventListener('click', ()=>{
        if(pageCount>0){
            next.disabled = false;
            pageCount--;
            pager.innerHTML = pageCount;
        }else{
            prev.disabled = true;
        }
        const start = pageCount*pageLength;
        const end = start + pageLength;
        viewData(subSet(start, end, data))
    });
    
    next.addEventListener('click', ()=>{
        if(pageCount >= data.length/pageLength){
            next.disabled = true;
        }
        else{
            prev.disabled = false
            pageCount++;
            pager.innerHTML = pageCount;
        }
        const start = pageCount*pageLength;
        const end = start + pageLength;
        viewData(subSet(start, end, data))
    });
    
    const search = document.getElementById('search')
    search.addEventListener('change', debounce((e)=>filterData(e.targetValue, data), 2000))
    // const columns = document.getElementsByTagName("th")
    // // console.log(colums)
    // columns.forEach((ele)=>{
    //     ele.addEventListener('click', ()=>{
    //         console.log('sort')
    //     })
    // })
}
main()