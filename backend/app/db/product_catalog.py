PRODUCT_CATALOG: tuple[dict[str, str | int], ...] = (
    {
        "id": "nano-titanium-windshield-umbrella",
        "sku": "WAZ-UMB-NT01",
        "slug": "nano-titanium-windshield-umbrella",
        "name_ar": "مظلة وازن النانو-تيتانيوم الحرارية للزجاج الأمامي",
        "name_en": "Nano-Titanium Windshield Umbrella",
        "headline_ar": "افتحها بثوانٍ واحمِ المقود والطبلون من الشمس المباشرة",
        "subheading_ar": "طبقة نانو-تيتانيوم عاكسة وتصميم مظلة سريع يناسب معظم السيارات.",
        "price_1": 199,
        "price_2": 279,
        "price_3": 349,
        "sort_order": 1,
    },
    {
        "id": "wazzen-glassguard-chip-system",
        "sku": "WAZ-GLS-GG01",
        "slug": "wazzen-glassguard-chip-system",
        "name_ar": "نظام وازن GlassGuard لإصلاح نقر الزجاج الأمامي",
        "name_en": "WAZZEN GlassGuard Windshield Chip System",
        "headline_ar": "عالج النقرة المناسبة قبل أن تتمدد إلى شرخ أكبر",
        "subheading_ar": "نظام حقن ريزن عملي للنقر النجمية والدائرية الصغيرة في الزجاج الأمامي المصفح.",
        "price_1": 199,
        "price_2": 279,
        "price_3": 349,
        "sort_order": 2,
    },
    {
        "id": "wazzen-airsafe-tire-inflator",
        "sku": "WAZ-AIR-AS01",
        "slug": "wazzen-airsafe-tire-inflator",
        "name_ar": "منفاخ وازن AirSafe الذكي للإطارات بإيقاف تلقائي",
        "name_en": "WAZZEN AirSafe Auto-Stop Tire Inflator",
        "headline_ar": "اضبط الضغط المطلوب — واترك AirSafe يتوقف تلقائياً",
        "subheading_ar": "منفاخ محمول بشاشة رقمية وقياس ضغط وإضاءة طوارئ لرحلات أكثر استعداداً.",
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
