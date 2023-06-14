let flagService=0;
let flagPortfolio=0;
let flagBlogs=0;
let flagFollow=0;
let flagAbout=0;
let flagContact=0;
let subscribe=null;
let email=null;

const btntheme=document.getElementById("theme");
const btnhome=document.getElementById("home1");
const btnservices =document.getElementById("profservices");
const btnblogs = document.getElementById("profblogs");
const btntimeline = document.getElementById("proftimeline");
const btnportfolio = document.getElementById("profportfolio");
const btnabout = document.getElementById("aboutbtn");
const btncontact = document.getElementById("contactbtn");
const btnfollow =document.getElementById("followbtn");
const btnshowMore=document.getElementsByClassName("btn showmore");

const sectionServices =document.getElementsByClassName("section services")[0];
const sectionPortfolio = document.getElementsByClassName("section portfolio")[0];
const sectionBlogs = document.getElementsByClassName("section blogs")[0];
const sectionTimeline =document.getElementsByClassName("section timeline")[0];
const sectionAbout = document.getElementsByClassName("section about")[0];

function loading(){
  for(let i=0;i<document.getElementsByClassName("section").length;i++){
  document.getElementsByClassName("section")[i].style.display="none";}
  document.getElementById("loader").style.display="block";
  function load(){
    document.getElementById("loader").style.display="none";
    for(let i=0;i<document.getElementsByClassName("section").length;i++){
      document.getElementsByClassName("section")[i].style.display="block";
  }
  }
  setTimeout(load,4000);
}

function home()
{
sectionServices.style.display = "block";
sectionPortfolio.style.display = "block";
sectionBlogs.style.display = "block";
sectionAbout.style.display = "block";
sectionTimeline.style.display = "block";
    for(let i=0;i< document.getElementsByClassName("btn").length;i++){
    document.getElementsByClassName("btn")[i].style.backgroundColor="#7a7aff";
    document.getElementsByClassName("btn")[i].style.color="white";}
    
    document.getElementsByClassName("btn showmore")[0].style.backgroundColor="#4942E4";
   document.getElementsByClassName("btn showmore")[1].style.backgroundColor="#8696FE";
   document.getElementsByClassName("btn showmore")[2].style.backgroundColor="#c4b0f4";

}

function validEmail(email){
  let dot=null;let mailDomain=null;let specialChar="!~@#$%^&*()_+-/\"\'.:;,{}[]?";let flagId=null;let flagDomain=null;
  for(let i=0;i<email.length;i++){
    if(email[i]==='@'){
      mailDomain=i}else{
        continue;}
      }
      for(let i=0;i<email.length;i++){
        if(email[0]!=specialChar[i] && email[mailDomain--]!=specialChar[i]){
          flagId="true";
          }else{continue;}
      }
      for(let i=mailDomain;i<email.length;i++){
        if(email[i]==='.'){
          dot=i;}
          else{continue;}
        }

        if(dot!=null&&mailDomain!=null&&flagId!=null){
          
        }else{ 
          return "invalid";
      }

      for(let i=mailDomain++;i<dot;i++){
        for(let j=0;j<specialChar.length;j++){
          if(email[i]===specialChar[j]){
            console.log(email[i]);
            console.log(i);
            return "valid";
          }else{
            continue;
          }
        }
      }
      return "valid";
    }


function menuhover(element){
    let arr=document.getElementsByClassName("menu");
     for(let i=0;i<arr.length;i++){
           if(arr[i]!=element){
             arr[i].style.backgroundColor="#000000";
             arr[i].style.color="#7a7aff";
            }else{
             element.style.backgroundColor="#7a7aff";
             element.style.color="white";
          }
     }
}

home();

document.getElementsByClassName("btn showmore")[0].style.backgroundColor="#4942E4";
document.getElementsByClassName("btn showmore")[1].style.backgroundColor="#8696FE";
document.getElementsByClassName("btn showmore")[2].style.backgroundColor="#c4b0f4";




btnservices.onclick = function()
{
sectionServices.style.display = "block";
sectionPortfolio.style.display = "none";
sectionBlogs.style.display = "none";
sectionAbout.style.display = "none";
sectionTimeline.style.display = "none";
menuhover(btnservices);
}

btnportfolio.onclick = function()
{
sectionServices.style.display = "none";
sectionPortfolio.style.display = "block";
sectionBlogs.style.display = "none";
sectionAbout.style.display = "none";
sectionTimeline.style.display = "none";
menuhover(btnportfolio);
}

btnblogs.onclick = function()
{
sectionServices.style.display = "none";
sectionPortfolio.style.display = "none";
sectionBlogs.style.display = "block";
sectionAbout.style.display = "none";
sectionTimeline.style.display = "none";
menuhover(btnblogs);
}

