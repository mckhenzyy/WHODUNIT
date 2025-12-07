# from ai.model_loader import generate_text
# import random

# def generate_crime_story():
#     prompt = """
# You are an AI mystery writer. Create a crime story for a detective game.
# Keep it 4–6 paragraphs. Include:
# - The setting
# - The victim
# - The crime
# - At least 4 suspects, each with motives
# - Hidden details the detective must uncover
# Do NOT reveal the culprit.
# Write it in a professional, immersive tone.
# Story:
# """
#     story = generate_text(prompt, max_tokens=400)
#     return story


# def extract_suspects(story):
#     prompt = f"""
# Story:
# {story}

# List EXACTLY 4 suspects from the story.
# Return only names separated by commas.
# Example: "Anna Cruz, John Delos Reyes, Mark Tan, Sofia Lim"
# Suspects:
# """
#     result = generate_text(prompt, max_tokens=40)
#     suspects = [s.strip() for s in result.split(",")][:4]
#     return suspects


# def pick_culprit(suspects):
#     return random.choice(suspects)


# def generate_clue(story, culprit, strength="weak"):
#     if strength == "weak":
#         clarity = "Give a subtle clue that hints at the culprit but does NOT reveal them."
#     else:
#         clarity = "Give a stronger clue, but still do NOT reveal the culprit directly."

#     prompt = f"""
# Story:
# {story}

# Culprit: {culprit}

# {clarity}
# Clue:
# """
#     return generate_text(prompt, max_tokens=80)


# def generate_chat_reply(story, suspects, message):
#     prompt = f"""
# You are an AI detective assistant in a mystery game.
# Story:
# {story}

# Suspects: {", ".join(suspects)}
# The player said: "{message}"

# Respond with helpful investigative information, theories, or character behavior.
# NEVER reveal the culprit. NEVER say who did it.
# Reply:
# """
#     return generate_text(prompt, max_tokens=120)


# def generate_final_reveal(story, culprit):
#     prompt = f"""
# Write the final reveal for a detective game.
# Culprit: {culprit}
# Story:
# {story}

# Explain:
# - how the culprit committed the crime
# - their motive
# - key clues
# - how the detective solved it
# Write it dramatically.

# Final Reveal:
# """
#     return generate_text(prompt, max_tokens=300)



# from ai.model_loader import generate_text
# import random

# # def generate_crime_story():
# #     prompt = """
# # Write a detective crime story for a mystery game.
# # Tone: dramatic, thrilling, cinematic — like a crime movie — but still easy to understand.

# # Rules:
# # - Use clear English, not deep or poetic.
# # - Keep the story 4–5 paragraphs.
# # - Make it suspenseful and intense, but readable.
# # - Always finish the story (never cut mid-sentence).
# # - Include:
# #   • the setting (atmospheric, tense)
# #   • the victim
# #   • what happened
# #   • EXACTLY 4 suspects
# #   • Each suspect must have a simple but strong motive
# # - Build tension and mystery.
# # - Do NOT reveal the culprit.
# # - No difficult vocabulary. No overly long sentences.

# # Write the full story now:
# # """
# #     story = generate_text(prompt, max_tokens=550)
# #     return story

# def generate_crime_story():
#     prompt = """
# Write a UNIQUE detective crime story for a mystery game.

# Requirements:
# - MUST be completely different from typical mansion murders.
# - Randomize the setting (examples: modern city, resort, cruise ship, school reunion, hardware store, festival, remote mountain lodge, Filipino coastal town, etc.)
# - Randomize the time period (can be 1980s, present day, summer, rainy season, Christmas eve, etc.)
# - Randomize the type of crime (poisoning, staged accident, disappearance, stabbing, drowning, electrocution, etc.)
# - Story must contain 4 unique suspects — all with different personality, role, and motive.
# - Each suspect MUST be connected to the setting in different ways.
# - Avoid mansion/study/office clichés.
# - Avoid generic clues like “torn fabric”, “footprints”, “study room”, “office desk”, or “broken glass”.
# - Use easy English but maintain drama and tension like a crime movie.
# - Keep 4–5 paragraphs.
# - NEVER reveal the culprit.

# Make every new story feel fresh, unpredictable, cinematic, and not similar to previous ones.
# Write the full story:
# """
#     return generate_text(prompt, max_tokens=620)


# def extract_suspects(story):
#     prompt = f"""
# From the story below, extract EXACTLY 4 suspects.

# Rules:
# - Return only the names, separated by commas.
# - No descriptions. No titles. No extra words.
# - Example output: Anna Cruz, Mark Reyes, Liza Tan, John Santos

# Story:
# {story}

