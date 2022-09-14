const walletBtn = document.getElementById("wallet-btn")
let localAccount = []

const main = async () => {
    const animationEffect = (e) => {
        const x = e.clientX
        const y = e.clientY
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement("span")
        circle.classList.add("circle")

        circle.style.top = yInside + "px"
        circle.style.left = xInside + "px"

        e.target.appendChild(circle)

        setTimeout(() => {
            circle.remove()
        }, 10000)
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            })

            localAccount = accounts[0]
            isWalletConnected()
        } catch (error) {
            console.log(error)
        }
    }

    const isMetaMaskInstalled = () => {
        const { ethereum } = window
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            walletBtn.innerText = "Click here to install MetaMask!"
            walletBtn.addEventListener("click", (e) => {
                animationEffect(e)
                test()
            })
        } else {
            walletBtn.innerText = "Connect Wallet"
            walletBtn.addEventListener("click", (e) => {
                console.log("Clicked")
                animationEffect(e)
                connectWallet()
            })
        }
    }

    const test = () => {
        console.log("hello")
    }

    const isWalletConnected = async () => {
        try {
            const { ethereum } = window

            const accounts = await ethereum.request({ method: "eth_accounts" })
            console.log("accounts: ", accounts)

            if (accounts.length > 0) {
                const account = accounts[0]
                console.log("wallet is connected! " + account)
                walletBtn.innerText = "Mint NFT"
            } else {
                console.log("make sure MetaMask is connected")
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }

    isWalletConnected()
    MetaMaskClientCheck()
}

main()
window.addEventListener("DOMContentLoaded", main)
