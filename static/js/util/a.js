/**
 * 全排列A(n, m)实现
 *
 * 这里的排列和组合一样 也是运用循环和递归的思想，比如arr=[1,2,3] ,size=3
 * 第一次循环curItem=1 第一次递归newArr=3,result=[1,2] 所以结果是[1,2,3]
 * 第一次循环curItem=1 第二次递归newArr=2,result=[1,3] 所以结果是[1,3,2]
 * 第二次循环curItem=2 第一次递归newArr=3,result=[2,1] 所以结果是[2,1,3]
 * 第二次循环curItem=2 第二次递归newArr=1,result=[2,3] 所以结果是[2,3,1]
 *
 * @param arr
 * @param size
 * @returns {*}
 */
function permutation(arr, size) {
    if (size > arr.length) {
        return;
    }
    var allResult = [];
    (function (arr, size, result) {
        if (result.length == size) {
            allResult.push(result);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr),
                    curItem = newArr.splice(i, 1);
                arguments.callee(newArr, size, [].concat(result, curItem));
            }
        }
    })(arr, size, []);
    return allResult;
}

/**
 * 组合C(n, m)实现
 * 主要用到了循环加递归的方式实现的，个人觉得很是精辟，

 * 举例来说吧choose([1,2,3,4,5,6], 3)
 * 第一次循环的时候 arr是[1,2,3,4,5,6],size=3,result=[],
 * 经过一次递归后的结果是什么样的了?递归里面也有循环递归
 * 经过第一次循环第一次递归变为arr=[3,4,5,6],size=1,result=[1,2],所以结果就出来了[1,2,3][1,2,4][1,2,5][1,2,6]
 * 那么第一次循环第二次递归arr=[4,5,6],size=1,result=[1,3],所以结果就出来了[1,3,4][1,3,5][1,3,6]
 * 那么第一次循环第三次递归arr=[5,6],size=1,result=[1,4],所以结果就出来了[1,4,5][1,4,6]
 * 那么第一次循环第四次递归arr=[6],size=1,result=[1,5],所以结果就出来了[1,5,6]
 *
 * 那么第二次循环第一次递归变为arr=[4,5,6],size=1,result=[2,3],所以结果就出来了[2,3,4][2,3,5][2,3,6]
 *
 * @param arr
 * @param size
 * @returns {Array}
 */
function combination(arr, size) {
    var allResult = [];
    (function (arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    arguments.callee(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);
    return allResult;
}


/**
 * 全排列A(n, m)实现
 *
 * 全排列主要用到的是递归和数组的插入
 * 比如12的全排列，首先把1拿出来放到elementCur，再获取由1组成的数组[2],然后在循环把1插入到0,1的位置后再返回[1,2][2,1]
 * 如果是123那么首先获取23的全排列[2,3][3,2],然后在插入1，[1,2,3][2,1,3][2,3,1][1,3,2][3,1,2][3,2,1]
 *
 * @param array 需要进行全排列的一维数组
 * @param permutatedArray 存放返回结果
 * @returns {*}
 */
function permutation2(array, permutatedArray) {
    if (!permutatedArray) {
        permutatedArray = [];
    }
    if (array.length > 1) {
        //弹出第一个数
        var elementCur = array.shift();
        //排列剩余的数组
        permutation2(array, permutatedArray);
        //返回剩余的数组的排列长度
        var permutatedArrayLen = permutatedArray.length;
        //第一个数与其他剩余数组所有数组组合
        for (var j = 0; j < permutatedArrayLen; j++) {
            //弹出不齐的组
            var p = permutatedArray.shift();
            //把当前元素放到排列好的数组的所有位置
            for (var i = 0; i <= p.length; i++) {
                //复制排列好的数组
                var r = p.slice(0);
                //插入数据到数组的位置
                r.splice(i, 0, elementCur);
                //保存
                permutatedArray.push(r)
            }
        }
        //退出条件
    } else {
        permutatedArray.push([array[0]]);
    }
    return permutatedArray;
}

/**
 * 组合C(n, m)实现
 *
 * 组合实现的原理非常简单，就是依次循环数组的元素，循环的嵌套层数是有m来决定的，
 * 内部的循环下标在外部的下标加1，所以用function来组装
 *
 * @param arr n需要组合的一维数组
 * @param num m需要取几个元素来组合
 * @param fun 对组合后的元素的处理函数，如全排列permutate
 * @returns {*}
 */
function combination2(arr, num, fun) {
    // 这里假设num最大值为10 一般A(n,m)中的m应该不会太大
    if (arr.length < num || num > 10) {
        return [];
    }
    var variable = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u"];
    var replaceStr = "#$#";
    var str = " var arr=arguments[0]; var fun=arguments[1];  var ret=[]; for (var a = 0; a < arr.length; a++) { " + replaceStr + " } return ret;"
    for (var i = 1; i < num; i++) {
        str = str.replace(replaceStr, " for (var " + variable[i] + " =" + variable[i - 1] + "+ 1; " + variable[i] + " < arr.length; " + variable[i] + "++) { " + replaceStr + "  }")
    }
    var temp = " var temp= []; ";
    for (var i = 0; i < num; i++) {
        temp += "temp.push(arr[" + variable[i] + "]); ";
    }
    if (fun) {
        temp += " ret.push(fun(temp)); ";
    }
    else {
        temp += " ret.push(temp); ";
    }
    str = str.replace(replaceStr, temp);
    return (new Function(str)).apply(null, [arr, fun]);
}

// demo
var a = combination2([1, 2, 3, 4, 5, 6], 3, permutation2);
for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < a[i].length; j++) {
        console.log(a[i][j].join(''));
    }
}