# Suspects:
# """
#     result = generate_text(prompt, max_tokens=80)
#     suspects = [s.strip() for s in result.split(",")][:4]
#     return suspects



# def pick_culprit(suspects):
#     return random.choice(suspects)


# # def generate_clue(story, culprit, strength="weak"):
# #     clarity = (
# #         "Give a slight, indirect clue. Do NOT reveal the culprit."
# #         if strength == "weak"
# #         else "Give a clearer but still indirect clue. Never reveal the culprit."
# #     )

# #     prompt = f"""
# # Story: {story}

# # Culprit: {culprit}

# # {clarity}

# # Write one clue only:
# # """
# #     return generate_text(prompt, max_tokens=100)


# def generate_clue(story, culprit, strength="weak"):
#     clue_rule = (
#         "Give a subtle hint. It must NOT be about torn fabric, footprints, or generic objects. Use creative clues like behavior, timing, suspicious actions, contradictions, unusual noise, missing items, or small inconsistencies."
#         if strength == "weak"
#         else "Give a stronger hint but STILL indirect. Must be a NEW type of clue: timeline conflict, motive shift, strange detail from crime scene, unique object, or witness statement. Never reveal the culprit."
#     )

#     prompt = f"""
# Crime story:
# {story}

# Suspected culprit: {culprit}

# {clue_rule}

# Write ONE single clear clue. Do not repeat clues from typical crime stories.
# Clue:
# """
#     return generate_text(prompt, max_tokens=120)



# # def generate_chat_reply(story, suspects, message):
# #     prompt = f"""
# # You are a detective assistant inside a mystery game.

# # Story:
# # {story}

# # Suspects: {", ".join(suspects)}

# # The player said: "{message}"

# # Respond with helpful insight (clues, behavior, patterns, inconsistencies),
# # but NEVER say or hint directly who the culprit is.
# # Keep replies 1–3 sentences.
# # """
# #     return generate_text(prompt, max_tokens=150)

# def generate_chat_reply(story, suspects, message):
#     prompt = f"""
# You are a detective assistant in a murder mystery game.

# THE STORY:
# {story}

# SUSPECTS (only these 4, never add new ones):
# {", ".join(suspects)}

# PLAYER'S QUESTION:
# "{message}"

# RULES:
# - You MUST answer in full sentences, never cut off mid-thought.
# - Keep replies 3–6 sentences long.
# - If the player asks for suspects, ALWAYS mention all 4 names with short backgrounds based on the story.
# - Never invent new suspects or locations outside the story.
# - Never reveal or hint the culprit directly.
# - You may analyze behavior, contradictions, motives, timelines, or suspicious details.
# - Stay dramatic, cinematic, and helpful like a real detective partner.

# Now give your complete reply:
# """
#     return generate_text(prompt, max_tokens=280)



# # def generate_final_reveal(story, culprit):
# #     prompt = f"""
# # Write the FINAL REVEAL of this crime story.

# # Culprit: {culprit}

# # Explain:
# # - how they committed the crime
# # - their motive
# # - the key clues that pointed to them
# # - how the detective solved the case

# # Make it dramatic and satisfying.
# # """
# #     return generate_text(prompt, max_tokens=300)


# def generate_final_reveal(story, culprit):
#     prompt = f"""
# You are writing the final reveal of a murder mystery game.

# IMPORTANT RULES:
# - Your explanation MUST strictly match the events, setting, clues, and details found in the story below.
# - Do NOT invent new locations, objects, events, or characters that are NOT in the story.
# - NEVER introduce new suspects. Only use characters mentioned in the story.
# - The culprit is: {culprit}
# - Explain the crime in a dramatic, cinematic way, like a detective movie.
# - Explain:
#     • how the culprit committed the crime (must logically connect to story details)
#     • their motive (must match or expand logically from story events)
#     • how the clues pointed to them
#     • why the other suspects were misleading or suspicious
#     • how the detective finally uncovered the truth
# - Keep the explanation 3–5 well-written paragraphs.
# - Absolutely NO generic plots like “hidden key”, “study room”, or “torn fabric” unless the story itself mentioned it.

# Story:
# {story}

# Now write the FINAL REVEAL:
# """
#     return generate_text(prompt, max_tokens=420)




# from ai.model_loader import generate_text
# import random

# # ============================================
# # 1 — STORY GENERATOR
# # ============================================
# def generate_crime_story():
#     prompt = """
# Write a UNIQUE, THRILLING, and UNPREDICTABLE detective mystery story.

# You MUST deliver a complete story with a clear ending. 
# Do NOT stop abruptly. Do NOT trail off. 
# If the story is getting long, summarize the final moments instead of cutting mid-sentence.
# Never end with “but...” or “and then...” or anything incomplete.

