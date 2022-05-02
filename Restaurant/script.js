let items=[
    {"name":"Crusty Garlic Focaccia With Melted Cheese","price":105.00,"id":"i1"},
    {"name":"French Fries","price":105.00,"id":"i2"},
    {"name":"Home Country Fries With Herbs & Chilli Flakes","price":105.00,"id":"i3"},
    {"name":"French Fries With Cheese & Jalepanos","price":135.00,"id":"i4"},
    {"name":"Chicken & Cheese Burger","price":155.00,"id":"i5"},
    {"name":"Veggie Burger","price":130.00,"id":"i6"}
];
let orders=[
    {"name":"Table-1","items":[]},
    {"name":"Table-2","items":[]},
    {"name":"Table-3","items":[]}
]
window.onload=()=>{
var menu = document.querySelector("#menu");
var tables=document.querySelector("#tables");
orders.forEach(table => {
    initTable(table);
});
items.forEach(item => {
    initItem(item);
});
}
function initTable(table){
    var div = document.createElement("div");
    div.classList="card m-2 p-2 pb-3";
    div.id=table.name;
    div.ondrop=drop;
    div.ondragover=allowDrop;
    div.setAttribute("clickable",true);
    div.onclick=show;
    var h5= document.createElement("h5");
    h5.className="card-title";
    h5.innerHTML=table.name;
    h5.id=table.name;
    div.appendChild(h5);
    var span1= document.createElement("span");
    span1.id=table.name;
    span1.innerHTML = "Rs.0";
    var span2= document.createElement("span");
    span2.id=table.name;
    span2.innerHTML= "Total items: 0";
    div.appendChild(span1);
    div.appendChild(span2);
    tables.appendChild(div);
}
function initItem(item){
    var div = document.createElement("div");
    div.classList="card m-2 p-2 pb-3 shadow";
    div.draggable=true;
    div.ondragstart=drag;
    div.setAttribute("name",item.name);
    div.setAttribute("price",item.price);
    div.id=item.id;
    var h5= document.createElement("h5");
    h5.className="card-title";
    h5.innerHTML=item.name;
    div.appendChild(h5);
    var span= document.createElement("span");
    span.className="card-body";
    span.innerHTML=item.price;
    div.appendChild(span);
    menu.appendChild(div);
}
document.getElementsByClassName("close")[0].onclick=close;
document.getElementsByClassName("close-session")[0].onclick=closeSession;
function drag(event){
    var target=event.target;
    event.dataTransfer.setData("price",target.getAttribute("price"));
    event.dataTransfer.setData("name",target.getAttribute("name"));
}
function drop(ev) {
    ev.preventDefault();
    let price = ev.dataTransfer.getData("price");
    let name = ev.dataTransfer.getData("name");
    let target =ev.target;
    var bill=0;
    var items=0;
    orders.forEach(order => {
        if(order.name==target.id){
            order.items.push({"name":name,"price":parseFloat(price),"quantity":1});
            order.items.forEach(item=>{
                bill+=item.price;
            });
            items=order.items.length;
        }
    });
    var spans = document.querySelectorAll('span');
    console.log(spans);
    var s = [];
    spans.forEach(element => {
        if(element.id==target.id)
            s.push(element);
    });
    s[0].innerHTML="Rs."+bill;
    s[1].innerHTML="Total items: "+items;
}
function allowDrop(ev) {
    ev.preventDefault();
}
function show(ev){
    document.querySelector("#myModal").style.display = "block";
    let target = ev.target;
    var node = document.getElementById("order-details");
    while (node.hasChildNodes()) 
        node.removeChild(node.lastChild);
    document.getElementById("title").innerHTML = ev.target.id+" | Order Details";
    initTableHeader();
    orders.forEach(order => {
        if(order.name==target.id){
            var totalBill=0;
            for(var i=0;i<order.items.length;i++){
                let row = createRow(i,order.items[i],order.name);
                document.querySelector("#order-details").appendChild(row);
                totalBill+=parseFloat(order.items[i].price);
            }
            let lastRow = createLastRow(totalBill);
            document.querySelector("#order-details").appendChild(lastRow);
        }
    });
    var btn = document.getElementsByClassName("close-session")[0];
    btn.setAttribute("id",target.id);
}
function initTableHeader(){
    var headerRow = document.createElement("tr");
    let sno=document.createElement("td");
    sno.innerHTML="S. No.";
    headerRow.appendChild(sno);
    let name=document.createElement("td");
    name.innerHTML="Name";
    headerRow.appendChild(name);
    let price=document.createElement("td");
    price.innerHTML="Price";
    headerRow.appendChild(price);
    headerRow.appendChild(document.createElement("td"));
    headerRow.appendChild(document.createElement("td"));
    document.querySelector("#order-details").appendChild(headerRow);
}
function createRow(i,item,orderName){
    let row = document.createElement("tr");
    let sno = document.createElement("td");
    sno.innerHTML=i+1;
    row.appendChild(sno);
    let name = document.createElement("td");
    name.innerHTML=item.name;
    row.appendChild(name);
    let price = document.createElement("td");
    price.innerHTML=item.price;
    row.appendChild(price);
    let quantity = document.createElement("td");
    let input = document.createElement("input");
    input.id=item.price;
    input.setAttribute("type","number");
    input.onchange=modifyBill;
    input.value=item.quantity;
    quantity.appendChild(input);
    row.appendChild(quantity);
    let remove = document.createElement("td");
    remove.id=orderName;
    let button = document.createElement("button");
    button.innerText="Delete";
    button.onclick=cancel;
    button.setAttribute("name",item.name);
    remove.appendChild(button);
    row.appendChild(remove);
    return row;
}
function createLastRow(totalBill){
    var lastRow = document.createElement("tr");
    lastRow.appendChild(document.createElement("td"));
    var total = document.createElement("td");
    total.innerHTML="Total";
    lastRow.appendChild(total);
    var bill = document.createElement("td");
    bill.id="bill";
    bill.innerHTML = totalBill;
    lastRow.appendChild(bill);
    lastRow.appendChild(document.createElement("td"));
    lastRow.appendChild(document.createElement("td"));
    return lastRow;
}
function close(){
    document.querySelector("#myModal").style.display = "none";
}
function modifyBill(ev){
    console.log(ev.target.id);
    let price = ev.target.id;
    var n = ev.target.value;
    var inputtd = ev.target.parentNode;
    var pricetd= inputtd.previousSibling;
    let prevPrice = pricetd.innerHTML;
    pricetd.innerHTML = n*parseFloat(price);
    document.querySelector("#bill").innerHTML = parseFloat(document.querySelector("#bill").innerHTML)+parseFloat(pricetd.innerHTML)-parseFloat(prevPrice);
}
function closeSession(){
    var targetId= document.getElementsByClassName("close-session")[0].id;
    var s = getSpanById(targetId);
    s[0].innerHTML="Rs."+document.querySelector("#bill").innerHTML;
    close();
}
function getSpanById(targetId){
    var spans = document.querySelectorAll('span');
    var s = [];
    spans.forEach(element => {
        if(element.id==targetId)
            s.push(element);
    });
    return s;
}
function cancel(ev){
    var target = ev.target;
    var itemname = target.getAttribute("name");
    var btntd = ev.target.parentNode;
    var items = 0;
    for(let i=0;i<orders.length;i++){
        if(orders[i].name==btntd.id){
            items = orders[i].items.length;
            for(let item=0;item<orders[i].items.length;item++)
                if(orders[i].items[item].name==itemname){
                    orders[i].items.splice(item);
                    break;
                }
            break;
        }
    }
    var row = btntd.parentNode;
    row.parentNode.removeChild(row);
    document.querySelector("#bill").innerHTML = parseFloat(document.querySelector("#bill").innerHTML)-parseFloat(row.children[2].innerHTML);
    var s = getSpanById(document.getElementsByClassName("close-session")[0].id);
    s[0].innerHTML="Rs."+document.querySelector("#bill").innerHTML;
    s[1].innerHTML="Total items: "+(items-1);
}
function search(event){
    var target = event.target;
    if(target.id=="search-table"){
        let value= target.value;
        let filtered = orders.filter(table=>{
            return table.name.includes(value);
        });
        orders.forEach(table => {
            document.getElementById(table.name).style.display="none";
        });
        filtered.forEach(table => {
            document.getElementById(table.name).style.display="flex";
        });
    }
    else if(target.id=="search-menu"){
        let value= target.value;
        let filtered = items.filter(item=>{
            return item.name.includes(value);
        });
        items.forEach(item => {
            document.getElementById(item.id).style.display="none";
        });
        filtered.forEach(item => {
            document.getElementById(item.id).style.display="flex";
        });
    }
}