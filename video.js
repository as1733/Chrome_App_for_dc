
/* variable declaration*/
var socket=new WebSocket("wss://192.168.118.21:1310");//lan:.....>>>>>"wss://192.168.118.26:1010
while(socket.readyState==="CONNECTING"){alert();};
var url=location.href;
var chatarea=document.getElementById("chats");
var  roomid=document.getElementById("roomid");
var userid=document.getElementById("userid");
var sendMsg=document.getElementById("chatbtn");

{

}
var password=null;
var pairedwith;
var RTCPeerConnection=webkitRTCPeerConnection;
var servers=null;
var mediabtton=document.getElementById("mediabutton")
var stream=null;
var dccaller;
var rtcsending={};
var rtcrec;
var media=document.getElementById("transmission");
media.style.display="inline";
var info={};
chatarea.scrollTop=chatarea.scrollHeight;
var createroomBtn=document.getElementById("createroom");
var joinroomBtn=document.getElementById("joinroom");
var sessiondetails={room:0,username:0,media:0,join:0};
{
    dcparams={name:null,room:null};

    if(url.indexOf("params")!=-1) {
        {
            var dcparams = {
                name: url.slice(url.indexOf("name") + 5, url.indexOf('&')),
                room: url.slice(url.indexOf("roomname") + 9)
            };
        }
    }

    if(dcparams.name!=null){startCameraFeed();roomid.value=dcparams.room;
        userid.value=dcparams.name;
        dccaller=setInterval(function(){if(socket.readyState===1){clearInterval(dccaller);};joiningNow();},200);
    };


}
/* end of declarartions*/


/*button click handling*/
mediabtton.onclick=function(){startCameraFeed();};
sendMsg.onclick=sendChat;
createroomBtn.onclick=registrationBtnClick;
joinroomBtn.onclick=joiningNow;
/*end of click handling */


{
    var privaterom = document.getElementById('privateroom');
    privaterom.onchange = function() {
        console.log(privaterom);
        if (privaterom.checked) {
            password= prompt("enter the password for the room.");
        } else {
            alert("its a public room anyone can enter this.");
        }
    }



}


/* functionssss  */

var dc_api=function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

function registrationBtnClick(){
    startCameraFeed();
    var dcpassword=prompt("Enter your dcHUB password");
    info.roomid=roomid.value;
    info.username=userid.value;
    var packet={username:info.username,roomid:info.roomid,action:"Create",privacy:password,dcpass:dcpassword};



    socket.send(JSON.stringify(packet));

};
function joiningNow(){var c=0;
    {var dcp=prompt("DC password");

        /*	mandatory: {
         chromeMediaSource: 'screen',
         maxWidth: 1280,
         maxHeight: 720
         }*/
        var params={audio:true,video:{ width: 480, height: 320 }};
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia(params, function (s) {
            document.getElementById("Myvideo").src = window.URL.createObjectURL(s);
            document.getElementById("Myvideo").muted=true;
            console.log("VideoFeed Started");
            stream = s;
            console.log("Stream is added to global "+stream);
            console.log(stream);

        }, function (e) {
            console.log("Error in aceesing camera", e);
        });





        ;c++;}

    var joinrequest={rid:roomid.value,username:userid.value,action:"joining",privacy:password,dcpass:dcp};
    console.log("Joining the Room");
    var t=JSON.stringify(joinrequest);
    socket.send(t);


};
function startCameraFeed(){
    var params={audio:true,video:{ width: 480, height: 320 }};
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia(params, function (s) {
        document.getElementById("Myvideo").src = window.URL.createObjectURL(s);
        document.getElementById("Myvideo").muted=true;
        console.log("VideoFeed Started");
        stream = s;
        console.log("Stream is added to global "+stream);
        console.log(stream);
    }, function (e) {
        console.log("Error in aceesing camera", e);
    });

};
function sendChat(){var msg=document.getElementById("chatmsg").value;
    var oringinated=userid;
    var meta={action:"chat",room:roomid.value,user:userid.value,msg:msg};
    console.log(meta);
    socket.send(JSON.stringify(meta));

};
/* functionsss*/




