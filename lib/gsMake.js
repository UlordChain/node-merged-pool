var usc_rpc = require('node-bitcoin-rpc');

var GsMaker = module.exports = function(){
    this.makeRawGwMsg = function(callback){
        
        usc_rpc.init('localhost', 58858, '', '');
        usc_rpc.call('mnr_getWork', [], function (err, res) {
            if(res === undefined && err !== null || res === null){
		console.log('err', err);
		return;
	    }else{
		var gw = res, rawgw = {};
                rawgw["created_at_ts"] = (new Date().getTime()/1000);
                rawgw["target"] = gw.result.target;
                rawgw["parentBlockHash"] = gw.result.parentBlockHash;
                rawgw["blockHashForMergedMining"] = gw.result.blockHashForMergedMining;
                rawgw["feesPaidToMiner"] = gw.result.feesPaidToMiner;
                rawgw["notify"] = gw.result.notify;
                callback(rawgw);		
	    }
        });
    }
}