# GENRE MIXING (must choose at least 1 combo):
# - crime + heist
# - crime + horror tension (NO ghosts; fear must be grounded in realism)
# - crime + survival
# - crime + thriller
# - crime + psychological drama
# - crime + urban legend atmosphere
# - crime + disaster setting (storm, blackout, earthquake, flood, etc.)

# SETTING RULES:
# - Must avoid mansions, offices, corporate buildings.
# - Choose a **fresh, cinematic setting** (examples only): 
#   • abandoned carnival during a rainstorm 
#   • pier in a coastal Filipino town during fiesta night  
#   • blackout inside an old hospital  
#   • remote mountain eco-camp  
#   • overcrowded night market  
#   • underwater tunnel walkway  
#   • derailed train  
#   • flooded barangay center  
#   • cruise ship rehearsal hall  
#   • rooftop party during a city-wide blackout  
#   • arcade tournament  
#   • heist staging warehouse  
# - The setting must affect the story.

# STORY RULES:
# - The crime must NOT be obvious. It should create misdirection.
# - The cause of the crime must be ANYTHING except the usual stabbing/poisoning cliché.
#   Examples: tampered equipment, rigged pyrotechnics, gas leak sabotage, drowning disguised as accident, staged disappearance, explosive trap, fall from height, etc.
# - Introduce 4 UNIQUE suspects with:
#   • different motivations
#   • different connections to the victim
#   • contrasting personalities
#   • misleading traits (red herrings)

# WRITING RULES:
# - Use simple English.
# - Keep tone cinematic, tense, and atmospheric.
# - Keep story 4–6 SHORT paragraphs.
# - Make the story feel like a movie scene.
# - Add at least one surprising twist or contradiction that misleads the player.
# - DO NOT reveal the culprit.

# AVOID:
# - torn fabric, footprints, broken glass, hidden keys
# - cliché names (no Jack, Emma, John, Sarah, Mark, Michael)
# - obvious motivations

# Write the full, original mystery now:
# """
#     return generate_text(prompt, max_tokens=700)



# # ============================================
# # 2 — SUSPECT EXTRACTION
# # ============================================
# def extract_suspects(story):
#     prompt = f"""
# Extract EXACTLY 4 suspect names from the story.

# Rules:
# - Names only, no descriptions.
# - Separate with commas.
# - Do not invent new characters.

# Story:
# {story}

# Suspects:
# """
#     result = generate_text(prompt, max_tokens=80)
#     suspects = [s.strip() for s in result.split(",")][:4]
#     return suspects


# # ============================================
# # 3 — PICK CULPRIT
# # ============================================
# def pick_culprit(suspects):
#     return random.choice(suspects)


# # ============================================
# # 4 — CLUE GENERATOR (FIXED)
# # ============================================
# def generate_clue(story, culprit, strength="weak"):
#     clue_rule = (
#         "Give a subtle psychological or behavioral clue. No names. No roles. No physical evidence. Only describe atmosphere, timing oddities, contradictions, or human behavior."
#         if strength == "weak"
#         else "Give a stronger but still indirect clue. No names. No roles. No physical evidence. Focus on timeline conflict, emotional reaction, or unusual detail that contradicts earlier statements."
#     )

#     prompt = f"""
# Story:
# {story}

# Culprit (DO NOT MENTION): {culprit}

# {clue_rule}

# Write ONE clue only.
# Keep it 1–3 sentences.
# Do NOT end in the middle of a sentence.
# Clue:
# """
#     return generate_text(prompt, max_tokens=90)



# # ============================================
# # 5 — CHAT REPLY (STRONGEST FIX)
# # ============================================
# def generate_chat_reply(story, suspects, message):
#     prompt = f"""
# You are a sharp, cinematic, detective AI partner.

# STORY:
# {story}

# VALID SUSPECTS ONLY: {", ".join(suspects)}

# PLAYER QUESTION:
# "{message}"

# RULES:
# - Reply in 1–4 complete sentences.
# - Focus ONLY on the question asked.
# - If the player asks about one suspect, talk ONLY about that suspect.
# - If the player asks about all suspects, briefly summarize all four.
# - Never introduce new characters or reveal the culprit.
# - Keep replies tense, helpful, and movie-like.
# - DO NOT ramble. DO NOT add extra story.

# Now respond:
# """
#     return generate_text(prompt, max_tokens=140)


# # ============================================
# # 6 — FINAL REVEAL (MATCHES STORY PERFECTLY)
# # ============================================
# def generate_final_reveal(story, culprit):
#     prompt = f"""
# Write the FINAL REVEAL of the mystery.

