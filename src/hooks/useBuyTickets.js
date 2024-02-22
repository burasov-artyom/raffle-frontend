import { useAccount, useChains, usePublicClient, useWalletClient, useEstimateFeesPerGas } from "wagmi"
import { parseEther, getContract } from "viem";

import raffleAbi from "@/config/abi/raffle";

const useBuyTickets = () => {
    const chains = useChains();
    const { chain } = useAccount();

    const feeData = useEstimateFeesPerGas();

    const publicClient = usePublicClient({
        chainId: chains[0].id,
    });
    const { data: walletClient } = useWalletClient({
        chainId: chain?.id,
    });

    const raffleContract = getContract({
        address: chains[0]?.contracts?.raffle?.address,
        abi: raffleAbi,
        client: {
            public: publicClient,
            wallet: walletClient,
        }
    });

    const buyQuickplayTicket = async() => {
        try {
            const gasLimit = await raffleContract.estimateGas.buyQuickPlayTicket({
                value: parseEther("0.11")
            });

            const buyTx = await raffleContract.write.buyQuickPlayTicket({
                value: parseEther("0.11"),
                gas: gasLimit,
                gasPrice: feeData.gasPrice
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
            const gasLimit = await raffleContract.estimateGas.buyWhaleX2Ticket({
                value: parseEther("1.1")
            });

            const buyTx = await raffleContract.write.buyWhaleX2Ticket({
                value: parseEther("1.1"),
                gas: gasLimit,
                gasPrice: feeData.gasPrice
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
            const gasLimit = await raffleContract.estimateGas.buyFOMOTickets({
                args: [
                    count
                ],
                value: parseEther((count * 0.055).toString())
            });

            const buyTx = await raffleContract.write.buyFOMOTickets({
                args: [
                    count
                ],
                value: parseEther((count * 0.055).toString()),
                gas: gasLimit,
                gasPrice: feeData.gasPrice
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
