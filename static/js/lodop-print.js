/**
 * 是否安装菜鸟组件
 * @returns {boolean}
 */
function isInstallCaiNiaoLodop() {
    var caiNiaoLODOP = initCaiNiaoPrint(document.getElementById('CaiNiaoPrint_OB_install'), document.getElementById('CaiNiaoPrint_EM_install'));
    if ((caiNiaoLODOP == null) || (typeof(caiNiaoLODOP.VERSION) == "undefined")) {
        return false;
    }
    return true;
}

// 使用CreatedOKCNPrint7766缓存菜鸟print
var CreatedOKCNPrint7766 = null;

/**
 * 本函数根据浏览器类型决定采用哪个页面元素作为CNPrint对象：
 * IE系列、IE内核系列的浏览器采用oOBJECT，
 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
 * 如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
 * @param oOBJECT
 * @param oEMBED
 * @returns {*}
 */
function initCaiNiaoPrint(oOBJECT, oEMBED) {
    var CNPrint;
    try {
        //=====判断浏览器类型:===============
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
        //=====如果页面有CNPrint就直接使用，没有则新建:==========
        if (oOBJECT != undefined || oEMBED != undefined) {
            if (isIE)
                CNPrint = oOBJECT;
            else
                CNPrint = oEMBED;
        } else {
            if (CreatedOKCNPrint7766 == null) {
                CNPrint = document.createElement("object");
                CNPrint.setAttribute("width", 0);
                CNPrint.setAttribute("height", 0);
                CNPrint.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) CNPrint.setAttribute("classid", "clsid:09896DB8-1189-44B5-BADC-D6DB5286AC57");
                else CNPrint.setAttribute("type", "application/x-cainiaoprint");
                document.documentElement.appendChild(CNPrint);
                CreatedOKCNPrint7766 = CNPrint;
            } else
                CNPrint = CreatedOKCNPrint7766;
        }
        console.log("CNPrint:" + CNPrint);
        console.log("CNPrint.version" + CNPrint.VERSION);

        // TODO =====判断CNPrint插件是否安装过，没有安装或版本过低就提示下载安装:==========
        if ((CNPrint != null) || (typeof(CNPrint.VERSION) != "undefined" && CNPrint.VERSION >= "6.1.6.9")) {
            CNPrint.SET_LICENSES("深圳丰速科技有限公司", "A546DB05E3A1EDA7C135E4FC111421CD6E", "深圳豐速科技有限公司", "54412E052817EC2E794789637E87959BC1");
            return CNPrint;
        }
        //============================================================
        return CNPrint;
    } catch (err) {
        console.log(CNPrint + "error:" + err);
        return CNPrint;
    }
}

/**
 * 获得CaiNiao LODOP 打印组件
 * 本函数根据浏览器类型决定采用哪个页面元素作为CNPrint对象：
 * IE系列、IE内核系列的浏览器采用oOBJECT，
 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
 * 如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
 * @param oOBJECT
 * @param oEMBED
 * @param flag
 * @returns {*}
 */
