import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import { parseEther, getContract } from "viem";

import raffleAbi from "@/config/abi/raffle";

const useBuyTickets = () => {
    const { chain } = useAccount();

    const publicClient = usePublicClient({
        chainId: chain?.id,
    });
    const { data: walletClient } = useWalletClient({
        chainId: chain?.id,
    });

    const raffleContract = getContract({
        address: chain?.contracts?.raffle?.address,
        abi: raffleAbi,
        client: {
            public: publicClient,
            wallet: walletClient,
        }
    });

    const buyQuickplayTicket = async() => {
        try {
            const buyTx = await raffleContract.write.buyQuickPlayTicket({
                value: parseEther("0.1")
            })

            let butReceipt = await publicClient.waitForTransactionReceipt({
                hash: buyTx
            });

            if (butReceipt.status !== `success`) {
                return new Error(`Transaction failed`)
            }
        } catch (e) {
            console.log("buyQuickplayTicket error: ", e)
        }
    }

    const buyWhalex2Ticket = async() => {
        try {
            const buyTx = await raffleContract.write.buyWhaleX2Ticket({
                value: parseEther("1.1")
            })

            let butReceipt = await publicClient.waitForTransactionReceipt({
                hash: buyTx
            });

            if (butReceipt.status !== `success`) {
                return new Error(`Transaction failed`)
            }
        } catch (e) {
            console.log("buyWhalex2Ticket error: ", e)
        }
    }

    const buyFomoTickets = async(count) => {
        try {
            const buyTx = await raffleContract.write.buyFOMOTickets({
                args: [
                    count
                ],
                value: parseEther((count * 0.055).toString())
            })

            let butReceipt = await publicClient.waitForTransactionReceipt({
                hash: buyTx
            });

            if (butReceipt.status !== `success`) {
                return new Error(`Transaction failed`)
            }
        } catch (e) {
            console.log("buyFomoTickets error: ", e)
        }
    }

    return {
        buyQuickplayTicket,
        buyWhalex2Ticket,
        buyFomoTickets
    }
}

export default useBuyTickets;
