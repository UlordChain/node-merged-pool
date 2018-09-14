var usc_rpc = require('node-bitcoin-rpc');

var blockMake = module.exports = function(uscOptions){
	usc_rpc.init(uscOptions.rpcIp, uscOptions.rpcPort, '', '');

    this.makeSubmitMsg = function(params, callback){
		/*
		*	@params: [params.blockHashHex, params.blockHeaderHex, params.coinbaseHex, params.merkleHashesHex, params.blockTxnCountHex]
		*/
        usc_rpc.call('mnr_submitUlordBlockPartialMerkle', params , function (err, res) {
        var uscBlock = res;
	    if (res === undefined && err !== null || res === null){
			return;
	    } else if (res.result){
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
