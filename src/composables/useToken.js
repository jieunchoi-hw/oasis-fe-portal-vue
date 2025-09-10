const PUBLIC_KEY_BASE64 = import.meta.env.VITE_PUBLIC_KEY_BASE64;

// base64url → base64
const base64UrlToBase64 = (base64url) => {
  return base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(base64url.length / 4) * 4, '=');
}

// base64를 UTF-8 문자열로 디코딩
const base64ToUtf8 = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

// base64 → Uint8Array
function base64ToUint8Array(b64) {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

// PEM → WebCrypto용 PublicKey (SPKI)
async function importEd25519PublicKeyFromPem(spkiBase64) {
  const spkiBytes = base64ToUint8Array(spkiBase64);

  const cryptoKey = await crypto.subtle.importKey(
    'spki',
    spkiBytes.buffer,
    { name: 'Ed25519' },
    false,
    ['verify']
  );

  return cryptoKey;
}

export function useToken() {
  const verifyToken = async (jwt) => {
    try {
      const [encodedHeader, encodedPayload, encodedSignature] = jwt.split('.');
      if (!encodedHeader || !encodedPayload || !encodedSignature) {
        throw new Error('Invalid JWT structure');
      }

      const header = JSON.parse(base64ToUtf8(base64UrlToBase64(encodedHeader)));
      const payload = JSON.parse(base64ToUtf8(base64UrlToBase64(encodedPayload)));
      if (header.alg !== 'EdDSA') {
        throw new Error(`Unexpected alg: ${header.alg}`);
      }
    
      const signedData = `${encodedHeader}.${encodedPayload}`;
      const messageBytes = new TextEncoder().encode(signedData);
      const signatureBytes = base64ToUint8Array(base64UrlToBase64(encodedSignature));

      const cryptoKey = await importEd25519PublicKeyFromPem(PUBLIC_KEY_BASE64);

      const isValid = await crypto.subtle.verify(
        { name: 'Ed25519' },
        cryptoKey,
        signatureBytes,
        messageBytes
      )

      return isValid ? payload : null;
    } catch (e) {
      console.error('verifyToken failed: ', e.message);
      return null;
    }
  };

  return {
    verifyToken,
  };
}
