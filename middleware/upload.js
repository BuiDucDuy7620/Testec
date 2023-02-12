// tai file/image dựa vào mã code base64 mà người dùng truyền lên
const upload = async (base64String) => {
    
    // console.log("basestring",base64String)

    var matches = base64String.split(";");// split; laf dde chia ra ten,data cuar cai baase64
    var response = {};
    // console.log("matches00000000000000:",matches[0])
    // console.log("matches11111111111111111:",matches[1])



    if (matches.length !== 2) {
        return new Error("invalid inpput string")
    }
    response.type = matches[0].split(":")[1];
    response.data = new Buffer.from(matches[1].split(",")[1], "base64")// timf hieu buffer
    return response



}
module.exports = { upload }