# CULPRIT: {culprit}

# STRICT RULES:
# - Every detail MUST match the story.
# - NO new characters, objects, tools, or events may be added.
# - Reveal must feel like a twist but still logical.
# - Explain:
#     • how the culprit executed the crime
#     • why their motive wasn’t obvious early on
#     • how each clue pointed toward them
#     • how the detective eliminated the other suspects
# - Tone: dramatic, tense, cinematic.
# - 2–4 paragraphs MAX.

# Story:
# {story}

# Write the final reveal:
# """
#     return generate_text(prompt, max_tokens=380)




# from ai.model_loader import generate_text
# import random

# # =====================================================
# # 1 — STORY GENERATOR (UNIQUE + COMPLETE + NOT OBVIOUS)
# # =====================================================
# # def generate_crime_story():
# #     prompt = """
# # You are generating a detective mystery story. 
# # The story MUST feel FRESH, DIFFERENT, and NEVER similar to previous ones.

# # Before writing, RANDOMLY choose from these lists (but do NOT show the list in the story):

# # GENRES (pick 1–2):
# # - crime + heist
# # - crime + survival
# # - crime + psychological thriller
# # - crime + urban legend atmosphere (but no monsters)
# # - crime + disaster (storm, earthquake, blackout, flood)
# # - crime + cyber sabotage
# # - crime + smuggling
# # - crime + racing underground
# # - crime + maritime mystery
# # - crime + cave or tunnel rescue
# # - crime + abandoned building tension

# # SETTINGS (pick 1 unique location):
# # - old Manila cinema during blackout
# # - Davao night market
# # - Cavite underground racing strip
# # - Iloilo pier at low tide
# # - Baguio foggy eco-trail
# # - abandoned textile factory
# # - Subic shipyard warehouse
# # - Visayas island fiesta
# # - Cebu ferry terminal
# # - Mindoro dive site
# # - storm-damaged lighthouse
# # - derailed provincial train
# # - remote mountain radio tower
# # - fishing village breakwater
# # - rooftop drone show event
# # - coastal carnival undergoing evacuation

# # NAME STYLE (use 100% unique mix):
# # Include Filipino + international + creative names.
# # Avoid: Jack, Emma, Sarah, Mark, John, Michael.

# # CRIME (pick ONE unusual type):
# # - sabotage of equipment
# # - disappearance during evacuation
# # - tampered pyrotechnics
# # - drowning staged as accident
# # - fall caused by switched harness
# # - power sabotage leading to fatality
# # - gas leak triggered intentionally
# # - rigged drone or device malfunction
# # - collapse caused intentionally
# # - staged heist gone wrong
# # - poisoning disguised as heatstroke
# # - sabotage of vehicle or boat

# # FINAL RULES:
# # - Keep story 4–6 short paragraphs.
# # - MUST contain EXACTLY 4 suspects (unique personalities & motives).
# # - The suspects must be LISTED as bullet points under a heading “SUSPECTS”.
# # - No extra named characters besides the 4 suspects + victim.
# # - Mystery must feel cinematic, atmospheric, and DIFFERENT every time.
# # - Never end abruptly. Finish the final paragraph cleanly.
# # - Never reveal the culprit.

# # Now write the story:
# # """
# #     return generate_text(prompt, max_tokens=680)

# def generate_crime_story():
#     prompt = """
# You are generating a UNIQUE and **fun cinematic detective story** for a mystery game.

# ⛔ DO NOT repeat previous story themes.  
# ⛔ DO NOT use carnival or festival themes more than once.  
# ⛔ DO NOT reuse characters from older stories.  
# ⛔ Avoid generic murder styles.

# Instead, every story should feel:
# ✔ fresh  
# ✔ unpredictable  
# ✔ atmospheric  
# ✔ mysterious  
# ✔ slightly dramatic or humorous

# ---------------------------------
# 🎲 RANDOMIZE STORY STYLE (pick 1)
# ---------------------------------
# - dark but sarcastic detective tone
# - serious thriller with emotional depth
# - comedic whodunit like Clue or Knives Out
# - gritty slow-burn noir style
# - chaotic but funny mystery

# ---------------------------------
# 🎭 RANDOMIZE SETTING (pick 1)
# ---------------------------------
# Use **REAL everyday Filipino or global places**, but make them cinematic:

# Examples:
# - airplane runway during delay
# - remote eco-resort island
# - chaotic wet market at closing time
# - old library hidden during renovation
# - broken elevator in a hotel with strangers
# - abandoned radio station
# - remote mountain cabin during storm
# - space-themed cafe in Makati