function getCaiNiaoPrint(oOBJECT, oEMBED, flag) {
    var strHtmUpdate = "<br><font color='#FF00FF'>打印组件需要升级!点击这里<a href=' http://www.taobao.com/market/cainiao/eleprint.php' target='_self'>请点击这里</a>,下载32位安装程序，安装升级后请重新进入。</font>";
    var strHtmInstall = "<span style='margin-left: 30px;width: 440px;margin-bottom: 15px;font-size: 25px;text-align: center;color: #000;'>打印控件未安装!请下载安装：<br><a href='/static/download/install_CaiNiaoPrint32.zip' style='text-decoration:underline;margin-left: 135px;'><font color='red'size='3px' >菜鸟电子运单打印控件</font></a></span>";
    var strHtm64_Install = "<span style='margin-left: 30px;width: 440px;margin-bottom: 15px;font-size: 25px;text-align: center;color: #000;'>打印控件未安装!请下载安装：<br><a href='/static/download/install_CaiNiaoPrint64.zip' style='text-decoration:underline;margin-left: 135px;'><font color='red'size='3px' >菜鸟电子运单打印控件</font></a></span>";
    var strHtm64_Update = "<br><font color='#FF00FF'>打印组件需要升级!点击这里<a href=' http://www.taobao.com/market/cainiao/eleprint.php' target='_self'>请点击这里</a>,下载64位安装程序，安装升级后请重新进入。</font>";
    var strNewPagePrintInstall = "<div class='down_cnt tc'style='width: 600px;font-size: 25px; position:absolute; top:20%; left:35%; margin-left:-50px; margin-top:50px;text-align: center;color: #000;'>打印控件未安装!请下载安装：<br><a href='/static/download/install_CaiNiaoPrint32.zip' style='text-decoration:underline;'><font size='3px' color='red' >菜鸟电子运单打印控件</font></a></div>";
    var strNewPagePrint64Install = "<div class='down_cnt tc'style='width: 600px;font-size: 25px; position:absolute; top:20%; left:35%; margin-left:-50px; margin-top:50px;text-align: center;color: #000;'>打印控件未安装!请下载安装：<br><a href='/static/download/install_CaiNiaoPrint64.zip' style='text-decoration:underline;'><font size='3px' color='red' >菜鸟电子运单打印控件</font></a></div>";

    var CNPrint;
    try {
        //=====判断浏览器类型:===============
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
        //=====如果页面有CNPrint就直接使用，没有则新建:==========
        if (oOBJECT != undefined || oEMBED != undefined) {
            if (isIE)
                CNPrint = oOBJECT;
            else
                CNPrint = oEMBED;
        } else {
            if (CreatedOKCNPrint7766 == null) {
                CNPrint = document.createElement("object");
                CNPrint.setAttribute("width", 0);
                CNPrint.setAttribute("height", 0);
                CNPrint.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) CNPrint.setAttribute("classid", "clsid:09896DB8-1189-44B5-BADC-D6DB5286AC57");
                else CNPrint.setAttribute("type", "application/x-cainiaoprint");
                document.documentElement.appendChild(CNPrint);
                CreatedOKCNPrint7766 = CNPrint;
            } else {
                CNPrint = CreatedOKCNPrint7766;
            }
        }
        //=====判断CNPrint插件是否安装过，没有安装或版本过低就提示下载安装:==========
        if ((CNPrint == null) || (typeof(CNPrint.VERSION) == "undefined")) {
            if (is64IE) {
                if (flag == '1') {
                    document.write(strNewPagePrint64Install);
                } else {
                    alert(strHtm64_Install);
                }
            } else if (isIE) {
                if (flag == '1') {
                    document.write(strNewPagePrintInstall);
                } else {
                    alert(strHtmInstall);
                }
            } else {
                if (flag == '1') {
                    document.documentElement.innerHTML = strNewPagePrintInstall + document.documentElement.innerHTML;
                } else {
                    alert(strHtmInstall);
                }
            }
            return CNPrint;
        } else if (CNPrint.VERSION < "1.0.0.0") {
            if (is64IE) document.write(strHtm64_Update); else if (isIE) document.write(strHtmUpdate); else
                document.documentElement.innerHTML = strHtmUpdate + document.documentElement.innerHTML;
            return CNPrint;
        }
        console.log("=======================================");
        //TODO =====如下空白位置适合调用统一功能(如注册码、语言选择等):====
        CNPrint.SET_LICENSES("深圳丰速科技有限公司", "A546DB05E3A1EDA7C135E4FC111421CD6E", "深圳豐速科技有限公司", "54412E052817EC2E794789637E87959BC1");
        console.log("=======================================CNPrint licence: ", CNPrint.GET_LICENSES);
        //============================================================
        return CNPrint;
    } catch (err) {
        if (is64IE) {
            if (flag == '1') {
                document.write(strNewPagePrint64Install);
            } else {
                alert(strHtm64_Install);
            }
        } else {
            alert(strHtmInstall);
        }
        return CNPrint;
    }
    ;
}

/**
 * 通过LODOP获得打印机列表
 * @param _this
 */
function getPrinter(LODOP) {
    var printerHtml, printerHtmlList = [];
    var printerCount = LODOP.GET_PRINTER_COUNT(), printerName;
    printerHtmlList.push('<option value="">请选择</option>');
    for (var idx = 0; idx < printerCount; idx++) {
        printerName = LODOP.GET_PRINTER_NAME(idx);
        printerHtml = '<option idx="' + idx + '" value="' + printerName + '">' + printerName + '</option>';
        printerHtmlList.push(printerHtml);
    }
    return printerHtmlList;
}

var temNumVal = 1;
var currentIndex;
var printIndex;
var Printing = false;

/**
 * 调用LODOP打印入口函数
 * @param LODOP
 * @param data
 * @param options
 */
function dealPrint(LODOP, data) {
    try {
        currentIndex = 0;
        printIndex = 0;
        Printing = false;
        var records = data.orders;
        console.log("records: " + records);
        startPrintTimer(LODOP, records, options["printerIndex"]);
    } catch (e) {
        alert(e);
    }
}

/**
 * 控制打印机的开始和停止
 * @param LODOP
 * @param records
 * @param printerIndex 打印机索引
 */
function startPrintTimer(LODOP, records, printerIndex) {
    setTimeout(function () {
        // processing
        if (currentIndex > records.length - 1) {
            // TODO 停止
            return;
        }
        myPrintTimer(LODOP, records, printerIndex);
        setTimeout(arguments.callee, 400);
    }, 400);
}

