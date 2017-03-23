/*
{document.getElementById("VeiwNow").addEventListener("click",
    recordClick,false

);

function recordClick(){
    chrome.desktopCapture.chooseDesktopMedia(["screen","window"],accessToView);


};

function accessToView(id){
    console.log(id);
    var Obtained=id;
    navigator.webkitGetUserMedia({
        audio: false,
        video:{mandatory:{chromeMediaSource:"desktop",
                            chromeMediaSourceId:id  }
                            }
                 },startStream,function(e){console.log(e);});

};


var startStream=function (stream){
    console.log(stream);
    console.log(URL.createObjectURL(stream));

    document.getElementById("sharedScreen").src=URL.createObjectURL(stream);

    stream.onended=function(){console.log("ENDINSHARE");};
};


}*/

{
    function ab2str(buf) {
       var str= new TextDecoder("utf-8").decode(buf);
        return str;
    }

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0; i < str.length; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        console.log("Data to be sent Encoded");

        return buf;
    }
}//suppoting function ab2str and str2ab
//dc++ functions negotiations
{var key_generate = function(lock) {

    var bitschanger = function(bits) {
        return ((bits << 4) & 240) | ((bits >>> 4) & 15);
    };
    var charcor = function(b) {
        return (("..0.5.36.96.124.126.").indexOf("."+b+".") > 0) ?
        "/%DCN"+(0).toPrecision(4-b.toString().length).substr(2)+b+"%/" :
            String.fromCharCode(b)
            ;
    };

    var key = charcor(bitschanger(
        lock.charCodeAt(0) ^ lock.charCodeAt(-1) ^ lock.charCodeAt(-2) ^ 5
    ));
    for (var i=1; i<lock.length; i++) {
        key += charcor(bitschanger(lock.charCodeAt(i) ^ lock.charCodeAt(i - 1)));
    }
    return key;
};
 var nmdc_escape = function(str) {
        return (''+str).length ? (''+str).
        replace(/&/g,'&amp;').replace(/\|/g,'&#124;').replace(/\$/g,'&#36;') :
            ' ';
    };



}



var globx;
var socket_id=null;
var sendData=function (socketNum,data){

    console.log("Sending Data -> \n"+data);
    chrome.sockets.tcp.send(socketNum,str2ab(data), function (sendInfo){console.log();});

};
var getData=function (gotData){
    console.log("Received Data ");
    globx = ab2str(gotData.data);
    console.log("Socket Id ->"+gotData.socketId);
    console.log("Rawdata++++->>>>>");
    {
        console.log(ab2str(gotData.data));
    }
    var cmd = globx.split(' ')[0];
    var rem = globx.substr(cmd.length + 1);
    console.log("Command Received "+cmd);
    if(globx.includes('$Lock')){console.log("Key wanted");
        var key=key_generate(rem);
        console.log(""+key);
        console.log("sendingKey");
        var query='$Supports NoGetINFO UserCommand UserIP2|'+'$Key '+key+'|'+'$ValidateNick '+'avsbot'+'|';
        console.log("sendingKey->"+query);
        sendData(socket_id,(query));
    }

    if(globx.includes('$Hello') && globx.includes('avsbot')){
        console.log("Sending $myINFO");
        var query='$MyINFO $ALL avsbot <++ V:0.673,M:P,H:0/1/0,S:2>$ $LAN(T3)0x31$example@example.com$11221221212234$\|';
        sendData(socket_id,query);
       // sendData(socket_id,'$GetNickList|');

    }



}

function connection(){chrome.sockets.tcp.create({}, function(createInfo) {
    chrome.sockets.tcp.connect(createInfo.socketId,
        "192.168.110.222", 411, function() {
        socket_id=createInfo.socketId;
            console.log("connected");
            console.log("Socket _ ID ->"+socket_id);


        });
});};
chrome.sockets.tcp.onReceive.addListener(getData);

chrome.sockets.tcp.onReceiveError.addListener(function (e){console.log("**********PAUSED********");console.log(e);});



{
    document.getElementById("connect").addEventListener("click",
        connection, false
    );
    document.getElementById("send").addEventListener("click",
        sendData(socket_id, "Aditya"), false
    );
}//html events and buttons