btntimeline.onclick = function()
{
sectionServices.style.display = "none";
sectionPortfolio.style.display = "none";
sectionBlogs.style.display = "none";
sectionAbout.style.display = "none";
sectionTimeline.style.display = "block";
menuhover(btntimeline);
}

btnhome.onclick=function()
{
  home();
  menuhover(btnhome);
}

btntheme.onclick=function(){
     menuhover(btntheme);
    if(btntheme.className==="fa fa-sun-o"){
        document.body.style.backgroundColor="black";
        document.body.style.color="white";
        btntheme.className="fa fa-moon-o";  
        
       /* //body
        //section services
       document.getElementsByClassName("section services")[0].style.color="white"; 
       for(let i=0;i< document.getElementsByClassName("tabservicesdiv").length;i++){
      document.getElementsByClassName("tabservicesdiv")[i].style.backgroundColor="#4942E4";
       }
     
     //section portfolio
     
     document.getElementsByClassName("section portfolio")[0].style.color="white"; 
       for(let i=0;i< document.getElementsByClassName("tabportfoliodiv").length;i++){
      document.getElementsByClassName("tabportfoliodiv")[i].style.backgroundColor="#8696FE";
       }
       
     //section blogs
     
     document.getElementsByClassName("section blogs")[0].style.color="white"; 
       for(let i=0;i< document.getElementsByClassName("tabblogsdiv").length;i++){
      document.getElementsByClassName("tabblogsdiv")[i].style.backgroundColor="#c4b0f4";
       }*/
       
       document.getElementById("connectme").className="section connectmemoon";
       
       
    }else if(btntheme.className==="fa fa-moon-o"){
        document.body.style.backgroundColor="white";
        document.body.style.color="black";
        btntheme.className="fa fa-sun-o";  
        
     /*   //body
        //section services
       document.getElementsByClassName("section services")[0].style.color="white";
       for(let i=0;i< document.getElementsByClassName("tabservicesdiv").length;i++){
      document.getElementsByClassName("tabservicesdiv")[i].style.backgroundColor="#4942E4";
       }
       
       //section portfolio
     
     document.getElementsByClassName("section portfolio")[0].style.color="white"; 
       for(let i=0;i< document.getElementsByClassName("tabportfoliodiv").length;i++){
      document.getElementsByClassName("tabportfoliodiv")[i].style.backgroundColor="#8696FE";
       }
       
     //section blogs
     
     document.getElementsByClassName("section blogs")[0].style.color="white"; 
       for(let i=0;i< document.getElementsByClassName("tabblogsdiv").length;i++){
      document.getElementsByClassName("tabblogsdiv")[i].style.backgroundColor="#c4b0f4";
       }*/
       
     document.getElementById("connectme").className="section connectmesun";
        
    }
    console.log(btntheme);
}

