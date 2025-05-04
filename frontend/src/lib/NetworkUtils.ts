import DeviceUtils from "./DeviceUtils.ts";

const subtle = window.crypto.subtle || window.msCrypto.subtle; // For IE11

class NetworkUtils {
  private static arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
  private static encryptData = async(data) => {
    const encoded_data = new TextEncoder().encode(data);
    const encrypted_data = await subtle.encrypt(
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" }
      },
      await this.getServerKey(),
      encoded_data
    );

    return this.arrayBufferToBase64(encrypted_data);;
  }

  static getWebSocketURL = () => {
    return "https://localhost:3001";
  };

  static getBaseURL = () => {
    return "https://localhost:3000/api";
  };

  static getHeaders = async () => {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${await this.JWT.get(document.cookie)}`,
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

  static JWT = {
    get: async () => {
      return (await DeviceUtils.cookies.get() || { jwttoken: null })["jwttoken"];
    },
    update: async (userhash: string, passhash: string) => {
      await this.getServerKey(); // Ensure the public key is fetched
      const response = await fetch(this.getBaseURL() + "/auth/login", {
        method: "POST",
        headers: await NetworkUtils.getHeaders(),
        body: JSON.stringify({
          user: await this.encryptData(userhash),
          pass: await this.encryptData(passhash),
          twofa: await this.encryptData(passhash)
        })
      });
    },
    validate: async () => {
      const response = await fetch(this.getBaseURL() + "/auth/updateSession", {
        method: "POST",
        headers: await this.getHeaders(),
      });
      const result = await response.json();

      await DeviceUtils.local_data.set(`last_login`, new Date().toISOString() || "Anonymous");
      await DeviceUtils.local_data.set(`username`, result.username || "Anonymous");
      await DeviceUtils.local_data.set(`channels`, result.channels || "Anonymous");

      return result.status;
    }
  }
};

export default NetworkUtils;
