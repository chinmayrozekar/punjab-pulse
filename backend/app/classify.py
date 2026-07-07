import re

# Order matters: first matching category wins.
CATEGORY_KEYWORDS: list[tuple[str, list[str]]] = [
    ("Crime", [
        "murder", "arrest", "police", "fir lodged", "theft", "robbery", "assault",
        "gangster", "smuggling", "narcotics", "drug racket", "firing", "kidnap",
        "extortion", "custody", "raid", "accused", "convict", "jail term",
    ]),
    ("Politics", [
        "mla", "mp ", "assembly", "minister", "chief minister", "cm ",
        "parliament", "election", "bjp", "congress", "aap", "akali dal",
        "cabinet", "governor", "vidhan sabha", "lok sabha", "rajya sabha",
        "political party", "cm bhagwant mann", "cm mann",
    ]),
    ("Agriculture", [
        "farmer", "crop", "msp", "mandi", "wheat", "paddy", "harvest",
        "irrigation", "kisan", "agriculture", "fertilizer", "stubble burning",
        "sowing", "agri ",
    ]),
    ("Sports", [
        "cricket", "hockey", "kabaddi", "tournament", "olympics", "medal",
        "football", "wrestl", "athlete", "world cup", "ipl ", "match",
    ]),
    ("Religion", [
        "gurdwara", "temple", "shrine", "sikh", "gurpurab", "kirtan",
        "religious", "guru granth", "golden temple", "akal takht", "worship",
    ]),
    ("Events", [
        "festival", "mela", "celebration", "ceremony", "fair ", "concert",
        "exhibition", "carnival",
    ]),
]

DISTRICT_KEYWORDS = [
    "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali",
    "Chandigarh", "Ferozepur", "Moga", "Hoshiarpur", "Gurdaspur", "Kapurthala",
    "Sangrur", "Barnala", "Mansa", "Muktsar", "Faridkot", "Fazilka",
    "Pathankot", "Rupnagar", "Ropar", "Fatehgarh Sahib", "Nawanshahr",
    "Tarn Taran", "Malerkotla", "SBS Nagar",
]

_GURMUKHI_RE = re.compile(r"[਀-੿]")
_DEVANAGARI_RE = re.compile(r"[ऀ-ॿ]")


def detect_language(text: str) -> str:
    non_space = "".join(text.split())
    if not non_space:
        return "en"
    gurmukhi = len(_GURMUKHI_RE.findall(text))
    devanagari = len(_DEVANAGARI_RE.findall(text))
    if gurmukhi / len(non_space) > 0.2:
        return "pa"
    if devanagari / len(non_space) > 0.2:
        return "hi"
    return "en"


def detect_category(text: str) -> str:
    lowered = text.lower()
    for category, keywords in CATEGORY_KEYWORDS:
        if any(keyword in lowered for keyword in keywords):
            return category
    return "General"


def detect_district(text: str) -> str | None:
    for district in DISTRICT_KEYWORDS:
        if re.search(rf"\b{re.escape(district)}\b", text, re.IGNORECASE):
            return district
    return None


def classify(title: str, description: str | None) -> tuple[str, str | None, str]:
    text = f"{title} {description or ''}"
    return detect_category(text), detect_district(text), detect_language(text)
