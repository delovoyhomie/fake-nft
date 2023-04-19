import { Address, beginCell, toNano } from 'ton-core';
import { NFTItem } from '../wrappers/NFTItem';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const nft = provider.open(
        NFTItem.createFromConfig(
            {
                owner: Address.parse('EQBzfob0SUIbIt07VOCCtYagVTdum5DlPXX-Z54yg4tVC_Uj'),
                index: 0n,
                content: beginCell()
                    .storeUint(1, 8)
                    .storeStringTail('https://raw.githubusercontent.com/delovoyhomie/fake-nft/main/scripts/metadata.json')
                    .endCell(),
            },
            await compile('NFTItem')
        )
    );

    await nft.sendDeploy(provider.sender(), toNano('0.0007'));

    await provider.waitForDeploy(nft.address);
}
