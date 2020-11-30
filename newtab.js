
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
        const decryptd = decryptByAES(data, signStr);
    
        if (!decryptd || typeof decryptd !== 'string') {
            throw new Error('数据解密失败');
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
MIICXAIBAAKBgQC5Y260CzXIywU2/oNbt2A1hVMlAZX9Sm0tUDBTViztB4XMgXhC
BfonM4KG9l4I4Tdy2WzPLEm1Auv7gSmREeESbaE1HwUOTrSJgp7xjHl/u/jX8c8L
Cv+UzO7/5Ebmya+BHI67q32ksObf+uK+sRJ27x364DUychM3vu4D0VDnWQIDAQAB
AoGAB7SeUVV18tadbN+/TfydPxw/jHY4acLCLvP6TjxyuZdqdEmdWgEtmJuHfVyY
I/5Yc6md4C6TEbcBX/7KX4FCvZMRH+ozeeBzS7On/7/fAQBbdwbxtp9b0LPCTijC
xToxAYKCgHhfO2rjdpcSzNFhNg5ViQuN5AcGS+BHytM4xRECQQD54BRUvkbWY8k3
oGLNX+KhKDcZmwAWQMLgvOoWwxZ4qURG7TvEX0ml8xblQKhxUWcvlbJ/dxGcLfY5
PfDfXz07AkEAve61t4mvawxR3yJTXRpIlVIAeid9gpz7UEh1v+T9VhPMewiY0bgg
M0faI2lVYuZUlXfM+XcefnbW5TO6snO0ewJBAOQ96XRK5fu45Di6eOVt214nlMT/
z0GEYD3WceDezGzk+GftFLXX8Db0aAp6WCJCIAXYMFa8FUratNkumhH/NbcCQDtz
lwnmXTRi3NW9ht6jtYiX7HJQHideQAQ3SjRQ10O0WtNAM6WhvuKOYSeodwPIGT3Y
DB8iPDdVt5pzAMOPGDUCQAsiHSD4RewaPAYrwRQ+UxDdFvvi2+BBLXf4Gp2/18y0
hJFrpo11kSywEHFxsJebZRTPKL6d+5Xs7RUcK5nzDRA=
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