if(screen.width<=480){
    document.getElementsByClassName("tabservicesdiv")[2].style.display="none";
    document.getElementsByClassName("tabservicesdiv")[3].style.display="none";
    document.getElementsByClassName("tabportfoliodiv")[2].style.display="none";
    document.getElementsByClassName("tabportfoliodiv")[3].style.display="none";
    document.getElementsByClassName("tabportfoliodiv")[2].style.display="none";
    document.getElementsByClassName("tabportfoliodiv")[3].style.display="none";
    document.getElementsByClassName("tabblogsdiv")[2].style.display="none";
    document.getElementsByClassName("tabblogsdiv")[3].style.display="none";
    
    btnshowMore[0].onclick=function(){
        if(flagService===0){
        document.getElementsByClassName("tabservicesdiv")[2].style.display="block";
        document.getElementsByClassName("tabservicesdiv")[3].style.display="block";
        document.getElementsByClassName("btn showmore")[0].innerHTML="Show less";
        document.getElementsByClassName("btn showmore")[0].style.backgroundColor="white";
        document.getElementsByClassName("btn showmore")[0].style.color="#4942E4";
        flagService=1;
        }else if(flagService===1){
         document.getElementsByClassName("tabservicesdiv")[2].style.display="none";
         document.getElementsByClassName("tabservicesdiv")[3].style.display="none";
        document.getElementsByClassName("btn showmore")[0].innerHTML="Show more";
        document.getElementsByClassName("btn showmore")[0].style.backgroundColor="#4942E4";
        document.getElementsByClassName("btn showmore")[0].style.color="white";
        flagService=0;
        }
    }
    btnshowMore[1].onclick=function(){
      if(flagPortfolio===0){
      document.getElementsByClassName("tabportfoliodiv")[2].style.display="block";
      document.getElementsByClassName("tabportfoliodiv")[3].style.display="block";
      document.getElementsByClassName("btn showmore")[1].innerHTML="Show less";
      document.getElementsByClassName("btn showmore")[1].style.backgroundColor="white";
      document.getElementsByClassName("btn showmore")[1].style.color="#8696FE";
      flagPortfolio=1;
      }else if(flagPortfolio===1){
       document.getElementsByClassName("tabportfoliodiv")[2].style.display="none";
       document.getElementsByClassName("tabportfoliodiv")[3].style.display="none";
      document.getElementsByClassName("btn showmore")[1].innerHTML="Show more";
      document.getElementsByClassName("btn showmore")[1].style.backgroundColor="#8696FE";
      document.getElementsByClassName("btn showmore")[1].style.color="white";
      flagPortfolio=0;
      }
  }
  btnshowMore[2].onclick=function(){
    if(flagBlogs===0){
    document.getElementsByClassName("tabblogsdiv")[2].style.display="block";
    document.getElementsByClassName("tabblogsdiv")[3].style.display="block";
    document.getElementsByClassName("btn showmore")[2].innerHTML="Show less";
    document.getElementsByClassName("btn showmore")[2].style.backgroundColor="#8696FE";
    document.getElementsByClassName("btn showmore")[2].style.color="";
    flagBlogs=1;
    }else if(flagBlogs===1){
     document.getElementsByClassName("tabblogsdiv")[2].style.display="none";
     document.getElementsByClassName("tabblogsdiv")[3].style.display="none";
    document.getElementsByClassName("btn showmore")[2].innerHTML="Show more";
    document.getElementsByClassName("btn showmore")[2].style.backgroundColor="white";
    document.getElementsByClassName("btn showmore")[2].style.color="#8696FE";
    flagBlogs=0;
    }
}
}else{
    document.getElementsByClassName("tabservicesdiv")[3].style.display="none";
    document.getElementsByClassName("tabportfoliodiv")[3].style.display="none";
    document.getElementsByClassName("tabblogsdiv")[3].style.display="none";
    
    btnshowMore[0].onclick=function(){
        if(flagService===0){
        document.getElementsByClassName("tabservicesdiv")[3].style.display="block";
        document.getElementsByClassName("btn showmore")[0].innerHTML="Show less";
        document.getElementsByClassName("btn showmore")[0].style.backgroundColor="white";
        document.getElementsByClassName("btn showmore")[0].style.color="#4942E4";
        flagService=1;
        }else if(flagService===1){
         document.getElementsByClassName("tabservicesdiv")[3].style.display="none";
        document.getElementsByClassName("btn showmore")[0].innerHTML="Show more";
        document.getElementsByClassName("btn showmore")[0].style.backgroundColor="#4942E4";
        document.getElementsByClassName("btn showmore")[0].style.color="white";
        flagService=0;
        }
    }
    btnshowMore[1].onclick=function(){
        if(flagPortfolio===0){
        document.getElementsByClassName("tabportfoliodiv")[3].style.display="block";
        document.getElementsByClassName("btn showmore")[1].innerHTML="Show less";
        document.getElementsByClassName("btn showmore")[1].style.backgroundColor="white";
        document.getElementsByClassName("btn showmore")[1].style.color="#8696FE";
        flagPortfolio=1;
        }else if(flagPortfolio==1){
         document.getElementsByClassName("tabportfoliodiv")[3].style.display="none";
        document.getElementsByClassName("btn showmore")[1].innerHTML="Show more";
        document.getElementsByClassName("btn showmore")[1].style.backgroundColor="#8696FE";
        document.getElementsByClassName("btn showmore")[1].style.color="white";
        flagPortfolio=0;
        }
    }
    btnshowMore[2].onclick=function(){
        if(flagBlogs===0){
        document.getElementsByClassName("tabblogsdiv")[3].style.display="block";
        document.getElementsByClassName("btn showmore")[2].innerHTML="Show less";
        document.getElementsByClassName("btn showmore")[2].style.backgroundColor="white";
        document.getElementsByClassName("btn showmore")[2].style.color="#c4b0f4";
        flagBlogs=1;
        }else if(flagBlogs==1){
         document.getElementsByClassName("tabblogsdiv")[3].style.display="none";
        document.getElementsByClassName("btn showmore")[2].innerHTML="Show more";
        document.getElementsByClassName("btn showmore")[2].style.backgroundColor="#c4b0f4";
        document.getElementsByClassName("btn showmore")[2].style.color="white";
        flagBlogs=0;
        }
    }
}


btnfollow.onclick=function(){
    if(flagFollow===0){
    document.getElementById("followdrop").style.display="block";
    btnfollow.style.backgroundColor="white";
    btnfollow.style.color="#7a7aff";
    flagFollow=1;
    }else if(flagFollow===1){
     document.getElementById("followdrop").style.display="none";
    btnfollow.style.backgroundColor="#7a7aff";
    btnfollow.style.color="white";
    flagFollow=0;   
    }
  }

