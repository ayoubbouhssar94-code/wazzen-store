import re


class PhoneValidationError(ValueError):
    pass


def normalize_ksa_phone(raw: str) -> dict[str, str]:
    """
    Normalize a KSA mobile number to three canonical forms.

    Accepts:
    - 05XXXXXXXX  (10 digits)
    - 5XXXXXXXX   (9 digits)
    - 9665XXXXXXXX (12 digits)
    - +9665XXXXXXXX (13 chars)

    Returns:
    - local:  05XXXXXXXX
    - e164:   +9665XXXXXXXX
    - digits: 9665XXXXXXXX
    """
    cleaned = re.sub(r"[\s\-\(\)]", "", raw.strip())

    # Extract the core 9 digits after 5
    core: str | None = None

    if re.fullmatch(r"\+?9665\d{8}", cleaned):
        core = cleaned[-9:]
    elif re.fullmatch(r"05\d{8}", cleaned):
        core = cleaned[1:]
    elif re.fullmatch(r"5\d{8}", cleaned):
        core = cleaned
    else:
        raise PhoneValidationError(
            "رقم الجوال لازم يكون رقم سعودي صحيح مثل 05XXXXXXXX"
        )

    local = f"0{core}"
    e164 = f"+966{core}"
    digits = f"966{core}"

    return {"local": local, "e164": e164, "digits": digits}
