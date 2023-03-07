export const checkipfs = (imageurl) => {
    if (imageurl) {
      return imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else {
      return imageurl;
    }
  };