btnabout.onclick = function()
{
  if(flagAbout===0){
    sectionServices.style.display = "none";
    sectionPortfolio.style.display = "none";
    sectionBlogs.style.display = "none";
    sectionAbout.style.display = "block";
    sectionTimeline.style.display = "none";
    btnabout.style.backgroundColor="white";
    btnabout.style.color="#7a7aff";
    flagAbout=1;
    }else if(flagAbout===1){
    sectionServices.style.display = "block";
    sectionPortfolio.style.display = "block";
    sectionBlogs.style.display = "block";
    sectionAbout.style.display = "block";
    sectionTimeline.style.display = "block";
    btnabout.style.backgroundColor="#7a7aff";
    btnabout.style.color="white";
    flagAbout=0;   
    }   
}


btncontact.onclick=function(){
    if(flagContact===0){
    document.getElementsByClassName("contactdiv")[0].style.display="block";
    btncontact.style.backgroundColor="white";
    btncontact.style.color="#7a7aff";
    flagContact=1;
    }else if(flagContact===1){
    document.getElementsByClassName("contactdiv")[0].style.display="none";
    btncontact.style.backgroundColor="#7a7aff";
    btncontact.style.color="white";
    flagContact=0;   
    }
  }
  
  //instagram
 document.getElementsByClassName("fa fa-instagram")[0].onclick=function(){
      window.location.assign("https://www.instagram.com/jovin_c_john_");
 }
 document.getElementsByClassName("fa fa-instagram")[1].onclick=function(){
      window.location.assign("https://www.instagram.com/jovin_c_john_");
 }
 
//facebook
 document.getElementsByClassName("fa fa-facebook")[0].onclick=function(){
      window.location.assign("https://www.facebook.com/jovin.john.5855");
 }
 
//email
 document.getElementsByClassName("fa fa-envelope")[0].onclick=function(){
      window.location.assign("mailto:jovinjohn.developer@gmail.com");
 }
 document.getElementsByClassName("fa fa-envelope")[1].onclick=function(){
      window.location.assign("mailto:jovinjohn.developer@gmail.com");
 }

//github
 document.getElementsByClassName("fa fa-github")[0].onclick=function(){
      window.location.assign("https://www.github.com/tecrade");
 }

//whatsapp
 document.getElementsByClassName("fa fa-whatsapp")[0].onclick=function(){
      window.location.assign("https://wa.me/+918592066585");
 }
 document.getElementsByClassName("fa fa-whatsapp")[1].onclick=function(){
      window.location.assign("https://wa.me/+918592066585");
 }
//home
 document.getElementsByClassName("fa fa-home")[0].onclick=function(){
      home();
      window.scrollTo(0,0);
 }

document.getElementById("toogleMenu").onclick=function (){
     document.getElementById("toogleMenu").style.display="none";
     document.getElementById("closeMenu").style.display="block";
     document.getElementsByClassName("header")[0].style.display="block";
     document.getElementById("profdiv").style.display="none";
}

document.getElementById("closeMenu").onclick=function (){
     document.getElementById("toogleMenu").style.display="block";
     document.getElementById("closeMenu").style.display="none";
     document.getElementsByClassName("header")[0].style.display="none";
     document.getElementById("profdiv").style.display="block";
}

document.getElementsByClassName("btn followdropbtn")[0].onclick=function(){
  email=document.getElementById("subbox1").value;
  console.log(email);
  if(validEmail(email)==="valid"){
    document.getElementsByClassName("btn followdropbtn")[0].innerHTML="following";
    btnfollow.innerHTML="following";
    document.getElementById("subbox1").value=null;
    document.getElementById("subbox1").placeholder="Subscribed";
    ///////////
    document.getElementsByClassName("btn subbtn")[0].innerHTML="Subscribed";
    document.getElementById("subbox2").value=null;
    document.getElementById("subbox2").placeholder="Subscribed";
    subscribe="true";
  }else{
    document.getElementById("subbox1").value=null;
    document.getElementById("subbox1").placeholder="*Invalid Email";
}
}

document.getElementsByClassName("btn subbtn")[0].onclick=function(){
  let email=document.getElementById("subbox2").value;
  console.log(email);
  if(validEmail(email)==="valid"){
    document.getElementsByClassName("btn subbtn")[0].innerHTML="Subscribed";
    document.getElementById("subbox2").value=null;
    document.getElementById("subbox2").placeholder="Subscribed";
   //////////
    document.getElementsByClassName("btn followdropbtn")[0].innerHTML="following";
    btnfollow.innerHTML="following";
    document.getElementById("subbox1").value=null;
    document.getElementById("subbox1").placeholder="Subscribed";
    subscribe="true";
  }else{
    document.getElementById("subbox2").value=null;
    document.getElementById("subbox2").placeholder="*Invalid Email";
}
}



