/**
 * 组合函数(就是数学排列组合里的C)
 * 就是C(m, n)(上面是n，下面是m) = A(m, n)(上面是n，下面是m)/A(n, n)(上下都是n)
 * @param m
 * @param n
 * @returns {number}
 */
function combination(m, n) {
    return factorial(m, n) / factorial(n, n);//
}

/**
 * 排列函数(就是数学排列组合里的A)，
 * 就是数学里的A(m, n)，上面是n，下面是m
 *
 * @param m
 * @param n
 * @returns {number}
 */
function permutation(m, n) {
    return factorial(m, n);
}

/**
 * 自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1
 * 如factorial(6, 4)就是6*(6-1)*(6-2)*...*(6 - 4 + 1),相乘的数有4个
 *
 * @param m
 * @param n
 * @returns {number}
 */
function factorial(m, n) {
    var num = 1;
    for (var i = m; i > 0; i--) {
        if (i < m - n + 1) {
            // 当循环次数等于指定的相乘个数时，即跳出for循环
            break;
        }
        num = num * i;
    }
    return num;
}
