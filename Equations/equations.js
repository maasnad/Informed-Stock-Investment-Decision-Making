import { object } from "./data.js";

function check(){
    const data= Object.values(object)
    let noYears=0;
    let years=[]
    let length=data[0][1].length
    for(let value of data[0][0]){
        noYears+=1;
        if (value != ' '){
            if (value.toLowerCase()=='company'){
                break;
            }
            noYears=0;
        }
    }
    for (let x=1;x<=noYears;x++){
        years.push(data[0][1][length-x].slice(0,4))
    }
    const result={}
    result.years=years
    result.noYears=noYears
    result.length=length
    return result;
}
function iteration(name1,name2){
    const data= Object.values(object)
    let value1= null
    let value2=null
    //5 6
    for(let value of data[0]){
        value[0].toLowerCase().includes(name1.toLowerCase()) ? value1=value : '' 
        value[0].toLowerCase().includes(name2.toLowerCase()) ?  value2=value : ''
        if (value1 && value2){
            console.log(value1)
            console.log(value2)
            value1.forEach((elem,index)=>{
                if (elem ){

                    value1[index]=(elem.slice(0,1) == '(' ? elem.slice(1, -1) : elem)
                }
            })
            value2.forEach((elem,index)=>{
                if (elem!=' ' ){
                    value2[index]= elem.slice(0,1) == '(' ? elem.slice(1, -1) : elem

                }
            })
            break
        }
    }
    return [value1,value2]
}
function grossProfit(){
    let values=iteration('revenue','gross profit')
    let gp=values[1]
    let revenue=values[0]
    let grossProfit={}
    let result=check()
    let index=result.noYears
    let end='Gross Profit : '
    for (let x of result.years){
        grossProfit[x]= gp[result.length-index]!='-' || revenue[result.length-index]=='-' ? parseInt(gp[result.length-index])/parseInt(revenue[result.length-index])*100 : null
        end=end + '{'+ x + ' : ' +grossProfit[x] +'}  '
        index-=1
    }
    
    return end
}
function ebit(){
    let values=iteration('operating profit','revenue')
    let operatingIncome=values[0]
    let revenue=values[1]
    let ebit={}
    let result=check()
    let index=result.noYears
    console.log(result)

    let end='EBIT : '
    for (let x of result.years){
        ebit[x]= gp[result.length-index]!='-' || revenue[result.length-index]=='-' ? parseInt(operatingIncome[result.length-index])/parseInt(revenue[result.length-index])*100 : null
        end=end + '{'+ x + ' : ' +ebit[x] +'}  '
        index-=1
    }
    
    return end
}
function netProfitMargin(){
    let values=iteration('Profit/(loss) for the year','revenue')
    console.log(values)
    let netEarnings=values[0]
    let revenue=values[1]
    let netProfitMargin={}
    let result=check()
    console.log(result)
    let index=result.noYears
    let end='Net Profit Margin : '
    for (let x of result.years){
        netProfitMargin[x]= gp[result.length-index]!='-' || revenue[result.length-index]=='-' ? parseInt(netEarnings[result.length-index])/parseInt(revenue[result.length-index])*100 : null
        end=end + '{ Year '+ x + ' : ' +netProfitMargin[x].toFixed(2) +'% }  '
        index-=1
    }
    
    return end
}
console.log(netProfitMargin())