var ws = io('https://websocket-limhenry.rhcloud.com:8443');

var slide = document.querySelector(".punch-viewer-content");

var url = "";

var shortID = "";

ws.on('connect', function () {
  shortID = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4); 
	ws.emit('createRoom', shortID);
	url = "Open this link in another device:\n" + "https://limhenry.xyz/slide/#" + shortID;

  chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showNotification',
    msg: url
  });

  var slideID = document.getElementById(':p').innerHTML.slice(6,-1)
  
});

ws.on('receiveaction', function(data){
	var slide = document.querySelector(".punch-viewer-content");
	slide.click();
  	var slideID = document.getElementById(':p').innerHTML.slice(6,-1)
  	ws.emit('updateSlideID', {room: shortID, slideID: slideID});
})

ws.on('changecolor', function(data){
  chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showNotification',
    msg: "You are ready to go!"
  });
  ws.emit('updateSlideID', {room: shortID, slideID: slideID});
})


chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    var domInfo = {
      total: url,
    };
    response(domInfo);
  }
});