/**
 * 根据打印机索引获取打印机，并设置打印机默认参数
 * @param LODOP
 * @param records
 * @param printerIndex
 */
function myPrintTimer(LODOP, records, printerIndex) {
    if (!Printing) {
        try {
            Printing = true;
            var NextIndex = currentIndex + temNumVal;
            if (NextIndex > records.length)
                NextIndex = records.length;

            LODOP.PRINT_INIT("易打单系统电子面单打印");
            LODOP.SET_SHOW_MODE("LANGUAGE", 0); // 设置显示模式
            LODOP.SET_PRINTER_INDEXA(printerIndex); // 通过打印机索引，设置打印机
            LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "易打单电子面单打印" + (currentIndex));//为每个打印单独设置任务名
            dealPrintData(LODOP, records, currentIndex, NextIndex, printerIndex);
        } finally {
            currentIndex = currentIndex + temNumVal;
            Printing = false;
        }
    }
}

/**
 * 处理打印数据
 * 打印模板设置、模板偏移量等
 * @param LODOP
 * @param records
 * @param begin
 * @param end
 * @param printerIndex
 */
function dealPrintData(LODOP, records, begin, end, printerIndex) {
    var printCopy = 1, numFlag = 0;
    if (options["printCopies"]) {
        printCopy = options["printCopies"];
    }
    try {
        for (var i = begin; i < end; i++) {
            numFlag = i;
            var record = records[i];
            printIndex++;
            console.log("printIndex: " + printIndex);

            for (var tempPrintCopy = 1; tempPrintCopy <= printCopy; tempPrintCopy++) {
                LODOP.PRINT_INITA(options["posTop"] + "mm", options["posLeft"] + "mm", options["width"] + "mm", options["height"] + "mm", '易打单系统电子面单打印');
                LODOP.SET_PRINT_PAGESIZE(1, options["width"] + "mm", options["height"] + "mm", "");
                if (options["templateType"] == "3") {//A4纸张设置
                    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
                }
                LODOP.SET_SHOW_MODE('LANGUAGE', 0);

                LODOP.SET_PRINTER_INDEXA(printerIndex); // 设置打印机索引
                LODOP.SET_PRINT_MODE('CUSTOM_TASK_NAME', '电子面单打印' + i);
                // TODO 干嘛用的
                LODOP.NEWPAGE();
                LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "1dadan");

                var printItems = record.items;
                for (var k = 0; k < printItems.length; k++) {
                    // 处理打印条目信息
                    drawPrintItemForPrint(LODOP, printItems[k]);
                }

                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Width:" + options["printPagePercentWidth"] + "%;Height:" + options["printPagePercentHeight"] + "%");
                printResult = LODOP.PRINT(); // 调起打印功能

                console.log("print result: " + printResult);
            }
        }
    } catch (e) {
        alert(e);
    }
}

/**
 * 根据每个打印条目的类型，调用LODOP相应的方法实现
 * @param LODOP
 * @param printItem
 */
