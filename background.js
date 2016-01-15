var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-57741199-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessage.addListener(function (msg, sender) {

    if ((msg.from === 'content') && (msg.subject === 'showNotification')) {
		chrome.notifications.create(
		    'id1',{   
		        type:"basic",
		        title:"Remote for Google Slides™",
		        message: msg.msg,
      			buttons: [{title: 'Help',iconUrl: "info.png"}],
		        iconUrl:"logo_128.png",
		        priority: 0
		    },
		    function() {} 
		);
  }
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		chrome.tabs.create({'url': chrome.extension.getURL('welcome.html')}, function(tab) {});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
		chrome.notifications.create(
		    'id1',{   
		        type:"basic",
		        title:"Remote for Google Slides™",
		        message: "Updated to the latest version! Hooray!",
		        iconUrl:"logo_128.png",
		        buttons: [{title: 'Help',iconUrl: "info.png"}],
		        priority: 0
		    },
		    function() {} 
		);
    }
});


chrome.notifications.onButtonClicked.addListener(function(){
  chrome.tabs.create({'url': chrome.extension.getURL('welcome.html')}, function(tab) {});
})

