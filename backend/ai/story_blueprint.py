import random

def generate_blueprint(memory):
    themes = [
        "chaotic funny detective",
        "dark psychological thriller",
        "sarcastic modern mystery",
        "cinematic emotional crime drama",
        "logic-based puzzle whodunit"
    ]

    settings = [
        "underground VR gaming lounge",
        "abandoned zoo aquarium",
        "train stuck in a tunnel",
        "recording studio blackout",
        "rooftop bar during a thunderstorm",
        "luxury yacht stranded offshore",
        "old library during renovation",
        "science fair robotics exhibit",
        "high-rise wedding rehearsal"
    ]

    # Filter out already used items for freshness
    themes = [t for t in themes if t not in memory.get("used_themes", [])]
    settings = [s for s in settings if s not in memory.get("used_settings", [])]

    # Fail-safe: if empty, reset list
    if not themes: themes = [
        "chaotic funny detective",
        "dark psychological thriller",
        "sarcastic modern mystery"
    ]

    if not settings: settings = [
        "abandoned greenhouse",
        "airport terminal late at night",
        "empty museum after closing"
    ]

    return {
        "theme": random.choice(themes),
        "setting": random.choice(settings)
    }