# ⚠️ Must feel **different each game.**

# ---------------------------------
# 💀 THE CRIME (Choose unique one)
# ---------------------------------
# One of these (or create a realistic unusual one):

# - locked-room disappearance
# - staged accident
# - mechanical sabotage
# - switched item leading to injury
# - rigged prop or equipment failure
# - mysterious object swapped
# - tampered communication or safety gear

# ---------------------------------
# 👥 SUSPECT LIST REQUIREMENTS
# ---------------------------------
# Return EXACTLY **four suspects**, each with:

# - Name (unique, NEVER repeat)
# - Distinct tone, personality, voice
# - A fun or unexpected motive
# - 1–2 sentences each, short but memorable

# Examples of tones:
# ✔ sarcastic IT intern
# ✔ anxious but overly polite lawyer
# ✔ influencer obsessed with attention
# ✔ retired teacher with suspicious calm

# ---------------------------------
# 🕵️‍♂️ FORMAT OUTPUT EXACTLY LIKE THIS:
# ---------------------------------

# TITLE

# Paragraph 1 — setting + atmosphere  
# Paragraph 2 — crime description

# SUSPECTS:
# - Name — motive/personality (1–2 sentences)
# - Name — motive/personality
# - Name — motive/personality
# - Name — motive/personality

# Paragraph 3 — weird contradictions, behaviors
# Paragraph 4 — twist (but do NOT reveal culprit)

# ---------------------------------

# Rules:
# - 4–6 paragraphs total.
# - Never reveal culprit.
# - Make story **engaging, funny, mysterious** — NOT robotic.

# Start writing the full story now:
# """
#     return generate_text(prompt, max_tokens=850)


# # =====================================================
# # 2 — SUSPECT EXTRACTION (STABLE)
# # =====================================================
# def extract_suspects(story):
#     prompt = f"""
# Extract EXACTLY the four suspect names from the SUSPECTS section of the story.

# RULES:
# - Return ONLY 4 names.
# - Names only, separated by commas.
# - Do NOT add titles or descriptions.
# - Do NOT invent names not in the SUSPECTS list.

# Story:
# {story}

# Suspects:
# """
#     result = generate_text(prompt, max_tokens=40)
#     suspects = [s.strip() for s in result.split(",")][:4]
#     return suspects


# # =====================================================
# # 3 — RANDOM CULPRIT PICK
# # =====================================================
# def pick_culprit(suspects):
#     return random.choice(suspects)



# # =====================================================
# # 4 — CLUE GENERATOR (SHORT + NOT OBVIOUS)
# # =====================================================
# def generate_clue(story, culprit, strength="weak"):
#     rule = (
#         "Write a helpful clue that makes the player THINK. Must connect to timeline, or personality — NOT random poetry. Must be short (1-2 sentences) and understandable for normal players."
#         if strength == "weak"
#         else "Write a stronger clue (1–2 sentences). Still do NOT mention names. It should point toward the culprit using logic, timeline gaps, contradictions, or emotional tells."
#     )

#     prompt = f"""
# Story:
# {story}

# Culprit (do NOT say this name): {culprit}

# {rule}

# Rules:
# - DO NOT name suspects.
# - NO random metaphors.
# - Must feel realistic — like a detective insight.
# - Must NOT fully solve the mystery.

# Write the clue now:
# """
#     return generate_text(prompt, max_tokens=120)




# # =====================================================
# # 5 — CHAT REPLIES (SHORT + ALWAYS COMPLETE)
# # =====================================================
# def generate_chat_reply(story, suspects, message):
#     prompt = f"""
# You are a detective assistant inside a mystery game.

# STORY CONTEXT:
# {story}

# VALID SUSPECTS: {", ".join(suspects)}

# PLAYER ASKS:
# "{message}"

# RULES:
# - Reply in 1–4 complete sentences.
# - NEVER invent new characters or events.
# - If asked about ONE suspect → talk ONLY about that suspect.
# - If asked about ALL → summarize all four briefly.
# - Never reveal or hint the culprit.
# - Keep explanations simple, cinematic, and clear.
# - Do NOT switch suspects.
# - Do NOT add deep vocabulary.

# Now reply:
# """
#     return generate_text(prompt, max_tokens=160)



# # =====================================================
# # 6 — FINAL REVEAL (MATCHES THE ACTUAL STORY)
# # =====================================================
# def generate_final_reveal(story, culprit):
#     prompt = f"""
# Write the FINAL REVEAL for this exact story.

# THE CULPRIT: {culprit}

