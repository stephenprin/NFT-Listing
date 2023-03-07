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
  console.log(nfts);
  // useEffect(() => {
  //     setNfts(NftsData);
  //  }, [address]);

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
  };

  const handleModalClose = () => {
    setSelectedNft(null);
  };

  const handlePurchaseClick = (nft) => {
    window.open(nft.permalink);
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
                {nft.contractMetadata.openSea.description && nft.contractMetadata.openSea.description.split(" ").splice(0, 30).join(" ")}
              </p>
              {/* <div class="detail">
                                <div class="coin">
                                    <img src="./images/icon-ethereum.svg" id="loading">
                                    <p>$</p>
                                </div>
                                <div class="day-detail">
                                    <img src="./images/icon-clock.svg">
                                    <p>3 days left</p>
                                </div>
                            </div> */}
              <div className="line"></div>
              {/* <div class="profile">
                                <div class="profile-img">
                                    <img src="./images/image-avatar.png">
                                </div>
                                <P>Creation of Prince Nmezi</P>
                            </div> */}
            </div>
          </div>
        ))}
      </div>

      {selectedNft && (
        <Modal handleClose={handleModalClose}>
          <div className="nft-details">
            <img
              src={selectedNft.metadata.image}
              alt={selectedNft.metadata.name}
            />
            <h2>{selectedNft.metadata.name}</h2>
            <p>Description: {selectedNft.metadata.description}</p>
            <p className="owner_address">
              <span>Owner Address</span>: {selectedNft.contract.address}
            </p>
            <button onClick={() => handlePurchaseClick(selectedNft)}>
              Buy on OpenSea
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NftGrid;
