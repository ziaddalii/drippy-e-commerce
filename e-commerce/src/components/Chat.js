import React, {useEffect} from 'react'
// import "../styles/chat.css"

function Chat() {
    useEffect(() => {
        (function(d, m){
            var kommunicateSettings = 
                {"appId":process.env.REACT_APP_KOMMUNICATE_APP_ID,"popupWidget":true,"automaticChatOpenOnNavigation":true,
             "onInit": function (){
                var css = "#launcher-svg-container img {padding: 7px; box-sizing:border-box;}";
                Kommunicate.customizeWidgetCss(css);            }
              };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, [])


  return (
    <div>
    </div>
  )
}

export default Chat


