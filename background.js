/**
 * Created by as1733 on 21-03-2017.
 */
/*
chrome.runtime.onMessage.addListener(function(response,sender,sendresponse){alert(response);

    //alert("Got msg in background apis");
    console.log(sender);
    console.log(sender.tab);

});

*/

chrome.app.runtime.onLaunched.addListener(function(){
    console.log("clicked");
    chrome.app.window.create("helloworld.html",{
                 bounds:{width:600,height:800}
                                        }
                            );

});

