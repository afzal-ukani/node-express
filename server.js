var express = require("express")
var app = express()

var HTTP_PORT = 8000 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.get("/", (req, res, next) => {
    res.json({"statusCode":"200"})
});

function splitStr(str, sep) { 
    var arr = str
    if (sep !== "") {
        arr = str.toString().split(sep)
        for(var i = arr.length - 1; i >= 0; i--) {
            if(arr[i] === "") {
                arr.splice(i, 1);
            }
        }
    }
    else
    {
        var ix = 0
        var arr = []
        newstr = str.toString()
        ix = newstr.indexOf('0000')
        arr.push(newstr.substring(0, ix + 4))
        newstr = newstr.substring(ix + 4)
    
        ix = newstr.indexOf('000')
        arr.push(newstr.substring(0, ix + 3))
        newstr = newstr.substring(ix + 3)
    
        arr.push(newstr)
    }

    var newArr = []
    for(var j = arr.length - 1; j >= 0; j--) {
        switch (j) {
            case 0:
                newArr.push({
                    key: "firstname",
                    value: arr[j]
                })
                break;
            case 1:
                newArr.push({
                    key: "lastname",
                    value: arr[j]
                })
                break;
            case 2:
                newArr.push({
                    key: "clientid",
                    value: arr[j]
                })
                break;
          }
    }
    return newArr; 
}

app.post("/api/v1/parse/:data", (req, res, next) => {
    var params = [req.params.data]
    if (params) {
        res.json({"statusCode": 200, data: splitStr(params, '')})
    }
});

app.post("/api/v2/parse/:data", (req, res, next) => {
    var params = [req.params.data]
    if (params) {
        res.json({"statusCode": 200, data: splitStr(params, '0')})
    }
    
});

app.use(function(req, res){
    res.status(404);
});