# RULES:
# - MUST match the story exactly.
# - No new places, tools, characters, motives, or objects.
# - Explanation must use the same crime method from the story.
# - Explain:
#     • how the culprit committed the crime
#     • their true motive
#     • how the clues pointed to them
#     • why the other suspects seemed guilty at first
# - Tone: cinematic, exciting, satisfying.
# - Length: 2–4 full paragraphs.
# - Ending must be complete, not cut off.

# Story:
# {story}

# Write the final reveal:
# """
#     return generate_text(prompt, max_tokens=420)



from ai.model_loader import generate_text
from services.firebase_service import FirebaseService
from ai.story_blueprint import generate_blueprint
import random, re

firebase = FirebaseService()



def ensure_memory_structure():
    """Ensures Firebase memory has all required keys so no KeyErrors happen."""
    default_structure = {
        "settings": [],
        "crimes": [],
        "themes": [],
        "tones": [],
        "names": [],
        "used_names": [],
        "used_settings": [],
        "used_themes": []
    }

    memory = firebase.get("/story_memory") or {}

    changed = False
    for key, default_value in default_structure.items():
        if key not in memory:
            memory[key] = default_value
            changed = True

    if changed:
        firebase.set("/story_memory", memory)

    return memory


# =====================================================
# 1 — IMPROVED STORY GENERATOR WITH MEMORY + BLUEPRINT
# =====================================================

# from ai.model_loader import generate_text
# from services.firebase_service import FirebaseService
# import random

# firebase = FirebaseService()


def generate_story_blueprint():
    """Generates unique story components with memory filtering."""
    
    memory = ensure_memory_structure()


    prompt = """
Generate 12 unique murder mystery scenarios.

Each scenario must include:

SETTING (unique location that feels cinematic and realistic, avoid cliché mansions)
PERIOD (year/time like 'rainy season', 'Christmas Eve', 'near-future', etc.)
CRIME METHOD (mechanical sabotage, faked accident, rigged system, disappearance, tampered item—not stabbing or poison by default)
THEME (jealousy / greed / betrayal / corruption / revenge / rivalry / secrecy)
TONE (randomly pick one: dark serious detective, chaotic comedic whodunnit, thriller suspense, realistic crime drama, psychological mystery)
VICTIM TYPE (profession or identity)
DO NOT reveal a killer.

Format strictly like:

SETTING: ...
PERIOD: ...
CRIME METHOD: ...
THEME: ...
TONE: ...
VICTIM: ...
---
"""

    raw = generate_text(prompt, max_tokens=600).strip().split("---")

    # filter out previously used ideas
    fresh = []
    for entry in raw:
        entry = entry.strip()
        if not entry:
            continue
        if entry not in memory["settings"] and entry not in memory["crimes"]:
            fresh.append(entry)

    if not fresh:
        # reset memory when exhausted
        firebase.set("/story_memory", {
            "settings": [],
            "crimes": [],
            "themes": [],
            "tones": [],
            "names": []
        })
        return generate_story_blueprint()

    chosen = random.choice(fresh)

    # store blueprint reference to avoid repetition
    memory["settings"].append(chosen)
    firebase.set("/story_memory", memory)

    return chosen



def generate_crime_story():
    memory = ensure_memory_structure()

    used_names = ", ".join(memory.get("used_names", [])) or "None"
    used_settings = ", ".join(memory.get("used_settings", [])) or "None"
    used_themes = ", ".join(memory.get("used_themes", [])) or "None"

    blueprint = generate_story_blueprint()

    prompt = f"""
Using the following blueprint, write a completely fresh, cinematic murder mystery:

BLUEPRINT:
{blueprint}

🚫 Do NOT reuse the following:
- Names used before: {used_names}
- Settings used before: {used_settings}
- Themes used before: {used_themes}

RULES:
- 4–6 paragraphs.
- Include:
  • a unique setting
  • a victim identity
  • an unusual crime method (not stabbing/poison unless story context demands it)
  • EXACTLY 4 suspects with unique names and motives
- Names MUST NOT be similar in sound or pattern.
- Make tone consistent with the blueprint.
- Story must be unpredictable and must NOT feel similar to older stories.
- No supernatural themes.
- Do NOT reveal the culprit.

FORMAT:

Title

Paragraph 1 — Setting + tone  
Paragraph 2 — Crime + victim

SUSPECTS:
- Name — motive/personality
- Name — motive/personality
- Name — motive/personality
- Name — motive/personality

Paragraph 3 — contradictions  
Paragraph 4 — twist/cliffhanger (NO reveal)

Write now:
"""

    story = generate_text(prompt, max_tokens=950)

    # Extract new items to memory
    suspects, setting, crime = extract_unique_items(story)
    
    # Update memory safely
    if suspects:
        memory["used_names"].extend([n for n in suspects if n not in memory["used_names"]])
    if setting and setting not in memory["used_settings"]:
        memory["used_settings"].append(setting)
    if crime and crime not in memory["crimes"]:
        memory["crimes"].append(crime)

    firebase.set("/story_memory", memory)

    return story.strip()


