PRODUCT_CATALOG: tuple[dict[str, str | int], ...] = (
    {
        "id": "wazzen-windshield-crack-repair-kit",
        "sku": "WAZ-GLS-CRK01",
        "slug": "wazzen-windshield-crack-repair-kit",
        "name_ar": "عدة وازن لإصلاح شقوق ونقر الزجاج الأمامي",
        "name_en": "WAZZEN Windshield Crack Repair Kit",
        "headline_ar": "عالج النقرة المناسبة قبل أن تتحول إلى شرخ أكبر",
        "subheading_ar": "عدة إصلاح منزلية عملية تساعد على ملء النقر المناسبة وتقليل وضوحها.",
        "price_1": 199,
        "price_2": 279,
        "price_3": 349,
        "sort_order": 1,
    },
    {
        "id": "wazzen-foldable-windshield-umbrella",
        "sku": "WAZ-UMB-FLD01",
        "slug": "wazzen-foldable-windshield-umbrella",
        "name_ar": "مظلة وازن القابلة للطي للزجاج الأمامي",
        "name_en": "WAZZEN Foldable Windshield Sun Umbrella",
        "headline_ar": "افتحها بثوانٍ وقلل حرارة المقود والطبلون وقت الوقوف",
        "subheading_ar": "تصميم مظلة سريع مع طبقة عاكسة لتخفيف أثر الشمس المباشرة داخل السيارة.",
        "price_1": 199,
        "price_2": 279,
        "price_3": 349,
        "sort_order": 2,
    },
    {
        "id": "wazzen-portable-tire-inflator",
        "sku": "WAZ-AIR-PT01",
        "slug": "wazzen-portable-tire-inflator",
        "name_ar": "منفاخ وازن المحمول الذكي للإطارات",
        "name_en": "WAZZEN Portable Smart Tire Inflator",
        "headline_ar": "حدد الضغط المطلوب واترك الجهاز يكمل المهمة تلقائياً",
        "subheading_ar": "منفاخ رقمي محمول للسيارة والدراجة مع قراءة ضغط واضحة وملحقات متعددة.",
        "price_1": 199,
        "price_2": 279,
        "price_3": 349,
        "sort_order": 3,
    },
)

PRODUCT_BY_ID = {str(product["id"]): product for product in PRODUCT_CATALOG}
VALID_PRODUCT_IDS = frozenset(PRODUCT_BY_ID)


def get_product_sku(product_id: str) -> str:
    product = PRODUCT_BY_ID.get(product_id)
    return str(product["sku"]) if product else product_id


def get_product_name_en(product_id: str) -> str:
    product = PRODUCT_BY_ID.get(product_id)
    return str(product["name_en"]) if product else product_id.replace("-", " ").title()


def get_product_name_ar(product_id: str) -> str:
    product = PRODUCT_BY_ID.get(product_id)
    return str(product["name_ar"]) if product and "name_ar" in product else product_id.replace("-", " ").title()
