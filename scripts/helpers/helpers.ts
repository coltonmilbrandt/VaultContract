import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function checkUserBalances(signers: SignerWithAddress[], vaultContract: Contract) {
    for (let i = 0; i <= signers.slice(0, 3).length; i++) {
      const vaultInstance = vaultContract.connect(signers[i]);
      const userUnderlyingInVault = await vaultInstance.assetsOf(signers[i].address);
      const userSharesFromUnderlying = await vaultInstance.previewRedeem(userUnderlyingInVault);
      const totalUnderlyingInVault = await vaultInstance.totalAssets();
      const result =
        "totalAssets: " +
        ethers.utils.formatUnits(totalUnderlyingInVault) +
        " user underlyingInVault: " +
        ethers.utils.formatUnits(userUnderlyingInVault.toString()) +
        " user sharesFromUnderlying: " +
        ethers.utils.formatUnits(userSharesFromUnderlying.toString());
      console.log(result);
    }
  }

export async function checkSingleBalance(signer: SignerWithAddress, vaultContract: Contract) {
      const vaultInstance = vaultContract.connect(signer);
      const userUnderlyingInVault = await vaultInstance.assetsOf(signer.address);
      const userSharesFromUnderlying = await vaultInstance.previewRedeem(userUnderlyingInVault);
      const totalUnderlyingInVault = await vaultInstance.totalAssets();
      const result =
        "totalAssets: " +
        ethers.utils.formatUnits(totalUnderlyingInVault) +
        " user underlyingInVault: " +
        ethers.utils.formatUnits(userUnderlyingInVault.toString()) +
        " user sharesFromUnderlying: " +
        ethers.utils.formatUnits(userSharesFromUnderlying.toString());
      console.log(result);
    
  }

export async function vaultBalanceSheet(vaultContract: Contract, strategyContract: Contract) {
    const balance = await vaultContract.balance();
    console.log("balance:", ethers.utils.formatUnits(balance.toString()))
    const balanceOf = await strategyContract.balanceOf()
    console.log("balanceOf:", ethers.utils.formatUnits(balanceOf.toString()));
    const balanceC = await strategyContract.balanceC()
    console.log("balanceC:", ethers.utils.formatUnits(balanceC.toString()));
    const balanceCInToken = await strategyContract.balanceCInToken()
    console.log("balanceCInToken:", ethers.utils.formatUnits(balanceCInToken.toString()));
  }

export async function mineBlocks() {
    for (let index = 0; index < 10; index++) {
      console.log("mining block", index);
      await ethers.provider.send("evm_mine", []);
    }
  }