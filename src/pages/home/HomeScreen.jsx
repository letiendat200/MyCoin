import React, {useState} from 'react';
import './HomeScreen.css';
import hash from 'object-hash';


class CryptoBlock{
  constructor(index, timestamp, data, precedingHash = " "){
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.precedingHash = precedingHash;
      this.hash = this.computeHash();
      this.nonce = 0;
  }
  computeHash() {
      return hash(
          this.index + this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      ).toString();
  }

  proofOfWork(difficulty){
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
          {
              this.nonce++;
              this.hash = this.computeHash();
          }
      
  }
}

class CryptoBlockChain{
  constructor(){
      this.blockchain = [this.startGenesisBlock()];
      this.difficulty = 4;        
  }
  startGenesisBlock(){
      return new CryptoBlock(0, "29/06/2023", "Initial BLock in the Chain", "0");

  }
  obtainLatestBlock(){
      return this.blockchain[this.blockchain.length-1];
  }
  addNewBlock(newBlock){
      newBlock.precedingHash = this.obtainLatestBlock().hash;
      newBlock.index = this.obtainLatestBlock().index + 1;
      newBlock.hash = newBlock.computeHash();
      newBlock.proofOfWork(this.difficulty);
      this.blockchain.push(newBlock);
  }
  checkChainValidity(){
      for(let i = 1; i< this.blockchain.length; i++){
          const currentBLock = this.blockchain[i];
          const precedingBlock = this.blockchain[i-1];
          if(currentBLock.hash !== currentBLock.computeHash()){
              return false;
          }
          if(currentBLock.hash !== precedingBlock.hash) {
              return false;
          }
          return true;
      }
  }
}

let theblockchaincoder =new CryptoBlockChain();

let check = 1
const HomeScreen = () => {
  const [walletaddress1, setWalletAddress1] = useState("")
  const [walletpass1, setWalletPass1] = useState("")
  const [walletpri1, setWalletPri1] = useState("")
  const [walletaddress2, setWalletAddress2] = useState("")
  const [walletpass2, setWalletPass2] = useState("")
  const [walletpri2, setWalletPri2] = useState("")
  const [history, setHistory] = useState("")
  function createWallet1(){
    let address = "0x37C1B26f394A0533316bC025392D85BA54a89377"
    let passphrase = "tinohost crypto social tunnel decade"
    let privatekey = hash(passphrase)
    setWalletAddress1(address);
    setWalletPass1(passphrase);
    setWalletPri1(privatekey);
  }
  function sendingOneCoin(){
    const signature = hash(walletpri1 + "0x37C1B26f394A0533316bC025392D85BA54a89377" + "0x25d63530f6D7989dA3B99b4a61f2D3460c19e7c9" + 1).toString();
    if(signature == hash(walletpri1+ walletaddress1 + walletaddress2 + 1 ).toString())
    {
      theblockchaincoder.addNewBlock(
        new CryptoBlock(1,Date.now(),{
            sender: walletaddress1,
            recipient: walletaddress2,
            quantity: 1,
        })
    );
    }
    else{
      console.log("Somethong is wrong")
    }
  }
  function sendingTwoCoin(){
    const signature = hash(walletpri1 + "0x25d63530f6D7989dA3B99b4a61f2D3460c19e7c9" + "0x37C1B26f394A0533316bC025392D85BA54a89377"+ 2).toString();
    if(signature == hash(walletpri1+ walletaddress2 + walletaddress1 + 2 ).toString())
    {
      theblockchaincoder.addNewBlock(
        new CryptoBlock(1,Date.now(),{
            sender: walletaddress1,
            recipient: walletaddress2,
            quantity: 2,
        })
    );
    }
    else{
      console.log("Somethong is wrong")
    }
  }
  function createWallet2(){
    let address = "0x25d63530f6D7989dA3B99b4a61f2D3460c19e7c9"
    let passphrase = "tinytina hosting flash army nice now"
    let privatekey = hash(passphrase)
    setWalletAddress2(address);
    setWalletPass2(passphrase);
    setWalletPri2(privatekey);
  }
  
  function checkingHistory(){
    let history = JSON.stringify(theblockchaincoder,null,4)
    setHistory(history);
  }
  
  return (
    <>
    <div id="first_email" class="column half">
      <button onClick={createWallet1}>
      Create 1st Wallet
      </button>
      <p>Your wallet address is:  {walletaddress1}  </p>
      <p>Your wallet private key is:  {walletpri1}  </p>
      <p>Your wallet passphrase is:  {walletpass1}  </p>

      <button onClick={sendingOneCoin}>
        Press this to send one coin from wallet 1 to wallet 2
      </button>

    </div>

    <div id="second_email" class="column last">
      <button onClick={createWallet2}>
      Create 2nd Wallet
      </button>
      <p>Your wallet address is:  {walletaddress2}  </p>
      <p>Your wallet private key is:  {walletpri2}  </p>
      <p>Your wallet passphrase is:  {walletpass2}  </p>
      <button onClick={sendingTwoCoin}>
        Press this to send two coin from wallet 2 to wallet 1
      </button>
    </div>   
    <br>
    </br>
    <button onClick={checkingHistory}>Load the transaction history</button>
    <p>Transaction history:  {history}  </p>
    </>
  )
};

export default HomeScreen;