# def generate_unique_item(key, options):
#     memory = firebase.get("/story_memory") or {
#         "used_names": [],
#         "used_settings": [],
#         "used_themes": []
#     }

#     used = memory.get(key, [])
#     available = [item for item in options if item not in used]

#     if not available:
#         # Reset memory for that category if everything is exhausted
#         memory[key] = []
#         firebase.set("/story_memory", memory)
#         available = options[:]  # reset to original list

#     choice = random.choice(available)
    
#     # store selection
#     memory[key].append(choice)
#     firebase.set("/story_memory", memory)

#     return choice




def extract_unique_items(story):
    """Extract names, setting, crime style using loose NLP patterns."""
    
    # Try detecting suspects from bullet list or paragraph format
    suspects = re.findall(r"-\s*([A-Z][a-zA-Z]+\s[A-Z][a-zA-Z]+)", story)
    suspects = list(set(suspects))[:4]  # ensure 4 max unique

    # Detect setting (first paragraph main location keywords)
    match_setting = re.search(r"(in|at|inside|near|on)\s+a?n?\s?([A-Za-z\s]+)", story)
    setting = match_setting.group(2).strip() if match_setting else None

    # Detect crime method (look for verbs related to sabotage or unusual crime)
    keywords = ["rigged", "tampered", "sabotaged", "poison", "collapse", "gas leak", "trap"]
    crime = None
    for k in keywords:
        if k.lower() in story.lower():
            crime = k.title()
            break

    return suspects, setting, crime


# def generate_crime_story():
#     memory = firebase.get("/story_memory") or {
#         "used_names": [], "used_settings": [], "used_themes": []
#     }

#     blueprint = generate_blueprint(memory)

#     prompt = f"""
# Write a NEW cinematic and engaging detective mystery story.

# Avoid repeating ANY previously used names:
# {memory['used_names']}

# === STORY REQUIREMENTS ===

# THEME: {blueprint['theme']}
# SETTING: {blueprint['setting']}

# Tone Style (pick ONE naturally):
# - chaotic comedic mystery like Knives Out
# - dark noir with sarcasm
# - intelligent psychological suspense
# - dramatic cinematic thriller with subtle humor

# Crime must be unusual (NOT stabbing/shooting/poison-by-default).
# Use formats like sabotage, hidden tampering, staged disappearance, or access-based crime.

# ===== FORMAT =====

# TITLE

# Paragraph 1 — vivid cinematic setting and tone  
# Paragraph 2 — crime setup  

# SUSPECTS:
# - FOUR suspects, unique names, 1–2 sentences each, motive + suspicious detail

# Paragraph 3 — contradictions, timeline issues, strange facts  
# Paragraph 4 — twist (NO reveal)

# Rules:
# - No revealing the culprit.
# - No reused names.
# - Story MUST remain short, fun, and logical.
# """

#     story = generate_text(prompt, max_tokens=920)
    
#     # RETURN BOTH STORY AND BLUEPRINT (IMPORTANT)
#     return story.strip()





# =====================================================
# 2 — SUSPECT EXTRACTION
# =====================================================
def extract_suspects(story):
    prompt = f"""
Extract EXACTLY four suspect names from the SUSPECTS list in the story.

Return ONLY their names separated by commas.  
NO titles, NO roles, NO descriptions.

Story:
{story}

Names:
"""
    result = generate_text(prompt, max_tokens=40)
    suspects = [s.strip() for s in result.split(",")][:4]
    return suspects


# =====================================================
# 3 — RANDOM CULPRIT PICK
# =====================================================
def pick_culprit(suspects):
    return random.choice(suspects)


# =====================================================
# 4 — SMART CLUE GENERATOR
# =====================================================
# def generate_clue(story, culprit, strength="weak"):
#     clue_type = (
#         "Write a short riddle-logic clue (1–2 sentences). It must help narrow the suspects by referencing access, timeline, or a detail only the culprit could know."
#         if strength == "weak"
#         else "Write a clearer riddle-logic clue (1–2 sentences) that allows the player to logically eliminate at least one suspect based on evidence, timing, or access — but do NOT reveal the culprit."
#     )

#     prompt = f"""
# Generate ONE detective clue based ONLY on logical reasoning from the story below.

# Story:
# {story}

# SECRET CULPRIT (DO NOT NAME THEM): {culprit}

