function getIP(){
    $http.get({
        url: "http://clientapi.ipip.net/ip.php?a=location",
        handler: function(resp) {
          let ip = resp.data.ip
          let remote_addr = resp.data.remote_addr
          let loc = resp.data.loc
          $http.get({
            url: "http://myip.hk/",
            handler: function(resp) {
              let regex = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/
              let proxy = regex.exec(resp.data)[1]
              $http.get({
                url: "http://freeapi.ipip.net/" + proxy,
                handler: function(resp) {
                  $("proxy-ip").text = "# Proxy IP: " + proxy
                  $("proxy-location").text = "# Proxy Location: " + resp.data.join("")
                  $("ip").text = "# IP: " + ip
                  $("location").text = "# Location: " + loc
                }
              })
            }
          })  
        }
      })
}

function renderUI(){
    $ui.render({
        props: {
            title: "IP-helper"
        },
        views: [{
            type: "label",
            props: {
                id: "proxy-ip",
                align: $align.left,
                font: $font("bold", 14),
                text: "# Proxy IP: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo(5)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "proxy-location",
                align: $align.left,
                font: $font("bold", 14),
                text: "# Proxy Location: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("proxy-ip").bottom).offset(10)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "ip",
                align: $align.left,
                font: $font("bold", 14),
                text: "# IP: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("proxy-location").bottom).offset(15)
                make.left.right.equalTo(15)
            }
        }, {
            type: "label",
            props: {
                id: "location",
                align: $align.left,
                font: $font("bold", 14),
                text: "# Location: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("ip").bottom).offset(10)
                make.left.right.equalTo(15)
            }
        }]
    });
}

function main(){
    renderUI();
    $ui.toast("Loading...");
    getIP();
}

main();