/*replies handling*/
socket.onmessage=function(data1){
    console.log(data1);
    var data=JSON.parse(data1.data);
    if(data.action==="chat")
    {
        var msg="<"+data.userh+"> "+""+data.msg;
        chatarea.value+="\n"+msg;
    }

    ;



    if(data.action==="Create")
    {if(data.execution===1)
    {  console.log("Room created successful");
        sessiondetails.room=1;
        sessiondetails.username=1;
        sessiondetails.join=1;
        document.getElementById("loginstatus").className = "label label-success";
        console.log(document.getElementById("loginstatus").class);
        document.getElementById("loginstatus").innerHTML = "Room Successfully Created Ask Your Friends to Join";
        document.getElementById("userid").disabled=true;


        roomid.disabled=true;
    }else if(data.execution===-1) {
        document.getElementById("loginstatus").className = "label label-danger";
        console.log(document.getElementById("loginstatus").class);
        document.getElementById("loginstatus").innerHTML = "room already exists please choose other name";
        sessiondetails.room = 0;
        sessiondetails.username = 0;
    }
    else if(data.execution===0){
        sessiondetails.room=0;
        sessiondetails.username=0;

        ////alert("RoomNotFound");
    }
    }
    if(data.action==="joining"){
        if(data.userstate===0 && data.roomidstate===0){
            document.getElementById("loginstatus").className = "label label-success";
            document.getElementById("loginstatus").innerHTML = "You have Successfuly Joined Room and you username is "+userid.value;
            document.getElementById("roomid").disabled=true;
            document.getElementById("userid").disabled=true;

            sessiondetails.join=1;
            sessiondetails.room=1;
            sessiondetails.username=1;
            // media.style.display="inline";
            var pairinglist=data.listOfUser;
            pairinglist.forEach(function (user) {
                if (user!=userid.value) {

                    console.log("lets create a rtc for  " + user);
                    rtcsending[user] = new RTCPeerConnection(servers);
                    console.log(rtcsending);
                    /*console.log(rtcsending[user]);*/
                    //we are now going to user rtcsending object to implement calling  starting
                    console.log("Stream is being added ");
                    console.log(stream);
                    rtcsending[user].addStream(stream);
                    console.log("Media Stream is add for rtc peer " + user);
                    console.log("Creating offer from " + userid.value + " to the user " + user);
                    console.log("************************************");
                    rtcsending[user].createOffer(function (description) {
                        console.log("********************xxxxxxxxxxxx*************");
                        console.log("Setting local description");
                        rtcsending[user].setLocalDescription(description);
                        var offersend = {
                            action: "Offer",
                            descrip: description,
                            rootuser: userid.value,
                            remoteuser: user,
                            rmid: roomid.value
                        };
                        //console.log("Sending the data to server " + offersend);
                        socket.send(JSON.stringify(offersend));
                        console.log(rtcsending[user]);
                    }, function (error) {
                        console.log("XXXXXXXXXXXXXXXERRORXXXXXXXXX");
                        console.log(error);
                    });
                    rtcsending[user].onicecandidate=function(event){
                        if(event.candidate){console.log("ICE candidate  "+user);
                            var ices={action:"ice",rid:roomid.value,ice:event.candidate,origin:userid.value,destination:user};
                            // console.log("Sending ICE "+JSON.stringify(ices));
                            socket.send(JSON.stringify(ices));


                        }
                    };
                    rtcsending[user].onaddstream=function (event){////alert("CVideo Mila chutiya");
                        var x=document.createElement("VIDEO");
                        x.setAttribute("src",window.URL.createObjectURL(event.stream));
                        x.setAttribute("width","320");
                        x.setAttribute("height","240");
                        x.setAttribute("id",user);
                        x.setAttribute("autoplay",true);
                        document.getElementById("sss").appendChild(x);
                        //  document.body.appendChild(x);
                    };
                }
            });






        }else if(data.userstate===2){
            document.getElementById("loginstatus").className = "label label-danger";
            document.getElementById("loginstatus").innerHTML = "The username for was already taken in the room";



        }
        else if(data.roomidstate===1){
            document.getElementById("loginstatus").className = "label label-danger";
            document.getElementById("loginstatus").innerHTML = "The Room was not found";


        }
        else if(data.userstate===3)
        {alert ("Incorrect Password");

        }
    }
    if(data.action==="Offer"){
        console.log("the user -- "+data.remoteuser+"answer will be sent to "+data.rootuser);
        console.log("XXXXXXXXXX*******XXXXXX*******XXXXXXX");

        rtcsending[data.rootuser]=new RTCPeerConnection(servers);
        rtcsending[data.rootuser].addStream(stream);
        rtcsending[data.rootuser].onicecandidate=function(event){
            //  alert("New Edit");
            if(event.candidate){console.log(data.remoteuser+"is sending ICE candidate for  "+data.rootuser);
                var ices={action:"ice",rid:roomid.value,ice:event.candidate,origin:userid.value,destination:data.rootuser};
                // console.log("Sending ICE "+JSON.stringify(ices));
                socket.send(JSON.stringify(ices));


            }
        };


        rtcsending[data.rootuser].onclose=function(e){alert("Dissconnected"+data.rootuser);};


        rtcsending[data.rootuser].onaddstream=function(event){//alert("Got the stream");
            var x=document.createElement("VIDEO");
            x.setAttribute("src",window.URL.createObjectURL(event.stream));
            x.setAttribute("id",data.rootuser);
            x.setAttribute("width","320");
            x.setAttribute("height","240");

            x.setAttribute("autoplay",true);
            document.body.appendChild(x);
        };
        rtcsending[data.rootuser].setRemoteDescription(data.descrip);
        //alert("Remote description sett");

        console.log(rtcsending);
        rtcsending[data.rootuser].createAnswer(function(des){
            rtcsending[data.rootuser].setLocalDescription(des);
            //alert("Local description sett");
            var replyy={to:data.rootuser,from:userid.value,descrip:des,action:"answer",rid:roomid.value};
            console.log("this is reply for .createanswer");
            console.log(replyy);
            //alert("Old user complete");
            socket.send(JSON.stringify(replyy));
            console.log("This is old user see the rtc variable use it to set ice ");
            console.log(rtcsending);

        },function (error){console.log("RTC answer ERROR");} );

    }
    if(data.action==="answer"){
        var t=data.from;
        if(data.to!=data.from){
            // alert("completeing rtc sessions");
            console.log(rtcsending);//alert();
            rtcsending[t].setRemoteDescription(data.descrip);
            rtcsending[t].onicecandidate=function(event){
                if(event.candidate){
                    //  alert(data.to+"I ahve ice candidate too u shold send it to "+data.from);
                }
            };
            console.log("RTC is set in new user by name of "+t);
            console.log("****______****");
            console.log(rtcsending);}
    }


    if(data.action==="ice"){
        var t=data.origin;
        {
            console.log("Setting ICE from "+data.origin+" I am seeting --- "+data.destination);
            console.log(t);
            console.log("XXXXXXXXOOOOOOXXXXXXOOOOOOOXXXXXXXOOOOOOOXXXXXXX");
            rtcsending[t].addIceCandidate(new RTCIceCandidate(data.ice));

            console.log("****ADded the ice candidate****");
            console.log(rtcsending[t]);}

        console.log("ICE should be set for "+t);
        console.log("XXXXXXXXOOOOOOXXXXXXOOOOOOOXXXXXXXOOOOOOOXXXXXXX");
    }
    if(data.action==="listofactive"){
        var rm=data.roomnames;
        var nm=data.noofusers;
        document.getElementById("activerooms").innerHTML="";

        while(rm.length!=0) { //console.log("ROom - "+rm.pop()+" has "+nm.pop());
            var ls=document.getElementById("activerooms");

            var r=document.createElement("li");
            r.className="list-group-item";
            r.appendChild(document.createTextNode((rm.pop())));
            var sp=document.createElement("span");
            sp.className="badge";var kk=nm.pop();
            sp.appendChild(document.createTextNode(kk));
            r.appendChild(sp);
            ls.appendChild(r);
        }

    } if(data.action==="reomvedUser")
    {var remove=document.getElementById(data.username);
        remove.parentNode.removeChild(remove);

    }



};

var repeat_cals= setInterval(function(){
    socket.send(JSON.stringify({action:"listofactive"}));
},3000);



