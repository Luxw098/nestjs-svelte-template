import DeviceUtils from "./DeviceUtils";

const subtle = window.crypto.subtle;

class NetworkUtils {
  private static key: CryptoKey;

  private static arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
  private static encryptData = async(data: string | undefined) => {
    const key =  await this.getServerKey();
    if (!key) return;

    const encoded_data = new TextEncoder().encode(data);
    const encrypted_data = await subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      key,
      encoded_data
    );

    return this.arrayBufferToBase64(encrypted_data);;
  };



  static getWebSocketURL = () => {
    return "https://localhost:3001";
  };

  static getBaseURL = () => {
    return "https://localhost:3000/api";
  };

  static getHeaders = async (Authorization?: string) => {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...((Authorization) ? {
        "Authorization": `Bearer ${Authorization}`
      } : {})
    };
  };

  static getServerKey = async () => {
    if (this.key) return this.key;

    const response = await fetch(this.getBaseURL() + "/getKey", {
      method: "GET",
      headers: await this.getHeaders(),
    });
    if (response.status == 401) return;
    const result = await response.json();
    console.log(result.key)
    this.key = await subtle.importKey(
      "spki",
      Uint8Array.from(atob(result.key), (c) => c.charCodeAt(0)).buffer,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" }
      },
      false,
      ["encrypt"]
    );
    return this.key;
  }
};

export default NetworkUtils;
