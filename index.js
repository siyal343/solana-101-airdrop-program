const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   const newPair = new Keypair();
   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
   const secretKey = newPair._keypair.secretKey;

   //Function for airdroping SOL
   const getWalletBalance = async () => {
    try {
        //making a connections to the devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //keypair object for the wallet
        const myWallet = await Keypair.fromSecretKey(secretKey);
        //getting the wallet balance
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address: ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
    };

    //Function for airdroping SOL
    const airDropSol = async () => {
        try {
            //making a connections to the devnet
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            //keypair object for the wallet address
            const walletKeyPair = await Keypair.fromSecretKey(secretKey);
            console.log(`-- Airdropping 2 SOL --`)
            //creating airdrop signature
            const fromAirDropSignature = await connection.requestAirdrop(
                new PublicKey(walletKeyPair.publicKey),
                2 * LAMPORTS_PER_SOL
            );
            //awaiting the transaction confirmation from the devnet
            await connection.confirmTransaction(fromAirDropSignature);
        } catch (err) {
            console.log(err);
        }
    };
    //testing
    const driverFunction = async () => {
        await getWalletBalance();
        await airDropSol();
        await getWalletBalance();
    }
    driverFunction();