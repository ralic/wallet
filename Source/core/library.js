/*
 * @project: TERA
 * @version: Development (beta)
 * @copyright: Yuriy Ivanov 2017-2018 [progr76@gmail.com]
 * @license: Not for evil
 * GitHub: https://github.com/terafoundation/wallet
 * Twitter: https://twitter.com/terafoundation
 * Telegram: https://web.telegram.org/#/im?p=@terafoundation
*/

var fs = require('fs');
const os = require('os');
require("./constant.js");
if(global.USE_PARAM_JS)
{
    var PathParams = GetCodePath("../extern-run.js");
    if(fs.existsSync(PathParams))
        try
        {
            require(PathParams);
        }
        catch(e)
        {
            console.log(e);
        }
}
require("./log.js");
global.BufLib = require("../core/buffer");
require('../HTML/JS/sha3.js');
require('../HTML/JS/coinlib.js');
Number.prototype.toStringZ = function (count)
{
    var strnum = this.toString();
    if(strnum.length > count)
        count = strnum.length;
    else
        strnum = "0000000000" + strnum;
    return strnum.substring(strnum.length - count, strnum.length);
};
String.prototype.right = function (count)
{
    if(this.length > count)
        return this.substr(this.length - count, count);
    else
        return this.substr(0, this.length);
};

function ReadUintFromArr(arr,len)
{
    if(len === undefined)
    {
        len = arr.len;
        arr.len += 6;
    }
    var value = (arr[len + 5] << 23) * 2 + (arr[len + 4] << 16) + (arr[len + 3] << 8) + arr[len + 2];
    value = value * 256 + arr[len + 1];
    value = value * 256 + arr[len];
    return value;
};

function ReadUint32FromArr(arr,len)
{
    if(len === undefined)
    {
        len = arr.len;
        arr.len += 4;
    }
    var value = (arr[len + 3] << 23) * 2 + (arr[len + 2] << 16) + (arr[len + 1] << 8) + arr[len];
    return value;
};

function ReadUint16FromArr(arr,len)
{
    if(len === undefined)
    {
        len = arr.len;
        arr.len += 2;
    }
    var value = (arr[len + 1] << 8) + arr[len];
    return value;
};

function WriteUintToArr(arr,Num)
{
    var len = arr.length;
    arr[len] = Num & 0xFF;
    arr[len + 1] = (Num >>> 8) & 0xFF;
    arr[len + 2] = (Num >>> 16) & 0xFF;
    arr[len + 3] = (Num >>> 24) & 0xFF;
    var NumH = Math.floor(Num / 4294967296);
    arr[len + 4] = NumH & 0xFF;
    arr[len + 5] = (NumH >>> 8) & 0xFF;
};

function WriteUintToArrOnPos(arr,Num,Pos)
{
    arr[Pos] = Num & 0xFF;
    arr[Pos + 1] = (Num >>> 8) & 0xFF;
    arr[Pos + 2] = (Num >>> 16) & 0xFF;
    arr[Pos + 3] = (Num >>> 24) & 0xFF;
    var NumH = Math.floor(Num / 4294967296);
    arr[Pos + 4] = NumH & 0xFF;
    arr[Pos + 5] = (NumH >>> 8) & 0xFF;
};

function WriteUint32ToArr(arr,Num)
{
    var len = arr.length;
    arr[len] = Num & 0xFF;
    arr[len + 1] = (Num >>> 8) & 0xFF;
    arr[len + 2] = (Num >>> 16) & 0xFF;
    arr[len + 3] = (Num >>> 24) & 0xFF;
};

function WriteUint32ToArrOnPos(arr,Num,Pos)
{
    arr[Pos] = Num & 0xFF;
    arr[Pos + 1] = (Num >>> 8) & 0xFF;
    arr[Pos + 2] = (Num >>> 16) & 0xFF;
    arr[Pos + 3] = (Num >>> 24) & 0xFF;
};

function WriteUint16ToArrOnPos(arr,Num,Pos)
{
    arr[Pos] = Num & 0xFF;
    arr[Pos + 1] = (Num >>> 8) & 0xFF;
};

function WriteArrToArr(arr,arr2,ConstLength)
{
    var len = arr.length;
    for(var i = 0; i < ConstLength; i++)
    {
        arr[len + i] = arr2[i];
    }
};

function WriteArrToArrOnPos(arr,arr2,Pos,ConstLength)
{
    for(var i = 0; i < ConstLength; i++)
    {
        arr[Pos + i] = arr2[i];
    }
};

