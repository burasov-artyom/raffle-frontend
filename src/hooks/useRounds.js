import { usePublicClient, useChains } from "wagmi"
import { getContract } from "viem";

import raffleAbi from "@/config/abi/raffle";

const useRounds = () => {
    const chains = useChains();

    const publicClient = usePublicClient({
        chainId: chains[0].id,
    });

    const raffleContract = getContract({
        address: chains[0]?.contracts?.raffle?.address,
        abi: raffleAbi,
        client: {
            public: publicClient,
        }
    });

    const getRoundsEpoch = async() => {
        try {
            const quickplay = await raffleContract.read.quickplay_epoch();
            const whalex2 = await raffleContract.read.whalex2_epoch();
            const fomo = await raffleContract.read.currentEpoch();

            return {
                quickplay,
                whalex2,
                fomo
            }
        } catch (e) {
            console.log("getRoundsEpoch error: ", e)
        }
    }

    return {
        getRoundsEpoch
    }
}

export default useRounds;
