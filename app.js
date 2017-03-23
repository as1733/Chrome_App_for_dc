/**
 * Created by as1733 on 22-03-2017.
 */
document.getElementById("VeiwNow").addEventListener("click",
recordClick,false

);

function recordClick(){
    chrome.desktopCapture.chooseDestopMedia(["screen","window"],accessToView);


};

function accessToView(){};