import React, { useState, useEffect } from "react";
import { NftsData } from "../data";
import Modal from "./Modal";

import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASEURL;
const ownerAddress = import.meta.env.VITE_APP_OWNER_ADDRESS;

const NftGrid = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    const fetchNfts = async () => {
      const response = await axios.get(`${baseURL}?owner=${ownerAddress}`);
      const data = response.data;
      setNfts(data.ownedNfts);
      console.log(data);
    };
    fetchNfts();
  }, []);
 

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
  };

  const handleModalClose = () => {
    setSelectedNft(null);
  };

  const handlePurchaseClick = (nft) => {
    window.open(nft.contractMetadata.openSea.externalUrl);
  };

  const checkips = (imageurl) => {
    if (imageurl) {
      return imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else {
      return imageurl;
    }
  };

  return (
    <>
      <h1 className="title">NFTs listing</h1>
      <div class="container">
              {nfts.map((nft, index) => (
          
          <div className="card" onClick={() => handleNftClick(nft)} key={index}>
            <div className="card-img">
              <img
                src={checkips(nft?.contractMetadata.openSea?.imageUrl)}
                alt={nft.contractMetadata.openSea.collectionName}
                className="card-img"
              />
            </div>
            <div className="desc">
              <h3>{nft.contractMetadata.openSea.collectionName}</h3>
              <p>
                {nft.contractMetadata.openSea.description && nft.contractMetadata.openSea.description.split(" ").splice(0, 30).join(" ") || "Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque i"}
              </p>
                            <div class="detail">
                                <div class="coin">
                                    <img src={nft.contractMetadata.openSea.imageUrl}  alt={nft.contractMetadata.openSea.collectionName} id="loading"/>
                                  <p>{ nft.contractMetadata.openSea.floorPrice}</p>
                                </div>
                              <div class="day-detail">
                                    <p>{nft.contractMetadata.tokenType}</p>
                                </div>
                            </div>
              <div className="line"></div>
              
            </div>
          </div>
        ))}
      </div>

      {selectedNft && (
        <Modal handleClose={handleModalClose}>
          <div className="nft-details">
            <img
              src={selectedNft.contractMetadata.openSea.imageUrl}
              alt={selectedNft.contractMetadata.openSea.collectionName}              
            />
            <h2>{selectedNft.contractMetadata.openSea.collectionName}</h2>
            <p>Description: {selectedNft.contractMetadata.openSea.description}</p>
            <p className="owner_address">
              <span>Owner Address</span>: {selectedNft.contract.address}
            </p>
            <button onClick={() => handlePurchaseClick(selectedNft)}>
              Purchase NFT
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NftGrid;