function drawPrintItemForPrint(LODOP, printItem) {
    if (printItem.type == "TEXT") {
        if (printItem.w === 0 && printItem.h === 0) {
            printItem.w = 100;
            printItem.h = 21;
        }
        LODOP.ADD_PRINT_TEXT(printItem.y, printItem.x, printItem.w, printItem.h, printItem.cnt);
        if (printItem.font == "" || printItem.font == "宋体" || printItem.font == "黑体") {
            LODOP.SET_PRINT_STYLEA(0, "FontName", "新明細體");
        } else if (printItem.font != "") {
            LODOP.SET_PRINT_STYLEA(0, "FontName", printItem.font);
        }
        if (printItem.fontSize != 0) {
            LODOP.SET_PRINT_STYLEA(0, "FontSize", printItem.fontSize);
        }
        if (printItem.bold != "") {
            LODOP.SET_PRINT_STYLEA(0, "Bold", printItem.bold);
        }
        if (printItem.ali && printItem.ali != "") {
            LODOP.SET_PRINT_STYLEA(0, "Alignment", printItem.ali);
        }
        if (printItem.vsp != "" && printItem.vsp != 0) {
            LODOP.SET_PRINT_STYLEA(0, "LineSpacing", printItem.vsp);
        }
        if (printItem.wsp != "" && printItem.wsp != 0) {
            LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", printItem.wsp);
        }
        if (printItem.readOnly) {
            LODOP.SET_PRINT_STYLEA(0, "ReadOnly", printItem.readOnly);
        }
        LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", 1);
        LODOP.SET_PRINT_STYLEA(0, "ReadOnly", 0);
    } else if (printItem.type == "IMAGE") {
        LODOP.ADD_PRINT_IMAGE(printItem.y, printItem.x, printItem.w, printItem.h, "<img src='" + printItem.cnt + "'/>");
        LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
    } else if (printItem.type == "LINE") {
        var line_x1, line_y1, line_x2, line_y2;
        if (printItem.dir == 1) {
            // 竖线
            line_x1 = printItem.x;
            line_x2 = printItem.x;
            line_y1 = Number(printItem.y) - Number(printItem.lo);
            line_y2 = printItem.y;
        } else {
            // 横线
            line_x1 = printItem.x;
            line_x2 = Number(printItem.x) + Number(printItem.lo);
            line_y1 = printItem.y;
            line_y2 = printItem.y;
        }
        // ADD_PRINT_LINE(Top1, Left1, Top2, Left2,intLineStyle, intLineWidth)
        // intLineStyle：线条类型，数字型，0--实线 1--破折线 2--点线 3--点划线 4--双点划线
        // intLineWidth：线条宽，整数型，单位是(打印)像素，缺省值是1，非实线的线条宽也是0。
        LODOP.ADD_PRINT_LINE(line_y2, line_x2, line_y1, line_x1, printItem.stl, printItem.stl != "0" ? 0 : printItem.wide);
    } else if (printItem.type == "BARCODE") {
        console.log("barcode width: " + printItem.w + "height: " + printItem.h);
        if (printItem.w == 0 && printItem.h == 0) {
            printItem.w = 80;
            printItem.h = 80;
        }
        // BarCodeType 条码的类型（规制）名称 条形码使用 128C
        // LODOP.ADD_PRINT_BARCODE(Top, Left, Width, Height, BarCodeType, BarCodeValue); // 条形码与二级码共用
        LODOP.ADD_PRINT_BARCODE(printItem.y, printItem.x, printItem.w, printItem.h, "128C", printItem.cnt);
        // 是否显示条形码内容
        LODOP.SET_PRINT_STYLEA(0, "ShowBarText", true);
    } else if (printItem.type == "QRCode") {
        if (printItem.w == 0 && printItem.h == 0) {
            printItem.w = 80;
            printItem.h = 80;
        }
        // BarCodeType 条码的类型（规制）名称 条形码使用 QRCode
        LODOP.ADD_PRINT_BARCODE(printItem.y, printItem.x, printItem.w, printItem.h, "QRCode", printItem.cnt);
        /**
         * 这里两个300表示条码区域宽和高都是300px（1px=1/96英寸），控件会根据这个区域值来自动适配QRCODE的版本(QRCodeVersion)，
         * 版本是QRCODE二维码的重要属性概念，它决定了内容值的长度，目前控件支持版本1、3、7、14等四个最常用的版本，对应的内容值长度如下：
         * 版本1 => 最大内容长度是14个字符或7个汉字；
         * 版本3 => 最大内容长度是42个字符或21个汉字；
         * 版本7 => 最大内容长度是122个字符或61个汉字；
         * 版本14=> 最大内容长度是362个字符或181个汉字；
         * 最后的版本14都可以在这么小的区域内打印一篇短文了，可见二维码的科学性和信息优势有多大呀！但高版本由于条码密度大，
         * 扫描失败可能性增加，所以有时候你可能非常希望打印低版本的条码，如下这句指令就可以强制控件按版本3来打印：
         * LODOP.SET_PRINT_STYLEA(0,"QRCodeVersion",3);
         */
        LODOP.SET_PRINT_STYLEA(0, "QRCodeVersion", 3);
    } else if (printItem.type == "RECT") {
        // 矩形线
        LODOP.ADD_PRINT_RECT(printItem.y, printItem.x, printItem.w, printItem.h, printItem.stl, printItem.wide);
    } else if (printItem.type == "ELLIPSE") {
        // 椭圆线
        LODOP.ADD_PRINT_ELLIPSE(printItem.y, printItem.x, printItem.w, printItem.h, printItem.stl, printItem.wide);
    } else if (printItem.type == "HTM") {
        // ADD_PRINT_HTM(Top, Left, Width, Height, strHtmlContent) 增加超文本打印项(图形模式)
        LODOP.ADD_PRINT_HTM(0, 0, printItem.w, printItem.h, options["htmlStyle"] + printItem.cnt);
    } else if (printItem.type == "MODE") {
        // 设置打印模式
        LODOP.SET_PRINT_MODE(printItem.key, printItem.cnt);
    } else if (printItem.type == "IDENTITY") {
        LODOP.SET_PRINT_IDENTITY(printItem.cnt);
    } else if (printItem.type == "TABLE") {
        // 增加表格打印项（超文本模式）
        LODOP.ADD_PRINT_TABLE(printItem.y, printItem.x, printItem.w, "100%", printItem.cnt);
        LODOP.SET_PRINT_STYLEA(0, "Offset2Top", -(printItem.y - 3)); //设置次页偏移把区域向上扩
    }
}