function WriteArrToArrHOnPos(arr,arr2,Pos,ConstLength)
{
    for(var i = 0; i < ConstLength; i++)
    {
        arr[Pos + i] |= (arr2[i] << 8);
    }
};

function ConvertBufferToStr(Data)
{
    for(var key in Data)
    {
        var item = Data[key];
        if(item instanceof Buffer)
        {
            Data[key] = GetHexFromArr(item);
        }
        else
            if(typeof item === "object")
                ConvertBufferToStr(item);
    }
};

function CopyObjValue(obj,num)
{
    if(num && num > 5)
        return obj;
    var ret = {};
    for(var key in obj)
    {
        var val = obj[key];
        if((typeof val === "object") && !(val instanceof Buffer) && !(val instanceof ArrayBuffer) && !(val instanceof Array))
            val = CopyObjValue(val, num + 1);
        ret[key] = val;
    }
    return ret;
};

function CopyArr(arr1)
{
    var arr2 = [];
    if(arr1)
        for(var i = 0; i < arr1.length; i++)
            arr2[i] = arr1[i];
    return arr2;
};
global.ReadUint32FromArr = ReadUint32FromArr;
global.ReadUintFromArr = ReadUintFromArr;
global.ReadUint16FromArr = ReadUint16FromArr;
global.WriteUintToArr = WriteUintToArr;
global.WriteUint32ToArr = WriteUint32ToArr;
global.WriteUint32ToArrOnPos = WriteUint32ToArrOnPos;
global.WriteUint16ToArrOnPos = WriteUint16ToArrOnPos;
global.WriteUintToArrOnPos = WriteUintToArrOnPos;
global.WriteArrToArr = WriteArrToArr;
global.WriteArrToArrOnPos = WriteArrToArrOnPos;
global.WriteArrToArrHOnPos = WriteArrToArrHOnPos;
global.ConvertBufferToStr = ConvertBufferToStr;
global.CopyObjValue = CopyObjValue;
global.CopyArr = CopyArr;
global.ParseNum = ParseNum;

