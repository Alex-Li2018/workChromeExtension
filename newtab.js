
$('#btn').click(e => {

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
