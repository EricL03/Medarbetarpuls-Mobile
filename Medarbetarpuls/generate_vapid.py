from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization
import base64

# Generate new EC (elliptic curve) private key
private_key = ec.generate_private_key(ec.SECP256R1())

# Export private key in raw form
private_bytes = private_key.private_numbers().private_value.to_bytes(32, "big")
private_key_b64 = base64.urlsafe_b64encode(private_bytes).decode("utf-8").rstrip("=")

# Export public key in raw uncompressed form
public_key_bytes = private_key.public_key().public_bytes(
    encoding=serialization.Encoding.X962,
    format=serialization.PublicFormat.UncompressedPoint
)
public_key_b64 = base64.urlsafe_b64encode(public_key_bytes).decode("utf-8").rstrip("=")

print("Public VAPID Key:\n", public_key_b64)
print("Private VAPID Key:\n", private_key_b64)

