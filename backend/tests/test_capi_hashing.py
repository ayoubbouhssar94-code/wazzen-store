import hashlib
from app.services.capi_meta import sha256_hex as meta_hash
from app.services.capi_tiktok import sha256_hex as tiktok_hash
from app.services.capi_snap import sha256_hex as snap_hash


def sha256(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


def test_meta_phone_hash():
    # Meta uses digits format: 9665XXXXXXXX
    phone_digits = "966512345678"
    result = meta_hash(phone_digits)
    assert result == sha256(phone_digits)
    assert len(result) == 64


def test_tiktok_phone_hash():
    # TikTok hashes the E.164 value (+9665XXXXXXXX) but only encodes stripped
    phone_e164 = "+966512345678"
    result = tiktok_hash(phone_e164)
    assert len(result) == 64


def test_snap_phone_hash():
    # Snap uses digits with country code, lowercased
    phone_digits = "966512345678"
    result = snap_hash(phone_digits)
    assert result == sha256(phone_digits)


def test_hash_deterministic():
    phone = "966512345678"
    assert meta_hash(phone) == meta_hash(phone)
