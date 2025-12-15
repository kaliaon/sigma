import google.generativeai as genai
import os
import json
from django.conf import settings

# Configure Gemini API
# Ensure GEMINI_API_KEY is set in your environment variables or settings
GENAI_API_KEY = os.getenv('GEMINI_API_KEY')
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)

def generate_roadmap(user_profile):
    """
    Generates a personalized roadmap (quests) for the user based on their profile.
    """
    if not GENAI_API_KEY:
        print("GEMINI_API_KEY not found.")
        return []

    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    Generate a personalized development roadmap for a user with the following profile:
    - Level: {user_profile.level}
    - XP: {user_profile.xp}
    - Current Streak: {user_profile.current_streak}
    - Language: {user_profile.language}
    
    The roadmap should consist of 5 quests, one for each domain: HEALTH, FINANCE, LEARNING, RELATIONSHIPS, MENTAL.
    
    Return the response ONLY as a valid JSON array of objects with the following structure:
    [
        {{
            "title": "Quest Title",
            "description": "Quest Description",
            "quest_type": "DAILY",
            "domain": "HEALTH",
            "xp_reward": 10,
            "coin_reward": 5
        }},
        ...
    ]
    Do not include markdown formatting or explanations.
    """

    try:
        response = model.generate_content(prompt)
        text = response.text
        # Clean up potential markdown code blocks
        if text.startswith('```json'):
            text = text[7:]
        if text.endswith('```'):
            text = text[:-3]
        
        quests_data = json.loads(text.strip())
        return quests_data
    except Exception as e:
        print(f"Error generating roadmap: {e}")
        return []

def generate_domain_roadmap(user_profile, domain):
    """
    Generates a 5-step roadmap for a specific domain.
    """
    if not GENAI_API_KEY:
        print("GEMINI_API_KEY not found.")
        return []

    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    Generate a 5-step progression roadmap for the domain: {domain} for a user with:
    - Level: {user_profile.level}
    - XP: {user_profile.xp}
    
    Return ONLY a JSON array of 5 objects (steps) sorted by order (1-5):
    [
        {{
            "title": "Step Title",
            "description": "Detailed description of what to achieve.",
            "order": 1,
            "xp_reward": 50,
            "coin_reward": 10
        }}
    ]
    """

    try:
        response = model.generate_content(prompt)
        text = response.text
        if text.startswith('```json'):
            text = text[7:]
        if text.endswith('```'):
            text = text[:-3]
        
        return json.loads(text.strip())
    except Exception as e:
        print(f"Error generating domain roadmap: {e}")
        return []
