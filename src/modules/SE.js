import axios from 'axios';

const SE_RPC = 'https://api.steem-engine.com/rpc2';

const call = async (endpoint, request) => {
  const postData = {
    jsonrpc: '2.0',
    id: Date.now(),
    ...request,
  };

  let result = null;

  try {
    const post = await axios.post(`${SE_RPC}/${endpoint}`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (post.status === 200) result = post.data.result;
  } catch (e) {
    // console.log(e.message);
  }

  return result;
};

const callBlockchain = (request) => call('blockchain', request);

const getTransactionInfo = (txid) => {
  const request = {
    method: 'getTransactionInfo',
    params: {
      txid,
    },
  };

  return callBlockchain(request);
};

const getLatestBlockInfo = () => {
  const request = {
    method: 'getLatestBlockInfo',
  };

  return callBlockchain(request);
};

const getBlockInfo = (blockNumber) => {
  const request = {
    method: 'getBlockInfo',
    params: {
      blockNumber: Number(blockNumber),
    },
  };

  return callBlockchain(request);
};

export default {
  call,
  getBlockInfo,
  getLatestBlockInfo,
  getTransactionInfo,
};