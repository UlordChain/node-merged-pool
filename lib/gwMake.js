var usc_rpc = require('node-bitcoin-rpc');

var GwMaker = module.exports = function(uscOptions){
    usc_rpc.init(uscOptions.rpcIp, uscOptions.rpcPort, '', '');
    this.makeRawGwMsg = function(callback){
        usc_rpc.call('mnr_getWork', [], function (err, res) {
		if(res === undefined && err !== null || res === null){
			console.log("=======================Unable to get new USC work.======================");
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
