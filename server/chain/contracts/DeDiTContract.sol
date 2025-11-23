// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title DeDiTContract - With Chunked Upload + Simple Vial Logic
contract DeDiTContract is ERC721, Ownable {

    // ----------------------------------------------------------------------
    // RATE STORAGE (CHUNK UPLOAD)
    // ----------------------------------------------------------------------

    bytes public ratesBlob; // stores 1001 × 32-byte values

    function uploadRates(bytes calldata chunk, uint256 startIndex)
        external
        onlyOwner
    {
        require(chunk.length % 32 == 0, "Chunk must be multiple of 32 bytes");

        uint256 count = chunk.length / 32;

        for (uint256 i = 0; i < count; i++) {
            bytes32 word;

            assembly {
                word := calldataload(add(chunk.offset, mul(i, 32)))
            }

            uint256 slot;
            assembly {
                let base := ratesBlob.slot
                mstore(0x0, base)
                let dataLoc := keccak256(0x0, 32)

                slot := add(dataLoc, add(startIndex, i))
                sstore(slot, word)
            }
        }
    }

    function getRate(uint256 index) public view returns (uint256 rate) {
        assembly {
            let base := ratesBlob.slot
            mstore(0x0, base)
            let dataLoc := keccak256(0x0, 32)
            let slot := add(dataLoc, index)
            rate := sload(slot)
        }
    }

    // ----------------------------------------------------------------------
    // VIAL STRUCT
    // ----------------------------------------------------------------------

    struct Vial {
        int32 temperature;
        uint256 potency; 
        bool spoiled;
    }

    mapping(uint256 => Vial) public vials;

    event VialMinted(address indexed to, uint256 indexed tokenId);
    event TemperatureUpdated(uint256 indexed tokenId, int32 newTemperature);

    constructor() ERC721("DeDiT", "DIT") Ownable(msg.sender) {}

    // ----------------------------------------------------------------------
    // INTERNAL CHECK — REPLACEMENT FOR _exists()
    // ----------------------------------------------------------------------

    function tokenExists(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }

    // ----------------------------------------------------------------------
    // MINT NEW VIAL
    // ----------------------------------------------------------------------

    function mint(address to, uint256 tokenId) external onlyOwner {
        require(!tokenExists(tokenId), "Already exists");

        _mint(to, tokenId);

        vials[tokenId] = Vial({
            temperature: 25,
            potency: 100,
            spoiled: false
        });

        emit VialMinted(to, tokenId);
    }

    // ----------------------------------------------------------------------
    // MANUAL TEMPERATURE UPDATE
    // ----------------------------------------------------------------------

    function updateTemperature(uint256 tokenId, int32 newTemp) external {
        require(tokenExists(tokenId), "Token does not exist");

        Vial storage v = vials[tokenId];
        v.temperature = newTemp;

        if (newTemp < 10 || newTemp > 40) {
            if (v.potency > 10) {
                v.potency -= 10;
            } else {
                v.potency = 0;
                v.spoiled = true;
            }
        }

        emit TemperatureUpdated(tokenId, newTemp);
    }

    // ----------------------------------------------------------------------
    // VIEW STATUS
    // ----------------------------------------------------------------------

    function getVialStatus(uint256 tokenId)
        external
        view
        returns (int32 temp, uint256 potency, bool spoiled)
    {
        require(tokenExists(tokenId), "Token does not exist");

        Vial memory v = vials[tokenId];
        return (v.temperature, v.potency, v.spoiled);
    }
}
