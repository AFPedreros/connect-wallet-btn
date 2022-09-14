const walletBtn = document.getElementById("wallet-btn");
const circle = document.createElement("span");
let localAccount = [];
const main = async ()=>{
    const MetaMaskClientCheck = ()=>{
        if (isMetaMaskInstalled()) isWalletConnected();
        else isWalletNotInstall();
    };
    const isWalletNotInstall = async ()=>{
        walletBtn.innerText = "Click here to install MetaMask!";
        walletBtn.addEventListener("click", (e)=>{
            circle.classList.add("circle");
            animationEffect(e);
            console.log("Clicked");
        });
    };
    const isWalletConnected = async ()=>{
        try {
            const { ethereum  } = window;
            const accounts = await ethereum.request({
                method: "eth_accounts"
            });
            if (accounts.length > 0) {
                const account = accounts[0];
                circle.classList.add("dark-circle");
                walletBtn.style.backgroundColor = "white";
                walletBtn.style.borderColor = "white";
                walletBtn.style.color = "purple";
                walletBtn.innerText = `${account.substr(0, 6)}...${account.substr(account.length - 4)}`;
                walletBtn.addEventListener("click", (e)=>{
                    animationEffect(e);
                });
            } else {
                circle.classList.add("circle");
                walletBtn.innerText = "Connect Wallet";
                walletBtn.addEventListener("click", (e)=>{
                    animationEffect(e);
                    connectWallet();
                });
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };
    const isMetaMaskInstalled = ()=>{
        const { ethereum  } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const connectWallet = async ()=>{
        try {
            const { ethereum  } = window;
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
            localAccount = accounts[0];
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const animationEffect = (e)=>{
        const x = e.clientX;
        const y = e.clientY;
        const buttonTop = e.target.offsetTop;
        const buttonLeft = e.target.offsetLeft;
        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;
        circle.style.top = yInside + "px";
        circle.style.left = xInside + "px";
        e.target.appendChild(circle);
        setTimeout(()=>{
            circle.remove();
        }, 10000);
    };
    MetaMaskClientCheck();
};
main() // window.addEventListener("DOMContentLoaded", main)
;

//# sourceMappingURL=index.672d4772.js.map
