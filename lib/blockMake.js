var usc_rpc = require('node-bitcoin-rpc');

var blockMake = module.exports = function(params){
    this.makeSubmitMsg = function(callback){
        usc_rpc.init('localhost', 58858, '', '');
	//console.log('params--------', params);
        usc_rpc.call('mnr_submitUlordBlockPartialMerkle', params /*[params.blockHashHex, params.blockHeaderHex, params.coinbaseHex, params.merkleHashesHex, params.blockTxnCountHex]*/, function (err, res) {
	   //console.log('res------------', err);
            var uscBlock = res;
	   // console.log('result::::::::::::::::::', res);
	    if (res === undefined && err !== null || res === null){
		console.log('------------ rebroadcasting usc work ------------');
		return;
	    } else if (res.result){
		//console.log('result::::::::::::::::::', res);
            	var rawbm = {};
            	rawbm["created_at_ts"] = (new Date().getTime()/1000);
            	rawbm["blockImportedResult"] = uscBlock.result.blockImportedResult;
            	rawbm["blockHash"] = uscBlock.result.blockHash;
            	rawbm["blockIncludedHeight"] = uscBlock.result.blockIncludedHeight;
            	callback(err, rawbm);
	     }
        });
    }
}