function ParseNum(a)
{
    var Num = parseInt(a);
    if(!Num)
        Num = 0;
    if(isNaN(Num))
        Num = 0;
    if(Num < 0)
        Num = 0;
    return Num;
};
global.DelDir = function (Path)
{
    if(Path.substr(Path.length - 1, 1) === "/")
        Path = Path.substr(0, Path.length - 1);
    if(fs.existsSync(Path))
    {
        var arr = fs.readdirSync(Path);
        for(var i = 0; i < arr.length; i++)
        {
            var name = Path + "/" + arr[i];
            if(fs.statSync(name).isDirectory())
            {
                DelDir(name);
            }
            else
            {
                if(name.right(9) == "const.lst")
                    continue;
                if(name.right(7) == "log.log")
                    continue;
                fs.unlinkSync(name);
            }
        }
    }
};
global.SliceArr = function (arr,start,end)
{
    var ret = [];
    for(var i = start; i < end; i++)
    {
        ret[i - start] = arr[i];
    }
    return ret;
};
global.RandomValue = Math.floor(123 + Math.random() * 1000);
global.random = function (max)
{
    return Math.floor(Math.random() * max);
    RandomValue = (RandomValue * 63018038201 + 123) % 489133282872437279;
    var ret = 1.0 * RandomValue / 489133282872437279;
    if(max !== undefined)
        ret = Math.floor(ret * max);
    return ret;
};
global.AddrLevelArrFromBegin = function (arr1,arr2)
{
    var Level = 0;
    for(var i = 0; i < arr1.length; i++)
    {
        var a1 = arr1[i];
        var a2 = arr2[i];
        for(var b = 0; b < 8; b++)
        {
            if((a1 & 128) !== (a2 & 128))
                return Level;
            a1 = a1 << 1;
            a2 = a2 << 1;
            Level++;
        }
    }
    return Level;
};
global.AddrLevelArr = function (arr1,arr2)
{
    var Level = 0;
    for(var i = arr1.length - 1; i >= 0; i--)
    {
        var a1 = arr1[i];
        var a2 = arr2[i];
        for(var b = 0; b < 8; b++)
        {
            if((a1 & 1) !== (a2 & 1))
                return Level;
            a1 = a1 >> 1;
            a2 = a2 >> 1;
            Level++;
        }
    }
    return Level;
};
global.SaveToFile = function (name,buf)
{
    var fs = require('fs');
    var file_handle = fs.openSync(name, "w");
    fs.writeSync(file_handle, buf, 0, buf.length);
    fs.closeSync(file_handle);
};
global.LoadParams = function (filename,DefaultValue)
{
    try
    {
        if(fs.existsSync(filename))
        {
            var Str = fs.readFileSync(filename);
            if(Str.length > 0)
                return JSON.parse(Str);
        }
    }
    catch(err)
    {
        TO_ERROR_LOG("MAINLIB", 100, "Error in file:" + filename + "\n" + err);
    }
    return DefaultValue;
};
global.SaveParams = function (filename,data)
{
    SaveToFile(filename, Buffer.from(JSON.stringify(data, "", 4)));
};
global.StartTime = function ()
{
    global.TimeStart = GetCurrentTime();
};
global.FinishTime = function (Str)
{
    Str = Str || "";
    var TimeFinish = GetCurrentTime();
    var delta = TimeFinish - TimeStart;
    console.log(Str + " time: " + delta + " ms");
};
global.CompareItemBufFD = function (a,b)
{
    if(a.FD !== b.FD)
        return a.FD - b.FD;
    else
        return a.Position - b.Position;
};
global.CompareArr = function (a,b)
{
    for(var i = 0; i < a.length; i++)
    {
        if(a[i] !== b[i])
            return a[i] - b[i];
    }
    return 0;
};
global.CompareArr33 = function (a,b)
{
    for(var i = 0; i < 33; i++)
    {
        if(a[i] !== b[i])
            return a[i] - b[i];
    }
    return 0;
};
global.CompareItemHashSimple = function (a,b)
{
    if(a.hash < b.hash)
        return  - 1;
    else
        if(a.hash > b.hash)
            return 1;
        else
            return 0;
};
global.CompareItemHash = function (a,b)
{
    var hasha = a.hash;
    var hashb = b.hash;
    for(var i = 0; i < hasha.length; i++)
    {
        if(hasha[i] !== hashb[i])
            return hasha[i] - hashb[i];
    }
    return 0;
};
global.CompareItemHash32 = function (a,b)
{
    var hasha = a.hash;
    var hashb = b.hash;
    for(var i = 0; i < 32; i++)
    {
        if(hasha[i] !== hashb[i])
            return hasha[i] - hashb[i];
    }
    return 0;
};
global.CompareItemHASH32 = function (a,b)
{
    var hasha = a.HASH;
    var hashb = b.HASH;
    for(var i = 0; i < 32; i++)
    {
        if(hasha[i] !== hashb[i])
            return hasha[i] - hashb[i];
    }
    return 0;
};
global.CompareItemHash33 = function (a,b)
{
    var hasha = a.hash;
    var hashb = b.hash;
    for(var i = 0; i < 33; i++)
    {
        if(hasha[i] !== hashb[i])
            return hasha[i] - hashb[i];
    }
    return 0;
};
global.CompareItemHashPow = function (a,b)
{
    return CompareArr(a.hashPow, b.hashPow);
};
global.CompareItemTimePow = function (a,b)
{
    if(b.TimePow !== a.TimePow)
        return b.TimePow - a.TimePow;
    else
        return CompareArr(a.hashPow, b.hashPow);
};
global.LOAD_CONST = function ()
{
    var Count = 0;
    var constants = LoadParams(GetDataPath("const.lst"), {});
    if(constants)
    {
        for(var i = 0; i < CONST_NAME_ARR.length; i++)
        {
            var key = CONST_NAME_ARR[i];
            if(constants[key] !== undefined)
            {
                Count++;
                global[key] = constants[key];
            }
        }
    }
    return Count;
};
var WasStartSaveConst = false;

function SaveConst()
{
    var constants = {};
    for(var i = 0; i < CONST_NAME_ARR.length; i++)
    {
        var key = CONST_NAME_ARR[i];
        if(global[key] !== undefined)
            constants[key] = global[key];
    }
    SaveParams(GetDataPath("const.lst"), constants);
    WasStartSaveConst = false;
};
global.SAVE_CONST = function (bForce)
{
    if(bForce)
    {
        SaveConst();
    }
    else
    {
        if(!WasStartSaveConst)
            setTimeout(SaveConst, 10 * 1000);
        WasStartSaveConst = true;
    }
};
var ntpClient = require('ntp-client');

