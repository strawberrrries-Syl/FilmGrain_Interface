// 实现按键控制 + 数据读取、分析

var changePics = false;
var Name;
var selectorFlag = false;;
var testStart = false;

var droppedPairs = "";

// key control
var keyPressed;
// json文件
// noise: none, fg, g
// filter: none, lp, unsh
// N, Lp, Un
// var jsonPics = getAllJData();

var jsonPicsN = getNData();
var jsonPicsB = getBData();
var jsonPicsS = getSData();
var jsonPicsW = getWData();

const offSet = jsonPicsN.length;

var jsonPicddd = Array.prototype.concat.call(
    jsonPicsN,
    jsonPicsB,
    jsonPicsS,
    jsonPicsW,
);

var jsonPics = jsonPicddd;

var pairsArrayC = combination(jsonPicddd, offSet);
var pairsArrayA = arrangement(jsonPicddd, offSet);


var offsetArray = [jsonPicsN.length, jsonPicsN.length+jsonPicsB.length, jsonPicsN.length+jsonPicsB.length+jsonPicsS.length, jsonPics.length]
// console.log(offsetArray);
var pairsArrayS = selecterPartRandom(jsonPicddd, offsetArray);
// console.log(pairsArrayS);

var pairs = pairsArrayS;
var ans = new Array(pairs.length).fill(0);

// pairs = shuffle(pairs, 30); // 打乱十次


var pairs_idx = 0;
var l_idx = 0;
var r_idx = 1;

var dayToday = new Date();

console.log("Today: " + dayToday.getMonth() + "/" + dayToday.getDate() + "/" + dayToday.getFullYear());

var out = "";

function outPut() {
    for(var idxOut = 0; idxOut < pairs.length; idxOut++)
    {
        var pic1 = jsonPics[pairs[idxOut][0]];
        var pic2 = jsonPics[pairs[idxOut][1]];
        // out = out + "CHOSE " + jsonPics[ans[idxOut]].name + "," + pic1.name + "," + pic2.name + "\n";

        var ctype = "NoAnswer";

        if(ans[idxOut]-1 >= 0)
        {
            var cpair = pairs[idxOut];
            var cpic = cpair[ans[idxOut]-1]
            var chose = jsonPics[cpic].name.split('/');
            ctype = chose[0] == "pngPics" ? "Original": "FilmGrain";
        }
        console.log(ans[idxOut]-1 + ", " + chose);
        var ctype = ans[idxOut] == 0 ? "NoAnswer" : (chose[0] == "pngPics" ? "Original": "FilmGrain");
        // var ctype = chose[0] == "pngPics" ? "Original" : (chose[0] == "fgPics" ? "FilmGrain" : "NoAnswer"); 

        out = out + ctype + " " + pic1.name + "   " + pic2.name + "\n";
    }
}

function main() {

}

function selector() {
    if(!selectorFlag && !testStart)
    {
        selectorFlag = true;
        document.getElementById("selectorButton").setAttribute("style", 'background-color: #a44141;');
        document.getElementById("selectorButton").innerHTML = "SELECTOR MODE ON";
        pairs = pairsArrayS;
        ans = new Array(pairs.length).fill(0);
        
    } else if(selectorFlag && !testStart)   // regular
    {
        selectorFlag = false;
        document.getElementById("selectorButton").setAttribute("style", 'background-color: #333333;');
        document.getElementById("selectorButton").innerHTML = "SELECTOR MODE OFF";
        pairs = pairsArrayS;
        ans = new Array(pairs.length).fill(0);
    }
}

function dropThis() {
    var p1name = jsonPics[pairs[pairs_idx][0]].name.split('/');
    var dname = p1name[0] == "fgPics" ? jsonPics[pairs[pairs_idx][0]].name : jsonPics[pairs[pairs_idx][1]].name
    droppedPairs = droppedPairs + dname + "\n"
    document.getElementById("dropB").setAttribute("style", 'background-color: #a44141;');
    document.getElementById("dropB").innerHTML = "Dropped";
    console.log(droppedPairs)
}

function startTest() {
    testStart = true;
    pairs = shuffle(pairs, 1000); // 打乱十次
    console.log(pairs);
    Name = document.getElementById("name").value;
    document.getElementById("greetings").innerHTML = "Test for " + Name + "    ";

    if(!selectorFlag)
    {
        console.log(Name);
    } else {
        console.log("------------  SELECTOR MODE  ------------");
    }

    document.getElementById("nameForm").style = "display: none";
    document.getElementById("istrct").style = "display: none";
    // document.getElementById("selector").style = "display: none";

    document.getElementById("LeftPic").setAttribute("src", jsonPics[pairs[pairs_idx][0]].name);
    document.getElementById("RigntPic").setAttribute("src", jsonPics[pairs[pairs_idx][1]].name);


    // document.getElementById("test_page").style = "displey:block";
    document.getElementById("LeftPic").style = "displey:block";
    document.getElementById("RigntPic").style = "displey:block";
    document.getElementById("process").style = "displey:block";

    if(selectorFlag)
    {
        document.getElementById("dropB").style = "displey:block";
        document.getElementById("leftLabel").style = "displey:block";
        document.getElementById("rightLabel").style = "displey:block";
        document.getElementById("leftLabel").innerHTML = jsonPics[pairs[pairs_idx][0]].name;
        document.getElementById("rightLabel").innerHTML = jsonPics[pairs[pairs_idx][1]].name;
    }
    
    document.getElementById("testBody").setAttribute("style", 'background-image: none;');

    window.addEventListener("keydown", myKeyDown, false);
    window.addEventListener("keyup", myKeyUp, false);
    document.getElementById("process").innerHTML = (pairs_idx+1) + " / " + pairs.length;
}

