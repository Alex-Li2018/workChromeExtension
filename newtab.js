
$('#btn').click(e => {
    var radio = $("input[name='env']:checked").val();

    if (!$('#sign').val()) {
        alert('签名字符串必须输入');
        return;
    }

    if (!$('#encrypt').val()) {
        alert('加密字符串必须输入')
        return;
    }

    function decryptByAES(ciphertext, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const decrypt = CryptoJS.AES.decrypt(ciphertext, keyHex, { mode: CryptoJS.mode.ECB });
    
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    function decryptData(signStr, data) {
        let decryptd = decryptByAES(data, signStr);
    
        if (!decryptd || typeof decryptd !== 'string') {
            decryptd = decryptByAES(data, 'default_encrypt_key');
           console.error('数据解密失败,使用默认字符串解密');
        }
    
        let result = {};
        try {
            result = JSON.parse(decryptd);
        } catch (e) {
            console.error(e);
        }
    
        return result;
    }

    // Decrypt with the private key...
    var encrypted = $('#sign').val();
    var decrypt = new JSEncrypt();
    // 解密线下
    if (radio === 'dev') {
        decrypt.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgGvWtNlC/hEUBGAjz+TSP78/Vf1X/Sl7UrC3ToOShvDD2u3zp1gm
GslsGMWEA0yM4Pnh9ID7g35U5z8JJPrq/+5ygH5KS4eu6LownXAzYY9jcSKJ2wNK
vz7ZXHp9dpE97FPFpVu6cRCh8VvMxxd8LtAzqkg0HGjwOpcpvedKBCtBAgMBAAEC
gYBD+BkW00XFx+MWIZxYMjihty7gtoPHkIZHAdKH1WQd/qRP1IIGakX57JsUayeV
KTpn5YYxgdWYW7VBIudfC51xgK+mnIq4KwlWnIbGjTwtoilUrp+sZgisZDx2Y1hC
7csCM32YJRHxJXLB45aUrhPnH5M/jSaQEnm5aXZ7kYMcAQJBAK1qUYgfO/sxJ22h
5id+5wV4sO4xHK7Uza0ieLb1y+Oc3mMdynbHny0MjdnSzWE5gNKDyEcN/MB9tWIB
7j6GQ+ECQQCfMbVeZCr+PrsAudB2WpYVFPpf7H4m7NmrWCdlORuI6nuV4h8PFO/7
d4DbMkNFhnXc7KuKoII0uMxqkWVVctNhAkAr9jXxEin8hft+2XolLRCX3H7OA3lI
AP6bE5ASocEsVIo0CktXTUfW/cXAIKacLR2xQGM3UB5xFe0ziVXCV/tBAkBpk8X9
O+FnjKLo8FLYq2stwCPsyiNAHYSepnA6KY2hWCFuXfDLR8+Arti+hq8mxO4V/sAl
yB2SaZzocFUMPoMBAkBtdLW6mVgoq1q6aeK+Q+bDst/NFmR6DM9tYJpRtPs1zada
w05IA7MFPDV08DILHUw5GmHcGMxCPH9Yb6U8fVuL
-----END RSA PRIVATE KEY-----`);
    } else {
        decrypt.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDi/3XPVd7yF7UcE91nOuF7BXKvuGUDf0CDBg8iF4AgqSWfah2w
Fk0pi/I/q2z6Ej+OCViF9qxZux3fgLIN4BFKzsflNW2QfrJamCz8mX1a7Ow2anwD
baZq43x/T9Vhphjm5AEf1Lof66oycdYBfwDdlYrbnkHA9Rlu9nLM+jtGowIDAQAB
AoGBAN0zISNMw3dYINVeijbJCuZtlaekYVL6Euxa4C5RhjrNeWsR5iIsaT7eL89Z
hlVdqO8JLmlEygiarW6Zo2if+1f66wPHtmPGiigR6C9fixPtBdqO6XC8Is2RRJmc
2Q7/46tZCuamtXu9L57rfUrEbkMhMF2mR2n6rs65AKoInB7JAkEA/7wSa/t/eMnl
/bX19T0OiENwQwhJDrLJR0OcZD1gif1By4Zc3Rfexjf9mzV06nzIfjb9a88nfLrq
0blg71Nz9QJBAOM7wVSji+T2Nuk7h4rpPwYwn10v5W7Km9FLjxEmx1B1FmEYDz16
kVbZtieeotIjxiPrq2ffrxiZ3p80dxz6yTcCQQC8Tz65aM3qobDLa6ubU8RZrl8B
3R3+xsPTyANnBJMLyQMj3OKQoz0VdLE4Etrut8fiuJdPRZDsFa9Hk1u/nxHpAkBj
a4ehApV4rglEbplVO8wpZyiy2vvlR5x5LDgCZxcZqsEJ5j70xSXF/Cdomk3e52wP
11L9da7kcp4mxgu/kDJtAkBcULaZEv/3ijE0kHSERdDqDAg7Du5KoBU8BWPJheg8
nJ5jnPUXnDhUSz/toAUUpceWINWB6ul6EJrHtNj8UiHu
-----END RSA PRIVATE KEY-----`);
    }

    var uncrypted = decrypt.decrypt(encrypted);

    var encryptString = uncrypted.replace(/^[0-9]*:/g, '');
    console.log(encryptString)

    var decrypt = decryptData(encryptString, $('#encrypt').val())

    var options = {
        dom : $('#code')[0]
    };
    var jf = new JsonFormatter(options); //创建对象
    jf.doFormat(decrypt); //格式化json
});