function CheckTime()
{
    ntpClient.getNetworkTime("pool.ntp.org", 123, function (err,NetTime)
    {
        if(err)
        {
            TO_ERROR_LOG("MAINLIB", 110, err);
            return ;
        }
        var curTime = new Date;
        global.DELTA_CURRENT_TIME = NetTime - curTime;
        if(isNaN(global.DELTA_CURRENT_TIME) || typeof global.DELTA_CURRENT_TIME !== "number")
            global.DELTA_CURRENT_TIME = 0;
        else
            if(Math.abs(global.DELTA_CURRENT_TIME) > 24 * 3600 * 1000)
                global.DELTA_CURRENT_TIME = 0;
        SAVE_CONST();
    });
    SAVE_CONST();
};
global.GetDeltaCurrentTime = function ()
{
    if(isNaN(global.DELTA_CURRENT_TIME) || typeof global.DELTA_CURRENT_TIME !== "number")
        global.DELTA_CURRENT_TIME = 0;
    return global.DELTA_CURRENT_TIME;
};
global.GetStrTimeUTC = function (now)
{
    if(!now)
        now = GetCurrentTime();
    var Str = "" + now.getUTCDate();
    Str = Str + "." + (1 + now.getUTCMonth());
    Str = Str + "." + now.getUTCFullYear();
    Str = Str + " " + now.getUTCHours();
    Str = Str + ":" + now.getUTCMinutes();
    Str = Str + ":" + now.getUTCSeconds();
    return Str;
};
global.GetStrOnlyTimeUTC = function (now)
{
    if(!now)
        now = GetCurrentTime();
    var Str;
    Str = "" + now.getUTCHours().toStringZ(2);
    Str = Str + ":" + now.getUTCMinutes().toStringZ(2);
    Str = Str + ":" + now.getUTCSeconds().toStringZ(2);
    return Str;
};

function GetSecFromStrTime(Str)
{
    var arr = Str.split(":");
    var Mult = 3600;
    var Sum = 0;
    for(var i = 0; i < arr.length; i++)
    {
        Sum += Mult * parseInt(arr[i]);
        Mult = Mult / 60;
    }
    return Sum;
};
global.GetSecFromStrTime = GetSecFromStrTime;
global.GetCurrentTime = function (Delta_Time)
{
    if(Delta_Time === undefined)
        Delta_Time = GetDeltaCurrentTime();
    var curTime = new Date;
    var Time = new Date(curTime - ( - Delta_Time));
    return Time;
};

function DateFromBlock(BlockNum)
{
    var Str;
    var now = new Date(FIRST_TIME_BLOCK + BlockNum * 1000);
    Str = now.toISOString();
    Str = Str.substr(0, Str.indexOf("."));
    Str = Str.replace("T", " ");
    return Str;
};
global.DateFromBlock = DateFromBlock;
var code_base = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7f\u0402\u0403\u201a\u0453\u201e\u2026\u2020\u2021\u20ac\u2030\u0409\u2039\u040a\u040c\u040b\u040f\u0452\u2018\u2019\u201c\u201d\u2022\u2013\u2014\ufffd\u2122\u0459\u203a\u045a\u045c\u045b\u045f\xa0\u040e\u045e\u0408\xa4\u0490\xa6\xa7\u0401\xa9\u0404\xab\xac\xad\xae\u0407\xb0\xb1\u0406\u0456\u0491\xb5\xb6\xb7\u0451\u2116\u0454\xbb\u0458\u0405\u0455\u0457\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f';
global.NormalizeName = function (Name)
{
    var Str = "";
    for(var i = 0; i < Name.length; i++)
    {
        var code = Name.charCodeAt(i);
        if(code >= 32)
            Str += code_base.charAt(code - 32);
    }
    return Str;
};
var glEvalMap = {};

function CreateEval(formula,StrParams)
{
    var Ret = glEvalMap[formula];
    if(!Ret)
    {
        eval("function M(" + StrParams + "){return " + formula + "}; Ret=M;");
        glEvalMap[formula] = Ret;
    }
    return Ret;
};
global.CreateEval = CreateEval;
var CPU_Count = os.cpus().length;

function GetCountMiningCPU()
{
    if(global.COUNT_MINING_CPU)
        return global.COUNT_MINING_CPU;
    else
    {
        return CPU_Count - 1;
    }
};
global.GetCountMiningCPU = GetCountMiningCPU;

function GrayConnect()
{
    if(global.NET_WORK_MODE && !NET_WORK_MODE.UseDirectIP)
        return 1;
    else
        return 0;
};
global.GrayConnect = GrayConnect;
if(!LOAD_CONST() && !global.POWPROCESS)
{
    CheckTime();
}
global.AUTO_COORECT_TIME = 1;