function shuffle(arr, times) {

    var lenA = arr.length - 1;
    var i = 0;

    while(i < times)
    {
        var pos1 = Math.round(Math.random()*lenA);
        var pos2 = Math.round(Math.random()*lenA);
        var curr = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = curr;
        i++;
    }
    return arr;
}

function end() {
    console.log(ans);
    outPut();
    // console.log(out);

    // if(!selectorFlag)
    {
        var blob = new Blob([out], {type: "text/plain"});
        var anchor = document.createElement("a");
        anchor.download = "rstFor" + Name + ".txt"
        anchor.href = window.URL.createObjectURL(blob);
        anchor.target = "_blank";
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
    

    if(selectorFlag)
    {
        var blob1 = new Blob([droppedPairs], {type: "text/plain"});
        var anchor = document.createElement("a");
        anchor.download = "DroppedList" + dayToday.getMonth() + dayToday.getDate() + ".txt"
        anchor.href = window.URL.createObjectURL(blob1);
        anchor.target = "_blank";
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    window.alert("Thanks for your time!");
}

{
//===================Mouse and Keyboard event-handling Callbacks
function myKeyDown(kev) {
    console.log("--kev.code:", kev.code, "\t\t--kev.key:", kev.key,
        "\n--kev.ctrlKey:", kev.ctrlKey, "\t--kev.shiftKey:", kev.shiftKey,
        "\n--kev.altKey:", kev.altKey, "\t--kev.metaKey:", kev.metaKey);

    keyPressed = kev.key;
    switch (kev.code) {
        case "KeyP":
            console.log("Pause/unPause!\n");          
            break;
        //----------------Arrow keys------------------------
        case "ArrowLeft":
            console.log('←');
            ans[pairs_idx] = 1;
            console.log(ans);
            document.getElementById("css").href = "left.css";
            break;
        case "ArrowRight":
            console.log('→');
            ans[pairs_idx] = 2;
            console.log(ans);
            document.getElementById("css").href = "right.css";
            break;
        case "ArrowUp":
            
            document.getElementById("css").href = "mystyle.css";

            if(selectorFlag)
            {
                document.getElementById("dropB").setAttribute("style", 'background-color: #57595a;');
                document.getElementById("dropB").innerHTML = "Drop This Image";
            }

            if(pairs_idx - 1 >= 0)
            {
                pairs_idx--;
                var curr_i = pairs[pairs_idx];
                document.getElementById("LeftPic").setAttribute("src", jsonPics[curr_i[0]].name);
                document.getElementById("RigntPic").setAttribute("src", jsonPics[curr_i[1]].name);
                if(pairs_idx!=pairs.length)
                {
                  document.getElementById("endButton").style = "display:none";  
                }

                if(selectorFlag)
                {
                    document.getElementById("leftLabel").innerHTML = jsonPics[curr_i[0]].name;
                    document.getElementById("rightLabel").innerHTML = jsonPics[curr_i[1]].name;
                }
            }
            console.log(pairs_idx);
            document.getElementById("process").innerHTML = (pairs_idx + 1) + " / " + pairs.length;

            break;

        case "ArrowDown":
            
            document.getElementById("css").href = "mystyle.css";
            

            if(selectorFlag)
            {
                document.getElementById("dropB").setAttribute("style", 'background-color: #57595a;');
                document.getElementById("dropB").innerHTML = "Drop This Pair";
            }
            

            if(pairs_idx + 1 < pairs.length)
            {
                pairs_idx++;
                var curr_i = pairs[pairs_idx];
                document.getElementById("LeftPic").setAttribute("src", jsonPics[curr_i[0]].name);
                document.getElementById("RigntPic").setAttribute("src", jsonPics[curr_i[1]].name);

                if(selectorFlag)
                {
                    document.getElementById("leftLabel").innerHTML = jsonPics[curr_i[0]].name;
                    document.getElementById("rightLabel").innerHTML = jsonPics[curr_i[1]].name;
                }
                
            } else if(pairs_idx == pairs.length - 1)
            {
                document.getElementById("endButton").style = "display:block";
            } 

            console.log(pairs_idx);
            document.getElementById("process").innerHTML = (pairs_idx+1) + " / " + pairs.length;
            
            break;
        default:
            console.log("UNUSED!");
            break;
    }
}

function myKeyUp(kev) {
    //===============================================================================
    // Called when user releases ANY key on the keyboard; captures scancodes well
    console.log('myKeyUp()--keyCode=' + kev.keyCode + ' released.');
}
}
