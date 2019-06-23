var stack1=[];
var data=[];
var sum=0;
var number="";
var postFix="";
var caltextt="";  
var input=document.getElementById("input");
var buttonsContainer=document.getElementById("calculator-buttons");
buttonsContainer.addEventListener("click",function(e){
    buttonClick(e.target.id);
});

var calc=document.getElementById("button=");
calc.addEventListener("click",calculate);

var erase=document.getElementById("buttonc");
erase.addEventListener("click",eraseInput);


function buttonClick(buttonId)
{
   
if((buttonId!="buttonc")&&(buttonId !="button=")&&(buttonId !="calculator-buttons")){
    var textId=buttonId;
    textId=textId.replace("button","");
    appendtoInpputText(textId);
}
}
function appendtoInpputText(textId){
    input.value+=textId;
}
function calculate(){
   
    postFix="";
    data=[];      
   caltextt=input.value;

   for(var j=0;j<caltextt.length;j++){
       var ch=caltextt.charAt(j);
       if(ch=='+'||ch=='-'||ch=='*'||ch=='/')
       {      
        if(stack1.length){
            var top = stack1[stack1.length-1];
            if((top=='+'||top=='-')&&(ch=='*'||ch=='/')){
                stack1.push(ch);
            }
            else if((top=='*'||top=='/')&&(ch=='+'||ch=='-')){
                while(stack1.length){
                    var operator=stack1.pop();
                    postFix+=operator;
                    data.push(operator);
                    
                }
                stack1.push(ch);
            }
           
            else{
                stack1.push(ch);
            }
        }
        else{
            stack1.push(ch);
        }

       }
       
       else{
        number+=ch;
           if(caltextt.charAt(j+1)=='+'||caltextt.charAt(j+1)=='-'||caltextt.charAt(j+1)=='*'||caltextt.charAt(j+1)=='/'||caltextt.charAt(j+1)==""){
            postFix+=number;
             data.push(number);
             number="";

           }
          
       } 

   }
   while(stack1.length){
    var oppp=stack1.pop();
    postFix+=oppp;
    data.push(oppp);
} 

expressionValue(data);

 input.value=""+data[0];

}

function eraseInput(){
    input.value="";
}

function expressionValue(data){
    var operatorindex,index1,index2;
    for(var k=0;k<data.length;k++){
        if(isNaN(data[k])&&!isNaN(data[k-1])){
            operatorindex=k;
            index1=k-2;
            index2=k-1;
            var a,b,myoperator,answer;
            a=parseFloat(data[index1]);
            b=parseFloat(data[index2]);
            myoperator=data[operatorindex];
            switch(myoperator){
                case "+":answer=a+b; break;
                case"-":answer=a-b;break;
                case"*":answer=a*b;break;
                case"/":answer=a/b;break;
                default:
            }
            data[operatorindex]=""+answer;
            data.splice(index2,1);
             data.splice(index1,1);
             expressionValue(data);
        }
    }
    }