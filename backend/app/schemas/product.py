from pydantic import BaseModel


class ProductOut(BaseModel):
    id: str
    slug: str
    name_ar: str
    name_en: str
    headline_ar: str
    subheading_ar: str
    price_1: int
    price_2: int
    price_3: int

    model_config = {"from_attributes": True}
