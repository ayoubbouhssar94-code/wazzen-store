import pytest
from app.services.phone import normalize_ksa_phone, PhoneValidationError


def test_normalize_05_format():
    result = normalize_ksa_phone("0512345678")
    assert result["local"] == "0512345678"
    assert result["e164"] == "+966512345678"
    assert result["digits"] == "966512345678"


def test_normalize_5_format():
    result = normalize_ksa_phone("512345678")
    assert result["local"] == "0512345678"
    assert result["e164"] == "+966512345678"
    assert result["digits"] == "966512345678"


def test_normalize_full_digits():
    result = normalize_ksa_phone("966512345678")
    assert result["local"] == "0512345678"
    assert result["e164"] == "+966512345678"
    assert result["digits"] == "966512345678"


def test_normalize_plus_format():
    result = normalize_ksa_phone("+966512345678")
    assert result["local"] == "0512345678"
    assert result["e164"] == "+966512345678"
    assert result["digits"] == "966512345678"


def test_reject_invalid_number():
    with pytest.raises(PhoneValidationError):
        normalize_ksa_phone("123456")


def test_reject_non_saudi():
    with pytest.raises(PhoneValidationError):
        normalize_ksa_phone("0201234567")


def test_reject_landline():
    with pytest.raises(PhoneValidationError):
        normalize_ksa_phone("011234567")


def test_reject_empty():
    with pytest.raises(PhoneValidationError):
        normalize_ksa_phone("")