# Rules:
# - Must be EXACTLY 1–2 sentences.
# - Must be based on LOGIC: timeline, access, item usage, or physical evidence.
# - No names, roles, genders, or descriptions.
# - No emotions, reactions, personality analysis, or metaphors.
# - No summarizing the story.
# - The clue must make the player THINK — like a riddle with a grounded factual hint.

# Examples of tone/style (do NOT copy):
# - "The timeline only works if someone had access before everyone else."
# - "Whoever handled the equipment earlier knew something no one else should have."

# Write the clue now:
# """
    
#     return generate_text(prompt, max_tokens=120).strip()


def generate_clue(story, culprit, strength="weak"):
    clue_type = (
        "Subtle — give a clue about a hidden inconsistency, access timing, or detail only the real culprit could logically know. It must NOT be obvious. It should make the player doubt but not solve."
        if strength == "weak"
        else "Stronger — give a clue that eliminates at least ONE suspect or creates serious suspicion using logic (timeline issues, motive contradiction, or physical proximity). Still no names or direct accusation."
    )

    prompt = f"""
You are generating a detective clue from this story:

STORY:
{story}

SECRET CULPRIT (DO NOT SAY THIS NAME): {culprit}

RULES:
- The clue must be based ONLY on story logic: timeline, access, motive contradiction, or knowledge only a guilty person would have.
- Clue must be EXACTLY 1–3 sentences.
- Do NOT mention any suspect names.
- Do NOT confirm the killer.
- Must feel like a detective insight, not narration.
- The clue must push the player toward critical thinking, not give away the solution.

{clue_type}

Write the clue:
"""
    return generate_text(prompt, max_tokens=150).strip()



# =====================================================
# 5 — CHAT REPLY SYSTEM
# =====================================================
# def generate_chat_reply(story, suspects, message):
#     prompt = f"""
# You are a detective assistant in a mystery game.

# STORY:
# {story}

# SUSPECTS: {", ".join(suspects)}

# PLAYER ASKED:
# "{message}"

# Rules:
# - Reply in 1–4 full sentences.
# - If question is about ONE suspect, respond ONLY for that suspect.
# - If general question, respond briefly.
# - NEVER reveal culprit.
# - Keep responses helpful and natural.

# Reply:
# """
#     return generate_text(prompt, max_tokens=180)


def generate_chat_reply(story, suspects, message):
    prompt = f"""
You are a detective assistant inside a mystery-solving game.

STORY CONTEXT:
{story}

VALID SUSPECTS (DO NOT invent new ones):
{", ".join(suspects)}

PLAYER QUESTION:
"{message}"

RULES FOR YOUR RESPONSE:
- Reply in 2–5 sentences MAX.
- If question is about ONE suspect → discuss only that suspect’s motive, timeline, or suspicious contradictions found in the story.
- If about ALL → summarize differences, motives, and behavior logically.
- If the player asks “who is the killer?” → you MUST NOT reveal it. Instead give analysis and encourage investigation.
- If they ask something NOT supported by story facts, respond with:  
  *“There’s nothing in evidence that confirms that yet — but it might become important later.”*
- Tone: sharp, cinematic, investigative — like a real partner.
- DO NOT repeat sentences.
- NEVER reveal the culprit.

Respond now:
"""
    return generate_text(prompt, max_tokens=250).strip()



# =====================================================
# 6 — FINAL REVEAL
# =====================================================
# def generate_final_reveal(story, culprit):
#     prompt = f"""
# Write the FINAL REVEAL.

# CULPRIT: {culprit}

# Include:
# • how the crime was done  
# • motive  
# • how clues pointed to them  
# • why other suspects looked guilty at first  
# • satisfying cinematic ending  

# Rule: DO NOT change or contradict story details.

# Story:
# {story}

# Reveal:
# """
#     return generate_text(prompt, max_tokens=450)


def generate_final_reveal(story, culprit):
    prompt = f"""
You are writing the final dramatic reveal in a detective mystery game.

STORY:
{story}

THE REAL CULPRIT (DO NOT change this): {culprit}

RULES:
- MUST match events, details, setting, tone, and crime method from the story.
- NO new objects, characters, clues, or events that were not previously mentioned.
- Include:
    • How the culprit performed the crime step-by-step
    • Their true motive
    • Why the crime method fit them
    • How the clues pointed to them even when others seemed guilty
    • Why the other suspects appeared suspicious but were innocent
- Tone: confident detective unveiling truth.
- Length: 3–5 paragraphs.
- End with a clean, satisfying closure — NOT a cliffhanger.

Write the reveal now:
"""
    return generate_text(prompt, max_tokens=650).strip()
