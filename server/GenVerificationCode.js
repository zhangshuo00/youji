function GenVerificationCode(){
    do
        var out = Math.floor(Math.random()*10000);
    while(out < 1000)
        return out
}
module.exports = GenVerificationCode;